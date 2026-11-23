import { graphql, http, HttpResponse, delay } from 'msw';
import { destinations, flights, hotels } from './catalog';

const endpoint = (path) => new URL(`${import.meta.env.BASE_URL}${path}`, window.location.origin).href;
const graph = graphql.link(endpoint('graphql'));

export const handlers = [
  http.get(endpoint('api/destinations'), async () => {
    await delay(320);
    return HttpResponse.json({ destinations, total: destinations.length });
  }),
  http.get(endpoint('api/destinations/:id'), async ({ params }) => {
    await delay(220);
    const destination = destinations.find((item) => item.id === params.id);
    return destination ? HttpResponse.json(destination) : HttpResponse.json({ message: 'Destino no encontrado' }, { status: 404 });
  }),
  graph.query('GetTravelOptions', async ({ variables }) => {
    await delay(380);
    const destinationId = String(variables.destinationId);
    return HttpResponse.json({
      data: {
        flights: flights.filter((item) => item.destinationId === destinationId),
        hotels: hotels.filter((item) => item.destinationId === destinationId),
      },
    });
  }),
  graph.mutation('CreateInquiry', async ({ variables }) => {
    await delay(440);
    const { destinationId, flightId, hotelId, travelerName, travelerEmail } = variables.input || {};
    const valid = destinations.some((item) => item.id === destinationId)
      && flights.some((item) => item.id === flightId && item.destinationId === destinationId && item.seatsAvailable > 0)
      && hotels.some((item) => item.id === hotelId && item.destinationId === destinationId && item.availableRooms > 0)
      && String(travelerName || '').trim().length >= 2
      && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(travelerEmail || ''));
    if (!valid) {
      return HttpResponse.json({ errors: [{ message: 'Revisa los datos del itinerario y del contacto.' }] });
    }
    return HttpResponse.json({ data: {
      createInquiry: {
        id: `AURA-${Date.now().toString().slice(-7)}`,
        status: 'SIMULADA',
        message: 'Solicitud de demostración registrada en el mock. No se realizó ninguna reserva real.',
      },
    } });
  }),
];

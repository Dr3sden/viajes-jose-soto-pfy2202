import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, CalendarDays, CheckCircle2, Heart, Info, MapPin, Plane, RefreshCw, Send, ShieldCheck, Sparkles, Ticket, Users, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { FlightCard, HotelCard } from '../components/TripOptionCard';
import { MessageState } from '../components/Feedback';
import { useTravel } from '../context/TravelContext';
import { CREATE_INQUIRY, GET_TRAVEL_OPTIONS } from '../lib/apollo';
import { currency, readableDate } from '../lib/format';

function nightsBetween(start, end) {
  const delta = (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86400000;
  return Number.isFinite(delta) ? Math.max(1, delta) : 1;
}

export default function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loadingDestination, setLoadingDestination] = useState(true);
  const [destinationError, setDestinationError] = useState('');
  const [requestVisible, setRequestVisible] = useState(false);
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [mobileTab, setMobileTab] = useState('flights');
  const { favorites, toggleFavorite, plan, selectOption, clearPlan } = useTravel();

  useEffect(() => {
    const controller = new AbortController();
    setDestination(null); setDestinationError(''); setLoadingDestination(true);
    fetch(`${import.meta.env.BASE_URL}api/destinations/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async (res) => { if (!res.ok) throw new Error('Destino no encontrado'); return res.json(); })
      .then((item) => { if (!controller.signal.aborted) setDestination(item); })
      .catch((error) => { if (!controller.signal.aborted && error.name !== 'AbortError') setDestinationError('No encontramos el destino solicitado.'); })
      .finally(() => { if (!controller.signal.aborted) setLoadingDestination(false); });
    setConfirmation(null); setRequestVisible(false);
    return () => controller.abort();
  }, [id]);

  const { data, loading, error, refetch } = useQuery(GET_TRAVEL_OPTIONS, {
    variables: { destinationId: id }, skip: !destination,
    notifyOnNetworkStatusChange: true,
  });
  const [createInquiry, { loading: sending }] = useMutation(CREATE_INQUIRY);
  const [formError, setFormError] = useState('');
  const saved = favorites.includes(id);
  const activePlan = plan.destinationId === id ? plan : { flight: null, hotel: null };
  const flight = activePlan.flight;
  const hotel = activePlan.hotel;
  const nights = flight ? nightsBetween(flight.departureDate, flight.returnDate) : 0;
  const total = useMemo(() => (flight?.price || 0) + (hotel?.pricePerNight || 0) * nights, [flight, hotel, nights]);

  async function submitInquiry(event) {
    event.preventDefault(); setFormError(''); setConfirmation(null);
    if (!flight || !hotel) return setFormError('Selecciona un vuelo y un hotel para continuar.');
    if (travelerName.trim().length < 2) return setFormError('Ingresa un nombre válido.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(travelerEmail)) return setFormError('Ingresa un correo electrónico válido.');
    try {
      const response = await createInquiry({ variables: { input: {
        destinationId: id, flightId: flight.id, hotelId: hotel.id,
        travelerName: travelerName.trim(), travelerEmail: travelerEmail.trim(),
      } } });
      if (!response.data?.createInquiry) throw new Error('No se recibió confirmación de la simulación.');
      setConfirmation(response.data.createInquiry);
      setRequestVisible(false);
    } catch (e) { setFormError(e.message || 'No pudimos completar la simulación.'); }
  }

  if (loadingDestination) return <div className="wrap detail-loading"><div className="skeleton detail-skeleton" /><div className="skeleton skeleton-line" /></div>;
  if (destinationError || !destination) return <section className="wrap listing-section"><MessageState title="Destino no disponible" message={destinationError || 'No encontramos ese destino.'} empty /><Link to="/destinos" className="button button-dark">Volver a destinos <ArrowLeft size={17} /></Link></section>;

  return <>
    <section className="detail-hero" style={{ '--destination-color': destination.color }}>
      <img className="detail-hero-image" src={destination.heroImage} alt={`Vista panorámica de ${destination.name}`} onError={(event) => { event.currentTarget.src = `${import.meta.env.BASE_URL}images/travel-fallback.svg`; }} />
      <div className="detail-overlay" />
      <div className="wrap detail-hero-inner"><Link to="/destinos" className="detail-back"><ArrowLeft size={17} /> Todos los destinos</Link><div className="detail-title-content"><span className="detail-region"><MapPin size={15} /> {destination.region} · {destination.country}</span><h1>{destination.name}<span>.</span></h1><p>{destination.description}</p><div className="detail-tags">{destination.activities.map((activity) => <span key={activity}>{activity}</span>)}</div></div><button type="button" className={`detail-favorite ${saved ? 'is-active' : ''}`} onClick={() => toggleFavorite(id)} aria-pressed={saved}><Heart size={19} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'En favoritos' : 'Guardar destino'}</button></div>
    </section>

    <section className="wrap details-intro"><div><span className="eyebrow eyebrow-green">CONOCE TU DESTINO</span><h2>Un lugar, <em>mil historias.</em></h2><p>{destination.fullDescription}</p></div><div className="detail-mini-card"><Sparkles size={25} /><strong>Tu viaje, a tu manera</strong><span>Selecciona un vuelo y un hotel para crear una combinación personalizada.</span></div></section>

    <section className="wrap options-section" id="opciones"><div className="options-header"><div><span className="eyebrow eyebrow-green">ORGANIZA TU ESCAPADA</span><h2>Planifica cada <em>detalle.</em></h2><p>Consulta alternativas desde nuestra API GraphQL mock y escoge lo que más te guste.</p></div><button type="button" className="refresh-button" onClick={() => refetch()} disabled={loading} title="Volver a consultar API GraphQL"><RefreshCw size={18} className={loading ? 'spinning' : ''} /> Actualizar opciones</button></div>
      <div className="mobile-option-tabs" role="group" aria-label="Tipo de opción de viaje"><button type="button" className={mobileTab === 'flights' ? 'active' : ''} onClick={() => setMobileTab('flights')}><Plane size={17} /> Vuelos</button><button type="button" className={mobileTab === 'hotels' ? 'active' : ''} onClick={() => setMobileTab('hotels')}><BedDouble size={17} /> Hoteles</button></div>
      {loading && !data ? <div className="options-placeholder"><div className="skeleton skeleton-option" /><div className="skeleton skeleton-option" /></div> : error && !data ? <MessageState title="No pudimos consultar vuelos y hoteles" message={error.message} onRetry={() => refetch()} /> : <div className="options-grid">
        <div className={`options-col ${mobileTab === 'hotels' ? 'mobile-hidden' : ''}`}><div className="option-col-heading"><span className="column-icon"><Plane size={20} /></span><div><h3>Vuelos disponibles</h3><small>Salida desde Santiago de Chile · ida y vuelta</small></div><span className="column-count">{data?.flights?.length ?? 0}</span></div>{data?.flights?.length ? data.flights.map((item) => <FlightCard key={item.id} flight={item} selected={flight?.id === item.id} onSelect={() => { selectOption(id, 'flight', item); setConfirmation(null); }} />) : <p className="no-results">Actualmente no hay vuelos disponibles.</p>}</div>
        <div className={`options-col ${mobileTab === 'flights' ? 'mobile-hidden' : ''}`}><div className="option-col-heading"><span className="column-icon"><BedDouble size={20} /></span><div><h3>Hoteles para tu estadía</h3><small>Valores por noche · disponibilidad simulada</small></div><span className="column-count">{data?.hotels?.length ?? 0}</span></div>{data?.hotels?.length ? data.hotels.map((item) => <HotelCard key={item.id} hotel={item} selected={hotel?.id === item.id} onSelect={() => { selectOption(id, 'hotel', item); setConfirmation(null); }} />) : <p className="no-results">Actualmente no hay hoteles disponibles.</p>}</div>
      </div>}
    </section>

    <section className="wrap summary-section"><div className="summary-card"><div className="summary-heading"><div><span className="eyebrow eyebrow-green">TU EXPERIENCIA PERSONALIZADA</span><h2>Mi itinerario <em>AURA.</em></h2></div><span className="summary-pill"><CheckCircle2 size={15} /> Datos demostrativos</span></div><div className="summary-rows"><div className="summary-item"><span className="summary-icon"><Ticket size={22} /></span><div><small>VUELO SELECCIONADO</small><strong>{flight ? `${flight.airline} · ${flight.origin} → ${flight.destination}` : 'Aún no eliges un vuelo'}</strong><span>{flight ? `${readableDate(flight.departureDate)} al ${readableDate(flight.returnDate)}` : 'Selecciona una de las opciones de arriba'}</span></div><b>{flight ? currency(flight.price) : '—'}</b></div><div className="summary-item"><span className="summary-icon"><BedDouble size={22} /></span><div><small>HOTEL SELECCIONADO</small><strong>{hotel?.name || 'Aún no eliges un hotel'}</strong><span>{hotel && flight ? `${nights} noches · ${currency(hotel.pricePerNight)} / noche` : 'Selecciona una de las opciones de arriba'}</span></div><b>{hotel && flight ? currency(hotel.pricePerNight * nights) : '—'}</b></div></div><div className="summary-bottom"><div><span>Total estimado del viaje</span><strong>{flight && hotel ? currency(total) : '—'}</strong><small>1 persona · vuelo ida y vuelta + {nights || '—'} noches · valores simulados</small></div><div className="summary-actions"><button type="button" className="button button-quiet" onClick={() => { clearPlan(); setConfirmation(null); }}>Limpiar</button><button type="button" className="button button-dark" disabled={!flight || !hotel} onClick={() => { setRequestVisible(true); setFormError(''); }}>Solicitar itinerario <ArrowUpRight size={18} /></button></div></div></div>
      {confirmation && <div className="success-notice" role="status"><CheckCircle2 size={24} /><div><strong>¡Simulación registrada! Código {confirmation.id}</strong><p>{confirmation.message}</p></div><button type="button" aria-label="Cerrar confirmación" onClick={() => setConfirmation(null)}><X size={18} /></button></div>}
      <p className="disclaimer"><Info size={16} /> AURA Travel es un proyecto académico: todas las tarifas, fechas, cupos y solicitudes son ficticios; no se reservan viajes ni se envían correos.</p>
    </section>

    {requestVisible && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setRequestVisible(false); }} role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="modal-title" className="inquiry-modal"><button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setRequestVisible(false)}><X size={20} /></button><span className="eyebrow eyebrow-green">ÚLTIMO PASO · DEMOSTRACIÓN</span><h2 id="modal-title">Tu próxima aventura <em>empieza aquí.</em></h2><p>Completa los datos de prueba. La solicitud se valida mediante una mutación GraphQL simulada y no envía información a terceros.</p><form onSubmit={submitInquiry}><label htmlFor="traveler-name">Nombre completo</label><div className="modal-input"><Users size={18} /><input id="traveler-name" value={travelerName} onChange={(event) => setTravelerName(event.target.value)} placeholder="Ej.: Camila Pérez" autoComplete="name" minLength={2} maxLength={80} required /></div><label htmlFor="traveler-email">Correo electrónico</label><div className="modal-input"><Send size={18} /><input id="traveler-email" value={travelerEmail} onChange={(event) => setTravelerEmail(event.target.value)} type="email" placeholder="correo@ejemplo.cl" autoComplete="email" required /></div><div className="modal-inline-info"><CalendarDays size={17} /><span>{nights} noches · {currency(total)} estimado · solicitud ficticia</span></div>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-dark modal-submit" type="submit" disabled={sending}>{sending ? 'Simulando solicitud...' : <>Confirmar simulación <ArrowRight size={19} /></>}</button></form><div className="modal-trust"><ShieldCheck size={17} /> Solo demostración académica. Sin pagos ni envío de información.</div></section></div>}
  </>;
}

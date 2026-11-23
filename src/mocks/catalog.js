const photo = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const destinations = [
  {
    id: 'bali', name: 'Bali', country: 'Indonesia', region: 'Sudeste asiático', continent: 'Asia',
    category: 'Naturaleza', highlight: 'Para perder la noción del tiempo', badge: 'Más popular',
    description: 'Templos entre selvas, arrozales infinitos y atardeceres frente al océano.',
    fullDescription: 'Descubre el equilibrio entre cultura, naturaleza y bienestar. Explora los arrozales de Ubud, disfruta de sus playas y contempla templos que parecen flotar sobre el mar.',
    activities: ['Templos de Ubud', 'Playas tropicales', 'Arrozales', 'Surf'],
    image: photo('photo-1537996194471-e657df975ab4'),
    heroImage: photo('photo-1537996194471-e657df975ab4', 1800),
    airport: 'DPS', airportName: 'Denpasar', color: '#278d75',
  },
  {
    id: 'kyoto', name: 'Kioto', country: 'Japón', region: 'Asia oriental', continent: 'Asia',
    category: 'Cultura', highlight: 'Tradiciones que inspiran', badge: 'Experiencia cultural',
    description: 'Santuarios ancestrales, jardines zen y calles que guardan siglos de historias.',
    fullDescription: 'Recorre los torii rojos de Fushimi Inari, camina por el bosque de bambú de Arashiyama y conoce el Japón tradicional entre jardines y casas de té.',
    activities: ['Fushimi Inari', 'Bosque de bambú', 'Templos', 'Gastronomía'],
    image: photo('photo-1493976040374-85c8e12f0c0e'),
    heroImage: photo('photo-1493976040374-85c8e12f0c0e', 1800),
    airport: 'KIX', airportName: 'Osaka (para Kioto)', color: '#a25d75',
  },
  {
    id: 'santorini', name: 'Santorini', country: 'Grecia', region: 'Islas Cícladas', continent: 'Europa',
    category: 'Relax', highlight: 'La magia del mar Egeo', badge: 'Escapada soñada',
    description: 'Casitas blancas, cúpulas azules y una de las puestas de sol más especiales.',
    fullDescription: 'Déjate conquistar por los acantilados de Oía, las playas volcánicas y una gastronomía que sabe a Mediterráneo. Ideal para una escapada tranquila.',
    activities: ['Atardecer en Oía', 'Paseos en barco', 'Playas', 'Gastronomía'],
    image: photo('photo-1613395877344-13d4a8e0d49e'),
    heroImage: photo('photo-1613395877344-13d4a8e0d49e', 1800),
    airport: 'JTR', airportName: 'Santorini', color: '#3279a1',
  },
  {
    id: 'roma', name: 'Roma', country: 'Italia', region: 'Lacio', continent: 'Europa',
    category: 'Cultura', highlight: 'Cada calle cuenta una historia', badge: 'Historia viva',
    description: 'Arte, plazas encantadoras, arquitectura monumental y auténtica dolce vita.',
    fullDescription: 'Viaja entre la Roma imperial y los barrios llenos de vida. Descubre el Coliseo, lanza una moneda a la Fontana di Trevi y disfruta de la cocina italiana.',
    activities: ['Coliseo', 'Fontana di Trevi', 'Museos', 'Pasta italiana'],
    image: photo('photo-1552832230-c0197dd311b5'),
    heroImage: photo('photo-1552832230-c0197dd311b5', 1800),
    airport: 'FCO', airportName: 'Roma Fiumicino', color: '#ba8050',
  },
  {
    id: 'patagonia', name: 'Patagonia', country: 'Chile', region: 'Magallanes', continent: 'América',
    category: 'Aventura', highlight: 'Naturaleza en estado puro', badge: 'Destino nacional',
    description: 'Montañas inmensas, lagos turquesa y senderos hacia el fin del mundo.',
    fullDescription: 'Conecta con paisajes extraordinarios en la Patagonia chilena: montañas, glaciares y caminatas que desafían y recompensan a cada paso.',
    activities: ['Torres del Paine', 'Trekking', 'Glaciares', 'Fotografía'],
    image: photo('photo-1464822759023-fed622ff2c3b'),
    heroImage: photo('photo-1464822759023-fed622ff2c3b', 1800),
    airport: 'PNT', airportName: 'Puerto Natales', color: '#507976',
  },
  {
    id: 'lisboa', name: 'Lisboa', country: 'Portugal', region: 'Costa atlántica', continent: 'Europa',
    category: 'Ciudad', highlight: 'Colores junto al Atlántico', badge: 'Para explorar',
    description: 'Tranvías amarillos, miradores, azulejos y callejones llenos de encanto.',
    fullDescription: 'Conoce la capital portuguesa a través de sus barrios históricos, miradores sobre el Tajo y su irresistible combinación de arte, música y sabores.',
    activities: ['Alfama', 'Tranvía 28', 'Belém', 'Miradores'],
    image: photo('photo-1555881400-74d7acaacd8b'),
    heroImage: photo('photo-1555881400-74d7acaacd8b', 1800),
    airport: 'LIS', airportName: 'Lisboa', color: '#c47d50',
  },
];

const airCompanies = ['LATAM Airlines', 'Sky Airline', 'Iberia / Partners'];
const hotelNames = {
  bali: ['Ubud Jungle Retreat', 'Ocean Breeze Seminyak', 'The Bali Garden'],
  kyoto: ['Kyoto Heritage House', 'Sakura Boutique Hotel', 'Higashiyama Stay'],
  santorini: ['Aegean Pearl Suites', 'Oia Sunset Residence', 'Caldera View Hotel'],
  roma: ['Trastevere Boutique', 'Roma Piazza Suites', 'Colosseo Garden'],
  patagonia: ['Patagonia Eco Lodge', 'Refugio del Sur', 'Vientos de Natales'],
  lisboa: ['Alfama Design Hotel', 'Mirador Lisboa Suites', 'Tajo Boutique Stay'],
};
const hotelPhotos = [
  photo('photo-1566073771259-6a8506099945', 700),
  photo('photo-1571896349842-33c89424de2d', 700),
  photo('photo-1582719508461-905c673771fd', 700),
];
const baseFlightPrices = { bali: 1290000, kyoto: 1480000, santorini: 1190000, roma: 990000, patagonia: 165000, lisboa: 1090000 };
const baseHotelPrices = { bali: 97000, kyoto: 132000, santorini: 175000, roma: 122000, patagonia: 146000, lisboa: 109000 };
const dates = [
  ['2027-01-16', '2027-01-24'],
  ['2027-03-08', '2027-03-16'],
  ['2027-05-10', '2027-05-18'],
];

export const flights = destinations.flatMap((destination) => dates.map(([departureDate, returnDate], i) => ({
  id: `flight-${destination.id}-${i + 1}`,
  destinationId: destination.id,
  airline: destination.id === 'patagonia' && i === 1 ? 'Sky Airline' : airCompanies[i],
  flightNumber: `${['LA', 'H2', 'IB'][i]}${410 + i * 27}`,
  origin: 'SCL',
  destination: destination.airport,
  destinationAirport: destination.airportName,
  departureDate, returnDate,
  departureTime: ['09:20', '07:35', '22:10'][i],
  duration: destination.id === 'patagonia' ? '3 h 15 min' : ['19 h 30 min', '22 h 10 min', '18 h 45 min'][i],
  stops: destination.id === 'patagonia' ? 0 : [1, 2, 1][i],
  price: baseFlightPrices[destination.id] + i * (destination.id === 'patagonia' ? 28000 : 115000),
  seatsAvailable: [8, 4, 12][i],
})));

export const hotels = destinations.flatMap((destination) => hotelNames[destination.id].map((name, i) => ({
  id: `hotel-${destination.id}-${i + 1}`,
  destinationId: destination.id,
  name,
  location: `${destination.name}, ${destination.country}`,
  rating: [4.9, 4.7, 4.6][i],
  stars: i === 0 ? 5 : 4,
  image: hotelPhotos[i],
  pricePerNight: baseHotelPrices[destination.id] + i * 19000,
  availableRooms: [6, 3, 9][i],
  availableFrom: '2027-01-01',
  availableUntil: '2027-06-30',
  amenities: i === 0 ? ['Desayuno', 'Wi-Fi', 'Piscina'] : i === 1 ? ['Wi-Fi', 'Terraza', 'Desayuno'] : ['Wi-Fi', 'Recepción 24 h', 'Traslado'],
})));

import { Check, Clock3, Coffee, MapPin, Plane, Star, Ticket, Wifi } from 'lucide-react';
import { currency, readableDate } from '../lib/format';

export function FlightCard({ flight, selected, onSelect }) {
  return <article className={`option-card flight-card ${selected ? 'option-selected' : ''}`}>
    <div className="option-head"><span className="option-type"><Plane size={17} /> {flight.airline}</span><span className="availability">{flight.seatsAvailable} cupos disponibles</span></div>
    <div className="flight-route">
      <div className="airport"><strong>{flight.origin}</strong><small>Santiago</small></div>
      <div className="flight-middle"><span><Clock3 size={13} /> {flight.duration}</span><div className="route-line"><Plane size={17} /></div><span>{flight.stops === 0 ? 'Directo' : `${flight.stops} escala${flight.stops > 1 ? 's' : ''}`}</span></div>
      <div className="airport airport-right"><strong>{flight.destination}</strong><small>{flight.destinationAirport}</small></div>
    </div>
    <div className="option-facts"><span><Ticket size={14} /> Ida {readableDate(flight.departureDate)}</span><span>Vuelta {readableDate(flight.returnDate)}</span></div>
    <div className="option-bottom"><div><small>Por persona · ida y vuelta</small><strong>{currency(flight.price)}</strong></div><button type="button" className={`button ${selected ? 'button-selected' : 'button-outline'}`} onClick={onSelect}>{selected ? <><Check size={17} /> Seleccionado</> : 'Elegir vuelo'}</button></div>
  </article>;
}

export function HotelCard({ hotel, selected, onSelect }) {
  return <article className={`option-card hotel-card ${selected ? 'option-selected' : ''}`}>
    <div className="hotel-card-top">
      <img src={hotel.image} alt={`Alojamiento ${hotel.name}`} loading="lazy" onError={(event) => { event.currentTarget.src = `${import.meta.env.BASE_URL}images/travel-fallback.svg`; }} />
      <div className="hotel-info"><div className="hotel-rating"><Star size={14} fill="currentColor" /> {hotel.rating.toFixed(1)} <span>· {hotel.stars} estrellas</span></div><h3>{hotel.name}</h3><span className="hotel-location"><MapPin size={13} /> {hotel.location}</span></div>
    </div>
    <div className="hotel-amenities">{hotel.amenities.map((amenity) => <span key={amenity}>{amenity === 'Wi-Fi' ? <Wifi size={13} /> : <Coffee size={13} />}{amenity}</span>)}</div>
    <div className="option-bottom"><div><small>Por noche · {hotel.availableRooms} habitaciones disp.</small><strong>{currency(hotel.pricePerNight)}</strong></div><button type="button" className={`button ${selected ? 'button-selected' : 'button-outline'}`} onClick={onSelect}>{selected ? <><Check size={17} /> Seleccionado</> : 'Elegir hotel'}</button></div>
  </article>;
}

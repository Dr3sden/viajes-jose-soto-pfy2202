import { ArrowUpRight, Heart, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export default function DestinationCard({ destination, index = 0 }) {
  const { favorites, toggleFavorite } = useTravel();
  const saved = favorites.includes(destination.id);
  return <article className="destination-card fade-enter" style={{ animationDelay: `${Math.min(index, 5) * 70}ms` }}>
    <div className="destination-image-wrap">
      <img src={destination.image} alt={`Paisaje de ${destination.name}, ${destination.country}`} loading="lazy" onError={(event) => { event.currentTarget.src = `${import.meta.env.BASE_URL}images/travel-fallback.svg`; }} />
      <span className="photo-shade" />
      <span className="destination-badge"><Sparkles size={13} /> {destination.badge}</span>
      <button type="button" className={`heart-button ${saved ? 'is-active' : ''}`} onClick={() => toggleFavorite(destination.id)} aria-label={saved ? `Quitar ${destination.name} de favoritos` : `Agregar ${destination.name} a favoritos`} aria-pressed={saved}><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button>
      <span className="destination-visual-title">{destination.name}</span>
    </div>
    <div className="destination-body">
      <div className="destination-meta"><MapPin size={15} /> {destination.country} <span className="meta-dot">·</span> {destination.continent}</div>
      <h3>{destination.highlight}</h3>
      <p>{destination.description}</p>
      <div className="activity-tags">{destination.activities.slice(0, 3).map((activity) => <span key={activity}>{activity}</span>)}</div>
      <Link className="destination-link" to={`/destinos/${destination.id}`} aria-label={`Ver vuelos y hoteles disponibles en ${destination.name}`}>Explorar destino <span><ArrowUpRight size={18} /></span></Link>
    </div>
  </article>;
}

import { Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { LoadingCards, MessageState } from '../components/Feedback';
import { useDestinations } from '../hooks/useDestinations';
import { useTravel } from '../context/TravelContext';

export default function Favorites() {
  const { favorites } = useTravel();
  const { destinations, loading, error, retry } = useDestinations();
  const saved = destinations.filter((item) => favorites.includes(item.id));
  return <><section className="page-banner"><div className="wrap"><span className="eyebrow eyebrow-green"><Heart size={15} /> TU LISTA ESPECIAL</span><h1>Viajes para <em>recordar.</em></h1><p>Los destinos que te hicieron soñar, todos en un mismo lugar.</p></div></section><section className="wrap listing-section">{loading ? <LoadingCards /> : error ? <MessageState title="Algo salió mal" message={error} onRetry={retry} /> : saved.length ? <><div className="listing-intro">Tienes {saved.length} {saved.length === 1 ? 'destino guardado' : 'destinos guardados'}.</div><div className="card-grid">{saved.map((item, i) => <DestinationCard key={item.id} destination={item} index={i} />)}</div></> : <div className="empty-state"><Heart size={39} /><h3>Aún no guardas destinos</h3><p>Pulsa el corazón de cualquier lugar para tenerlo siempre a mano.</p><Link to="/destinos" className="button button-dark">Descubrir destinos <ArrowUpRight size={17} /></Link></div>}</section></>;
}

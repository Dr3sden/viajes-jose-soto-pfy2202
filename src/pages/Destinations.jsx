import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, MapPinned, ArrowUpRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { LoadingCards, MessageState } from '../components/Feedback';
import { useDestinations } from '../hooks/useDestinations';

const continents = ['Todos', 'Asia', 'Europa', 'América'];
function normalize(value) { return value.toLocaleLowerCase('es-CL').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const search = params.get('buscar') || '';
  const [continent, setContinent] = useState('Todos');
  const [category, setCategory] = useState('Todas');
  const { destinations, loading, error, retry } = useDestinations();
  const categories = ['Todas', ...new Set(destinations.map((destination) => destination.category))];
  const filtered = useMemo(() => destinations.filter((destination) => {
    const textMatch = normalize([destination.name, destination.country, destination.region, ...destination.activities].join(' ')).includes(normalize(search.trim()));
    return textMatch && (continent === 'Todos' || destination.continent === continent) && (category === 'Todas' || destination.category === category);
  }), [destinations, search, continent, category]);
  return <>
    <section className="page-banner"><div className="wrap"><Link to="/" className="breadcrumb">Inicio <ArrowUpRight size={13} /></Link><span className="eyebrow eyebrow-green">EL MUNDO ES TUYO</span><h1>Encuentra tu <em>próximo destino.</em></h1><p>Desde rincones llenos de historia hasta paisajes que parecen irreales. Tu aventura comienza aquí.</p></div></section>
    <section className="wrap listing-section"><div className="filter-bar"><div className="filter-search"><Search size={19} /><label htmlFor="filter-query" className="sr-only">Buscar destino, país o actividad</label><input id="filter-query" value={search} onChange={(event) => setParams(event.target.value.trim() ? { buscar: event.target.value } : {})} placeholder="Buscar destinos, países o actividades..." /></div><label className="category-control"><SlidersHorizontal size={17} /><span className="sr-only">Tipo de viaje</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label></div>
      <div className="list-heading"><div className="continent-tabs" role="group" aria-label="Filtrar por continente">{continents.map((item) => <button key={item} type="button" className={continent === item ? 'tab active' : 'tab'} onClick={() => setContinent(item)}>{item}</button>)}</div><span className="results-counter"><MapPinned size={15} /> {filtered.length} {filtered.length === 1 ? 'destino encontrado' : 'destinos encontrados'}</span></div>
      {loading ? <LoadingCards count={6} /> : error ? <MessageState title="No se pudieron obtener los destinos" message={error} onRetry={retry} /> : filtered.length === 0 ? <MessageState empty title="No encontramos coincidencias" message="Prueba otra búsqueda o cambia los filtros." onRetry={() => { setParams({}); setContinent('Todos'); setCategory('Todas'); }} /> : <div className="card-grid">{filtered.map((destination, i) => <DestinationCard key={destination.id} destination={destination} index={i} />)}</div>}
    </section>
  </>;
}

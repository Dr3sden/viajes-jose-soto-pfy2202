import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Globe2, MapPinned, PlaneTakeoff, Search, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { LoadingCards, MessageState } from '../components/Feedback';
import { useDestinations } from '../hooks/useDestinations';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { destinations, loading, error, retry } = useDestinations();
  const featured = destinations.slice(0, 3);
  function search(event) { event.preventDefault(); navigate(`/destinos${query.trim() ? `?buscar=${encodeURIComponent(query.trim())}` : ''}`); }

  return <>
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="wrap hero-layout">
        <div className="hero-copy fade-enter">
          <span className="eyebrow hero-eyebrow"><span className="glow-dot" /> TU PRÓXIMA HISTORIA COMIENZA AQUÍ</span>
          <h1>El mundo te espera <em>allá afuera.</em></h1>
          <p>De los paisajes que te dejan sin palabras a las ciudades que te hacen sentir vivo. Encuentra un lugar que se sienta como tuyo.</p>
          <form className="hero-search" onSubmit={search} role="search"><Search size={20} /><label className="sr-only" htmlFor="hero-search">Buscar destino o país</label><input id="hero-search" placeholder="¿A dónde quieres ir?" value={query} onChange={(event) => setQuery(event.target.value)} maxLength={60} /><button type="submit">Explorar viajes <ArrowRight size={18} /></button></form>
          <div className="hero-proof"><span className="hero-spark"><Sparkles size={19} /></span><span>6 destinos increíbles <b>para descubrir a tu manera</b></span></div>
        </div>
        <div className="hero-note"><span>01 / 06</span><div className="hero-note-rule" /><strong>Explora sin límites</strong><small>Inspiración para tu próxima aventura</small></div>
      </div>
      <button type="button" onClick={() => document.getElementById('descubre')?.scrollIntoView({ behavior: 'smooth' })} className="scroll-cue" aria-label="Ver destinos destacados">DESLIZA PARA EXPLORAR <ArrowDown size={16} /></button>
    </section>

    <section className="trustbar"><div className="wrap trustbar-inner"><div><Globe2 size={23} /><span><strong>6 destinos</strong> únicos por conocer</span></div><div><PlaneTakeoff size={23} /><span><strong>Vuelos y hoteles</strong> en un lugar</span></div><div><ShieldCheck size={23} /><span><strong>Precios transparentes</strong> de demostración</span></div></div></section>

    <section id="descubre" className="section section-featured wrap">
      <div className="section-heading"><div><span className="eyebrow eyebrow-green"><span className="tiny-line" /> DESTINOS PARA SOÑAR</span><h2>Lugares que <em>enamoran.</em></h2><p>Una selección de rincones extraordinarios para vivir grandes momentos.</p></div><Link to="/destinos" className="text-link">Ver todos los destinos <ArrowUpRight size={18} /></Link></div>
      {loading ? <LoadingCards /> : error ? <MessageState title="No pudimos cargar los destinos" message={error} onRetry={retry} /> : <div className="card-grid">{featured.map((destination, i) => <DestinationCard key={destination.id} destination={destination} index={i} />)}</div>}
    </section>

    <section className="experience-section"><div className="wrap experience-grid"><div className="experience-photo"><img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=82" alt="Viajero explorando un nuevo destino" loading="lazy" onError={(event) => { event.currentTarget.src = `${import.meta.env.BASE_URL}images/travel-fallback.svg`; }} /><span className="experience-stamp"><Waves size={24} /><strong>Vive</strong><small>la experiencia</small></span></div><div className="experience-content"><span className="eyebrow eyebrow-green">EL VIAJE ES TUYO</span><h2>No colecciones cosas. <em>Colecciona momentos.</em></h2><p>Creemos que viajar no se trata solo de llegar a otro lugar. Se trata de descubrir una cultura, conectar con lo inesperado y volver con nuevas historias.</p><div className="experience-points"><div><MapPinned size={20} /><span><strong>Elige tu destino</strong><small>Encuentra el lugar que mejor va contigo.</small></span></div><div><PlaneTakeoff size={20} /><span><strong>Arma tu combinación ideal</strong><small>Consulta vuelos y hoteles desde nuestra API.</small></span></div><div><Sparkles size={20} /><span><strong>Planifica sin complicaciones</strong><small>Todo en una experiencia simple y clara.</small></span></div></div><Link to="/como-funciona" className="button button-dark">Conoce cómo funciona <ArrowUpRight size={18} /></Link></div></div></section>

    <section className="callout-section wrap"><div className="callout"><div><span className="eyebrow">TU SIGUIENTE CAPÍTULO</span><h2>Las mejores historias empiezan con un <em>«¿y si vamos?»</em></h2></div><Link to="/destinos" className="button button-lime">Descubre tu lugar <ArrowUpRight size={18} /></Link><span className="callout-orbit" aria-hidden="true" /></div></section>
  </>;
}

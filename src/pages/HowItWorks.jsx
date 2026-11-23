import { ArrowRight, CheckCircle2, Code2, Database, Globe2, Layers3, MousePointerClick, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: Search, number: '01', title: 'Descubre tu destino', text: 'Consulta los destinos disponibles, filtra por región o tipo de viaje y guarda tus favoritos.' },
  { icon: Layers3, number: '02', title: 'Compara tus opciones', text: 'Cada destino muestra vuelos y hoteles con precios, fechas y disponibilidad actualizados desde GraphQL mock.' },
  { icon: MousePointerClick, number: '03', title: 'Diseña tu itinerario', text: 'Elige un vuelo y un hotel, revisa los valores y simula una solicitud de itinerario.' },
];
export default function HowItWorks() {
  return <><section className="page-banner"><div className="wrap"><span className="eyebrow eyebrow-green">MUY SIMPLE, MUY AURA</span><h1>Planear es parte <em>de la aventura.</em></h1><p>Todo lo que necesitas para imaginar tu próximo viaje, en un solo lugar.</p></div></section>
    <section className="wrap listing-section"><div className="how-grid">{steps.map(({ icon: Icon, number, title, text }) => <article key={number} className="how-card"><div className="how-number">{number}</div><div className="how-icon"><Icon size={27} /></div><h2>{title}</h2><p>{text}</p></article>)}</div></section>
    <section className="tech-section"><div className="wrap tech-grid"><div><span className="eyebrow eyebrow-green">DETRÁS DE LA EXPERIENCIA</span><h2>Diseñada con tecnología <em>moderna.</em></h2><p>Este sitio es una demostración académica de integración frontend/backend. Los datos son simulados, pero la comunicación ocurre mediante solicitudes HTTP interceptadas por MSW, con las mismas interfaces de una API real.</p><Link to="/destinos" className="button button-dark">Comenzar a explorar <ArrowRight size={18} /></Link></div><div className="tech-list"><div><Globe2 size={22} /><div><h3>REST API mock</h3><p>GET /api/destinations · listado dinámico</p></div><CheckCircle2 size={19} /></div><div><Database size={22} /><div><h3>GraphQL + Apollo Client</h3><p>Queries y mutations · opciones de viaje</p></div><CheckCircle2 size={19} /></div><div><Code2 size={22} /><div><h3>React Router + hooks</h3><p>Navegación, estados y componentes reutilizables</p></div><CheckCircle2 size={19} /></div><div><Sparkles size={22} /><div><h3>MSW + GitHub Pages</h3><p>Backend simulado en el navegador, sin servidor externo</p></div><CheckCircle2 size={19} /></div></div></div></section>
  </>;
}

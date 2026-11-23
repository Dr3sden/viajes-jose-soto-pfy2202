import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return <section className="not-found wrap"><Compass size={48} /><span className="eyebrow eyebrow-green">ERROR 404</span><h1>Esta ruta se perdió <em>en el mapa.</em></h1><p>No encontramos la página que buscas, pero todavía quedan muchos lugares por descubrir.</p><Link to="/" className="button button-dark"><ArrowLeft size={18} /> Volver al inicio</Link></section>;
}

import { ArrowUpRight, Compass, Heart, Instagram, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="footer">
    <div className="wrap footer-main">
      <div className="footer-brand">
        <Link to="/" className="brand brand-light"><span className="brand-symbol"><Compass size={21} /></span><span>AURA<span className="brand-period">.</span><small>TRAVEL</small></span></Link>
        <p>Grandes viajes comienzan con una pequeña inspiración. Diseña experiencias que vas a recordar.</p>
        <span className="footer-tag"><Heart size={14} /> Hecho para quienes aman descubrir.</span>
      </div>
      <div className="footer-col"><strong>Explora</strong><Link to="/destinos">Todos los destinos</Link><Link to="/favoritos">Mis favoritos</Link><Link to="/como-funciona">Cómo funciona</Link></div>
      <div className="footer-col"><strong>Información</strong><span><MapPin size={15} /> Proyecto académico · Chile</span><span><Mail size={15} /> Demostración educativa</span><span><Instagram size={15} /> Sin cuentas comerciales</span></div>
      <div className="footer-news"><span className="eyebrow light">VIAJA MÁS, SUEÑA MÁS</span><h3>¿Cuál será tu próximo lugar favorito?</h3><Link className="button button-lime" to="/destinos">Buscar mi aventura <ArrowUpRight size={18} /></Link></div>
    </div>
    <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} AURA Travel · Proyecto académico PFY2202</span><span>Datos, precios y disponibilidad simulados. No se realizan reservas reales.</span></div>
  </footer>;
}

import { useState } from 'react';
import { Compass, Heart, Menu, X, ArrowUpRight, Plane } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

const nav = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/destinos', label: 'Destinos' },
  { to: '/como-funciona', label: 'Cómo funciona' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favorites, plan } = useTravel();
  const { pathname } = useLocation();
  const planCount = Number(Boolean(plan.flight)) + Number(Boolean(plan.hotel));
  const close = () => setOpen(false);
  return <>
    <button type="button" className="skip-link" onClick={() => { const main = document.getElementById('contenido'); main?.focus(); main?.scrollIntoView(); }}>Saltar al contenido</button>
    <header className="topbar">
      <div className="nav-container wrap">
        <Link to="/" className="brand" onClick={close} aria-label="AURA Travel, inicio">
          <span className="brand-symbol"><Compass size={21} strokeWidth={2.4} /></span>
          <span>AURA<span className="brand-period">.</span><small>TRAVEL</small></span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Navegación principal">
          {nav.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} onClick={close} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
          <NavLink to="/favoritos" onClick={close} className={({ isActive }) => `nav-link nav-mobile-faves ${isActive ? 'active' : ''}`}><Heart size={17} /> Mis favoritos ({favorites.length})</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/favoritos" className={`nav-icon ${pathname === '/favoritos' ? 'selected' : ''}`} aria-label={`${favorites.length} destinos favoritos`} title="Mis favoritos"><Heart size={20} /><span className="nav-counter">{favorites.length}</span></Link>
          <Link to={plan.destinationId ? `/destinos/${plan.destinationId}` : '/destinos'} className="nav-cta"><Plane size={17} /><span>Mi viaje{planCount > 0 ? ` (${planCount})` : ''}</span><ArrowUpRight size={16} /></Link>
          <button type="button" className="hamburger" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
    {open && <button type="button" className="nav-scrim" onClick={close} aria-label="Cerrar menú" />}
  </>;
}

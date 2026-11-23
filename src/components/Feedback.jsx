import { AlertCircle, RefreshCw, SearchX } from 'lucide-react';

export function LoadingCards({ count = 3 }) {
  return <div className="card-grid" aria-label="Cargando destinos" aria-busy="true">{Array.from({ length: count }, (_, i) => <div key={i} className="destination-card card-skeleton"><div className="skeleton skeleton-image" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-short" /></div>)}</div>;
}
export function MessageState({ title, message, onRetry, empty = false }) {
  return <div className="empty-state">{empty ? <SearchX size={39} /> : <AlertCircle size={39} />}<h3>{title}</h3><p>{message}</p>{onRetry && <button type="button" className="button button-dark" onClick={onRetry}><RefreshCw size={17} /> Reintentar</button>}</div>;
}

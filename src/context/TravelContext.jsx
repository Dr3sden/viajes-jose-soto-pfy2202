import { createContext, useContext, useEffect, useState } from 'react';

const TravelContext = createContext(null);

function readStored(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}

export function TravelProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStored('aura:favorites', []));
  const [plan, setPlan] = useState(() => readStored('aura:plan', { destinationId: null, flight: null, hotel: null }));
  useEffect(() => { try { localStorage.setItem('aura:favorites', JSON.stringify(favorites)); } catch { /* Navegación privada: funciona sin persistencia */ } }, [favorites]);
  useEffect(() => { try { localStorage.setItem('aura:plan', JSON.stringify(plan)); } catch { /* Navegación privada */ } }, [plan]);

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  function selectOption(destinationId, type, option) {
    setPlan((current) => ({
      ...(current.destinationId === destinationId ? current : { destinationId, flight: null, hotel: null }),
      [type]: option,
    }));
  }
  function clearPlan() { setPlan({ destinationId: null, flight: null, hotel: null }); }

  return <TravelContext.Provider value={{ favorites, toggleFavorite, plan, selectOption, clearPlan }}>{children}</TravelContext.Provider>;
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) throw new Error('useTravel debe usarse dentro de TravelProvider');
  return context;
}

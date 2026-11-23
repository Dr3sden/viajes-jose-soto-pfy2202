import { useEffect, useState } from 'react';

// Solo REST: no se importan datos mock directamente en los componentes.
export function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}api/destinations`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
        const payload = await response.json();
        if (!Array.isArray(payload.destinations)) throw new Error('La respuesta REST tiene un formato inválido');
        setDestinations(payload.destinations);
      } catch (e) {
        if (e.name !== 'AbortError') setError('No pudimos cargar los destinos. Intenta nuevamente.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [retryCount]);

  return { destinations, loading, error, retry: () => setRetryCount((value) => value + 1) };
}

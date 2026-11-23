import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apollo';
import { TravelProvider } from './context/TravelContext';
import App from './App';
import './styles.css';

async function start() {
  if ('serviceWorker' in navigator) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js`, options: { scope: import.meta.env.BASE_URL } },
    });
  } else {
    throw new Error('Este navegador no admite Service Workers. Utiliza Chrome, Edge o Firefox actualizado.');
  }

  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <TravelProvider><App /></TravelProvider>
      </ApolloProvider>
    </React.StrictMode>,
  );
}

start().catch((error) => {
  console.error('No se pudo iniciar el backend mock:', error);
  document.getElementById('root').innerHTML = `<main style="max-width:680px;margin:15vh auto;padding:35px;font:16px system-ui"><h1>No se pudo iniciar AURA Travel</h1><p>Comprueba que ejecutaste <code>npm install</code> y que ingresaste desde localhost o HTTPS. Vuelve a cargar la página.</p></main>`;
});

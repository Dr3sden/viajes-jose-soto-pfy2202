import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Favorites from './pages/Favorites';
import HowItWorks from './pages/HowItWorks';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}
export default function App() {
  return <HashRouter>
    <ScrollToTop />
    <Header />
    <main id="contenido" tabIndex={-1} className="site-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinations />} />
        <Route path="/destinos/:id" element={<DestinationDetail />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/como-funciona" element={<HowItWorks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </HashRouter>;
}

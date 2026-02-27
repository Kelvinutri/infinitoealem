import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const minPreloadTime = 1800;
    const initTime = Date.now();
    
    const handleLoad = () => {
      const elapsed = Date.now() - initTime;
      const remaining = Math.max(0, minPreloadTime - elapsed);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setRemoved(true), 800);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (removed) return null;

  return (
    <div id="preloader" style={{ opacity: visible ? 1 : 0, visibility: visible ? 'visible' : 'hidden' }}>
      <svg width="120" height="60" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
        <path className="preloader-inf" d="M 100,50 C 100,20 140,20 150,50 C 160,80 200,80 200,50 C 200,20 160,20 150,50 C 140,80 100,80 100,50 C 100,20 60,20 50,50 C 40,80 0,80 0,50 C 0,20 40,20 50,50 C 60,80 100,80 100,50 Z" />
      </svg>
      <div className="preloader-text">Carregando Memórias...</div>
    </div>
  );
}

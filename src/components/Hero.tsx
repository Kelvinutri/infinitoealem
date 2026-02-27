import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero({ isUnlocked }: { isUnlocked: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isUnlocked) {
      const tl = gsap.timeline();
      
      // Reset initial state
      gsap.set("#partKelvin", { opacity: 0, y: 40, filter: "blur(15px)", scale: 0.9 });
      gsap.set("#partAmp", { opacity: 0, filter: "blur(10px)", scale: 0.5, rotation: -20 });
      gsap.set("#partMaria", { opacity: 0, y: 40, filter: "blur(15px)", scale: 0.9 });

      tl.to("#partKelvin", 
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 2.5, ease: "power3.out", delay: 0.8 }
      )
      .to("#partAmp", 
        { opacity: 1, filter: "blur(0px)", scale: 1, rotation: 0, duration: 2, ease: "back.out(1.5)" }, 
        "-=1.0"
      )
      .to("#partMaria", 
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 3.5, ease: "power2.out" }, 
        "-=1.2"
      );
    }
  }, [isUnlocked]);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;
      gsap.to(bg, { x: xPos, y: yPos, duration: 2, ease: "power2.out" });
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const c = particlesRef.current;
    if (!c) return;
    
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 5 + 's';
      p.style.animationDuration = (10 + Math.random() * 15) + 's';
      const s = (1 + Math.random() * 2) + 'px';
      p.style.width = s;
      p.style.height = s;
      c.appendChild(p);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(c, { x: x, y: y, duration: 2, ease: "power2.out" });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (c) c.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const ph = [
      "Se em outra vida a gente se encontrar...",
      "Eu te amo muito demais, mozão ∞",
      "Tudo vai dar certo.",
      "10 anos e uma eternidade pela frente.",
      "Infinito e além ❤️"
    ];
    let pi = 0, ci = 0, del = false;
    const el = document.getElementById('htw');
    if (!el) return;
    
    let timeout: NodeJS.Timeout;

    function t() {
      const cur = ph[pi];
      if (!del) {
        el!.textContent = cur.substring(0, ci + 1);
        ci++;
        if (ci === cur.length) {
          timeout = setTimeout(() => { del = true; t(); }, 3000);
          return;
        }
        timeout = setTimeout(t, 70);
      } else {
        el!.textContent = cur.substring(0, ci - 1);
        ci--;
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % ph.length;
          timeout = setTimeout(t, 500);
          return;
        }
        timeout = setTimeout(t, 35);
      }
    }
    timeout = setTimeout(t, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg-container">
        <div className="hero-bg" ref={bgRef}></div>
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-particles" id="hp" ref={particlesRef}></div>
      <div className="hero-content">
        <div className="hero-badge rv">23 . 02 . 2016 — 23 . 02 . 2026</div>
        <h1 className="hero-names" id="heroTitle">
          <span className="name-part" id="partKelvin" style={{ color: '#FFF8F0', textShadow: '0 0 30px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.4)' }}>Kelvin</span>
          <span className="hero-ampersand name-part" id="partAmp">&</span>
          <span className="name-part" id="partMaria" style={{ color: '#FFF8F0', textShadow: '0 0 30px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.4)' }}>Maria Isabella</span>
        </h1>
        <p className="hero-date rv" style={{ fontSize: '16px', fontWeight: 500, color: '#fff' }}>UMA DÉCADA DE AMOR</p>
        <p className="hero-tagline rv">Dez anos atrás, dois corações se encontraram no Ibirapuera.<br />Desde então, nem a distância, nem o tempo, conseguiram nos separar.</p>
        <div className="hero-tw rv">
          <span id="htw"></span><span className="tw-cursor"></span>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

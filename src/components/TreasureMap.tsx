import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { mapHints, mapPositions } from '../data';

export default function TreasureMap({ isVisible }: { isVisible: boolean }) {
  const [currentMapStep, setCurrentMapStep] = useState(0);
  const [mapTimeLeft, setMapTimeLeft] = useState(59);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPathClear, setIsPathClear] = useState(false);
  const MAX_TIME = 59;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible && currentMapStep === 0 && !isTimerActive && !isPathClear) {
      startMapTimer();
    }
  }, [isVisible]);

  const startMapTimer = () => {
    setMapTimeLeft(MAX_TIME);
    setIsTimerActive(true);
    setIsPathClear(false);

    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setMapTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsTimerActive(false);
          setIsPathClear(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextMapHint = () => {
    if (currentMapStep >= mapHints.length - 1) return;
    
    const nextStep = currentMapStep + 1;
    setCurrentMapStep(nextStep);
    
    const pos = mapPositions[nextStep];
    const prevPos = mapPositions[currentMapStep];
    
    const tl = gsap.timeline();
    tl.to("#mapAvatar", { left: pos.x + '%', duration: 1.2, ease: "power1.inOut" }, 0);
    
    const jumpHeight = Math.min(pos.y, prevPos.y) - 35;
    tl.to("#mapAvatar", { top: jumpHeight + '%', duration: 0.6, ease: "power1.out" }, 0);
    tl.to("#mapAvatar", { top: pos.y + '%', duration: 0.6, ease: "bounce.out" }, 0.6);

    setTimeout(() => {
      confetti({ particleCount: 30, spread: 60, origin: { x: pos.x / 100, y: pos.y / 100 + 0.1 }, colors: ['#D4AF37', '#ffffff'], gravity: 1.5, ticks: 50, scalar: 0.5 });
    }, 1200);

    if (nextStep === mapHints.length - 1) {
      setTimeout(() => confetti({ particleCount: 200, spread: 120, origin: { y: 0.7 }, colors: ['#D4AF37', '#8B2252', '#ffffff'] }), 1400);
    } else {
      startMapTimer();
    }
  };

  if (!isVisible) return null;

  const progress = mapTimeLeft / MAX_TIME;
  const offset = 283 - (283 * progress);

  return (
    <section className="present-section" id="treasureMapSection" style={{ background: 'var(--bg-dark)', padding: '100px 20px', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, #1a0f2e 0%, var(--bg-dark) 80%)', pointerEvents: 'none' }}></div>
      
      <div className="container" style={{ textAlign: 'center', width: '100%', position: 'relative', zIndex: 2 }}>
        <span className="section-label" style={{ color: 'var(--gold)' }}>🗺️ Caça ao Tesouro</span>
        <h2 className="section-title" style={{ fontSize: 'clamp(28px,5vw,44px)', color: '#fff', marginBottom: '16px' }}>O Mapa do Infinito</h2>
        <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: '48px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>Siga os meus passos para encontrar o seu presente real. O tempo vai te fazer pensar direitinho antes da próxima pista!</p>

        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', aspectRatio: '2.5 / 1', minHeight: '220px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '24px', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))' }}>
            <path d="M 100,200 C 180,200 250,80 380,80 C 510,80 530,320 660,320 C 790,320 820,200 900,200" fill="none" stroke="var(--gold)" strokeWidth="5" strokeDasharray="10, 20" strokeLinecap="round" />
          </svg>

          <div style={{ position: 'absolute', left: '10%', top: '50%', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0 0 15px var(--gold)' }}></div>
          <div style={{ position: 'absolute', left: '38%', top: '20%', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0 0 15px var(--gold)' }}></div>
          <div style={{ position: 'absolute', left: '66%', top: '80%', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0 0 15px var(--gold)' }}></div>

          <div style={{ position: 'absolute', left: '90%', top: '50%', transform: 'translate(-50%,-50%)', width: '70px', height: '70px', zIndex: 1 }}>
            <img src="https://a.imagem.app/BNN7Bm.png" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 20px var(--gold))', animation: 'pulseGlow 2s infinite alternate', pointerEvents: 'none' }} />
          </div>

          <div id="mapAvatar" style={{ position: 'absolute', left: '10%', top: '50%', transform: 'translate(-50%,-50%)', width: '60px', height: '60px', borderRadius: '50%', border: '3px solid var(--gold)', background: "url('https://a.imagem.app/BNjAv1.jpeg') center/cover", zIndex: 2, boxShadow: '0 10px 25px rgba(212,175,55,0.6)', willChange: 'left, top' }}></div>
        </div>

        <div style={{ maxWidth: '550px', margin: '40px auto 0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '24px', padding: '40px 20px', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', letterSpacing: '3px', marginBottom: '12px' }}>PARADA <span id="mapStepNum">{currentMapStep + 1}</span> DE 4</div>
          <p id="mapHintText" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '32px' }} dangerouslySetInnerHTML={{ __html: mapHints[currentMapStep] }}></p>
          
          {currentMapStep < mapHints.length - 1 && (
            <>
              <div id="mapTimerContainer" style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {!isPathClear ? (
                  <>
                    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                        <circle id="timerCircle" cx="50" cy="50" r="45" fill="none" stroke="var(--gold)" strokeWidth="6" strokeDasharray="283" strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
                      </svg>
                      <div id="mapTimerCount" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 'bold', color: 'var(--gold)' }}>{mapTimeLeft}</div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>Pensando...</span>
                  </>
                ) : (
                  <>
                    <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(212,175,55,0.2)', boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}>
                      <span style={{ fontSize: '32px' }}>🔓</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>Caminho livre!</span>
                  </>
                )}
              </div>

              <button 
                id="mapNextBtn" 
                className="q-sub" 
                style={{ opacity: isPathClear ? 1 : 0.5, pointerEvents: isPathClear ? 'auto' : 'none', width: '100%', maxWidth: '300px', fontSize: '14px', padding: '16px' }} 
                disabled={!isPathClear} 
                onClick={nextMapHint}
              >
                {isPathClear ? 'Caminhar na trilha 👣' : 'Aguarde o tempo...'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

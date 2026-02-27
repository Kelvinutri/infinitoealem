import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phrase, setPhrase] = useState('');
  const [h1, setH1] = useState('');
  const [h2, setH2] = useState('');
  const [h3, setH3] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkStep = (s: number) => {
    if (s === 1) {
      if (date.trim() === '23/02/2026') {
        setStep(2);
      } else {
        setH1('<span class="lock-error">Pense no mês do amor, no ano que completa uma década 💕</span>');
      }
    } else if (s === 2) {
      if (name.trim().toLowerCase() === 'maria isabella') {
        setStep(3);
      } else {
        setH2('<span class="lock-error">É o nome mais lindo que existe... tenta de novo 💝</span>');
      }
    } else if (s === 3) {
      const v = phrase.trim().toLowerCase();
      if (v === 'te amo infinito e além' || v === 'eu te amo infinito e além') {
        unlock();
      } else {
        setH3('<span class="lock-error">Pense na nossa frase exata... ❤️</span>');
      }
    }
  };

  const unlock = () => {
    setUnlocked(true);
    const lc = document.querySelector('.lock-content');
    gsap.to(lc, { scale: 1.4, opacity: 0, duration: 0.8, ease: "power2.in" });
    gsap.to('.lock-bg, .lock-overlay', { filter: 'blur(30px)', opacity: 0, duration: 1.2, ease: "power2.inOut" });
    setTimeout(() => {
      onUnlock();
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent, s: number) => {
    if (e.key === 'Enter') checkStep(s);
  };

  if (unlocked && !containerRef.current) return null;

  return (
    <div id="lockScreen" ref={containerRef} style={{ display: unlocked ? 'none' : 'flex' }}>
      <div className="lock-bg"></div>
      <div className="lock-overlay"></div>
      <div className="lock-content">
        <img className="lock-photo" src="https://a.imagem.app/BNjAv1.jpeg" alt="Nós" />
        <div className="lock-icon">🔒</div>
        <h2 className="lock-title">Acesso Exclusivo</h2>
        <p className="lock-subtitle">Apenas quem faz parte dessa história pode entrar</p>
        
        <div className={`lock-step ${step === 1 ? 'active' : ''}`} data-step="1">
          <p className="lock-question">Qual a data em que completamos 10 anos juntos?</p>
          <input 
            className="lock-input" 
            type="text" 
            placeholder="DD/MM/AAAA" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            onKeyDown={(e) => handleKeyDown(e, 1)}
          /><br />
          <button className="lock-btn" onClick={() => checkStep(1)}>Verificar</button>
          <p className="lock-hint" dangerouslySetInnerHTML={{ __html: h1 }}></p>
        </div>
        
        <div className={`lock-step ${step === 2 ? 'active' : ''}`} data-step="2">
          <p className="lock-question">Qual o nome da mulher da minha vida?</p>
          <input 
            className="lock-input" 
            type="text" 
            placeholder="Escreva o nome..." 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            onKeyDown={(e) => handleKeyDown(e, 2)}
          /><br />
          <button className="lock-btn" onClick={() => checkStep(2)}>Verificar</button>
          <p className="lock-hint" dangerouslySetInnerHTML={{ __html: h2 }}></p>
        </div>
        
        <div className={`lock-step ${step === 3 ? 'active' : ''}`} data-step="3">
          <p className="lock-question">Qual a frase que representa nosso amor ao infinito?</p>
          <input 
            className="lock-input" 
            type="text" 
            placeholder="Eu te amo..." 
            value={phrase} 
            onChange={(e) => setPhrase(e.target.value)} 
            onKeyDown={(e) => handleKeyDown(e, 3)}
          /><br />
          <button className="lock-btn" onClick={() => checkStep(3)}>Desbloquear ❤️</button>
          <p className="lock-hint" dangerouslySetInnerHTML={{ __html: h3 }}></p>
        </div>
        
        <div className="lock-progress">
          <div className={`lock-dot ${step >= 2 ? 'filled' : ''}`}></div>
          <div className={`lock-dot ${step >= 3 ? 'filled' : ''}`}></div>
          <div className={`lock-dot ${unlocked ? 'filled' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}

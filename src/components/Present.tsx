import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Present({ isUnlocked, onShowMap }: { isUnlocked: boolean, onShowMap: () => void }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      setShowContent(true);
      setTimeout(() => {
        const infP = document.getElementById('infP');
        if (infP) infP.classList.add('anim');
      }, 1000);
      setTimeout(() => {
        const infSvg = document.getElementById('infSvg');
        if (infSvg) infSvg.classList.add('inf-heartbeat');
      }, 4000);
      setTimeout(() => {
        const pImg = document.getElementById('pImg');
        if (pImg) pImg.classList.add('show');
        const duration = 4 * 1000;
        const end = Date.now() + duration;
        (function frame() {
          confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#D4AF37', '#8B2252'] });
          confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#D4AF37', '#8B2252'] });
          if (Date.now() < end) { requestAnimationFrame(frame); }
        }());
      }, 4000);
    }
  }, [isUnlocked]);

  return (
    <section className="present-section" id="present">
      {!showContent ? (
        <div className="present-locked" id="pLocked">
          <span className="lock-big">🔒</span>
          <h3>Seção Bloqueada</h3>
          <p>Complete o Desafio do Amor acima para desbloquear seu presente...</p>
        </div>
      ) : (
        <div className="present-container" id="pC" style={{ display: 'block' }}>
          <span className="section-label" style={{ color: 'var(--gold)' }}>🎁 Seu Presente</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px,5vw,44px)' }}>Para a mulher da minha vida</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.8, fontStyle: 'italic' }}>
            Eu queria te dar o mundo, mas comecei com algo que representa o nosso mundo. Esse presente não é sobre o valor, é sobre o significado. Ele carrega o símbolo que <strong>você</strong> criou para nós, a nossa frase, a nossa promessa: <span style={{ color: 'var(--gold)' }}>"Eu te amo infinito e além"</span>. É a materialização desse sentimento que não tem fim, que vai além de tudo.
          </p>
          <svg id="infSvg" width="200" height="100" viewBox="0 0 200 100" style={{ margin: '40px auto', display: 'block', overflow: 'visible' }}>
            <path className="inf-path" id="infP" d="M 100,50 C 100,20 140,20 150,50 C 160,80 200,80 200,50 C 200,20 160,20 150,50 C 140,80 100,80 100,50 C 100,20 60,20 50,50 C 40,80 0,80 0,50 C 0,20 40,20 50,50 C 60,80 100,80 100,50 Z" />
          </svg>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--gold)', margin: '24px 0 8px' }}>Pulseira Vivara</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,.4)', letterSpacing: '2px' }}>PINGENTE DO INFINITO</p>
          <div className="present-img" id="pImg">
            <img src="https://a.imagem.app/BNN7Bm.png" alt="Pulseira Vivara" style={{ pointerEvents: 'none' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic', lineHeight: 1.8, color: 'rgba(255,255,255,.8)', marginTop: '32px' }}>
            Essa pulseira é especial. É uma coleção — cada pingente vai representar uma etapa da nossa vida juntos.<br /><br />
            O primeiro pingente é o <strong style={{ color: 'var(--gold)' }}>∞ Infinito</strong> — porque nosso amor não tem fim.<br /><br />
            <em style={{ color: 'var(--gold)' }}>A cada nova conquista, um novo pingente. Essa pulseira vai contar a história de nós dois — para sempre.</em><br /><br />
            E não esqueci do presente prometido. Pode confiar no seu mozão. ❤️∞
          </div>
          <div style={{ marginTop: '56px' }}>
            <button className="q-sub" onClick={onShowMap} style={{ fontSize: '14px', padding: '16px 48px', animation: 'surprisePulse 1.5s ease-in-out infinite' }}>
              Encontrar meu presente agora! 🗺️
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

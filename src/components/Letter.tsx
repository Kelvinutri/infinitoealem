import { useEffect, useRef } from 'react';
import { LETTER_TEXT } from '../data';

export default function Letter() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = bodyRef.current;
    if (!b) return;

    const ch = LETTER_TEXT.split('');
    b.innerHTML = ch.map(c => `<span class="lc">${c === '\n' ? '<br>' : c}</span>`).join('');

    const o = new IntersectionObserver(e => {
      e.forEach(en => {
        if (en.isIntersecting) {
          b.querySelectorAll('.lc').forEach((s, i) => setTimeout(() => s.classList.add('v'), i * 18));
          setTimeout(() => {
            if (sigRef.current) {
              sigRef.current.style.opacity = '1';
              sigRef.current.style.transition = 'opacity 1s';
            }
          }, ch.length * 18 + 500);
          o.unobserve(en.target);
        }
      });
    }, { threshold: 0.2 });
    
    o.observe(b);

    return () => o.disconnect();
  }, []);

  return (
    <section className="letter-section" id="letter">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-label rv">De Kelvin para Maria Isabella</span>
        </div>
        <div className="letter-paper rv">
          <div className="letter-header">
            <h3>Para a mulher da minha vida...</h3>
          </div>
          <div className="letter-body" id="lBody" ref={bodyRef}></div>
          <div className="letter-sig" id="lSig" ref={sigRef} style={{ opacity: 0 }}>
            Com amor infinito e além,<br />Kelvin ∞
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { QZ } from '../data';

export default function Quiz({ onComplete }: { onComplete: () => void }) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuizScore, setCurrentQuizScore] = useState(0);
  const [isQuizAnswering, setIsQuizAnswering] = useState(false);
  const [hintCount, setHintCount] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ html: string, isError: boolean } | null>(null);
  const [shake, setShake] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<{ idx: number, isOk: boolean } | null>(null);

  const qAContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = document.getElementById('quiz');
    if (!q) return;
    const o = new IntersectionObserver(e => {
      e.forEach(en => {
        if (en.isIntersecting) {
          // showPop('🎮 Hora do desafio, mozão!\n\nResponda TODAS as perguntas corretamente e desbloqueie um presente especial que preparei com todo amor pra você... 🎁✨\n\nSe errar, não passa! Mas eu deixei dicas 😏');
          o.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    o.observe(q);
    return () => o.disconnect();
  }, []);

  const selOpt = (idx: number) => {
    if (isQuizAnswering) return;
    setIsQuizAnswering(true);
    const q = QZ[currentQuizIndex];
    
    if (idx === q.c) {
      setCurrentQuizScore(prev => prev + 1);
      setSelectedOpt({ idx, isOk: true });
      setFeedback({ html: `✅ ${q.fb}`, isError: false });
      setTimeout(() => {
        setCurrentQuizIndex(prev => prev + 1);
        setIsQuizAnswering(false);
        setSelectedOpt(null);
        setFeedback(null);
        if (currentQuizIndex + 1 >= QZ.length) {
          setCompleted(true);
          onComplete();
        }
      }, 3000);
    } else {
      setSelectedOpt({ idx, isOk: false });
      const newHintCount = { ...hintCount, [currentQuizIndex]: (hintCount[currentQuizIndex] || 0) + 1 };
      setHintCount(newHintCount);
      const hIdx = Math.min(newHintCount[currentQuizIndex] - 1, q.hints.length - 1);
      setFeedback({ html: `❌ Errou! ${q.hints[hIdx]}<br><em style="color:var(--gold);font-size:12px">Tente novamente... Você precisa acertar todas! 💪</em>`, isError: true });
      setShake(true);
      setTimeout(() => {
        setIsQuizAnswering(false);
        setSelectedOpt(null);
        setShake(false);
      }, 1500);
    }
  };

  const subInp = () => {
    if (isQuizAnswering) return;
    const v = inputValue.trim().toLowerCase();
    const q = QZ[currentQuizIndex];
    setIsQuizAnswering(true);
    
    if (v.includes(q.c as string)) {
      setCurrentQuizScore(prev => prev + 1);
      setFeedback({ html: `✅ ${q.fb}`, isError: false });
      setTimeout(() => {
        setCurrentQuizIndex(prev => prev + 1);
        setIsQuizAnswering(false);
        setInputValue('');
        setFeedback(null);
        if (currentQuizIndex + 1 >= QZ.length) {
          setCompleted(true);
          onComplete();
        }
      }, 3000);
    } else {
      const newHintCount = { ...hintCount, [currentQuizIndex]: (hintCount[currentQuizIndex] || 0) + 1 };
      setHintCount(newHintCount);
      const hIdx = Math.min(newHintCount[currentQuizIndex] - 1, q.hints.length - 1);
      setFeedback({ html: `❌ ${q.hints[hIdx]}<br><em style="color:var(--gold);font-size:12px">Tente novamente!</em>`, isError: true });
      setInputValue('');
      setShake(true);
      setTimeout(() => {
        setIsQuizAnswering(false);
        setShake(false);
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      subInp();
    }
  };

  return (
    <section className="quiz-section" id="quiz">
      {!completed && (
        <div className="quiz-surprise" id="qSurprise">
          <span>🎁 Complete o desafio e desbloqueie uma surpresa especial...</span>
        </div>
      )}
      <div className="quiz-container">
        <span className="section-label" style={{ color: 'var(--gold)' }}>🎮 Desafio do Amor</span>
        <h2 className="section-title" style={{ fontSize: 'clamp(28px,5vw,44px)', marginBottom: '8px' }}>Quanto você me conhece?</h2>
        <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.5)', marginBottom: '48px' }}>Responda TUDO certo e desbloqueie o seu presente... 🎁✨</p>
        
        <div className="quiz-progress" id="qP">
          {QZ.map((_, i) => (
            <div key={i} className={`q-dot ${i < currentQuizIndex ? 'done' : ''} ${i === currentQuizIndex ? 'cur' : ''}`}></div>
          ))}
        </div>
        
        <div id="qA" ref={qAContainerRef} className={shake ? 'quiz-shake' : ''} style={{ animation: 'lockFadeIn .5s ease' }}>
          {!completed ? (
            <>
              <div className="q-num">PERGUNTA {currentQuizIndex + 1} DE {QZ.length}</div>
              <div className="q-q">{QZ[currentQuizIndex].q}</div>
              
              {QZ[currentQuizIndex].type === 'opt' ? (
                <div className="q-opts">
                  {QZ[currentQuizIndex].opts?.map((o, i) => (
                    <div 
                      key={i} 
                      className={`q-opt ${selectedOpt?.idx === i ? (selectedOpt.isOk ? 'ok' : 'no') : ''}`} 
                      onClick={() => selOpt(i)}
                    >
                      {o}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <input 
                    className="q-inp" 
                    id="qInp" 
                    placeholder="Responda aqui..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ borderColor: feedback && !feedback.isError ? '#27ae60' : (feedback && feedback.isError ? '#e74c3c' : 'rgba(255,255,255,.2)') }}
                  />
                  <button type="button" className="q-sub" onClick={subInp}>Confirmar</button>
                </div>
              )}
              
              <div className="q-fb" id="qFb" dangerouslySetInnerHTML={{ __html: feedback?.html || '' }}></div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉</div>
              <div className="q-q">Você completou o desafio!</div>
              <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: '32px' }}>Parabéns mozão, você acertou tudinho, o seu presentinho foi desbloqueado, é algo que achei que tem um significado para nós. 🎁</p>
              <button 
                className="q-sub" 
                onClick={() => {
                  const pC = document.getElementById('present');
                  if (pC) pC.scrollIntoView({ behavior: 'smooth' });
                }} 
                style={{ fontSize: '14px', padding: '16px 48px', animation: 'surprisePulse 1.5s ease-in-out infinite' }}
              >
                Abrir meu presente 🎁✨
              </button>
            </>
          )}
        </div>
        
        {!completed && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', marginTop: '24px' }} id="qS">
            Acertos: {currentQuizScore}/{currentQuizIndex}
          </div>
        )}
      </div>
    </section>
  );
}

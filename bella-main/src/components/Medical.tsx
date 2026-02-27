export default function Medical() {
  return (
    <>
      <div className="ecg-divider" style={{ background: '#FAFAFA' }}>
        <svg viewBox="0 0 300 60">
          <path className="ecg-line" d="M0,30 L60,30 L70,30 L80,10 L90,50 L100,10 L110,50 L120,30 L130,30 L200,30 L210,30 L220,10 L230,50 L240,10 L250,50 L260,30 L300,30" />
        </svg>
      </div>

      <section className="medical-section" id="medical">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label rv">Porque até o amor precisa de um diagnóstico</span>
            <h2 className="section-title rv" style={{ color: 'var(--wine)' }}>Relatório Clínico — Amor</h2>
          </div>
          <div className="med-card">
            <div className="med-hdr">
              <div className="med-hdr-left">
                <div className="med-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14l-4-4-2 6-4-8-2 6H3" />
                    <path d="M22 14h-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="med-title">Relatório Clínico - Amor</h3>
                  <p className="med-subtitle">Confidencial • Dr. Coração</p>
                </div>
              </div>
              <div className="med-hdr-right">
                <p className="med-date">DATA: 23/02/2026</p>
                <p className="med-id">ID: LOVE-10-YEARS</p>
              </div>
            </div>
            <div className="med-body">
              <div className="med-body-inner">
                <div className="med-patient-grid">
                  <div className="med-info-item">
                    <svg style={{ color: '#722F37' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <div><span className="med-info-label">PACIENTE:</span> Maria Isabella</div>
                  </div>
                  <div className="med-info-item">
                    <div><span className="med-info-label">IDADE:</span> 27 Anos</div>
                  </div>
                  <div className="med-info-item" style={{ gridColumn: '1 / -1', alignItems: 'flex-start', flexDirection: 'column', gap: '4px' }}>
                    <div><span className="med-info-label">DIAGNÓSTICO:</span></div>
                    <div className="med-badge">CID: A-M-O-R (Crônico e Incurável)</div>
                  </div>
                </div>
                <div className="med-section-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  Sinais Vitais
                </div>
                <div className="med-vitals-box">
                  <div className="med-vital-item"><span className="med-info-label">FC:</span> <span className="med-vital-red">↑ Taquicardia ao te ver</span></div>
                  <div className="med-vital-item"><span className="med-info-label">PA:</span> Estável (O amor acalma)</div>
                  <div className="med-vital-item"><span className="med-info-label">Temp:</span> <span className="med-vital-orange">Quente (Safadeza detectada)</span></div>
                  <div className="med-vital-item"><span className="med-info-label">Sat. Felicidade:</span> 100%</div>
                </div>
                <div className="med-presc-section">
                  <h4 className="med-presc-title">PRESCRIÇÃO MÉDICA</h4>
                  <div className="med-presc-text">
                    Uma vida inteira ao meu lado.<br />
                    Dose: Única e contínua.
                  </div>
                </div>
                <div className="med-footer-doc">
                  <div className="med-signature-box">
                    <div className="dust-ring"></div>
                    <div className="med-stamp-new">Aprovado<br />Dr. Coração</div>
                    <div className="med-sig-name">Dr. Coração</div>
                    <div className="med-sig-line"></div>
                    <div className="med-crm">CRM: LOVE-FOREVER</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

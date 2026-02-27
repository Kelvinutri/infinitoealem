export default function Trancoso() {
  return (
    <section className="trancoso" id="trancoso">
      <div className="trancoso-bg"></div>
      <div className="trancoso-ov"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <span className="section-label rv" style={{ color: 'var(--gold)' }}>🌴 Próximo Destino</span>
        <h2 className="section-title rv" style={{ color: '#fff', fontSize: 'clamp(32px,6vw,52px)' }}>Trancoso, Bahia</h2>
        <p className="section-subtitle rv" style={{ color: 'rgba(255,255,255,.7)', maxWidth: '550px' }}>Nosso aniversário de 10 anos será celebrado no paraíso. Pés na areia, brisa no rosto, e o som do mar como trilha sonora do nosso amor.</p>
        
        <div className="ticket-wrapper">
          <div className="env-flap" id="envFlap"></div>
          <div className="env-back"></div>
          <div className="ticket" id="goldenTicket">
            <div className="t-left">
              <div className="t-header">
                <span className="t-airline"><span style={{ fontSize: '16px' }}>✈️</span> K&M AIRLINES</span>
                <span className="t-label" style={{ color: 'var(--wine)', margin: 0 }}>VOO: AMOR-10</span>
              </div>
              <div className="t-body">
                <div className="t-col" style={{ textAlign: 'left' }}>
                  <span className="t-label">ORIGEM</span>
                  <span className="t-val-lg">GRU</span>
                  <span className="t-city">São Paulo</span>
                </div>
                <div className="t-icon-flight">✈️</div>
                <div className="t-col" style={{ textAlign: 'right' }}>
                  <span className="t-label">DESTINO</span>
                  <span className="t-val-lg" style={{ color: 'var(--wine)' }}>BPS</span>
                  <span className="t-city">Porto Seguro / BA</span>
                </div>
              </div>
              <div className="t-footer">
                <div>
                  <span className="t-label">PASSAGEIROS</span>
                  <div className="t-val">Kelvin & Isabella</div>
                </div>
                <div>
                  <span className="t-label">DATA</span>
                  <div className="t-val">23 FEV 2026</div>
                </div>
                <div>
                  <span className="t-label">CLASSE</span>
                  <div className="t-val">Amor ∞</div>
                </div>
              </div>
            </div>
            <div className="t-right">
              <div className="barcode"></div>
              <span className="t-label">BOARDING PASS</span>
              <span className="t-val" style={{ fontSize: '22px', color: 'var(--wine)', fontFamily: 'var(--font-display)', fontWeight: 700, margin: '4px 0' }}>VIP</span>
              <span className="t-label">ASSENTO</span>
              <span className="t-val-lg" style={{ fontSize: '28px' }}>01A</span>
            </div>
          </div>
          <div className="env-front"></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', margin: '40px auto 40px', maxWidth: '900px' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" alt="Trancoso" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: 'linear-gradient(transparent,rgba(0,0,0,.7))', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '13px', fontStyle: 'italic' }}>Praia do Espelho ✨</div>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" alt="Praia" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: 'linear-gradient(transparent,rgba(0,0,0,.7))', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '13px', fontStyle: 'italic' }}>Águas cristalinas 🌊</div>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" alt="Pôr do sol" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: 'linear-gradient(transparent,rgba(0,0,0,.7))', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '13px', fontStyle: 'italic' }}>Pôr do sol mágico 🌅</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="f-card rv"><div className="ic">🏖️</div><h4>Praia do Espelho</h4><p>Águas cristalinas e nós dois perdidos no horizonte.</p></div>
          <div className="f-card rv"><div className="ic">🍽️</div><h4>Jantar dia 23</h4><p>Celebração que ficará marcada pra sempre no nosso coração.</p></div>
          <div className="f-card rv"><div className="ic">🌅</div><h4>Pôr do Sol</h4><p>Assistir o sol se pôr sabendo que o melhor ainda vem.</p></div>
        </div>
      </div>
    </section>
  );
}

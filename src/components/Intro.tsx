export default function Intro() {
  return (
    <>
      <div className="ecg-divider" style={{ background: 'var(--bg-soft)' }}>
        <svg viewBox="0 0 300 60">
          <path className="ecg-line" d="M0,30 L60,30 L70,30 L80,10 L90,50 L100,10 L110,50 L120,30 L130,30 L200,30 L210,30 L220,10 L230,50 L240,10 L250,50 L260,30 L300,30" />
        </svg>
      </div>

      <section className="section section-light" id="intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text rvl">
              <span className="section-label">Nossa história</span>
              <h2>Se em outra vida a gente se encontrar, eu vou te reconhecer pelo sorriso.</h2>
              <p>Tudo começou num mundo virtual — mensagens, risadas, comentários, aproximação e um <span className="hl">"eu te amo"</span> que escapou depois de umas doses de coragem "líquida" kakaka. Mas o amor era real, tão real que atravessou a tela e fez dois corações baterem no mesmo ritmo, mesmo a <span className="hl">uma hora e vinte de distância (NO MINIMO)</span>.</p>
              <p>Quando finalmente nos encontramos no Parque Ibirapuera, o primeiro beijo veio com lábios extremamente macios e uma mordida que ficou marcada pra sempre.</p>
              <p>De Guarulhos a Diadema, de três horas no trânsito a uma vida inteira pela frente. Esse amor venceu cada quilômetro, cada madrugada de saudade. E aqui estamos — <span className="hl">dez anos depois</span>, mais fortes do que nunca.</p>
            </div>
            <div className="intro-image rvr">
              <img src="https://a.imagem.app/BNqb7b.jpeg" alt="Nós" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

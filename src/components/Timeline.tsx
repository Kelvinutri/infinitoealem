import { TL_DATA } from '../data';

export default function Timeline({ onOpenLightbox }: { onOpenLightbox: (src: string) => void }) {
  return (
    <section className="tl-section" id="timeline">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
          <span className="section-label rv">Nossa Jornada</span>
          <h2 className="section-title rv" style={{ color: '#fff' }}>Uma década de nós dois</h2>
          <p className="section-subtitle rv" style={{ color: 'rgba(255,255,255,.5)' }}>Cada marco, cada riso, cada momento que nos trouxe até aqui.</p>
        </div>
        <div className="tl" id="tlC">
          {TL_DATA.map((item, i) => (
            <div key={i} className={`tl-item ${i % 2 === 0 ? 'rvl' : 'rvr'}`}>
              <div className="tl-year">{item.year}</div>
              <div className="tl-title" style={item.gold ? { color: 'var(--gold)' } : {}}>{item.title}</div>
              <div className="tl-desc">{item.desc}</div>
              {item.img && (
                <div className="tl-img-wrapper" onClick={() => onOpenLightbox(item.img)}>
                  <img className="tl-img" src={item.img} alt="" loading="lazy" />
                  <div className="tl-img-shine"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

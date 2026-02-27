import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ALL_PHOTOS, getCaption } from '../data';

export default function Gallery({ onOpenLightbox }: { onOpenLightbox: (src: string) => void }) {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    const wrapper = wrapperRef.current;
    if (!track1 || !track2 || !wrapper) return;

    let t1 = gsap.to(track1, { xPercent: -50, ease: "none", duration: 35, repeat: -1 });
    let t2 = gsap.fromTo(track2, { xPercent: -50 }, { xPercent: 0, ease: "none", duration: 40, repeat: -1 });

    const handleMouseEnter = () => { gsap.to([t1, t2], { timeScale: 0.1, duration: 1.5, ease: "power2.out" }); };
    const handleMouseLeave = () => { gsap.to([t1, t2], { timeScale: 1, duration: 1.5, ease: "power2.inOut" }); };

    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    let itemsData: any[] = [];
    const timeout = setTimeout(() => {
      document.querySelectorAll('.dc-item').forEach(item => {
        const itemData = {
          el: item,
          left: (item as HTMLElement).offsetLeft,
          width: (item as HTMLElement).offsetWidth,
          parent: item.parentElement,
          hoverProgress: 0
        };

        item.addEventListener('mouseenter', () => gsap.to(itemData, { hoverProgress: 1, duration: 0.4, ease: "power2.out" }));
        item.addEventListener('mouseleave', () => gsap.to(itemData, { hoverProgress: 0, duration: 0.4, ease: "power2.out" }));

        itemsData.push(itemData);
      });

      const handleResize = () => {
        itemsData.forEach(data => { data.left = data.el.offsetLeft; data.width = data.el.offsetWidth; });
      };
      window.addEventListener('resize', handleResize);

      const ticker = () => {
        const centerX = window.innerWidth / 2;
        const maxDist = window.innerWidth / 1.5;
        const rect1L = track1.getBoundingClientRect().left;
        const rect2L = track2.getBoundingClientRect().left;
        itemsData.forEach(data => {
          const trackL = data.parent === track1 ? rect1L : rect2L;
          const itemCenterX = trackL + data.left + (data.width / 2);

          let dist = Math.abs(centerX - itemCenterX);
          let adjustedDist = Math.max(0, dist - 120);
          let baseProgress = Math.min(adjustedDist / maxDist, 1);
          let progress = baseProgress * (1 - data.hoverProgress);

          let scale = 1 - (progress * 0.45);
          if (data.hoverProgress > 0) {
            scale += data.hoverProgress * 0.05;
          }

          let blur = progress * 10;
          let opacity = 1 - (progress * 0.5);
          let sign = itemCenterX < centerX ? 1 : -1;
          let rotateY = progress * 55 * sign;

          gsap.set(data.el, { scale: scale, filter: `blur(${blur}px)`, opacity: opacity, rotationY: rotateY, transformPerspective: 1200 });
        });
      };
      gsap.ticker.add(ticker);

      return () => {
        window.removeEventListener('resize', handleResize);
        gsap.ticker.remove(ticker);
      };
    }, 100);

    return () => {
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
      t1.kill();
      t2.kill();
    };
  }, []);

  const items1 = ALL_PHOTOS.slice(0, 24);
  const items2 = ALL_PHOTOS.slice(24, 48);

  const renderTrack = (items: string[], startIdx: number) => {
    const arr = [...items, ...items];
    return arr.map((src, i) => (
      <div key={i} className="dc-item" onClick={() => onOpenLightbox(src)}>
        <img src={src} loading="lazy" alt="Memória" />
        <div className="dc-item-ov">{getCaption(src, startIdx + i)}</div>
      </div>
    ));
  };

  return (
    <section className="dc-section" id="gallery">
      <div className="container" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <span className="section-label rv">Nossos Momentos</span>
        <h2 className="section-title rv" style={{ color: 'var(--wine)' }}>Cilindro de Memórias</h2>
        <p className="section-subtitle rv" style={{ color: 'var(--text-soft)' }}>Nossos 10 anos girando em um loop infinito e perfeito.</p>
      </div>
      <div className="dc-wrapper" id="dcWrapper" ref={wrapperRef}>
        <div className="dc-track" id="dcTrack1" ref={track1Ref}>
          {renderTrack(items1, 0)}
        </div>
        <div className="dc-track" id="dcTrack2" ref={track2Ref}>
          {renderTrack(items2, 24)}
        </div>
      </div>
    </section>
  );
}

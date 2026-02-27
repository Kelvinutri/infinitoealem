import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CG_IMGS } from '../data';

export default function CircularGallery() {
  const [cgOpen, setCgOpen] = useState(0);
  const cgInPlaceRef = useRef(0);
  const cgBusyRef = useRef(false);
  const cgTimerRef = useRef<NodeJS.Timeout | null>(null);
  const w = 400, h = 400, gap = 10, rad = 7;
  const startX = w / 2 - (CG_IMGS.length * (rad * 2 + gap) - gap) / 2;

  const getCGPos = (id: number) => {
    return { cx: startX + id * (rad * 2 + gap), cy: h - 30, r: rad };
  };

  useEffect(() => {
    CG_IMGS.forEach((_, i) => {
      const circ = document.getElementById(`cgC_${i}`);
      const group = document.getElementById(`cgG_${i}`);
      if (!circ || !group) return;
      if (i === cgOpen) {
        gsap.set(circ, { cx: w / 2, cy: h / 2, r: w * 1.5 });
        group.setAttribute('clip-path', `url(#cgSq_${i})`);
      } else {
        const p = getCGPos(i);
        gsap.set(circ, { cx: p.cx, cy: p.cy, r: 0 });
      }
    });
    startCGAuto();
    return () => {
      if (cgTimerRef.current) clearInterval(cgTimerRef.current);
    };
  }, []);

  const animateCG = (prevI: number, nextI: number) => {
    const scale = 700;
    const bigSize = rad * scale;
    const nextCirc = document.getElementById(`cgC_${nextI}`);
    const nextGroup = document.getElementById(`cgG_${nextI}`);
    const prevCirc = document.getElementById(`cgC_${prevI}`);
    const prevGroup = document.getElementById(`cgG_${prevI}`);
    
    if (!nextCirc || !prevCirc || !nextGroup || !prevGroup) return;
    
    CG_IMGS.forEach((_, i) => {
      const layer = document.getElementById(`cgL_${i}`);
      if (layer) layer.style.zIndex = (i === nextI) ? '20' : '10';
    });
    
    nextGroup.setAttribute('clip-path', `url(#cgClip_${nextI})`);
    
    const tl = gsap.timeline({
      onComplete: () => {
        cgInPlaceRef.current = nextI;
        nextGroup.setAttribute('clip-path', `url(#cgSq_${nextI})`);
        cgBusyRef.current = false;
      }
    });
    
    tl.set(nextCirc, { cx: w / 2, cy: h / 2, r: 0 })
      .to(nextCirc, { r: bigSize, duration: 0.8, ease: "power4.inOut" });
      
    prevGroup.setAttribute('clip-path', `url(#cgClip_${prevI})`);
    gsap.set(prevCirc, { cx: w / 2, cy: h / 2, r: bigSize });
    gsap.to(prevCirc, { r: 0, duration: 0.6, delay: 0.1, ease: "power4.out" });
  };

  const setCG = (idx: number) => {
    if (cgBusyRef.current || idx === cgOpen) return;
    cgBusyRef.current = true;
    const prev = cgOpen;
    setCgOpen(idx);
    animateCG(prev, idx);
    startCGAuto();
  };

  const galleryNext = () => {
    let n = cgOpen + 1;
    if (n >= CG_IMGS.length) n = 0;
    setCG(n);
  };

  const galleryPrev = () => {
    let n = cgOpen - 1;
    if (n < 0) n = CG_IMGS.length - 1;
    setCG(n);
  };

  const startCGAuto = () => {
    if (cgTimerRef.current) clearInterval(cgTimerRef.current);
    cgTimerRef.current = setInterval(() => {
      setCgOpen(prev => {
        let n = prev + 1;
        if (n >= CG_IMGS.length) n = 0;
        if (!cgBusyRef.current) {
          cgBusyRef.current = true;
          animateCG(prev, n);
        }
        return n;
      });
    }, 4000);
  };

  return (
    <section className="section section-light" id="masonrySection" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-label rv">Cada foto, uma história</span>
          <h2 className="section-title rv" style={{ color: 'var(--wine)', fontSize: 'clamp(24px,4vw,40px)' }}>Todas as nossas fotos ❤️</h2>
          <p className="section-subtitle rv" style={{ color: 'var(--text-soft)' }}>Selecionei os melhores momentos dessa década.</p>
        </div>
        <div className="circular-gallery-container" id="circularGallery">
          <div id="cGalleryLayers">
            {CG_IMGS.map((img, i) => {
              const z = (cgInPlaceRef.current === i) ? i : CG_IMGS.length + 1;
              return (
                <div key={i} className="c-gallery-layer" style={{ zIndex: z }} id={`cgL_${i}`}>
                  <svg className="c-gallery-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <clipPath id={`cgClip_${i}`}><circle cx="0" cy="0" r="0" id={`cgC_${i}`}></circle></clipPath>
                      <clipPath id={`cgSq_${i}`}><rect width={w} height={h}></rect></clipPath>
                    </defs>
                    <g clipPath={`url(#cgClip_${i})`} id={`cgG_${i}`}>
                      <image width={w} height={h} href={img.u} preserveAspectRatio="xMidYMid slice"></image>
                    </g>
                  </svg>
                </div>
              );
            })}
            <div className="c-gallery-tab-layer">
              <svg className="c-gallery-svg" viewBox={`0 0 ${w} ${h}`}>
                {CG_IMGS.map((img, i) => {
                  const cx = startX + i * (rad * 2 + gap);
                  const cy = h - 30;
                  return (
                    <g key={`tab_${i}`}>
                      <defs><clipPath id={`tabClip_${i}`}><circle cx={cx} cy={cy} r={rad} /></clipPath></defs>
                      <image x={cx - rad} y={cy - rad} width={rad * 2} height={rad * 2} href={img.u} clipPath={`url(#tabClip_${i})`} preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.8 }} />
                      <circle className="c-tab-pointer" cx={cx} cy={cy} r={rad + 2} onClick={() => setCG(i)} />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          <div className="c-gallery-nav c-nav-prev" onClick={galleryPrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </div>
          <div className="c-gallery-nav c-nav-next" onClick={galleryNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </div>
      </div>
    </section>
  );
}

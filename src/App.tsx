import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import AudioPlayer from './components/AudioPlayer';
import LockScreen from './components/LockScreen';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Letter from './components/Letter';
import Medical from './components/Medical';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import CircularGallery from './components/CircularGallery';
import SphereGallery from './components/SphereGallery';
import Trancoso from './components/Trancoso';
import Quiz from './components/Quiz';
import Present from './components/Present';
import TreasureMap from './components/TreasureMap';
import PromiseSection from './components/PromiseSection';
import Future from './components/Future';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [popupText, setPopupText] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    const l = new Lenis({ lerp: 0.08, wheelMultiplier: 1.1, smoothWheel: true, touchMultiplier: 2 });
    l.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { l.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => {
      l.destroy();
      gsap.ticker.remove((time) => { l.raf(time * 1000); });
    };
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      setTimeout(() => {
        ScrollTrigger.batch(".rv", { onEnter: elements => { gsap.fromTo(elements, { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.6, stagger: 0.15, ease: "expo.out", overwrite: true }); }, start: "top 85%", once: true });
        ScrollTrigger.batch(".rvl", { onEnter: elements => { gsap.fromTo(elements, { opacity: 0, x: -80, rotation: -4, scale: 0.95 }, { opacity: 1, x: 0, rotation: 0, scale: 1, duration: 1.6, stagger: 0.15, ease: "expo.out", overwrite: true }); }, start: "top 85%", once: true });
        ScrollTrigger.batch(".rvr", { onEnter: elements => { gsap.fromTo(elements, { opacity: 0, x: 80, rotation: 4, scale: 0.95 }, { opacity: 1, x: 0, rotation: 0, scale: 1, duration: 1.6, stagger: 0.15, ease: "expo.out", overwrite: true }); }, start: "top 85%", once: true });
        
        gsap.utils.toArray('.rv, .rvl, .rvr').forEach((el: any) => { gsap.to(el, { y: -25, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 } }); });
        gsap.utils.toArray('.intro-image img').forEach((img: any) => { gsap.to(img, { yPercent: 15, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }); });
        
        const tBg = document.querySelector('.trancoso-bg');
        if(tBg) { gsap.to(tBg, { yPercent: 20, ease: "none", scrollTrigger: { trigger: '.trancoso', start: "top bottom", end: "bottom top", scrub: true } }); }
        
        gsap.to('.hero-bg',{scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true},y:200});
        gsap.from('.med-card',{scrollTrigger:{trigger:'.med-card',start:'top 80%'},opacity:0,x:-60,duration:1});
        
        const stampTl = gsap.timeline({ scrollTrigger:{trigger:'.med-stamp-new', start:'top 85%'} });
        stampTl.fromTo('.med-stamp-new', { scale: 15, opacity: 0, rotation: -90 }, { scale: 1, opacity: 0.8, rotation: -20, duration: 0.35, ease: 'power4.in' })
        .to('.med-card', { x: () => 10 - Math.random() * 20, y: () => 10 - Math.random() * 20, rotation: () => 1 - Math.random() * 2, duration: 0.05, yoyo: true, repeat: 6, clearProps: "all" }, "-=0.03")
        .fromTo('.dust-ring', { scale: 0.5, opacity: 1 }, { scale: 2.8, opacity: 0, duration: 0.7, ease: 'power2.out' }, "-=0.35" );
        
        const ticketTl = gsap.timeline({ scrollTrigger: { trigger: '.ticket-wrapper', start: 'top 75%' } });
        gsap.set('#envFlap', { transformPerspective: 1000, transformOrigin: 'top center' });
        ticketTl.to('#envFlap', { rotationX: 180, duration: 0.8, ease: "power2.inOut" })
                .set('#envFlap', { zIndex: 1 })
                .to('#goldenTicket', { y: -160, duration: 1.2, ease: 'back.out(1.5)', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))' }, '-=0.3');
        
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }, 1000);
    }
  }, [isUnlocked]);

  const openLightbox = (src: string) => {
    setLightboxImg(src);
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  const openPopup = (text: string) => {
    setPopupText(text);
    if (lenis) lenis.stop();
  };

  const closePopup = () => {
    setPopupText(null);
    if (lenis) lenis.start();
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  return (
    <>
      <Preloader />
      <CustomCursor />
      <AudioPlayer isUnlocked={isUnlocked} />
      
      <LockScreen onUnlock={() => setIsUnlocked(true)} />

      <div id="mainSite" style={{ display: isUnlocked ? 'block' : 'none', opacity: isUnlocked ? 1 : 0 }}>
        <Hero isUnlocked={isUnlocked} />
        <Intro />
        <Letter />
        <Medical />
        <Timeline onOpenLightbox={openLightbox} />
        <Gallery onOpenLightbox={openLightbox} />
        <CircularGallery />
        <SphereGallery onOpenLightbox={openLightbox} />
        <Trancoso />
        <Quiz onComplete={handleQuizComplete} />
        <Present isUnlocked={quizCompleted} onShowMap={handleShowMap} />
        <TreasureMap isVisible={showMap} />
        <PromiseSection />
        <Future />
        <Footer />
      </div>

      {/* Lightbox */}
      <div className={`ltbox ${lightboxImg ? 'open' : ''}`} id="ltbox" onClick={closeLightbox}>
        <span className="ltbox-close">&times;</span>
        {lightboxImg && <img id="lbImg" src={lightboxImg} alt="" />}
      </div>

      {/* Popup */}
      <div className={`pop ${popupText ? 'open' : ''}`} id="pop">
        <div className="pop-box">
          <p id="popTxt" dangerouslySetInnerHTML={{ __html: popupText || '' }}></p>
          <button className="p-btn" onClick={closePopup}>Entendi, mozão ❤️</button>
        </div>
      </div>
    </>
  );
}

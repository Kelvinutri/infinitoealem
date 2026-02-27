import { useEffect } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('customCursor');
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;
    
    let xTo = gsap.quickTo(cursor, "x", {duration: 0.15, ease: "power3"}),
        yTo = gsap.quickTo(cursor, "y", {duration: 0.15, ease: "power3"});
        
    const handleMouseMove = (e: MouseEvent) => { 
      xTo(e.clientX); 
      yTo(e.clientY); 
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    const interactives = 'a, button, input, textarea, .dc-item, .tl-img-wrapper, .q-opt, .sphere-item img, .c-gallery-nav, .c-tab-pointer, .lock-btn, .p-btn';
    
    const handleMouseOver = (e: MouseEvent) => { 
      if ((e.target as Element).closest(interactives)) cursor.classList.add('hover'); 
    };
    const handleMouseOut = (e: MouseEvent) => { 
      if ((e.target as Element).closest(interactives)) cursor.classList.remove('hover'); 
    };
    
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);
    
    const interval = setInterval(() => {
      if (!cursor.classList.contains('hover')) { 
        cursor.classList.add('infinity'); 
        setTimeout(() => cursor.classList.remove('infinity'), 2000); 
      }
    }, 10000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      clearInterval(interval);
    };
  }, []);

  return <div id="customCursor"></div>;
}

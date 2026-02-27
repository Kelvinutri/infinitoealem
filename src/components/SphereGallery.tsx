import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ALL_PHOTOS, getCaption } from '../data';

export default function SphereGallery({ onOpenLightbox }: { onOpenLightbox: (src: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<any[]>([]);
  const [rotation, setRotation] = useState({ x: 15, y: 15 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 15, y: 15 });
  const isDraggingRef = useRef(false);

  const CONFIG = {
    containerSize: 800,
    sphereRadius: 320,
    dragSensitivity: 0.8,
    momentumDecay: 0.96,
    maxRotationSpeed: 6,
    baseImageScale: 0.22,
    hoverScale: 1.3,
    perspective: 1200,
    autoRotate: true,
    autoRotateSpeed: 0.2
  };

  useEffect(() => {
    const spherePhotos = ALL_PHOTOS.slice(0, 50);
    const imageData = spherePhotos.map((url, index) => ({
      id: `img-${index}`,
      src: url,
      alt: `Memory ${index + 1}`,
      title: `Momento ${index + 1}`,
      description: getCaption(url, index)
    }));
    setImages(imageData);
  }, []);

  const calculateFibonacciSphere = useCallback((index: number, total: number) => {
    const phi = Math.acos(1 - 2 * (index + 0.5) / total);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    return { phi, theta };
  }, []);

  const getResponsiveConfig = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    return {
      ...CONFIG,
      sphereRadius: isMobile ? 180 : 320,
      baseImageScale: isMobile ? 0.35 : 0.22,
    };
  }, [CONFIG]);

  const getImageTransform = useCallback((index: number, total: number, rotX: number, rotY: number) => {
    const { phi, theta } = calculateFibonacciSphere(index, total);
    const rConfig = getResponsiveConfig();
    const r = rConfig.sphereRadius;
    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.cos(phi);
    let z = r * Math.sin(phi) * Math.sin(theta);
    const rotXRad = rotX * (Math.PI / 180);
    const rotYRad = rotY * (Math.PI / 180);
    let x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
    let z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
    x = x1; z = z1;
    let y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
    let z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
    y = y2; z = z2;
    const scale = rConfig.baseImageScale * (800 / (800 - z));
    const opacity = Math.max(0.15, Math.min(1, (z + r) / (2 * r)));
    return { x, y, z, scale, opacity, phi, theta };
  }, [calculateFibonacciSphere, getResponsiveConfig]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    setVelocity({ x: 0, y: 0 });
    velocityRef.current = { x: 0, y: 0 };
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) containerRef.current.classList.add('dragging');
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    const newRotation = {
      x: rotationRef.current.x - dy * CONFIG.dragSensitivity * 0.3,
      y: rotationRef.current.y + dx * CONFIG.dragSensitivity * 0.3
    };
    rotationRef.current = newRotation;
    setRotation(newRotation);
    velocityRef.current = {
      x: Math.max(-CONFIG.maxRotationSpeed, Math.min(CONFIG.maxRotationSpeed, -dy * CONFIG.dragSensitivity * 0.15)),
      y: Math.max(-CONFIG.maxRotationSpeed, Math.min(CONFIG.maxRotationSpeed, dx * CONFIG.dragSensitivity * 0.15))
    };
    setVelocity(velocityRef.current);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  }, [CONFIG]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
    if (containerRef.current) containerRef.current.classList.remove('dragging');
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    isDraggingRef.current = true;
    setVelocity({ x: 0, y: 0 });
    velocityRef.current = { x: 0, y: 0 };
    lastMouseRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - lastMouseRef.current.x;
    const dy = touch.clientY - lastMouseRef.current.y;
    const newRotation = {
      x: rotationRef.current.x - dy * CONFIG.dragSensitivity * 0.3,
      y: rotationRef.current.y + dx * CONFIG.dragSensitivity * 0.3
    };
    rotationRef.current = newRotation;
    setRotation(newRotation);
    velocityRef.current = {
      x: Math.max(-CONFIG.maxRotationSpeed, Math.min(CONFIG.maxRotationSpeed, -dy * CONFIG.dragSensitivity * 0.15)),
      y: Math.max(-CONFIG.maxRotationSpeed, Math.min(CONFIG.maxRotationSpeed, dx * CONFIG.dragSensitivity * 0.15))
    };
    setVelocity(velocityRef.current);
    lastMouseRef.current = { x: touch.clientX, y: touch.clientY };
  }, [CONFIG]);

  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        velocityRef.current = {
          x: velocityRef.current.x * CONFIG.momentumDecay,
          y: velocityRef.current.y * CONFIG.momentumDecay
        };
        if (CONFIG.autoRotate && Math.abs(velocityRef.current.x) < 0.3 && Math.abs(velocityRef.current.y) < 0.3) {
          velocityRef.current.y += (CONFIG.autoRotateSpeed - velocityRef.current.y) * 0.05;
        }
        const newRotation = {
          x: rotationRef.current.x + velocityRef.current.x,
          y: rotationRef.current.y + velocityRef.current.y
        };
        rotationRef.current = newRotation;
        setRotation(newRotation);
        setVelocity({ ...velocityRef.current });
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [CONFIG]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  useEffect(() => {
    const canvas = document.getElementById('galaxyCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const section = canvas.parentElement;
    if (!section) return;

    let width: number, height: number, animationFrameId: number;
    let stars: any[] = [];
    let meteors: any[] = [];

    const STAR_COUNT = window.innerWidth > 768 ? 700 : 350;
    const METEOR_COUNT = 4;

    class Star {
      x: number; y: number; radius: number; baseAlpha: number; alpha: number;
      twinkleSpeed: number; twinkleDir: number; color: string;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.2 + 0.1;
        this.baseAlpha = Math.random() * 0.8 + 0.2;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
        const colors = ['255, 255, 255', '220, 235, 255', '255, 245, 220', '255, 220, 220'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha > 1) {
          this.alpha = 1;
          this.twinkleDir = -1;
        } else if (this.alpha < this.baseAlpha * 0.2) {
          this.alpha = this.baseAlpha * 0.2;
          this.twinkleDir = 1;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    class Meteor {
      active: boolean = false;
      x: number = 0; y: number = 0; length: number = 0; speed: number = 0;
      angle: number = 0; opacity: number = 0; fadeSpeed: number = 0; color: string = '';
      spawn() {
        this.active = true;
        this.x = Math.random() * width;
        this.y = -Math.random() * 500;
        this.length = Math.random() * 120 + 60;
        this.speed = Math.random() * 15 + 15;
        this.angle = (Math.random() * (Math.PI / 6)) + (Math.PI / 4);
        this.opacity = 1;
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
        this.color = Math.random() > 0.7 ? '212, 175, 55' : '255, 255, 255';
      }
      update() {
        if (!this.active) {
          if (Math.random() < 0.008) this.spawn();
          return;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= this.fadeSpeed;

        if (this.opacity <= 0 || this.x > width + 200 || this.y > height + 200) {
          this.active = false;
        }
      }
      draw() {
        if (!this.active || !ctx) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);

        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(${this.color}, 1)`);
        gradient.addColorStop(0.1, `rgba(${this.color}, 0.8)`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, 1)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color}, 1)`;
        ctx.fill();

        ctx.restore();
      }
    }

    const init = () => {
      width = canvas.width = section.offsetWidth;
      height = canvas.height = section.offsetHeight;
      stars = [];
      meteors = [];
      for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
      for (let i = 0; i < METEOR_COUNT; i++) meteors.push(new Meteor());
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => { s.update(); s.draw(); });
      meteors.forEach(m => { m.update(); m.draw(); });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', init);
    init();
    render();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="sphere-section" id="sphereGallery">
      <canvas id="galaxyCanvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}></canvas>
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 20 }}>
        <span className="section-label" style={{ color: 'var(--gold)' }}>🌐 Universo de Memórias</span>
        <h2 className="section-title" style={{ color: '#fff' }}>Nosso mundo girando em torno de nós</h2>
        <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>Arraste para girar • Clique para ampliar</p>
      </div>
      <div id="sphereReactRoot" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div
          ref={containerRef}
          className="sphere-react-container"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            perspective: CONFIG.perspective,
            transformStyle: 'preserve-3d'
          }}
        >
          {images.map((image, index) => {
            const transform = getImageTransform(index, images.length, rotation.x, rotation.y);
            if (transform.z < -CONFIG.sphereRadius * 0.7) return null;
            return (
              <div
                key={image.id}
                className={`sphere-image-item ${activeImage === image.id ? 'active' : ''}`}
                onClick={() => onOpenLightbox(image.src)}
                onMouseEnter={() => setActiveImage(image.id)}
                onMouseLeave={() => setActiveImage(null)}
                style={{
                  width: 110,
                  height: 110,
                  transform: `translate3d(${transform.x - 55}px, ${transform.y - 55}px, ${transform.z}px) scale(${transform.scale})`,
                  opacity: transform.opacity,
                  zIndex: Math.floor(transform.z + CONFIG.sphereRadius),
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out, opacity 0.1s ease-out'
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  draggable={false}
                  loading="lazy"
                  title={image.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

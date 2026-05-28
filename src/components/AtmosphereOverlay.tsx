import { useEffect, useRef } from 'react';
import { AtmosphereSettings } from '../types';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  fadeSpeed: number;
  color: string;
  type: 'sparkle' | 'leaf';
  rotation?: number;
  rotationSpeed?: number;
  swayAmplitude?: number;
  swaySpeed?: number;
}

interface AtmosphereOverlayProps {
  settings: AtmosphereSettings;
}

export default function AtmosphereOverlay({ settings }: AtmosphereOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const maxParticles = settings.goldDust ? 70 : 0;
    const maxLeaves = settings.fallingLeaves ? 15 : 0;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const createParticle = (isInit = false): Particle => {
      const w = canvas.width;
      const h = canvas.height;
      
      const type = Math.random() > 0.85 && settings.fallingLeaves ? 'leaf' : 'sparkle';
      
      return {
        x: Math.random() * w,
        y: isInit ? Math.random() * h : -20,
        vx: (Math.random() - 0.5) * 0.4,
        vy: type === 'leaf' 
          ? 0.5 + Math.random() * 0.8 
          : 0.1 + Math.random() * 0.4,
        size: type === 'leaf' 
          ? 6 + Math.random() * 10 
          : 0.8 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.6,
        fadeSpeed: 0.002 + Math.random() * 0.005,
        color: type === 'leaf'
          ? Math.random() > 0.4
            ? '#c5a059' // Gold leaf
            : '#8c2d19' // Traditional Kyoto deep maple crimson
          : `rgba(${220 + Math.floor(Math.random() * 35)}, ${180 + Math.floor(Math.random() * 40)}, ${110 + Math.floor(Math.random() * 40)}, ${0.2 + Math.random() * 0.5})`, // Gold dust
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swayAmplitude: 0.5 + Math.random() * 1.5,
        swaySpeed: 0.01 + Math.random() * 0.02
      };
    };

    // Pre-populate particles
    const initParticlesCount = maxParticles + maxLeaves;
    for (let i = 0; i < initParticlesCount; i++) {
      particles.push(createParticle(true));
    }

    // Capture mouse positions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Draw Japanese Maple Leaf path
    const drawMapleLeaf = (ctx: CanvasRenderingContext2D, size: number) => {
      // Elegant stylized minimalist 5-pointed maple leaf
      ctx.beginPath();
      ctx.moveTo(0, -size);
      
      // Top tip to top-right tip
      ctx.lineTo(size * 0.3, -size * 0.4);
      ctx.lineTo(size * 0.9, -size * 0.6);
      
      // Top-right tip to side-right tip
      ctx.lineTo(size * 0.5, 0);
      ctx.lineTo(size * 0.8, size * 0.4);
      
      // Side-right tip to bottom base
      ctx.lineTo(size * 0.2, size * 0.3);
      ctx.lineTo(size * 0.1, size * 0.8); // Stem connection
      ctx.lineTo(0, size * 0.2); // Center
      ctx.lineTo(-size * 0.1, size * 0.8); // Stem connection
      
      // Bottom base to side-left tip
      ctx.lineTo(-size * 0.2, size * 0.3);
      ctx.lineTo(-size * 0.8, size * 0.4);
      
      // Side-left tip to top-left tip
      ctx.lineTo(-size * 0.5, 0);
      ctx.lineTo(-size * 0.9, -size * 0.6);
      
      // Top-left tip back to top tip
      ctx.lineTo(-size * 0.3, -size * 0.4);
      ctx.closePath();
      ctx.fill();
    };

    // Main animation loop
    const render = () => {
      // Ambient dark clearing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth lerp mouse position
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Filter particles based on settings toggles dynamically
      particles = particles.filter(p => {
        if (p.type === 'sparkle' && !settings.goldDust) return false;
        if (p.type === 'leaf' && !settings.fallingLeaves) return false;
        return true;
      });

      // Refill particles to match counts
      const currentSparkles = particles.filter(p => p.type === 'sparkle').length;
      const currentLeaves = particles.filter(p => p.type === 'leaf').length;

      if (settings.goldDust && currentSparkles < maxParticles) {
        particles.push(createParticle(false));
      }
      if (settings.fallingLeaves && currentLeaves < maxLeaves) {
        particles.push(createParticle(false));
      }

      particles.forEach((p, idx) => {
        // Update physics
        p.y += p.vy;
        
        if (p.type === 'leaf') {
          // Slow organic sway using sine wave
          p.x += p.vx + Math.sin(p.y * p.swaySpeed!) * p.swayAmplitude!;
          p.rotation! += p.rotationSpeed!;
        } else {
          p.x += p.vx;
          // Slowly pulsate opacity
          p.alpha += p.fadeSpeed;
          if (p.alpha > 0.8 || p.alpha < 0.15) {
            p.fadeSpeed = -p.fadeSpeed;
          }
        }

        // Mouse avoidance/attraction draft effect
        if (mouse.x > -500 && mouse.y > -500) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            const angle = Math.atan2(dy, dx);
            // Blow particles outward gently
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 0.8;
          }
        }

        // Draw
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;

        if (p.type === 'leaf') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation!);
          
          // Draw leaf structure
          drawMapleLeaf(ctx, p.size);
        } else {
          // Draw soft focal blur sparkles
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Screen boundary wrapping / respawning
        if (p.y > canvas.height + 30 || p.x < -30 || p.x > canvas.width + 30) {
          particles[idx] = createParticle(false);
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [settings.goldDust, settings.fallingLeaves]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 mix-blend-screen"
      style={{ opacity: settings.presentationMode ? 0.85 : 0.65 }}
    />
  );
}

'use client';

import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Upload, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Interactive Orb component that reacts to mouse
const InteractiveOrb = ({
  color,
  size,
  blur,
  opacity,
  animateX,
  animateY,
  duration,
  delay,
  mouseX,
  mouseY,
}: {
  color: string;
  size: string;
  blur: string;
  opacity: number;
  animateX: number[];
  animateY: number[];
  duration: number;
  delay: number;
  mouseX: any;
  mouseY: any;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (latest: number) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const orbCenterX = rect.left + rect.width / 2;
        const orbCenterY = rect.top + rect.height / 2;

        const dx = orbCenterX - latest;
        const dy = orbCenterY - mouseY.get();
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 200;

        if (distance < repelRadius && distance > 0) {
          const force = ((repelRadius - distance) / repelRadius) * 60;
          setOffset({
            x: (dx / distance) * force,
            y: (dy / distance) * force,
          });
        } else {
          setOffset({ x: 0, y: 0 });
        }
      }
    });

    return () => unsubscribeX();
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={`absolute ${size} rounded-full ${blur}`}
      style={{
        background: color,
        opacity: opacity,
      }}
      animate={{
        x: animateX.map(x => x + offset.x),
        y: animateY.map(y => y + offset.y),
      }}
      transition={{
        x: { duration, repeat: Infinity, ease: "linear", delay },
        y: { duration, repeat: Infinity, ease: "linear", delay },
      }}
    />
  );
};

// Interactive Text Component with inverse spotlight effect
const InteractiveText = ({ text, className, globalMousePos }: { text: string; className?: string; globalMousePos: { x: number; y: number } }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const newX = globalMousePos.x - rect.left;
    const newY = globalMousePos.y - rect.top;

    setLocalMousePos(prev => {
      // Only update if position actually changed
      if (Math.abs(prev.x - newX) > 1 || Math.abs(prev.y - newY) > 1) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  }, [globalMousePos.x, globalMousePos.y]);

  return (
    <span
      ref={textRef}
      className={`inline-block relative ${className || ''}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <span className="relative" style={{ display: 'inline-block', padding: '0 0.1em 0.15em 0.1em', margin: '0 -0.1em' }}>
        {/* Filled gradient text - HIDDEN in spotlight area */}
        <span
          className="relative z-0"
          style={{
            background: 'linear-gradient(150deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 60%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            WebkitMaskImage: `radial-gradient(circle 100px at ${localMousePos.x}px ${localMousePos.y}px, transparent 0%, transparent 35%, black 50%, black 100%)`,
            maskImage: `radial-gradient(circle 100px at ${localMousePos.x}px ${localMousePos.y}px, transparent 0%, transparent 35%, black 50%, black 100%)`,
          }}
        >
          {text}
        </span>

        {/* Outline text - ONLY VISIBLE in spotlight area with 3D float */}
        <span
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            color: 'transparent',
            WebkitTextStroke: '1.5px #06b6d4',
            WebkitMaskImage: `radial-gradient(circle 100px at ${localMousePos.x}px ${localMousePos.y}px, black 0%, black 35%, transparent 50%, transparent 100%)`,
            maskImage: `radial-gradient(circle 100px at ${localMousePos.x}px ${localMousePos.y}px, black 0%, black 35%, transparent 50%, transparent 100%)`,
            transform: 'translateZ(20px)',
            overflow: 'visible',
          }}
        >
          {text}
        </span>
      </span>
    </span>
  );
};

// Interactive Gradient Text with inverse spotlight effect
const InteractiveGradientText = ({ text, globalMousePos }: { text: string; globalMousePos: { x: number; y: number } }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newX = globalMousePos.x - rect.left;
    const newY = globalMousePos.y - rect.top;

    setLocalMousePos(prev => {
      if (Math.abs(prev.x - newX) > 3 || Math.abs(prev.y - newY) > 3) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  }, [globalMousePos.x, globalMousePos.y]);

  const isInSpotlight = localMousePos.x > -500 && localMousePos.y > -500;
  const maskRadius = 180;

  return (
    <span
      ref={containerRef}
      className="inline-block relative cursor-pointer text-4xl sm:text-5xl lg:text-6xl font-bold"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <span style={{
        display: 'inline-block',
        position: 'relative',
        lineHeight: '1.3',
        paddingBottom: '0.35em'
      }}>
        {/* Filled gradient text - hidden in spotlight */}
        <span
          style={{
            display: 'inline-block',
            background: 'linear-gradient(150deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 60%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            WebkitMaskImage: isInSpotlight
              ? `radial-gradient(circle ${maskRadius}px at ${localMousePos.x}px ${localMousePos.y}px, transparent 0%, transparent 20%, black 50%, black 100%)`
              : 'none',
            maskImage: isInSpotlight
              ? `radial-gradient(circle ${maskRadius}px at ${localMousePos.x}px ${localMousePos.y}px, transparent 0%, transparent 20%, black 50%, black 100%)`
              : 'none',
          }}
        >
          {text}
        </span>

        {/* Stroke outline - visible in spotlight only */}
        <span
          style={{
            display: isInSpotlight ? 'inline-block' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            WebkitTextStroke: '2px #8b5cf6',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            transform: 'translateZ(30px)',
            WebkitMaskImage: `radial-gradient(circle ${maskRadius}px at ${localMousePos.x}px ${localMousePos.y}px, black 0%, black 20%, transparent 50%, transparent 100%)`,
            maskImage: `radial-gradient(circle ${maskRadius}px at ${localMousePos.x}px ${localMousePos.y}px, black 0%, black 20%, transparent 50%, transparent 100%)`,
          }}
        >
          {text}
        </span>
      </span>
    </span>
  );
};

// Sun Rays Component - 3D animated purple-blue rays emanating from outside corner
const SunRays = React.memo(function SunRays() {
  const rays = React.useMemo(() => {
    const result = [];

    // Create 18 distinct 3D sun rays spreading from outside corner
    const rayCount = 18;
    for (let i = 0; i < rayCount; i++) {
      const angle = 125 + (i * 5.5); // Spread rays evenly
      const length = Math.random() * 1000 + 800; // 800-1800px - very long to reach into viewport
      const widthStart = Math.random() * 140 + 70; // 70-210px at base
      const depth = Math.random() * 120 + 60; // 3D depth value
      const baseOpacity = Math.random() * 0.25 + 0.15; // 0.15-0.4

      // Purple-blue variations
      const colorVariant = i % 3;
      const color = colorVariant === 0
        ? [139, 92, 246] // Purple
        : colorVariant === 1
        ? [59, 130, 246] // Blue
        : [100, 111, 246]; // Mix

      result.push({
        id: i,
        angle,
        length,
        widthStart,
        depth,
        baseOpacity,
        color,
      });
    }

    return result;
  }, []);

  return (
    <>
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute"
          style={{
            top: '-15%',
            right: '-15%',
            width: `${ray.length}px`,
            height: `${ray.widthStart}px`,
            transformOrigin: 'top left',
            transformStyle: 'preserve-3d',
            // Gradient starts bright at corner (outside), fades as it extends inward
            background: `linear-gradient(90deg,
              rgba(${ray.color[0]}, ${ray.color[1]}, ${ray.color[2]}, ${ray.baseOpacity}) 0%,
              rgba(${ray.color[0]}, ${ray.color[1]}, ${ray.color[2]}, ${ray.baseOpacity * 0.8}) 15%,
              rgba(${ray.color[0]}, ${ray.color[1]}, ${ray.color[2]}, ${ray.baseOpacity * 0.5}) 40%,
              rgba(${ray.color[0]}, ${ray.color[1]}, ${ray.color[2]}, ${ray.baseOpacity * 0.25}) 65%,
              rgba(${ray.color[0]}, ${ray.color[1]}, ${ray.color[2]}, ${ray.baseOpacity * 0.1}) 85%,
              transparent 100%
            )`,
            clipPath: `polygon(0% 50%, 100% 0%, 100% 100%)`,
            filter: 'blur(10px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            rotateZ: [ray.angle, ray.angle + 4, ray.angle - 3, ray.angle],
            scaleX: [1, 1.1, 0.92, 1],
            translateZ: [0, ray.depth * 0.4, -ray.depth * 0.25, 0],
            rotateY: [0, 3, -3, 0],
          }}
          transition={{
            duration: Math.random() * 7 + 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}
    </>
  );
});

// 3D Light Particles emanating from outside corner
const LightParticles = React.memo(function LightParticles() {
  const particles = React.useMemo(() => {
    const result = [];

    // Create 30 floating particles - positioned from outside viewport
    for (let i = 0; i < 30; i++) {
      // Start from outside the corner, spread inward
      const distanceFromCorner = Math.random() * 400 + 100; // 100-500px from corner
      const angle = Math.random() * 90 + 135; // Spread around corner area
      const size = Math.random() * 8 + 2; // 2-10px
      const depth = Math.random() * 250; // Z-depth

      // Calculate position from outside corner
      const baseX = Math.cos((angle * Math.PI) / 180) * distanceFromCorner;
      const baseY = Math.sin((angle * Math.PI) / 180) * distanceFromCorner;

      // Opacity decreases as particles move further from corner (inward)
      const distanceOpacity = Math.max(0.2, 1 - (distanceFromCorner / 500));

      result.push({
        id: i,
        x: baseX,
        y: baseY,
        size,
        depth,
        duration: Math.random() * 10 + 7,
        delay: Math.random() * 6,
        opacity: (Math.random() * 0.5 + 0.4) * distanceOpacity, // Fades inward
        isPurple: i % 2 === 0,
      });
    }

    return result;
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            top: '-10%',
            right: '-10%',
            width: particle.size,
            height: particle.size,
            background: particle.isPurple
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.9) 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)',
            borderRadius: '50%',
            boxShadow: particle.isPurple
              ? '0 0 15px rgba(139, 92, 246, 0.6)'
              : '0 0 15px rgba(59, 130, 246, 0.6)',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            x: [particle.x, particle.x + Math.random() * 60 - 30, particle.x],
            y: [particle.y, particle.y + Math.random() * 60 - 30, particle.y],
            translateZ: [0, particle.depth, -particle.depth * 0.5, 0],
            scale: [1, 1.4, 0.7, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
});

// Static Stars Component - twinkling stars in background
const StaticStars = React.memo(function StaticStars() {
  const stars = React.useMemo(() => {
    const result = [];

    // Create 100 static stars scattered across the background
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 100; // Position anywhere (0-100%)
      const y = Math.random() * 100; // Position anywhere (0-100%)
      const size = Math.random() * 2 + 0.5; // 0.5-2.5px
      const opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
      const duration = Math.random() * 3 + 2; // 2-5 seconds twinkle
      const delay = Math.random() * 5;

      result.push({
        id: i,
        x,
        y,
        size,
        opacity,
        duration,
        delay,
      });
    }

    return result;
  }, []);

  return (
    <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.5, star.opacity],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
});

// Shooting Stars Component - stars shooting from entire left side
const ShootingStars = React.memo(function ShootingStars() {
  const stars = React.useMemo(() => {
    const result = [];

    // Create 20 shooting stars with staggered timing
    for (let i = 0; i < 20; i++) {
      const startX = Math.random() * 10; // Start from left edge (0-10%)
      const startY = Math.random() * 100; // Start from entire left side height (0-100%)

      // Shoot diagonally down-right with steeper angle
      const travelX = Math.random() * 30 + 30; // Travel 30-60% to the right (reduced)
      const travelY = Math.random() * 50 + 50; // Travel 50-100% down (increased)

      const endX = startX + travelX;
      const endY = startY + travelY;

      // Calculate angle based on actual travel direction
      const angle = Math.atan2(travelY, travelX) * (180 / Math.PI);

      const length = Math.random() * 100 + 50; // Star trail length: 50-150px
      const thickness = Math.random() * 2 + 0.5; // 0.5-2.5px
      const duration = Math.random() * 2 + 1.5; // 1.5-3.5 seconds
      const delay = Math.random() * 15; // Stagger over 15 seconds

      result.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        travelX,
        travelY,
        angle,
        length,
        thickness,
        duration,
        delay,
        opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
      });
    }

    return result;
  }, []);

  return (
    <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: star.length,
            height: star.thickness,
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.7) 50%, rgba(139, 92, 246, 0.5) 75%, transparent 100%)',
            borderRadius: '50px',
            boxShadow: `0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(139, 92, 246, 0.3)`,
            transformOrigin: 'left center',
            rotate: `${star.angle}deg`, // Angle matches actual travel direction
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [`0%`, `${star.travelX * 10}px`],
            y: [`0%`, `${star.travelY * 10}px`],
            opacity: [0, star.opacity, star.opacity * 0.8, 0],
            scale: [0, 1, 1, 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: 10, // Wait 10 seconds between repeats
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
});

// Left Corner Stars Component - twinkling stars in upper left corner
const LeftCornerStars = React.memo(function LeftCornerStars() {
  const stars = React.useMemo(() => {
    const result = [];

    // Create 25 stars concentrated in upper left corner
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * 20; // 0-20% from left
      const y = Math.random() * 25; // 0-25% from top
      const size = Math.random() * 3 + 1; // 1-4px
      const opacity = Math.random() * 0.7 + 0.3; // 0.3-1.0
      const duration = Math.random() * 3 + 2; // 2-5 seconds twinkle
      const delay = Math.random() * 5;

      result.push({
        id: i,
        x,
        y,
        size,
        opacity,
        duration,
        delay,
      });
    }

    return result;
  }, []);

  return (
    <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%)',
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8), 0 0 ${star.size * 6}px rgba(139, 92, 246, 0.4)`,
          }}
          animate={{
            opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.4, star.opacity],
            scale: [0.8, 1.3, 0.7, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
});

// Floating Particles Component - clustered particles with soft organic shapes
const FloatingParticles = React.memo(function FloatingParticles() {
  const particles = React.useMemo(() => {
    const result = [];

    // 4 color options: blue, sky, pink, purple
    const colors = [
      { name: 'blue', gradient: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.4), rgba(29, 78, 216, 0.3))', shadow: 'rgba(59, 130, 246, 0.2)' },
      { name: 'sky', gradient: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.5), rgba(14, 165, 233, 0.4), rgba(2, 132, 199, 0.3))', shadow: 'rgba(6, 182, 212, 0.2)' },
      { name: 'pink', gradient: 'radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.5), rgba(219, 39, 119, 0.4), rgba(190, 24, 93, 0.3))', shadow: 'rgba(236, 72, 153, 0.2)' },
      { name: 'purple', gradient: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.5), rgba(124, 58, 237, 0.4), rgba(109, 40, 217, 0.3))', shadow: 'rgba(139, 92, 246, 0.2)' },
    ];

    // Create 8 cluster centers
    const clusters = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.5 ? 'small' : 'medium',
      particleCount: Math.random() < 0.5 ? 8 : 15,
    }));

    let id = 0;

    // Generate particles in clusters
    clusters.forEach((cluster) => {
      const clusterRadius = cluster.size === 'small' ? 5 : 10;

      for (let i = 0; i < cluster.particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * clusterRadius;
        const xMove = Math.random() * 20 - 10;
        const depth = Math.random();
        const sizeMultiplier = Math.random() * 3 + 1; // 1-4x
        const aspectRatio = Math.random() * 0.5 + 0.7; // 0.7-1.2 for organic shapes
        const color = colors[Math.floor(Math.random() * colors.length)];

        result.push({
          id: id++,
          width: (depth * 6 + 3) * sizeMultiplier, // 3-36px with variation
          height: (depth * 6 + 3) * sizeMultiplier * aspectRatio, // slightly different height
          x: cluster.x + Math.cos(angle) * distance,
          y: cluster.y + Math.sin(angle) * distance,
          xMove,
          duration: Math.random() * 40 + 30,
          delay: Math.random() * 15,
          opacity: depth * 0.2 + 0.1,
          blur: depth < 0.3 ? 3 : depth < 0.6 ? 1.5 : 0.8,
          borderRadius: `${Math.random() * 30 + 40}% ${Math.random() * 30 + 40}% ${Math.random() * 30 + 40}% ${Math.random() * 30 + 40}%`, // organic blob shape
          rotate: Math.random() * 360,
          color,
        });
      }
    });

    // Add some independent scattered particles
    for (let i = 0; i < 20; i++) {
      const xMove = Math.random() * 20 - 10;
      const depth = Math.random();
      const sizeMultiplier = Math.random() * 3 + 1;
      const aspectRatio = Math.random() * 0.5 + 0.7;
      const color = colors[Math.floor(Math.random() * colors.length)];

      result.push({
        id: id++,
        width: (depth * 6 + 3) * sizeMultiplier,
        height: (depth * 6 + 3) * sizeMultiplier * aspectRatio,
        x: Math.random() * 100,
        y: Math.random() * 100,
        xMove,
        duration: Math.random() * 40 + 30,
        delay: Math.random() * 15,
        opacity: depth * 0.2 + 0.1,
        blur: depth < 0.3 ? 3 : depth < 0.6 ? 1.5 : 0.8,
        borderRadius: `${Math.random() * 30 + 40}% ${Math.random() * 30 + 40}% ${Math.random() * 30 + 40}% ${Math.random() * 30 + 40}%`,
        rotate: Math.random() * 360,
        color,
      });
    }

    return result;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
            borderRadius: particle.borderRadius,
            rotate: particle.rotate,
            background: particle.color.gradient,
            boxShadow: `
              0 ${particle.width * 0.1}px ${particle.width * 0.3}px ${particle.color.shadow},
              inset -${particle.width * 0.1}px -${particle.width * 0.1}px ${particle.width * 0.2}px rgba(0, 0, 0, 0.2),
              inset ${particle.width * 0.05}px ${particle.width * 0.05}px ${particle.width * 0.15}px rgba(255, 255, 255, 0.3)
            `,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, particle.xMove, 0],
            z: [0, particle.width * 2, 0],
            opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity],
            rotate: [particle.rotate, particle.rotate + 180, particle.rotate + 360],
            rotateX: [0, 20, 0],
            rotateY: [0, 20, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
});

// Enhanced Drop Card - no hover effect
const EnhancedDropCard = ({ onSelectSource }: { onSelectSource?: (type: 'device' | 'drive' | 'dropbox' | 'onedrive' | 'url') => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full"
    >
      <div className="relative w-full">
        {/* Animated gradient border */}
        <motion.div
          className="absolute -inset-[1px] rounded-3xl"
          animate={{
            background: [
              'linear-gradient(150deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))',
              'linear-gradient(150deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))',
              'linear-gradient(150deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5))',
              'linear-gradient(150deg, rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))',
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div
          className="relative bg-neutral-900 backdrop-blur-xl rounded-3xl p-8 border-0"
        >
          {/* Drag & Drop Zone */}
          <div className="relative overflow-hidden rounded-2xl group">
            {/* Gradient border effect */}
            <div className="absolute -inset-[2px] bg-gradient-to-br from-cyan-500/50 via-violet-500/50 to-pink-500/50 rounded-2xl transition-all"></div>

            <div
              onClick={() => onSelectSource?.('device')}
              className="relative bg-black backdrop-blur-xl rounded-2xl px-16 py-8 text-center cursor-pointer border-2 border-dashed border-cyan-500/30 hover:border-violet-400/60 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 via-violet-600/0 to-pink-600/0 group-hover:from-cyan-600/10 group-hover:via-violet-600/8 group-hover:to-pink-600/10 transition-all duration-500 rounded-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-8 mb-6">
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 relative flex-shrink-0"
                  >
                    <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-violet-400/30">
                      <Upload className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors" />
                    </div>
                  </motion.div>

                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-violet-400 group-hover:to-pink-400 transition-all">
                      Drop your files here
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      or <span className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">choose a file</span> from your device
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <span className="text-xs text-neutral-600 font-medium uppercase tracking-widest">or import from</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Upload Source Options */}
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSource?.('drive');
                    }}
                    className="relative group/btn"
                    title="Google Drive"
                  >
                    <div className="relative flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-500/20 hover:via-violet-500/20 hover:to-pink-500/20 border border-white/20 group-hover/btn:border-violet-400/70 transition-all backdrop-blur-sm">
                      <svg className="w-7 h-7 text-neutral-500 group-hover/btn:text-violet-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                      </svg>
                      <span className="text-[11px] text-neutral-600 group-hover/btn:text-neutral-400 mt-2 font-medium">Drive</span>
                    </div>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSource?.('dropbox');
                    }}
                    className="relative group/btn"
                    title="Dropbox"
                  >
                    <div className="relative flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-500/20 hover:via-violet-500/20 hover:to-pink-500/20 border border-white/20 group-hover/btn:border-violet-400/70 transition-all backdrop-blur-sm">
                      <svg className="w-7 h-7 text-neutral-500 group-hover/btn:text-violet-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.004 2.25l-6.004 10.5h4.004v9l6.004-10.5h-4.004v-9z"/>
                      </svg>
                      <span className="text-[11px] text-neutral-600 group-hover/btn:text-neutral-400 mt-2 font-medium">Dropbox</span>
                    </div>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSource?.('onedrive');
                    }}
                    className="relative group/btn"
                    title="OneDrive"
                  >
                    <div className="relative flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-500/20 hover:via-violet-500/20 hover:to-pink-500/20 border border-white/20 group-hover/btn:border-violet-400/70 transition-all backdrop-blur-sm">
                      <svg className="w-7 h-7 text-neutral-500 group-hover/btn:text-violet-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-3H8v-2h3V9h2v3h3v2h-3v3h-2z"/>
                      </svg>
                      <span className="text-[11px] text-neutral-600 group-hover/btn:text-neutral-400 mt-2 font-medium">OneDrive</span>
                    </div>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration:0.4, delay: 0.8 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSource?.('url');
                    }}
                    className="relative group/btn"
                    title="From URL"
                  >
                    <div className="relative flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-500/20 hover:via-violet-500/20 hover:to-pink-500/20 border border-white/20 group-hover/btn:border-violet-400/70 transition-all backdrop-blur-sm">
                      <svg className="w-7 h-7 text-neutral-500 group-hover/btn:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span className="text-[11px] text-neutral-600 group-hover/btn:text-neutral-400 mt-2 font-medium">URL</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Button Component with GSAP
const EnhancedButton = ({
  children,
  primary = true,
  onClick
}: {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const shine = shineRef.current;
    if (!button || !shine) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.02,
        boxShadow: primary
          ? '0 8px 16px rgba(139, 92, 246, 0.2)'
          : '0 4px 12px rgba(255, 255, 255, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Shine effect
      gsap.fromTo(
        shine,
        { x: '-100%', opacity: 0 },
        { x: '100%', opacity: 0.8, duration: 0.6, ease: 'power2.out' }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: primary
          ? '0 4px 12px rgba(139, 92, 246, 0.15)'
          : '0 4px 12px rgba(255, 255, 255, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseDown = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
      });
    };

    const handleMouseUp = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.1,
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
    };
  }, [primary]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`group relative px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center space-x-2 overflow-hidden ${
        primary
          ? 'text-white'
          : 'text-neutral-300 border-2 border-neutral-700 hover:border-neutral-500'
      }`}
      style={
        primary
          ? {
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 70%, #ec4899 100%)',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.15)'
            }
          : {}
      }
    >
      {primary && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
          <div
            ref={shineRef}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            style={{ transform: 'translateX(-100%)' }}
          />
        </>
      )}
      <div className="relative z-10 flex items-center space-x-2">
        {children}
      </div>
    </button>
  );
};

interface HeroProps {
  onSelectSource?: (type: 'device' | 'drive' | 'dropbox' | 'onedrive' | 'url') => void;
}

export default function Hero({ onSelectSource }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [globalMousePos, setGlobalMousePos] = useState({ x: -1000, y: -1000 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Throttle state updates to every 32ms (~30fps) for smoother, less reactive feel
      if (now - lastUpdateRef.current > 32) {
        lastUpdateRef.current = now;
        setGlobalMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden">
      {/* Glass-like Background with Grid */}
      <div className="absolute inset-0 min-h-full bg-gradient-to-b from-neutral-950 via-black to-neutral-950 pointer-events-none z-0" />

      {/* Purple-blue light source from top-right corner fading to black - Hidden on mobile */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block" style={{ overflow: 'hidden', perspective: '1200px', transformStyle: 'preserve-3d' }}>
          {/* Simple purple-blue light radiating from corner point */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 100% 0%, rgba(139, 92, 246, 0.5) 0%, rgba(59, 130, 246, 0.35) 20%, rgba(139, 92, 246, 0.2) 40%, rgba(59, 130, 246, 0.1) 60%, transparent 80%)',
            }}
            animate={{
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* 3D animated sun rays - emanating from corner */}
          <SunRays />

          {/* 3D floating light particles */}
          <LightParticles />
        </div>
      )}

      {/* Static Twinkling Stars */}
      {mounted && <StaticStars />}

      {/* Shooting Stars */}
      {mounted && <ShootingStars />}

      {/* Left Corner Stars */}
      {mounted && <LeftCornerStars />}

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />


      {/* Content - Two column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-16 lg:gap-12">

          {/* Left side - Text content */}
          <div className="text-center lg:text-left flex-shrink-0 lg:max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-neutral-300">
                200+ formats supported
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight"
            >
              <span className="text-white block mb-2">Transform any file</span>
              <InteractiveGradientText text="in seconds" globalMousePos={globalMousePos} />
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed text-neutral-400"
            >
              Drop your files and watch the magic happen. Fast, secure, and completely free. No signup required.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <EnhancedButton primary={true}>
                <Upload className="w-5 h-5" />
                <span>Start Converting</span>
                <ArrowRight className="w-5 h-5" />
              </EnhancedButton>

              <EnhancedButton primary={false}>
                <span>See How It Works</span>
              </EnhancedButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-neutral-500"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No signup needed
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100% free
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Secure
              </span>
            </motion.div>
          </div>

          {/* Right side - Drop Card */}
          <div className="flex-1 w-full lg:max-w-lg">
            <EnhancedDropCard onSelectSource={onSelectSource} />
          </div>
        </div>
      </div>

      {/* Stats - Bottom center horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-8 left-0 right-0 hidden md:flex flex-row items-center justify-center gap-12 z-20"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">10M+</div>
          <div className="text-sm text-neutral-400">Files Converted</div>
        </div>
        <div className="w-px h-12 bg-neutral-700" />
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">200+</div>
          <div className="text-sm text-neutral-400">File Formats</div>
        </div>
        <div className="w-px h-12 bg-neutral-700" />
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">4.9★</div>
          <div className="text-sm text-neutral-400">User Rating</div>
        </div>
      </motion.div>

    </section>
  );
}

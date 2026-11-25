import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

/**
 * 1. ScrollScrubHero
 * 300vh sticky viewport container with scroll-driven zoom, crossfading narrative stages,
 * and live engineering telemetry HUD — preserving 100% of Hi-Tech Construction's exact hero data & buttons.
 */
export function ScrollScrubHero({ brandColor = '#117072', onExploreProjects, onAskAi }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) {
          setProgress(0);
          return;
        }
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / scrollable));
        setProgress(p);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 3 narrative stages across 0 -> 1 scroll progress
  const stage1Opacity = progress < 0.36 ? 1 : Math.max(0, 1 - (progress - 0.36) / 0.1);
  const stage1Y = progress < 0.36 ? 0 : -28 * ((progress - 0.36) / 0.1);

  const stage2Opacity =
    progress < 0.32
      ? 0
      : progress < 0.44
      ? (progress - 0.32) / 0.12
      : progress < 0.68
      ? 1
      : Math.max(0, 1 - (progress - 0.68) / 0.1);
  const stage2Y =
    progress < 0.44
      ? 28 * (1 - (progress - 0.32) / 0.12)
      : progress > 0.68
      ? -28 * ((progress - 0.68) / 0.1)
      : 0;

  const stage3Opacity = progress < 0.66 ? 0 : Math.min(1, (progress - 0.66) / 0.14);
  const stage3Y = progress < 0.66 ? 28 * (1 - (progress - 0.66) / 0.14) : 0;

  // Dynamic image scale & depth parallax
  const imgScale = 1.02 + progress * 0.16;
  const imgTranslateY = -progress * 32;

  // Live telemetry values scrubbed with scroll
  const projectsCount = Math.round(progress * 48);
  const yearsCount = Math.round(progress * 30);
  const croreCount = Math.round(progress * 85);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[270vh] bg-slate-950"
      aria-label="Hero Showcase"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden bg-slate-900 flex items-center">
        {/* Background Media Layer with Scroll Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/water pipe.jpg"
            alt="Hi-Tech Site"
            style={{
              transform: `scale(${imgScale}) translate3d(0, ${imgTranslateY}px, 0)`,
            }}
            className="w-full h-full object-cover will-change-transform transition-transform duration-75 ease-out"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/70 to-slate-950/30"
            style={{ opacity: 0.85 + progress * 0.12 }}
          />
          {/* Subtle architectural blueprint grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>

        {/* Stage Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          {/* STAGE 1 (0% -> 38%): Exact Primary Hero */}
          <div
            style={{
              opacity: stage1Opacity,
              transform: `translate3d(0, ${stage1Y}px, 0)`,
              pointerEvents: stage1Opacity > 0.25 ? 'auto' : 'none',
            }}
            className="max-w-3xl transition-opacity duration-150 will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-[0.25em] text-teal-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Est. 1996 • Government Infrastructure Systems
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight md:leading-[0.92] tracking-tighter uppercase italic">
              Shaping <span style={{ color: brandColor }}>Sustainable</span> Infrastructure for{' '}
              <span style={{ color: brandColor }}>Tomorrow</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 font-medium max-w-xl leading-relaxed">
              To be recognized as a leading government contractor delivering infrastructure that strengthens communities and supports sustainable development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExploreProjects}
                className="text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all hover:shadow-2xl"
                style={{ backgroundColor: brandColor }}
              >
                Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
              </button>

              <button
                onClick={onAskAi}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white/20 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" /> Ask AI Expert
              </button>
            </div>
          </div>

          {/* STAGE 2 (38% -> 70%): Right-Aligned Execution & Scale Callout */}
          <div
            style={{
              opacity: stage2Opacity,
              transform: `translate3d(0, ${stage2Y}px, 0)`,
              pointerEvents: stage2Opacity > 0.25 ? 'auto' : 'none',
            }}
            className="absolute inset-x-6 max-w-7xl mx-auto flex justify-end will-change-transform"
          >
            <div className="max-w-xl text-right bg-slate-950/65 backdrop-blur-md p-8 md:p-10 border-r-4 border-[#117072] rounded-l-sm">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-teal-400 mb-3">
                02 // PRECISION EXECUTION
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tighter leading-[0.95] mb-4">
                30+ Years of <span style={{ color: brandColor }}>Proven Delivery.</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                48+ completed government infrastructure projects worth ₹85+ Crore executed across Gujarat, Madhya Pradesh, and Uttar Pradesh with zero major safety incidents.
              </p>
            </div>
          </div>

          {/* STAGE 3 (70% -> 100%): Centered Vision 2040 Callout */}
          <div
            style={{
              opacity: stage3Opacity,
              transform: `translate3d(0, ${stage3Y}px, 0)`,
              pointerEvents: stage3Opacity > 0.25 ? 'auto' : 'none',
            }}
            className="absolute inset-x-6 max-w-4xl mx-auto text-center will-change-transform"
          >
            <p className="text-xs font-black uppercase tracking-[0.35em] text-teal-300 mb-4">
              03 // VISION 2040 TRAJECTORY
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.95] mb-6">
              Building Infrastructure That <span style={{ color: brandColor }}>Shapes Tomorrow</span>
            </h2>
            <p className="text-slate-200 text-base md:text-xl max-w-2xl mx-auto mb-8 font-medium">
              Scaling toward a ₹5,600 Cr infrastructure enterprise by 2040 with simplified, technology-driven public works.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onExploreProjects}
                className="text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest flex items-center justify-center hover:brightness-110 transition-all shadow-xl"
                style={{ backgroundColor: brandColor }}
              >
                Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Live Telemetry HUD Bar (VELA-style) */}
        <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/15 bg-slate-950/75 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-6 sm:gap-10 font-mono text-xs">
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400">
                  TRACK RECORD
                </span>
                <span className="font-bold text-sm sm:text-base text-teal-400">
                  {projectsCount}+ PROJECTS
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400">
                  EXPERIENCE
                </span>
                <span className="font-bold text-sm sm:text-base">
                  {yearsCount}+ YEARS
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400">
                  EXECUTED VALUE
                </span>
                <span className="font-bold text-sm sm:text-base">
                  ₹{croreCount}+ CRORE
                </span>
              </div>
              <div className="hidden md:block">
                <span className="block text-[9px] uppercase tracking-widest text-slate-400">
                  SAFETY RECORD
                </span>
                <span className="font-bold text-sm sm:text-base text-emerald-400">
                  0 LTI
                </span>
              </div>
            </div>

            {/* Scroll Progress Gauge */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hidden sm:inline">
                {progress < 0.95 ? 'Scroll to Explore' : 'Continue Below'}
              </span>
              <div className="w-24 sm:w-32 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#117072] transition-all duration-75"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. ScrollReveal
 * Smooth intersection-triggered entrance wrapper for cards, sections, and grid items.
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform =
    direction === 'up'
      ? 'translate3d(0, 28px, 0)'
      : direction === 'left'
      ? 'translate3d(-28px, 0, 0)'
      : direction === 'right'
      ? 'translate3d(28px, 0, 0)'
      : 'scale(0.96)';

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0) scale(1)' : initialTransform,
        transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

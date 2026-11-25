import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    year: "01",
    title: "Early Foundations",
    description:
      "Born and raised in Gujarat in a middle-class farmer family, he developed strong values and determination to build his own business.",
  },
  {
    year: "02",
    title: "Entry into Construction Industry",
    description:
      "Started as a site assistant, gaining practical knowledge in labour management, material coordination, and project execution.",
  },
  {
    year: "03",
    title: "Industry Learning Phase",
    description:
      "Studied government tender systems and project processes. Faced rejection but persisted.",
  },
  {
    year: "04",
    title: "1996 – First Government Contract",
    description:
      "Awarded first contract from Rajkot Municipal Corporation. Delivered successfully with quality and transparency.",
  },
  {
    year: "05",
    title: "Company Expansion",
    description:
      "Hi-Tech Construction expanded into roads, drainage, water supply, and civic infrastructure across multiple states.",
  },
  {
    year: "06",
    title: "Leadership & Team Building",
    description:
      "Built a skilled team and established a strong reputation for ethical and timely project completion.",
  },
  {
    year: "07",
    title: "Today",
    description:
      "Recognized as a reliable government contractor with a long-term growth vision.",
  },
];

export default function FounderTimeline() {
  const [visibleItems, setVisibleItems] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.index;
            setVisibleItems((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll-drawn trajectory line & glowing orb tracker
  useEffect(() => {
    let rafId = null;
    const updateLine = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.65;
        const traveled = triggerPoint - rect.top;
        const ratio = Math.max(0, Math.min(1, traveled / Math.max(1, rect.height)));
        setScrollProgress(ratio);
      });
    };

    window.addEventListener("scroll", updateLine, { passive: true });
    updateLine();
    return () => {
      window.removeEventListener("scroll", updateLine);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#117072] mb-3">
            MILESTONES & LEGACY
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Founder Journey
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Static Base Track Line */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-slate-200 -translate-x-1/2 hidden md:block"></div>

          {/* Scroll-Drawn Active Trajectory Line */}
          <div
            style={{ height: `${scrollProgress * 100}%` }}
            className="absolute left-1/2 top-0 w-[3px] bg-gradient-to-b from-[#117072] via-teal-500 to-cyan-400 -translate-x-1/2 hidden md:block transition-all duration-75 ease-out rounded-full"
          ></div>

          {/* Glowing Leading Pulse Orb along Trajectory */}
          <div
            style={{ top: `${scrollProgress * 100}%` }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_20px_6px_rgba(17,112,114,0.75)] z-20 pointer-events-none transition-all duration-75 ease-out"
          ></div>

          {timelineData.map((item, index) => {
            const isVisible = visibleItems.includes(index.toString());
            const isLeft = index % 2 === 0;
            const nodeThreshold = index / Math.max(1, timelineData.length - 1);
            const isReached = scrollProgress >= nodeThreshold - 0.04;

            return (
              <div
                key={index}
                data-index={index}
                ref={(el) => (refs.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                } mb-8 md:-mb-4`}
              >
                <div
                  className={`w-full md:w-1/2 px-6 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-x-0 scale-100"
                      : isLeft
                      ? "opacity-0 -translate-x-12 scale-95"
                      : "opacity-0 translate-x-12 scale-95"
                  }`}
                >
                  <div
                    className={`bg-slate-900 text-white p-8 rounded-2xl shadow-xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                      isReached ? "border-[#117072]/80 shadow-teal-950/20" : "border-slate-800"
                    }`}
                  >
                    <span className="text-m text-[#117072] font-bold tracking-wider">
                      {item.year}
                    </span>

                    <h3 className="text-xl font-black mt-2 mb-4">
                      {item.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node Dot with Scroll Activation Glow */}
                <div
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-md z-10 transition-all duration-500 ${
                    isReached
                      ? "bg-[#117072] scale-125 shadow-[0_0_16px_rgba(17,112,114,0.85)]"
                      : "bg-slate-300 scale-100"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.dataset.index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
        
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-16 text-center tracking-tight">
        Founder Journey
        </h2>

        <div className="relative">
        
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-slate-300 -translate-x-1/2 hidden md:block"></div>

        {timelineData.map((item, index) => {
            const isVisible = visibleItems.includes(index.toString());
            const isLeft = index % 2 === 0;

            return (
            <div
                key={index}
                data-index={index}
                ref={(el) => (refs.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-center ${
                isLeft ? "md:justify-start" : "md:justify-end"
                } -mb-4`}
            >
                <div
                // className={`w-full md:w-1/2 px-6 transition-all duration-700 ${
                //     isVisible
                //     ? "opacity-100 translate-y-0"
                //     : "pacity-0 transloate-y-12"
                // }`}
                className={`w-full md:w-1/2 px-6 transition-all duration-700 ease-out ${
                isVisible
                    ? "opacity-100 translate-x-0"
                    : isLeft
                    ? "opacity-0 -translate-x-12"
                    : "opacity-0 translate-x-12"
                }`}
                >
                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800 hover:shadow-2xl transition-all duration-300">
                    
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

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#117072] rounded-full border-4 border-white shadow-md"></div>

            </div>
            );
        })}
        </div>
    </div>
    </section>
  );

}

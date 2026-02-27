import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  HardHat, 
  ShieldCheck, 
  Gavel, 
  Users, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink,
  Menu,
  X,
  FileText,
  Award,
  Globe,
  Cpu,
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
  Zap,
  Target,
  History,
  Briefcase,
  Eye,
  Landmark,
  ChartNoAxesCombined,
  PackageSearch,
  Waves,
  WavesLadder,
  TrafficCone,
  Construction,
  Pickaxe,
  ShieldUser,
  Timer,
  Handshake,
  Cog,
  Earth
} from 'lucide-react';
import './web design.css';
import logo from './assets/Logo (Light).png';
import FounderTimeline from './FounderTimeline';

const apiKey = ""; // Managed by environment

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Custom Brand Color: #117072
  const brandColor = "#117072";

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentPage]);

  // --- Gemini API Logic ---
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [activeInsight, setActiveInsight] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Welcome to the Hi-Tech Intelligence Portal. How can I assist with your infrastructure requirements today?' }
  ]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, aiLoading]);

  const callGemini = async (prompt, type = 'general') => {
    setAiLoading(true);
    let retries = 0;
    const maxRetries = 5;
    
    let systemPrompt = "You are the Hi-Tech Construction AI Consultant. Professional, technical, and concise.";
    
    if (type === 'analysis') {
      systemPrompt = "You are a Government Bid Specialist for Hi-Tech Construction. Analyze the project solicitation and provide a 3-bullet point feasibility summary focusing on compliance, technical complexity, and strategic alignment.";
    } else if (type === 'insight') {
      systemPrompt = "You are a Technical Engineering Specialist. Explain the following construction technology or method in simple yet professional terms for a government stakeholder. Focus on ROI and durability.";
    }

    while (retries < maxRetries) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (type === 'analysis' || type === 'insight') {
          setAiResponse(text);
        } else {
          setChatHistory(prev => [...prev, { role: 'ai', text }]);
        }
        setAiLoading(false);
        return;
      } catch (err) {
        retries++;
        const delay = Math.pow(2, retries) * 500;
        await new Promise(res => setTimeout(res, delay));
      }
    }
    setAiLoading(false);
    const errorMsg = "Service temporarily unavailable. Please contact the Hi-Tech Engineering team.";
    if (type !== 'general') setAiResponse(errorMsg);
    else setChatHistory(prev => [...prev, { role: 'ai', text: errorMsg }]);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const msg = userInput;
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setUserInput("");
    callGemini(msg);
  };

  // --- UI Components ---

  const Navbar = () => (
   // <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm w-full">
    // <nav className="bg-white border-b border-slate-200 fixed top-0 left-0 w-full z-50 shadow-sm">
    <nav className="bg-white border-b border-slate-200 fixed top-0 left-0 w-full z-50 shadow-sm">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setCurrentPage('home')}>
           {/* style={{ backgroundColor: brandColor }} */}
            <div className="p-1.5 rounded-lg text-white" >
              {/* <Cpu className="h-6 w-6 md:h-7 md:w-7" /> */}
              <img 
                src={logo} 
                alt="Hi-Tech Construction Logo" 
                className="h-16 w-auto rounded-lg object-contain"
              />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 uppercase italic">
                Hi-Tech<span style={{ color: brandColor }}> Construction</span>
              </span>
              <p className="hidden xs:block text-[8px] md:text-[9px] tracking-[0.2em] text-slate-500 font-bold uppercase">Government Infrastructure Systems</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
            {['home', 'projects', 'services', 'about'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`transition-all duration-300 h-10 px-4 inline-flex items-center justify-center border-2 rounded-md text-xs font-bold uppercase tracking-widest ${currentPage === page ? 'border-[#117072]' : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-[#55f0f2]'}`}
                style={{ color: currentPage === page ? brandColor : '' }}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setIsAiOpen(true)}
              className="flex items-center gap-2 text-white px-4 py-2.5 rounded-sm shadow-lg hover:brightness-110 transition-all active:scale-95 whitespace-nowrap"
              style={{ backgroundColor: brandColor }}
            >
              <Sparkles className="h-4 w-4" /> AI Consultant
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300 overflow-hidden">
          <div className="flex flex-col p-4 space-y-4 text-sm font-bold uppercase tracking-widest">
            {['home', 'projects', 'services', 'about'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-left py-2 border-l-4 pl-3 ${currentPage === page ? 'border-[#117072] bg-slate-50' : 'border-transparent text-slate-500'}`}
                style={{ color: currentPage === page ? brandColor : '' }}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => { setIsAiOpen(true); setIsMenuOpen(false); }}
              className="flex items-center justify-center gap-2 text-white px-4 py-3 rounded-sm shadow-lg w-full"
              style={{ backgroundColor: brandColor }}
            >
              <Sparkles className="h-4 w-4" /> AI Consultant
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-1.5 rounded text-white" style={{ backgroundColor: brandColor }}>
              <Cpu className="h-5 w-5" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase italic">Hi-Tech</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            To be recognized as a leading government contractor delivering infrastructure that strengthens communities and supports sustainable development.
          </p>
        </div>
        <div>
          <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Navigation</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('home')}>Home</li>
            <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('projects')}>Projects</li>
            <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('services')}>Services</li>
            <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('about')}>About</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Compliance</h4>
          <ul className="space-y-3 text-sm">
            <li>• PWD Registered</li>
            <li>• MSME Certified</li>
            <li>• Zero LTI Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Headquarters</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 shrink-0 mt-1" style={{ color: brandColor }} /> 
              <span>Rajkot, Gujarat, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-4 w-4 shrink-0" style={{ color: brandColor }} /> 
              <span>1-800-HITECH</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );

  function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
      if (!start) return;

      let startValue = 0;
      const increment = target / (duration / 16);
      let animationFrame;

      const updateCounter = () => {
        startValue += increment;

        if (startValue >= target) {
          setCount(target);
          cancelAnimationFrame(animationFrame);
        } else {
          setCount(Math.floor(startValue));
          animationFrame = requestAnimationFrame(updateCounter);
        }
      };

      animationFrame = requestAnimationFrame(updateCounter);

      return () => cancelAnimationFrame(animationFrame);
    }, [start, target, duration]);

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    );
  }
  const HomePage = () => (
    <div className="animate-in fade-in duration-700 w-full overflow-hidden">
     {/*} <section className="relative min-h-[500px] md:h-[650px] flex items-center bg-slate-900"> */}
     {/* <section className="relative w-full min-h-screen flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" 
            alt="Hi-Tech Site" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 z-10 w-full py-16 md:py-0">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight md:leading-[0.9] tracking-tighter uppercase italic">
              Building the <span style={{ color: brandColor }}>Next Era</span> of Governance
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 font-medium max-w-xl leading-relaxed">
              Precision-engineered infrastructure solutions powered by artificial intelligence and BIM Level 3 modeling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('projects')}
                className="text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest flex items-center justify-center transition-all hover:shadow-2xl"
                style={{ backgroundColor: brandColor }}
              >
                Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsAiOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" /> Ask AI Expert
              </button>
            </div>
          </div>
        </div>
      </section>  */}
      <section className="relative w-full min-h-screen flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            // src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80" 
            src = '/water pipe.jpg'
            alt="Hi-Tech Site" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight md:leading-[0.9] tracking-tighter uppercase italic">
              Shaping <span style={{ color: brandColor }}>Sustainable</span> Infrastructure for <span style={{ color: brandColor }}>Tomorrow</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 font-medium max-w-xl leading-relaxed">
              To be recognized as a leading government contractor delivering infrastructure that strengthens communities and supports sustainable development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('projects')}
                className="text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest flex items-center justify-centerhover:shadow-lg hover:-translate-y-1 transition-all hover:shadow-2xl"
                style={{ backgroundColor: brandColor }}
              >
                Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
              </button>

              <button 
                onClick={() => setIsAiOpen(true)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white/20 hover:shadow-lg hover:-translate-y-1  transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" /> Ask AI Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20 border-b border-slate-100 w-full">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
              { label: 'Projects Completed', value: 48, suffix: '+' },
              { label: 'Years Experience', value: 30, suffix: '+' },
              { label: 'Projects Executed', value: 85, prefix: '₹', suffix: '+ Crore' },
              { label: 'Major Safety Incidents', value: 0, suffix: '' }
            ].map((stat, i) => (
              <div key={i} className="border-l-2 pl-4 md:pl-8 border-slate-100">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-1 tracking-tighter">
                  {stat.prefix && stat.prefix}
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
          ))}
        </div>
      </section>

      {/* Mission Part */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 w-full">
         <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2x1 md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-12">
            Our Mission
          </h2>

          <div className="bg-gradient-to-l from-teal-800 to-slate-900 border-4 md:border-8 border-white shadow-1x2 overflow-hidden relative rounded-sm">
            
            {/* Subtle Background Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <Target className="h-56 w-56 md:h-72 md:w-72 text-white animate-pulse" />
            </div>

            <div className="relative z-10 p-8 md:p-14 text-left">
              <p className="text-white text-[8px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-8 text-center">
                CORE OBJECTIVES
              </p>

              <ul className="space-y-5 md:space-y-6 max-w-4xl mx-auto">
                
                <li className="flex items-start gap-4">
                  <span className="text-[#117072] font-black text-lg">▸</span>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Deliver quality projects within defined timelines and approved budgets.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-[#117072] font-black text-lg">▸</span>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Maintain transparency, trust, and long-term partnerships with government authorities.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-[#117072] font-black text-lg">▸</span>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Continuously upgrade technology and adopt best practices in infrastructure development.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-[#117072] font-black text-lg">▸</span>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Uphold the highest standards of integrity, safety, and regulatory compliance.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-[#117072] font-black text-lg">▸</span>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Leverage modern equipment, skilled manpower, and efficient project management systems.
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-[#117072] font-black text-lg">▸</span>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Build sustainable and cost-effective infrastructure that benefits society at large.
                  </p>
                </li>

              </ul>
            </div>
          </div>
          </div>
        </section>   

        {/* Vision Section */}
        <section className="py-20 md:py-28 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">

            {/* Section Label */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
                Our Vision
              </h2>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                Building Infrastructure That <span style={{ color: brandColor }}>Shapes Tomorrow</span>
              </h2>
            </div>

            {/* Subtitle */}
            <div className="text-center mb-10">
              <p className="text-lg md:text-2xl font-semibold text-slate-700 max-w-4xl mx-auto">
                To become a ₹5,600 Cr infrastructure enterprise by 2040, delivering simplified,
                technology-driven solutions with operational excellence and sustainable impact.
              </p>
            </div>

            {/* Accent Line */}
            <div className="w-24 h-[2px] mx-auto mb-14" style={{ backgroundColor: brandColor }}></div>

            {/* Vision Description */}
            <div className="max-w-4xl mx-auto text-slate-600 text-sm md:text-lg leading-relaxed space-y-8">

              <p>
                We envision establishing a landmark corporate headquarters that reflects our scale,
                capability, and long-term commitment to infrastructure leadership.
              </p>

              <p>
                Our organization will grow into a high-performance team of over 500 skilled
                professionals aligned with a culture of accountability, innovation, and execution excellence.
              </p>

              <p>
                We will integrate advanced technologies and modern sewage and environmental management systems
                to ensure sustainable, compliant, and future-ready infrastructure solutions.
              </p>

              <p>
                A strategic public listing targeted by 2032 will strengthen our capital foundation
                and accelerate expansion into larger and more complex development sectors.
              </p>

              <p>
                HI-Tech will evolve into a recognized and trusted brand within the infrastructure industry,
                supported by strong governance, consistent delivery, and measurable impact.
              </p>

              <p>
                We will establish a structured training academy to institutionalize leadership development,
                technical upskilling, and continuous professional growth across all levels of the organization.
              </p>

              <p>
                Employee welfare will remain central to our growth strategy through comprehensive health coverage,
                structured skill development, performance-linked incentives, and long-term financial security frameworks.
              </p>

              <p>
                We will institutionalize an annual Vision & Excellence Forum to recognize achievement,
                reinforce company values, and strengthen organizational culture.
              </p>

              <p>
                Our long-term expansion will include airport, hospital, and other large-scale public
                infrastructure projects, strengthening our presence in high-impact development sectors.
              </p>

            </div>

          </div>
        </section>

        {/*Timeline */ }
        <section>
            <FounderTimeline/>  
        </section>   
    </div>
  );

  const projects = [
    {
      id: "water",
      title: "Water Supply Project",
      location: "Rajkot, Gujarat",
      Category: "Water Supply",
      description:
        "Executed underground water supply pipeline installation including trench excavation, DI/HDPE pipe laying, valve chamber construction, hydro testing, and commissioning across key service zones in Rajkot, Gujarat, ensuring improved water pressure and distribution efficiency.",
      images: ["/Water.jpg", "Rajkot/RJJK Work.jpeg", "Rajkot/RJJK Work1.jpeg", "Rajkot/RJJK Work2.jpeg", "Rajkot/RJJK Work3.jpeg", "Rajkot/RJJK Work4.jpeg", "Rajkot/RJJK Work5.jpeg", "Rajkot/RJK(mid).jpeg", "Rajkot/RJK(mid)1.jpeg", "Rajkot/RJK(Comp).jpeg", "Rajkot/RJK(Comp)1.jpeg", "Rajkot/RJK(Comp)2.jpeg", "Rajkot/RJK(Comp)3.jpeg", "Rajkot/RJK(Comp)4.jpeg"]
    },
    {
      id: "sewage",
      title: "Sewage System Project",
      location: "Ujjain, MP",
      Category: "Sewage System",
      description:
        "Execution of an underground sewage collection network including RCC NP3 pipeline installation, manhole construction, and precise gradient alignment for efficient wastewater flow. The system was integrated with the municipal drainage network and connected to the Sewage Treatment Plant (STP).Work was carried out in active urban zones with controlled excavation, dewatering management, and complete surface restoration, in compliance with municipal engineering standards and quality protocols.",
      images: ["/sewer.jpg", "Ujjain/UJN(STR)1.jpeg", "Ujjain/UJN(WRK).jpeg",  "Ujjain/UJN(WRK)2.jpeg", "Ujjain/UJN(WRK)3.jpeg", "Ujjain/UJN(WRK)5.jpeg", "Ujjain/UJN(WRK)6.jpeg", "Ujjain/UJN(CMP)1.jpeg", "Ujjain/UJN(WRK)1.jpeg", "Ujjain/UJN(WRK)7.jpeg", "Ujjain/UJN(WRK)8.jpeg",
               "Ujjain/UJN(CMP)2.jpeg", "Ujjain/UJN(CMP)3.jpeg"]
    }
  ];

  // const ProjectsPage = () => (
  //   <div className="animate-in slide-in-from-bottom-4 duration-500 bg-white min-h-screen w-full overflow-hidden">
  //     <div className="py-16 md:py-24 max-w-7xl mx-auto px-4">
  //       <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-12">Mission Critical Portfolio</h1>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
  //         {[
  //           { title: "Water Supply", agency: "Rajkot, Gujarat", img: "Water.jpg" },
  //           { title: "Sewage System", agency: "Ujjain, MP", img: "/sewer.jpg" }
  //         ].map((proj, i) => (
  //           <div key={i} className="relative overflow-hidden aspect-video group cursor-pointer rounded-sm shadow-sm">
  //             <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
  //             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
  //             <div className="absolute bottom-6 left-6 pr-6">
  //               <p className="text-white text-[10px] font-bold uppercase tracking-widest opacity-70">{proj.agency}</p>
  //               <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">{proj.title}</h3>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  const ProjectsPage = ({ setSelectedProject, setCurrentPage }) => (
    <div className="bg-white min-h-screen">
      <div className="py-16 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-black mb-12">
          Mission Critical Portfolio
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setSelectedProject(proj);
                setCurrentPage("projectDetails");
              }}
              className="relative overflow-hidden aspect-video group cursor-pointer rounded-sm shadow-sm"
            >
              <img
                src={proj.images[0]}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs uppercase tracking-widest opacity-70">
                  {proj.location}
                </p>
                <h3 className="text-2xl font-bold uppercase italic">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProjectDetailsPage = ({ project, setCurrentPage }) => {
    if (!project) return null;

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <div className="bg-white min-h-screen animate-in slide-in-from-bottom-4 duration-500">

        {/* HERO SECTION */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            className="w-full h-full object-cover transition-transform duration-75 will-change-transform"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-12 left-8 md:left-16 text-white max-w-3xl">
            <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
              {project.location}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">
              {project.title}
            </h1>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">

          {/* Back Button */}
          <button
            onClick={() => setCurrentPage("projects")}
            className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-12 hover:opacity-60 transition"
          >
            ← Back to Projects
          </button>

          {/* Description */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">

            <div className="md:col-span-2">
              <h2 className="text-2xl font-black uppercase italic mb-6">
                Scope of Work
              </h2>

              <p className="text-slate-600 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            <div className="border-l pl-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-500">
                Project Info
              </h3>

              <p className="text-sm mb-2">
                <span className="font-semibold">Location:</span> {project.location}
              </p>

              <p className="text-sm">
                <span className="font-semibold">Category:</span> {project.Category}
              </p>
            </div>

          </div>

          {/* GALLERY SECTION */}
          <div>
            <h2 className="text-2xl font-black uppercase italic mb-10">
              Work Gallery
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.images.slice(1).map((img, index) => (
                <div key={index} className="overflow-hidden group">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-72 object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  const ServicesPage = () => {
    const [solicitation, setSolicitation] = useState("");
    
    const services = [
      {
        id: 'Water',
        title: "Water Supply & Pipe Laying",
        icon: <Waves className="h-6 w-6" />,
        desc: "We execute water supply and pipeline projects with accuracy and durability, ensuring efficient distribution systems that serve communities reliably.",
        aiPrompt: "Explain the standard procedures and quality standards involved in urban water supply pipe laying projects."
      },
      {
        id: 'Sewerage',
        title: "Sewerage Systems",
        icon: <WavesLadder className="h-6 w-6" />,
        desc: "We develop and maintain structured sewer networks that support sanitation, environmental safety, and long-term urban sustainability.",
        aiPrompt: "Describe the execution process and compliance standards for urban sewerage system projects."
      },
      {
        id: 'Road',
        title: "CC Road Construction",
        icon: <TrafficCone className="h-6 w-6" />,
        desc: "We construct durable cement concrete roads designed for strength, load capacity, and long service life under demanding conditions.",
        aiPrompt: "Describe the technical execution and quality standards followed in CC road construction projects."
      },
      {
        id: 'Civil',
        title: "Civil Works",
        icon: <Construction className="h-6 w-6" />,
        desc: "From foundations to structural development, we deliver comprehensive civil construction services with strict quality and compliance standards.",
        aiPrompt: "Describe the execution standards and quality assurance processes in civil works projects."
      },
      {
        id: 'Labour',
        title: "Labour Supply",
        icon: <Pickaxe className="h-6 w-6" />,
        desc: "We provide skilled and semi-skilled workforce support to ensure smooth project execution and operational efficiency.",
        aiPrompt: "Describe the professional workforce management practices in construction labour supply services."
      }  
    ];

    const getInsight = (prompt, id) => {
      setActiveInsight(id);
      setAiResponse("");
      callGemini(prompt, 'insight');
    };
    
    return (
      <div className="bg-slate-50 min-h-screen w-full">
        {/* Header Section */}
        <div className="bg-slate-900 py-16 md:py-24 px-4 text-center border-b-8 border-[#117072] w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Core Capabilities</h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-medium text-sm md:text-base px-4">Providing the technical backbone for national stability and municipal growth.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-16">
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {services.map((service) => (
                  <div key={service.id} className="bg-white p-6 md:p-8 shadow-sm border border-slate-200 group hover:border-[#117072] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm">
                    <div className="p-3 bg-slate-50 rounded w-fit mb-6 text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase italic mb-4">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                    <button 
                      onClick={() => getInsight(service.aiPrompt, service.id)}
                      className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
                      style={{ color: brandColor }}
                    >
                      <Sparkles className="h-3 w-3" /> Get Tech Insight
                    </button>
                  </div>
                ))}
              </div>

              {/* AI Analysis Tool */}
              <div className="bg-slate-900 p-6 md:p-10 text-white shadow-2xl relative rounded-sm">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="h-24 w-24 md:h-32 md:w-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-4 text-white">✨ Strategic Bid Analyzer</h3>
                  <p className="text-slate-400 text-xs md:text-sm mb-8 leading-relaxed">
                    Paste your project solicitation or RFP technical requirements below. Our Gemini-powered engine will provide a feasibility assessment based on FAR standards.
                  </p>
                  <textarea 
                    className="w-full h-40 bg-slate-800 p-4 md:p-6 text-sm text-white border border-slate-700 outline-none focus:border-[#117072] transition-colors rounded-sm" 
                    placeholder="Enter solicitation text..."
                    value={solicitation}
                    onChange={(e) => setSolicitation(e.target.value)}
                  />
                  <button 
                    onClick={() => { setActiveInsight('bid'); callGemini(solicitation, 'analysis'); }}
                    disabled={!solicitation || aiLoading}
                    className="mt-6 w-full sm:w-auto px-10 py-4 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] transition-transform rounded-sm"
                    style={{ backgroundColor: brandColor }}
                  >
                    {aiLoading && activeInsight === 'bid' ? <Loader2 className="animate-spin h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                    Analyze Strategic Alignment
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 self-start">
              <div className="lg:sticky lg:top-[120px] space-y-6 h-fit">
                <div className="bg-white p-6 md:p-8 border border-slate-200 shadow-xl rounded-sm">
                  <h3 className="text-base md:text-lg font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 shrink-0" style={{ color: brandColor }} /> AI Output
                  </h3>
                  
                  {aiLoading && activeInsight !== 'bid' ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-4">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">Processing...</p>
                    </div>
                  ) : aiResponse ? (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="text-xs md:text-sm leading-relaxed text-slate-700 whitespace-pre-wrap font-medium bg-slate-50 p-4 md:p-6 border-l-4 border-[#117072]">
                        {aiResponse}
                      </div>
                      <button 
                        onClick={() => { setAiResponse(""); setActiveInsight(null); }}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
                      >
                        Clear Results
                      </button>
                    </div>
                  ) : (
                    <div className="py-8 text-center border-2 border-dashed border-slate-100 px-6 rounded-sm">
                      <AlertCircle className="h-8 w-8 text-slate-100 mx-auto mb-4" />
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Select a Service Insight to begin</p>
                    </div>
                  )}
                </div>

                <div className="bg-[#117072] p-6 md:p-8 text-white rounded-sm shadow-lg">
                  <h4 className="font-black uppercase italic mb-4 text-sm md:text-base">Contracting Hotline</h4>
                  <p className="text-[10px] md:text-xs text-white/80 leading-relaxed mb-6">Connect directly with our GSA/FAR compliance officers for priority inquiries.</p>
                  <button className="w-full bg-white text-[#117072] py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors rounded-sm">
                    Request Secure Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AboutPage = () => {
    const values = [
      //{ icon: <Target className="h-6 w-6" />, title: "Quality & Excellence", desc: "We deliver strong, high-standard workmanship that lasts." },
      { icon: <Timer className="h-6 w-6" />, title: "Speed & Agility", desc: "We provide solution every step of, Turning ideas into action efficiently, Adapting quickly to change and uncertainty, We provide solutions with Fast Execution, Thinking beyond fixed patterns and traditional approaches." },
      //{ icon: <Eye className="h-6 w-6" />, title: "Transparency", desc: "We act honestly and communicate openly in every project." },
      { icon: <ShieldUser className="h-6 w-6" />, title: "Respect & Responsibility", desc: "Treating everyone with fairness and empathy, Active listening, Delivering commitments on time, Being proactive instead of reactive." },
      //{ icon: <ShieldCheck className="h-6 w-6" />, title: "Safety", desc: "We maintain strict safety standards at every site." },
      { icon: <Handshake className="h-6 w-6" />, title: "Client Value", desc: "Delivering excellence in every interaction, services, Building relationships, not transactions, Putting client needs, goals, and success at the center of every decision." },
      { icon: <Cog className="h-6 w-6" />, title: "Constant Learning & Hard Work", desc: "Believing abilities can be developed through effort and learning, Regularly upgrading professional and personal capabilities, Maintaining consistency in effort and execution, Prioritizing outcomes over excuses." },
      { icon: <Earth className="h-6 w-6" />, title: "Vasudhaiva Kutumbakam", desc: "Understanding and valuing others' perspectives. Working together for mutual growth, We grow together because we belong together." },
    ];

    return (
      <div className="animate-in slide-in-from-bottom-4 duration-500 bg-white w-full">
        {/* About Hero */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -top-10 -left-10 w-24 md:w-40 h-24 md:h-40 bg-slate-50 -z-10 rounded-full"></div>
            <img 
              src="/Building.jpg" 
              className="relative shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 rounded-sm w-full" 
              alt="Engineering Team" 
            />
            <div className="absolute -bottom-6 -right-6 bg-[#117072] p-6 md:p-8 text-white shadow-xl max-w-[150px] md:max-w-[200px]">
              <span className="text-3xl md:text-4xl font-black block">30+</span>
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-80">Years of Federal Service</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-8 leading-tight">
              The Hi-Tech <span style={{ color: brandColor }}>Story</span>
            </h2>
            <p className="text-slate-800 leading-relaxed mb-6 text-lg md:text-xl font-semibold">
              Hi-Tech Construction is a trusted name in government contractirig, delivering high-quality infrastructure and civil engineering works since 1996. Founded by Mr. Chandubhai Patel with a vision to contribute to public development, the company began its journey with its first contract from Rajkot Municipal Corporation. Over the years, we have grown into a reputed contractor, known for timely execution, superior workmanship, and adherence to government standards.
            </p>
            <p className="text-slate-750 leading-relaxed mb-6 text-base md:text-lg font-medium">
              We specialize in a wide range of projects, including road construction, water supply pipelines, drainage networks, building works, and civil infrastructure. With a strong foundation in technical expertise and a commitment to quality, Hi-Tech Construction has successfully completed numerous projects for municipal corporations, government departments, and public sector undertakings across Gujarat, Madhya Pradesh, Uttar Pradesh.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6 text-sm md:text-base font-medium">
              Our team consists of experienced engineers, skilled supervisors, and a dedicated workforce who ensure that every project is executed with precision, safety, and sustainability. Backed by modern equipment and robust project management practices, we are capable of handling projects of varying scale and complexity.
            </p>
            {/* <p className="text-slate-500 leading-relaxed mb-10 text-sm">
              Today, we are a leading Class-A contractor for the U.S. Federal Government and various State DOTs. We don't just build roads and buildings; we build the digital and physical networks that keep societies functioning.
            </p> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-8">
              <div>
                <h4 className="font-black text-slate-900 uppercase text-[10px] mb-1">Founder</h4>
                <p className="text-sm italic font-bold text-[#117072]">Mr. Chandubhai Patel</p>
              </div>
              
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-8">
              <div>
                <h4 className="font-black text-slate-900 uppercase text-[10px] mb-1">CEO</h4>
                <p className="text-sm italic font-bold text-[#117072]">Mr. Jaykumar Patel</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase text-[10px] mb-1">CFO</h4>
                <p className="text-sm italic font-bold text-[#117072]">Mr. Mitesh Patel</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase text-[10px] mb-1">Project Director</h4>
                <p className="text-sm italic font-bold text-[#117072]">Mr. Vishwas Jaiswal</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase text-[10px] mb-1">Technical Head</h4>
                <p className="text-sm italic font-bold text-[#117072]">Mr. Shubham Jaiswal</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-slate-50 py-16 md:py-24 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Our Operational DNA</h2>
              <div className="w-16 h-1 bg-[#117072] mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {values.map((v, i) => (
                <div key={i} className="bg-white p-6 md:p-8 border-b-4 border-transparent hover:border-[#117072] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm group text-center rounded-sm">
                  <div className="mb-6 p-4 bg-slate-50 rounded-full w-fit mx-auto group-hover:bg-[#117072] group-hover:text-white transition-colors" >
                    {v.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-black text-slate-900 uppercase italic mb-3 tracking-tight">{v.title}</h3>
                  <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed font-medium">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments & Objectives */}        
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 text-center w-full">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-14 text-center">
            Departments & Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-6 group">
              <div className="p-4 bg-slate-800 rounded-md text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-all h-fit">
                <Building2 className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-white text-lg md:text-xl font-black uppercase italic mb-3 tracking-tight">
                  Project / Operations Department
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ensure timely and cost-effective execution of government works while maintaining high-quality standards and strict contract compliance.
                </p>
              </div>
            </div>

            {/* Engineering / Technical Department */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-6 group">
              <div className="p-4 bg-slate-800 rounded-md text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-all h-fit">
                <Cpu className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-white text-lg md:text-xl font-black uppercase italic mb-3 tracking-tight">
                  Engineering / Technical Department
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Provide technical expertise for project planning, design, and execution ensuring innovation, efficiency, safety, and quality standards.
                </p>
              </div>
            </div>

            {/* Safety & Compliance Department */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-6 group">
              <div className="p-4 bg-slate-800 rounded-md text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-all h-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-white text-lg md:text-xl font-black uppercase italic mb-3 tracking-tight">
                  Safety & Compliance Department
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enforce workplace and site safety protocols, conduct risk assessments, and ensure compliance with legal and regulatory standards.
                </p>
              </div>
            </div>

            {/* Business Development / Bidding Department */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-6 group">
              <div className="p-4 bg-slate-800 rounded-md text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-all h-fit">
                <ChartNoAxesCombined className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-white text-lg md:text-xl font-black uppercase italic mb-3 tracking-tight">
                  Business Development / Bidding Department
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Identify and secure government contracts by preparing competitive bids, building strong stakeholder relationships, and promoting company growth.
                </p>
              </div>
            </div>

            {/* Finance/Accounts Department */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-6 group">
              <div className="p-4 bg-slate-800 rounded-md text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-all h-fit">
                <Landmark className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-white text-lg md:text-xl font-black uppercase italic mb-3 tracking-tight">
                  Finance/Accounts Department
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Manage budgets, financial planning, and project accounting while ensuring compliance with government financial regulations and audits.
                </p>
              </div>
            </div>

            {/* Human Resources & Administration Department */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-6 group">
              <div className="p-4 bg-slate-800 rounded-md text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-all h-fit">
                <Users className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-white text-lg md:text-xl font-black uppercase italic mb-3 tracking-tight">
                  Human Resources & Administration Department
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Recruit, train, and retain skilled manpower, maintain employee welfare, labor compliance, and ensure smooth administrative operations.
                </p>
              </div>
            </div>
         
            {/* Procurement/ Materials Department */}
            <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-6 group">
              <div className="p-4 bg-slate-800 rounded-md text-[#117072] group-hover:bg-[#117072] group-hover:text-white transition-all h-fit">
                <PackageSearch className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-white text-lg md:text-xl font-black uppercase italic mb-3 tracking-tight">
                  Procurement/ Materials Department
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Source high-quality materials, machinery, and services at optimal costs to support project schedules and maintain vendor relationships.
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* Global Compliance Map Placeholder */}
        {/* <section className="bg-slate-50 py-16 md:py-24 max-w-7xl mx-auto px-4 text-center w-full"> */}
        <section className="bg-slate-50 py-16 md:py-24 w-full">
         <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-12">Authorized Operational Zones</h2>
          <div className="bg-slate-900 aspect-square sm:aspect-video md:aspect-[21/9] flex items-center justify-center text-slate-500 border-4 md:border-8 border-white shadow-2xl overflow-hidden relative group rounded-sm">
            <Globe className="h-40 w-40 md:h-64 md:w-64 opacity-10 absolute animate-pulse" />
            <div className="relative z-10 p-6 md:p-10">
              <p className="text-white text-[8px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-4">GOV REGISTERED</p>
              <h3 className="text-2xl md:text-4xl text-[#117072] font-black uppercase italic tracking-widest mb-4">All India Division</h3>
              <p className="text-slate-400 max-w-lg mx-auto text-[10px] md:text-sm">Full operational authority in all 28 states, plus territories. Export control compliant for select allied international projects.</p>
            </div>
          </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-200 w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full pt-20">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'projects' && (
              <ProjectsPage
                setSelectedProject={setSelectedProject}
                setCurrentPage={setCurrentPage}
              />
            )}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'about' && <AboutPage />}
         {currentPage === 'projectDetails' && (
              <ProjectDetailsPage
                project={selectedProject}
                setCurrentPage={setCurrentPage}
              />
            )}
      </main>
      <Footer />

      {/* --- AI Chat Overlay --- */}
      {isAiOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:justify-end p-0 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full sm:max-w-lg bg-white shadow-2xl h-full sm:h-[600px] flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-right duration-300 sm:rounded-sm overflow-hidden">
            <div className="p-4 md:p-6 text-white flex justify-between items-center shrink-0" style={{ backgroundColor: brandColor }}>
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
                <div>
                  <h3 className="text-sm md:text-base font-black uppercase italic tracking-tighter">AI Portal</h3>
                  <p className="text-[8px] md:text-[9px] opacity-70 font-bold uppercase">v2.5 Consultant</p>
                </div>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 md:p-4 text-xs md:text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#117072] text-white rounded-l-lg rounded-tr-lg shadow-md' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-r-lg rounded-tl-lg shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && activeInsight === null && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-4 rounded-r-lg rounded-tl-lg shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 border-t border-slate-200 bg-white flex gap-2 shrink-0">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about compliance..." 
                className="flex-grow p-3 text-sm bg-slate-50 border border-slate-200 focus:border-[#117072] outline-none rounded-sm"
              />
              <button 
                type="submit" 
                className="p-3 text-white transition-all active:scale-90 rounded-sm"
                style={{ backgroundColor: brandColor }}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

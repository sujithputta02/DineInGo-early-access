"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Play, Users, Building2, HelpCircle, ChevronDown, Instagram, Twitter, Linkedin, Globe, Zap, ShieldCheck, Search, Calendar, Bell, Star, Layers, Theater, X, BarChart3 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import WaitlistModal from "../components/WaitlistModal";
import ReferralDashboard from "../components/ReferralDashboard";

// --- Components ---

const doodles = [
  { src: "/images/cakedodle.png", className: "top-[12%] left-[10%]", depth: 0.1, delay: 0.2 },
  { src: "/images/eventdodle.png", className: "top-[18%] right-[15%]", depth: 0.15, delay: 0.4 },
  { src: "/images/hotdogdodle.png", className: "bottom-[35%] left-[5%]", depth: 0.12, delay: 0.3 },
  { src: "/images/meatdodle.png", className: "bottom-[25%] right-[10%]", depth: 0.08, delay: 0.5 },
  { src: "/images/nooddodle.png", className: "top-[42%] left-[15%]", depth: 0.2, delay: 0.6 },
  { src: "/images/pioanododle.png", className: "top-[5%] left-[50%] -translate-x-1/2", depth: 0.05, delay: 0.7 },
  { src: "/images/tabledodle.png", className: "bottom-[50%] right-[5%]", depth: 0.18, delay: 0.8 },
  { src: "/images/teacrosdod.png", className: "bottom-[10%] left-[25%]", depth: 0.14, delay: 0.9 },
];

const faqs = [
  {
    question: "How does 3D booking work?",
    answer: "Our 3D floor plan technology allows you to walk through a digital twin of the venue. You can select the exact table you want—whether it's by the window, in a quiet corner, or near the stage."
  },
  {
    question: "What is AR Menu visualization?",
    answer: "Simply point your phone at the menu or table, and our AR technology renders 3D models of the dishes. You can see portion sizes, ingredients, and nutritional data before you order."
  },
  {
    question: "How does the AI Dietary Assistant help?",
    answer: "Our AI analyzes your dietary profile (allergies, preferences, health goals) and cross-references it with live restaurant ingredients to highlight safe and optimized options just for you."
  },
  {
    question: "For businesses: What is the Revenue Shield?",
    answer: "Revenue Shield protects your margins against no-shows. It uses smart deposit logic and automated reminders to ensure your prime seating is always occupied by committed guests."
  },
  {
    question: "Can I use DineInGo for large corporate events?",
    answer: "Absolutely. Our Event Seating Designer allows organizers to manage complex seating charts, delegate table assignments, and track registrations in real-time."
  }
];

const WaveDivider = ({ fill = "#00f29d", flip = false }: { fill?: string; flip?: boolean }) => (
  <div className={`absolute left-0 w-full leading-[0] z-20 ${flip ? "top-[-1px] rotate-180" : "bottom-[-1px]"}`}>
    <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
      {/* Secondary Wave for Depth */}
      <motion.path
        fill={fill}
        fillOpacity="0.3"
        initial={{ d: "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" }}
        animate={{
          d: [
            "M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
            "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
            "M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      {/* Primary Wave */}
      <motion.path
        fill={fill}
        fillOpacity="1"
        initial={{ d: "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" }}
        animate={{
          d: [
            "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
            "M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
            "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

const ScrapbookDoodle = ({ src, className, depth = 1 }: { src: string, className: string, depth?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.5, 1.1, 1.1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [100 * depth, -100 * depth]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.4, 0.4, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["6px", "0px", "0px", "6px"]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, rotate, opacity, filter: `blur(${blur})` }}
      className={`absolute w-16 md:w-24 h-auto mix-blend-multiply pointer-events-none z-10 ${className}`}
    >
      <Image src={src} alt="Doodle" width={100} height={100} className="object-contain grayscale" />
    </motion.div>
  );
};

const InfiniteMarquee = ({ images, speed = 40, direction = "left" }: { images: string[], speed?: number, direction?: "left" | "right" }) => {
  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="flex w-fit items-center gap-12 group">
        <motion.div
          animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12"
        >
          {[...images, ...images].map((src, i) => (
            <div key={i} className="relative w-[85vw] md:w-[600px] h-[48vw] md:h-[340px] rounded-[24px] md:rounded-[32px] overflow-hidden border-4 md:border-8 border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-500 bg-white">
              <Image src={src} alt={`UI Screenshot ${i}`} fill className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const SectionReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.section>
);

const FeatureCard = ({ icon: Icon, title, desc, color = "emerald" }: { icon: any, title: string, desc: string, color?: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white p-10 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-premium-black/5 space-y-6"
  >
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${color === "emerald" ? "bg-emerald-50 text-emerald-500" : color === "gold" ? "bg-orange-50 text-orange-500" : "bg-teal-50 text-teal-500"}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div className="space-y-2">
      <h4 className="text-2xl font-black text-premium-black">{title}</h4>
      <p className="text-premium-black/50 font-medium leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-premium-black/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-8 text-left group"
      >
        <span className="text-2xl font-black text-premium-black group-hover:text-[#00F29D] transition-colors">{question}</span>
        <div className={`w-10 h-10 rounded-full bg-premium-black/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-emerald-50 text-emerald-500" : ""}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-premium-black/60 text-lg leading-relaxed max-w-2xl font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DinoChatPreview = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 100, scale: 0.8 }}
    className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden"
  >
    <div className="bg-emerald-500 p-4 flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl p-1.5 overflow-hidden">
          <Image src="/images/Dino Icon.svg" alt="Dino" width={40} height={40} className="object-contain" />
        </div>
        <div>
          <h3 className="font-black text-sm">Dino Assistant</h3>
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-none">The Stomping Chef</p>
        </div>
      </div>
      <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
        <X size={18} />
      </button>
    </div>
    <div className="p-6 space-y-4 bg-emerald-50/30">
      <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-emerald-50">
        <p className="text-sm font-medium text-premium-black leading-relaxed">
          "Rawr! I'm currently in training for the V1.0 launch. Join the Early Access and I'll be your personal feast-finding partner! 🦖🍴"
        </p>
      </div>
      <div className="flex justify-end">
        <div className="bg-emerald-500 text-white px-4 py-2 rounded-2xl rounded-br-none text-sm font-bold">
          See you soon, Dino! 👣
        </div>
      </div>
    </div>
    <div className="p-4 bg-white border-t border-emerald-50">
      <div className="w-full h-10 bg-emerald-50 rounded-xl flex items-center px-4">
        <span className="text-xs text-emerald-300 font-bold">V1.0 Exclusive Activity...</span>
      </div>
    </div>
  </motion.div>
);

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative">
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isDinoActive, setIsDinoActive] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [statsReferralCode, setStatsReferralCode] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex flex-col items-center overflow-x-hidden bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal/10 blur-[120px] animate-mesh" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold/10 blur-[120px] animate-mesh [animation-delay:-5s]" />
        </div>

        <ScrapbookDoodle src="/images/cakedodle.png" className="top-[10%] left-[5%]" depth={1.5} />
        <ScrapbookDoodle src="/images/eventdodle.png" className="top-[15%] right-[10%]" depth={0.8} />
        <ScrapbookDoodle src="/images/pioanododle.png" className="top-[5%] left-[45%]" depth={0.5} />
        <ScrapbookDoodle src="/images/hotdogdodle.png" className="bottom-[15%] left-[10%]" depth={1.2} />
        <ScrapbookDoodle src="/images/meatdodle.png" className="bottom-[20%] right-[15%]" depth={1.1} />
        <ScrapbookDoodle src="/images/guiterdodle.png" className="bottom-[40%] left-[20%]" depth={0.7} />
        <ScrapbookDoodle src="/images/tabledodle.png" className="bottom-[35%] right-[25%]" depth={0.9} />

        <motion.div
          className="z-10 flex flex-col items-center text-center px-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ x: useTransform(springX, (v) => v * 15), y: useTransform(springY, (v) => v * 15) }}
        >
          <motion.div
            className="mb-10 flex flex-col items-center"
            initial={{ filter: "blur(40px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center select-none group mb-4">
              <h1 className="font-black flex items-center m-0 leading-none" style={{ fontSize: "clamp(3rem, 15vw, 6.5rem)", letterSpacing: "0.02em", textShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                <span className="text-premium-black tracking-tight">D</span>
                <span className="text-premium-black relative inline-block">
                  i
                  <span
                    className="absolute bg-red-500 rounded-full"
                    style={{
                      top: "0.05em",
                      left: "44.5%",
                      transform: "translateX(-50%)",
                      width: "0.26em",
                      height: "0.26em",
                      boxShadow: "0 0 15px rgba(255, 0, 0, 0.2)"
                    }}
                  />
                </span>
                <span className="text-premium-black tracking-tight">n</span>
                <span className="text-premium-black tracking-tight">e</span>
                <span className="text-premium-black tracking-tight px-[0.05em]">I</span>
                <span className="text-premium-black tracking-tight">n</span>
                <span className="text-[#FFDB1E]">G</span>
                <span className="text-[#FFDB1E]">o</span>
              </h1>
            </div>
            <motion.p className="mt-4 text-xl md:text-3xl font-semibold text-premium-black/50 tracking-tight max-w-2xl leading-tight px-4">
              The future of dining & events <br className="hidden sm:block" />
              <span className="italic font-medium text-teal/80">is now in your hands.</span>
            </motion.p>
          </motion.div>

          <MagneticButton>
            <motion.button
              onClick={() => setIsWaitlistOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-premium-black text-white rounded-full font-black text-xl shadow-2xl shadow-black/20 flex items-center gap-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#00f29d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 group-hover:text-premium-black transition-colors duration-300">Reserve Exclusive Access</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform group-hover:text-premium-black" />
            </motion.button>
          </MagneticButton>
        </motion.div>

        <WaveDivider fill="#f8fafc" />
      </section>

      {/* 1.5 THE FEAST FLOW (HOW IT WORKS) */}
      <section className="w-full bg-[#f8fafc] py-20 md:py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="text-center mb-16 md:mb-24 space-y-6">
            <span className="text-primary-green font-black uppercase tracking-[0.4em] text-xs">The Process</span>
            <h2 className="text-4xl md:text-8xl font-black text-premium-black tracking-tighter leading-[0.9]">
              How to <br />
              <span className="text-gradient-emerald italic">Join the Feast.</span>
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-px bg-emerald-100 z-0" />

            {[
              { step: "01", title: "Secure Access", desc: "Link your email or phone to our secure encrypted waitlist system.", icon: Search },
              { step: "02", title: "Stomp Up", desc: "Share Dino's secret code with friends to move up the priority list.", icon: Users },
              { step: "03", title: "Feast First", desc: "Receive your exclusive V1.0 invite and experience the future of dining.", icon: Star }
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="relative z-10 flex flex-col items-center text-center space-y-6"
              >
                <div className="w-24 h-24 rounded-[30px] bg-white border border-emerald-50 shadow-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="text-3xl font-black text-emerald-500 group-hover:text-white transition-colors relative z-10">{s.step}</span>
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-black text-premium-black">{s.title}</h4>
                  <p className="text-lg text-premium-black/40 font-medium leading-relaxed max-w-[280px]">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <WaveDivider fill="#00f29d" />
      </section>

      {/* 2. CONSUMER FEATURES SECTION */}
      <section className="w-full min-h-screen bg-[#00f29d] relative overflow-hidden flex flex-col">
        <ScrapbookDoodle src="/images/hotdogdodle.png" className="top-[10%] left-[8%]" depth={1.2} />
        <ScrapbookDoodle src="/images/meatdodle.png" className="bottom-[40%] right-[10%]" depth={1.8} />

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center relative z-10 w-full">
          <SectionReveal className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 text-premium-black px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] backdrop-blur-md">
                <Users className="w-4 h-4" /> For Our Users
              </div>
              <h2 className="text-4xl md:text-8xl font-black text-premium-black leading-[0.9] tracking-tighter">
                The App That <br />
                <span className="text-white italic">Knows Your Taste.</span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-premium-black/60 font-medium leading-relaxed max-w-2xl mx-auto px-4">
              Discover, book, and experience restaurants & events in a whole new dimension. From intimate dinners to massive concerts — our AI curates your perfect experience.
            </p>
          </SectionReveal>
        </div>

        <InfiniteMarquee images={[
          "/images/user-ui/user-1.png",
          "/images/user-ui/user-2.png",
          "/images/user-ui/user-3.png",
          "/images/user-ui/user-4.png",
          "/images/user-ui/user-5.png",
          "/images/user-ui/user-6.png",
          "/images/user-ui/user-7.png"
        ]} speed={50} />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 py-20 relative z-10">
          <FeatureCard icon={Search} title="Smart Discover" desc="AI-powered search for restaurants, concerts, festivals & outdoor events." color="emerald" />
          <FeatureCard icon={Calendar} title="3D Booking" desc="Visualize your table or event seat in full 3D before you confirm." color="emerald" />
          <FeatureCard icon={Bell} title="Live Updates" desc="Real-time notifications for reservations, event changes & exclusive offers." color="emerald" />
        </div>

        <WaveDivider fill="#ffffff" />
      </section>

      {/* 3. FOUNDING FOODIE PERKS */}
      <section className="w-full py-20 md:py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-gold font-black uppercase tracking-[0.4em] text-xs">Early Access Value</span>
                <h2 className="text-4xl md:text-8xl font-black text-premium-black tracking-tighter leading-[0.9]">
                  Perks for the <br />
                  <span className="text-gold italic">Founding Foodies.</span>
                </h2>
                <p className="text-2xl text-premium-black/40 font-medium leading-relaxed max-w-xl">
                  We reward our early supporters with lifetime benefits that won't be available ever again.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Star, title: "Elite Status", desc: "Exclusive 'First 5,000' badge on your profile forever", color: "gold" },
                  { icon: Zap, title: "Zero Fees", desc: "Never pay booking fees on any reservation", color: "emerald" },
                  { icon: ShieldCheck, title: "V1.0 Access", desc: "Get immediate access to all new features as we build them", color: "teal" },
                  { icon: Users, title: "Founder's Circle", desc: "Direct feedback line to our founding team", color: "gold" }
                ].map((perk, i) => (
                  <div key={i} className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${perk.color === 'gold' ? 'bg-gold/10 text-gold' : perk.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : 'bg-teal-50 text-teal-600'}`}>
                      <perk.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-premium-black leading-tight">{perk.title}</h4>
                    <p className="text-premium-black/40 font-medium leading-tight">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-12 md:mt-0">
              <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full" />
              <div className="relative bg-premium-black p-8 md:p-12 rounded-[40px] md:rounded-[60px] shadow-2xl space-y-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center">
                    <Star className="text-gold w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-gold font-black uppercase tracking-widest text-[10px]">Membership Card</p>
                    <h4 className="text-white text-2xl font-black">Founding Member</h4>
                  </div>
                </div>

                <div className="space-y-6 pt-10">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-white/30 font-bold uppercase tracking-widest text-xs">Benefit #1</span>
                    <span className="text-white font-bold">Founding Member Badge</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-white/30 font-bold uppercase tracking-widest text-xs">Benefit #2</span>
                    <span className="text-white font-bold">Zero Booking Fees</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-white/30 font-bold uppercase tracking-widest text-xs">Benefit #3</span>
                    <span className="text-white font-bold">Beta Access First</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8">
                  <div className="text-white/20 font-mono text-xl tracking-[0.5em]">0001 5000</div>
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-gold/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 3.5 MEET DINO SECTION (AI ASSISTANT) */}
      <section className="w-full py-20 md:py-40 bg-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
          <SectionReveal className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-sm">Meet Your Guide</span>
              <h2 className="text-4xl md:text-8xl font-black text-premium-black leading-[0.9] tracking-tighter">
                Dino: The <br />
                <span className="text-emerald-500 italic">Stomping Chef.</span>
              </h2>
            </div>
            <p className="text-2xl text-premium-black/50 font-medium leading-relaxed">
              "Rawr! I'm Dino, your prehistoric guide to the modern dining world. I stomp through the noise to find you the perfect feast!"
            </p>

            <motion.button
              onClick={() => setIsDinoActive(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-black text-lg shadow-xl shadow-emerald-900/20 flex items-center gap-3 group"
            >
              <span>Chat with Dino</span>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Image src="/images/Dino Icon.svg" alt="Dino" width={24} height={24} className="brightness-0 invert" />
              </div>
            </motion.button>

            <ul className="space-y-6">
              {[
                { title: "Personal Curator", desc: "Dino learns your taste to suggest venues you'll crave." },
                { title: "Booking Buddy", desc: "He stomps through reservations to secure your prime spot." },
                { title: "Health Warden", desc: "No-snag checks for allergens and dietary preferences." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-premium-black text-xl">{item.title}</h4>
                    <p className="text-lg text-premium-black/40 font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionReveal>

          <div className="relative flex justify-center order-1 md:order-2">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-200 blur-3xl rounded-full opacity-50 animate-pulse" />
              <div className="w-64 h-64 md:w-96 md:h-96 relative z-10">
                <Image
                  src="/images/Dino Icon.svg"
                  alt="Dino Mascot"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                className="absolute -top-10 -left-10 md:-left-20 bg-white p-6 rounded-[30px] shadow-2xl border border-emerald-100 max-w-[200px] z-20"
              >
                <p className="text-lg font-black text-emerald-600 leading-tight">
                  Stomp into something delicious! 🦖
                </p>
                <div className="absolute bottom-0 right-10 translate-y-full w-4 h-4 bg-white rotate-45 border-r border-b border-emerald-100" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. DINEINGO BUSINESS SECTION */}
      <section className="w-full min-h-screen bg-white relative overflow-hidden flex flex-col">
        <WaveDivider fill="#ffffff" flip={true} />

        <div className="max-w-7xl mx-auto px-6 pt-48 pb-20 text-center relative z-10">
          <SectionReveal className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-premium-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-[0.2em]">
                <Building2 className="w-4 h-4 text-gold" /> For Businesses
              </div>
              <h2 className="text-4xl md:text-8xl font-black text-premium-black leading-[0.9] tracking-tighter">
                Scale Your <br />
                <span className="text-gold italic">Guest Flow.</span>
              </h2>
            </div>
            <p className="text-2xl text-premium-black/50 font-medium leading-relaxed max-w-2xl mx-auto">
              The merchant operating system for restaurants & event venues. Manage dining floors, concert seating, and festival layouts — all in 3D.
            </p>
          </SectionReveal>
        </div>

        <InfiniteMarquee images={[
          "/images/business-ui/business-1.png",
          "/images/business-ui/business-2.png",
          "/images/business-ui/business-3.png",
          "/images/business-ui/business-4.png",
          "/images/business-ui/business-5.png",
          "/images/business-ui/business-6.png"
        ]} speed={60} direction="right" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 py-20 relative z-10">
          <FeatureCard icon={Layers} title="3D Floor Plans" desc="Design restaurant floors and event venues in an interactive 3D editor." color="gold" />
          <FeatureCard icon={Theater} title="Event Seating" desc="Manage complex seating for concerts, festivals, and outdoor events with ease." color="gold" />
          <FeatureCard icon={ShieldCheck} title="Revenue Shield" desc="Protect against no-shows with smart deposits for both dining and events." color="gold" />
        </div>

        <WaveDivider fill="#1a1a2e" />
      </section>

      {/* 5. BRAND STORY */}
      <section className="w-full bg-[#1a1a2e] py-20 md:py-40 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <ScrapbookDoodle src="/images/teacrosdod.png" className="top-[20%] left-[10%]" depth={1.5} />
        <ScrapbookDoodle src="/images/eventdodle.png" className="bottom-[30%] right-[15%]" depth={0.8} />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-24 relative z-10">
          <SectionReveal className="space-y-10">
            <div className="space-y-4">
              <span className="text-[#00F29D] font-black uppercase tracking-[0.4em] text-xs">Our Vision</span>
              <h2 className="text-4xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                Redefining the<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 italic">Experience Economy.</span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-medium max-w-xl">
              We've built an ecosystem that bridges premium hospitality, live events, and the modern digital native. From intimate dinners to massive festivals — all connected seamlessly.
            </p>
          </SectionReveal>
          <div className="relative flex justify-center mt-16 lg:mt-0">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-full max-w-sm aspect-square bg-white/5 backdrop-blur-3xl rounded-[60px] md:rounded-[80px] rotate-6 md:rotate-12 flex items-center justify-center border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5),0_0_50px_rgba(0,242,157,0.1)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />

              <div className="relative flex flex-col items-center gap-4 -rotate-12">
                <div className="w-20 h-1 bg-emerald-500/40 rounded-full mb-2" />
                <span className="text-6xl font-black text-white/40 tracking-tighter">D.G</span>
                <div className="w-12 h-1 bg-white/10 rounded-full" />
              </div>

              <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-white/40 rounded-full" />
            </motion.div>
          </div>
        </div>
        <WaveDivider fill="#fbfbfd" />
      </section>

      {/* 6. FAQ SECTION (Clean & White) */}
      <section className="w-full bg-[#fbfbfd] py-20 md:py-40 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-premium-black tracking-tighter">FAQs<span className="text-emerald-500">.</span></h2>
            <p className="text-xl text-premium-black/40 font-bold uppercase tracking-widest">Everything you need to know</p>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
        <WaveDivider fill="#ffffff" />
      </section>

      {/* 6.5 VIEW STATS CTA */}
      <section className="w-full bg-white py-20 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <SectionReveal className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-premium-black tracking-tight">
                Already on the list?
              </h2>
              <p className="text-xl text-premium-black/50 font-medium">
                Check your position and referral stats
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => {
                  const code = prompt("Enter your referral code to view your stats:");
                  if (code && code.trim()) {
                    setStatsReferralCode(code.trim().toUpperCase());
                    setShowStatsModal(true);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-emerald-500 text-white rounded-full font-black text-lg shadow-xl shadow-emerald-500/20 flex items-center gap-3 hover:bg-emerald-600 transition-all"
              >
                <BarChart3 className="w-5 h-5" />
                View My Stats
              </motion.button>
              
              <motion.a
                href="https://tally.so/r/gD0ZLK"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full font-black text-lg shadow-xl shadow-teal-500/20 flex items-center gap-3 hover:shadow-2xl hover:shadow-teal-500/30 transition-all"
              >
                📋 Quick Survey
              </motion.a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full bg-white pt-24 pb-12 relative z-30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h3 className="text-3xl font-black text-premium-black">DineInGo<span className="text-gold">.</span></h3>
            <p className="text-premium-black/40 max-w-sm text-lg font-medium">The zero-friction ecosystem for restaurants, concerts, festivals & outdoor events — all in one platform.</p>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/dineingo.web/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-premium-black/5 flex items-center justify-center hover:bg-[#00F29D] hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <button className="w-12 h-12 rounded-full bg-premium-black/5 flex items-center justify-center hover:bg-[#00F29D] hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-premium-black/5 flex items-center justify-center hover:bg-[#00F29D] hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:col-span-2 gap-12">
            <div className="space-y-6">
              <h4 className="font-bold text-premium-black uppercase tracking-widest text-xs">Product</h4>
              <ul className="space-y-4 text-premium-black/40 font-medium text-lg">
                <li>Early Access</li>
                <li>For Users</li>
                <li>For Business</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-premium-black uppercase tracking-widest text-xs">Legal</h4>
              <ul className="space-y-4 text-premium-black/40 font-medium text-lg">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-premium-black/5 pt-12 flex flex-col md:flex-row justify-between gap-8 text-premium-black/30 font-bold text-center md:text-left text-sm uppercase tracking-widest">
          <p>© 2026 DineInGo Inc.</p>
          <p>Designed with ❤️ for v1.0 Early Access</p>
        </div>
      </footer>

      <AnimatePresence>
        {isDinoActive && <DinoChatPreview onClose={() => setIsDinoActive(false)} />}
      </AnimatePresence>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      
      <ReferralDashboard 
        isOpen={showStatsModal} 
        onClose={() => {
          setShowStatsModal(false);
          setStatsReferralCode('');
        }} 
        referralCode={statsReferralCode} 
      />
    </div >
  );
}

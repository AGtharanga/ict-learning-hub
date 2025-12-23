import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Globe2, 
  Smartphone, 
  MessageCircle,
  Laptop,
  Brain,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Rocket,
  Terminal,
  CalendarCheck,
  ChevronDown,
  Trophy,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

// Custom Hook for Reveal Animation
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const current = domRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return [domRef, isVisible];
};

// Animated Text Component for the Hero Heading
const TypewriterText = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="relative">
      {`${words[index].substring(0, subIndex)}`}
      <span className="inline-block w-1 h-12 md:h-16 bg-[#C5A059] ml-2 animate-pulse align-middle" />
    </span>
  );
};

// Interactive Tech Discovery Lab Component
const TechDiscoveryLab = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

  const questions = [
    {
      q: "Can a computer process 1 billion calculations in one second?",
      a: true,
      fact: "Modern supercomputers can actually do over a quintillion!"
    },
    {
      q: "Is 'Python' named after a species of snake?",
      a: false,
      fact: "It's actually named after the BBC comedy show 'Monty Python's Flying Circus'!"
    },
    {
      q: "Was the first computer mouse made out of plastic?",
      a: false,
      fact: "The very first mouse was made of wood in 1964!"
    },
    {
      q: "Can AI learn to recognize emotions just like humans?",
      a: true,
      fact: "Emotional AI is a real field helping computers understand if you are happy or sad!"
    }
  ];

  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === questions[currentQuestion].a;
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(score + 1);
    setShowFact(true);
  };

  const nextQuestion = () => {
    setShowFact(false);
    setAnswerStatus(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-[#0A192F] text-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
      {!isFinished ? (
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-black uppercase tracking-widest">
              Level {currentQuestion + 1}
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-10 min-h-[4em]">{questions[currentQuestion].q}</h3>
          {!showFact ? (
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleAnswer(true)} className="py-4 rounded-2xl border-2 border-white/10 hover:border-[#C5A059] transition-all font-bold">Yes</button>
              <button onClick={() => handleAnswer(false)} className="py-4 rounded-2xl border-2 border-white/10 hover:border-[#C5A059] transition-all font-bold">No</button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-300 italic mb-4">"{questions[currentQuestion].fact}"</p>
              <button onClick={nextQuestion} className="w-full py-3 bg-[#C5A059] text-white rounded-xl font-bold flex items-center justify-center gap-2">
                Next Challenge <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy size={64} className="text-[#C5A059] mx-auto mb-6" />
          <h3 className="text-3xl font-black mb-4">Mission Complete!</h3>
          <p className="text-slate-400 mb-8">Score: {score}/{questions.length}</p>
          <button onClick={() => {setIsFinished(false); setCurrentQuestion(0); setScore(0);}} className="px-10 py-4 border-2 border-[#C5A059] text-[#C5A059] rounded-2xl font-bold uppercase tracking-widest">Restart</button>
        </div>
      )}
    </div>
  );
};

const ProgramCard = ({ title, duration, price, features, icon: Icon, isPremium, onEnroll }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`relative p-8 rounded-[2rem] border transition-all duration-1000 bg-white/80 backdrop-blur-sm ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${isPremium ? 'border-amber-200 shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-xl'}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isPremium ? 'bg-[#C5A059] text-white' : 'bg-slate-100 text-[#0A192F]'}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-bold text-[#0A192F] mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6">{duration}</p>
      <div className="mb-8 p-4 bg-slate-50/50 rounded-2xl font-black text-[#0A192F] text-2xl">{price}</div>
      <ul className="space-y-4 mb-10">
        {features.map((f, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-[#C5A059]" /> {f}</li>
        ))}
      </ul>
      <button onClick={() => onEnroll(title)} className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase ${isPremium ? 'bg-[#0A192F] text-white hover:bg-[#C5A059]' : 'border-2 border-[#0A192F] text-[#0A192F] hover:bg-[#0A192F] hover:text-white'}`}>Enroll</button>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const WHATSAPP_NUMBER = "94704622563";
  
  // This is your actual profile image link
  const PROFILE_IMAGE = "https://lh3.googleusercontent.com/d/1mp2s807T4Vj9_D49jEx6DpLTbDiULmcy";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sendWhatsApp = (msg) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A192F] rounded-xl flex items-center justify-center"><Terminal className="text-[#C5A059]" size={20} /></div>
            <span className="text-xl font-black text-[#0A192F]">ICT <span className="text-[#C5A059]">HUB</span></span>
          </div>
          <button onClick={() => sendWhatsApp("Hi, I want to enroll my child!")} className="bg-[#0A192F] text-white px-8 py-3 rounded-full text-[10px] tracking-widest font-black uppercase hover:bg-[#C5A059] transition-all">Connect</button>
        </div>
      </nav>

      <section className="pt-48 pb-32 px-6 bg-slate-50/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-black tracking-[0.2em] uppercase mb-8">Colombo's Elite ICT Academy</div>
            <h1 className="text-5xl md:text-7xl font-black text-[#0A192F] mb-8 tracking-tighter leading-tight">
              Empowering the <br /> <span className="italic text-[#C5A059]">Next Generation</span> <br /> 
              of <TypewriterText words={["Tech Leaders.", "Creators.", "Masters."]} />
            </h1>
            <p className="text-lg text-slate-500 mb-12 max-w-lg">Practical ICT education tailored for ages 10–16. Expert guidance by Darshana Bandara.</p>
            <button onClick={() => sendWhatsApp("Hi! I'd like a free assessment.")} className="bg-[#0A192F] text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center gap-3 shadow-xl hover:bg-[#C5A059] transition-all"><CalendarCheck size={18} /> Book Free Assessment</button>
          </div>
          <div className="relative hidden lg:block animate-in zoom-in duration-1000">
            <div className="aspect-[4/5] rounded-[3rem] bg-white overflow-hidden shadow-2xl border-8 border-white">
              {/* Profile Image with Fallback */}
              <img 
                src={PROFILE_IMAGE} 
                alt="Darshana Bandara" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800";
                }}
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-[240px]">
              <Brain className="text-[#C5A059] mb-4" size={32} />
              <p className="text-sm font-bold text-[#0A192F]">Advanced curriculum focus on AI and Real-world usage.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-[#C5A059] tracking-[0.4em] uppercase mb-4">Discovery Lab</h2>
            <h3 className="text-4xl font-black text-[#0A192F]">How much does your child know?</h3>
          </div>
          <div className="max-w-3xl mx-auto"><TechDiscoveryLab /></div>
        </div>
      </section>

      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <ProgramCard title="Standard ICT" duration="3 Months" price="LKR 3,000" icon={Laptop} features={["Basics", "Safety", "Projects"]} onEnroll={(t) => sendWhatsApp(`Hi, interested in ${t}`)} />
          <ProgramCard isPremium title="Mastery" duration="Tailored" price="LKR 5,000" icon={Rocket} features={["AI Tools", "Web Dev", "1-on-1"]} onEnroll={(t) => sendWhatsApp(`Hi, interested in ${t}`)} />
        </div>
      </section>

      <footer className="py-20 px-6 bg-[#0A192F] text-white text-center">
        <p className="text-[10px] tracking-widest uppercase font-bold text-[#C5A059]">Ready to Start?</p>
        <h3 className="text-3xl font-black mt-4 mb-8">+94 70 462 2563</h3>
        <p className="text-slate-500 text-xs">© 2025 ICT Learning Hub. Professional Tech Education.</p>
      </footer>
    </div>
  );
}

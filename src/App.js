import './index.css';
import React, { useState, useEffect } from 'react';
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
  CalendarCheck
} from 'lucide-react';

const ProgramCard = ({ title, duration, price, features, icon: Icon, isPremium, onEnroll }) => {
  return (
    <div className={`relative group p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden bg-white ${isPremium ? 'border-amber-200 shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-xl'}`}>
      {isPremium && (
        <div className="absolute top-0 right-0 bg-[#C5A059] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl tracking-widest uppercase">
          Most Popular
        </div>
      )}
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isPremium ? 'bg-[#C5A059] text-white' : 'bg-slate-100 text-[#0A192F]'}`}>
          <Icon size={28} />
        </div>
        
        <h3 className="text-2xl font-bold text-[#0A192F] mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium italic">{duration}</p>
        
        <div className="mb-8 p-4 bg-slate-50 rounded-2xl">
          <div className="text-2xl font-black text-[#0A192F]">{price}</div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">+ LKR 1,000 for English Medium</p>
        </div>

        <ul className="space-y-4 mb-10">
          {features.map((f, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 size={18} className="text-[#C5A059] shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => onEnroll(title)}
          className={`w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all ${isPremium ? 'bg-[#0A192F] text-white hover:bg-[#C5A059]' : 'border-2 border-[#0A192F] text-[#0A192F] hover:bg-[#0A192F] hover:text-white'}`}>
          Book a Trial
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    contact: '',
    childDetails: '',
    program: 'Standard ICT Learning'
  });

  const WHATSAPP_NUMBER = "94704622563";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendWhatsAppMessage = (type, extraData = null) => {
    let message = "";
    
    if (type === 'INQUIRY') {
      message = `Hello ICT Learning Hub! %0A%0A I would like to inquire about a program.%0A%0A*Details:*%0A- Parent: ${formData.parentName || 'Not specified'}%0A- Contact: ${formData.contact || 'Not specified'}%0A- Child (Age/Grade): ${formData.childDetails || 'Not specified'}%0A- Interested Program: ${extraData || formData.program}`;
    } else if (type === 'ASSESSMENT') {
      message = `Hello! I would like to request a *Free ICT Assessment* for my child. Please let me know the available slots. %0A%0A - Name: ${formData.parentName || 'Parent'}`;
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#C5A059]/30">
      {/* Contact Bar */}
      <div className="hidden md:block bg-[#0A192F] text-white py-2 px-6 text-[10px] font-bold tracking-[0.2em] uppercase">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Mail size={12} className="text-[#C5A059]" /> tharangadarsana24@gmail.com</span>
            <span className="flex items-center gap-2"><Phone size={12} className="text-[#C5A059]" /> +94 70 462 2563</span>
          </div>
          <div className="flex gap-4 italic">Practical ICT Education for Children Aged 10–16</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'top-0 py-4 bg-white/90 backdrop-blur-lg shadow-sm border-b' : 'top-0 md:top-8 py-4 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A192F] rounded-xl flex items-center justify-center">
              <Terminal className="text-[#C5A059]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-[#0A192F]">ICT <span className="text-[#C5A059]">HUB</span></span>
              <span className="text-[8px] tracking-[0.3em] font-bold text-slate-400 uppercase tracking-widest">Learning Hub</span>
            </div>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-600">
            {['About', 'Programs', 'Outcome', 'Parent Support'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-[#C5A059] transition-colors">{item}</a>
            ))}
          </div>

          <button onClick={() => sendWhatsAppMessage('INQUIRY')} className="bg-[#0A192F] text-white px-8 py-3 rounded-full text-[10px] tracking-widest font-black uppercase transition-all hover:bg-[#C5A059] shadow-lg">
            Enroll Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0A192F]/[0.02] -skew-x-12" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-black tracking-[0.2em] uppercase mb-8">
              Colombo's Elite ICT Academy
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#0A192F] mb-8 tracking-tighter leading-[0.9]">
              Empowering the <br />
              <span className="italic text-[#C5A059]">Next Generation</span> <br />
              of Tech Leaders.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-12 max-w-lg">
              Practical, age-appropriate ICT education tailored for children aged 10–16. From core basics to advanced AI tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => sendWhatsAppMessage('ASSESSMENT')}
                className="bg-[#0A192F] text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-[#C5A059] transition-all shadow-xl shadow-navy-900/20 flex items-center gap-3">
                <CalendarCheck size={18} /> Book Free Assessment
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-[3rem] bg-slate-200 overflow-hidden shadow-2xl border-8 border-white">
                <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
                    alt="Children learning with technology" 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-[240px]">
                <Brain className="text-[#C5A059] mb-4" size={32} />
                <p className="text-sm font-bold text-[#0A192F]">Curriculum focus on AI and Real-world usage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section (Simplified for brevity as requested) */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-sm font-black text-[#C5A059] tracking-[0.4em] uppercase">About Our Mission</h2>
            <p className="text-3xl font-bold text-[#0A192F] leading-tight">
              Bridging the gap between school theory and practical digital mastery.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Headed by Darsana Bandara, our hub is dedicated to providing children with a high-end, safe, and professional environment to explore technology.
            </p>
            <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/darsana-bandara/" target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0A192F] hover:text-[#C5A059] transition-colors">
                    <Linkedin size={16} /> LinkedIn
                </a>
                <a href="https://sites.google.com/view/tharanga-portfolio?usp=sharing" target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0A192F] hover:text-[#C5A059] transition-colors">
                    <ExternalLink size={16} /> Portfolio
                </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-black text-[#0A192F] mb-2">10-16</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ages</p>
            </div>
            <div className="bg-[#0A192F] p-8 rounded-3xl text-center text-white">
                <div className="text-4xl font-black text-[#C5A059] mb-2">2HR</div>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Session</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-sm font-black text-[#C5A059] tracking-[0.4em] uppercase mb-6">Our Programs</h2>
          <p className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter">Structured for Excellence.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          <ProgramCard 
            title="Standard ICT Learning"
            duration="Structured 3-Month Program"
            price="LKR 3,000 / Day"
            icon={Laptop}
            onEnroll={(title) => sendWhatsAppMessage('INQUIRY', title)}
            features={[
              "Master Computer Basics & OS",
              "Schoolwork & Presentation Support",
              "Internet Safety & Privacy",
              "Practical ICT Usage"
            ]}
          />
          <ProgramCard 
            isPremium
            title="Personalized ICT Mastery"
            duration="Tailored to Skill & Grade"
            price="LKR 5,000 / Day"
            icon={Rocket}
            onEnroll={(title) => sendWhatsAppMessage('INQUIRY', title)}
            features={[
                "Advanced AI Tools & Prompting",
                "Real-life ICT Problem Solving",
                "Personalized Learning Path",
                "Parent Guidance on Usage"
            ]}
          />
        </div>
      </section>

      {/* Parent Support */}
      <section id="parent-support" className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
                <h3 className="text-4xl font-bold text-[#0A192F] mb-8 leading-tight">Parent Guidance & Support</h3>
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-6">
                        <Smartphone className="text-[#C5A059]" size={32} />
                        <div>
                            <p className="font-bold text-[#0A192F]">Daily Guidance</p>
                            <p className="text-sm text-slate-500">Instant support during working hours for tech hurdles.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 bg-[#0A192F] p-12 rounded-[3rem] text-center text-white">
                <ShieldCheck className="text-[#C5A059] mx-auto mb-8" size={64} />
                <h4 className="text-2xl font-bold mb-6">Request a Free Assessment</h4>
                <p className="text-slate-400 mb-10 text-sm">Determine your child's level before payment. We create a roadmap just for them.</p>
                <button 
                  onClick={() => sendWhatsAppMessage('ASSESSMENT')}
                  className="bg-[#C5A059] text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#0A192F] transition-all">
                    Apply for Assessment
                </button>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-[#0A192F] mb-4">Quick Inquiry</h2>
                <p className="text-slate-500">Fill this and click send - it will automatically open your WhatsApp.</p>
            </div>
            
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Parent Name</label>
                        <input name="parentName" onChange={handleInputChange} type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#C5A059] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                        <input name="contact" onChange={handleInputChange} type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#C5A059] outline-none transition-all" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Child Age / Grade</label>
                        <input name="childDetails" onChange={handleInputChange} type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#C5A059] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Program</label>
                        <select name="program" onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#C5A059] outline-none transition-all appearance-none">
                            <option>Standard ICT Learning</option>
                            <option>Personalized ICT Mastery</option>
                        </select>
                    </div>
                </div>
                <button 
                    onClick={() => sendWhatsAppMessage('INQUIRY')}
                    className="w-full bg-[#0A192F] text-white py-6 rounded-2xl font-black tracking-widest uppercase hover:bg-[#C5A059] transition-all text-xs flex items-center justify-center gap-4">
                    <MessageCircle size={20} /> Send Inquiry via WhatsApp
                </button>
            </div>
            
            <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-center items-center gap-10">
                <div className="flex items-center gap-4 text-[#0A192F] font-bold">
                    <Phone size={24} className="text-[#C5A059]" />
                    +94 70 462 2563
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] py-20 px-6 text-white text-center">
        <div className="max-w-7xl mx-auto">
            <span className="text-2xl font-black tracking-tighter text-white mb-6 block">ICT <span className="text-[#C5A059]">HUB</span></span>
            <p className="text-slate-500 text-sm mb-8">Colombo, Sri Lanka | tharangadarsana24@gmail.com</p>
            <div className="flex justify-center gap-6 mb-12">
                <a href="https://www.linkedin.com/in/darsana-bandara/" className="text-[#C5A059]"><Linkedin size={24} /></a>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">© 2025 ICT Learning Hub. Darshana Bandara.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
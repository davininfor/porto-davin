import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Instagram, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Code2, 
  Trophy, 
  User as UserIcon,
  ChevronRight,
  Menu,
  X,
  Send,
  MapPin,
  Phone
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { PortfolioData } from './types';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skill', id: 'skill' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id?: string, path?: string) => {
    setIsOpen(false);
    if (path) {
      navigate(path);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/?scroll=' + id);
    } else {
      const element = document.getElementById(id!);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-brand-dark/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white group">
          DAVIN<span className="text-brand-maroon group-hover:animate-pulse">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1.5 border-white/5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id, link.path)}
              className={cn(
                "text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300",
                (link.path && location.pathname === link.path) 
                  ? "bg-brand-maroon text-white shadow-lg shadow-brand-maroon/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden glass p-3 rounded-2xl text-white hover:bg-brand-maroon/20 transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 glass rounded-3xl p-6 lg:hidden border-white/10"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id, link.path)}
                  className={cn(
                    "text-lg font-bold p-4 rounded-2xl transition-all text-left",
                    (link.path && location.pathname === link.path) 
                      ? "bg-brand-maroon text-white" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ data }: { data?: PortfolioData }) => {
  if (!data) return null;
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black tracking-tighter mb-6">
              DAVIN<span className="text-brand-maroon">.</span>
            </h2>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              Building digital experiences with passion and precision. Let's create something extraordinary together.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: data.user.github },
                { icon: Instagram, href: `https://instagram.com/${data.user.instagram.replace('@', '')}` },
                { icon: Mail, href: `mailto:${data.user.email}` },
                { icon: MessageCircle, href: `https://wa.me/${data.user.whatsapp}` }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gray-400 hover:text-brand-maroon hover:border-brand-maroon/50 transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand-maroon transition-colors">Home</button></li>
              <li><Link to="/portfolio" className="hover:text-brand-maroon transition-colors">Portfolio</Link></li>
              <li><a href="#about" className="hover:text-brand-maroon transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-brand-maroon transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Info</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-center gap-3"><Mail size={16} className="text-brand-maroon" /> {data.user.email}</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-brand-maroon" /> {data.user.whatsapp}</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-brand-maroon" /> Indonesia</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs font-medium uppercase tracking-widest">
          <p>© 2026 DAVIN PANGESTU KUSUMO. ALL RIGHTS RESERVED.</p>
          <p>DESIGNED FOR EXCELLENCE</p>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = ({ data }: { data?: PortfolioData }) => {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollId = params.get('scroll');
    if (scrollId) {
      setTimeout(() => {
        const element = document.getElementById(scrollId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-brand-dark">
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="text-brand-maroon font-black text-4xl"
    >
      DP.
    </motion.div>
  </div>;

  return (
    <div className="relative">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-maroon z-[60] origin-left" style={{ scaleX }} />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,0,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-maroon/30 text-brand-maroon text-xs font-bold uppercase tracking-[0.2em] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-maroon animate-ping" />
              Available for projects
            </motion.div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              <span className="block">DAVIN</span>
              <span className="text-gradient">PANGESTU</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium mb-12 max-w-lg leading-tight">
              {data.user.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => document.getElementById('portfolio-preview')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-brand-maroon text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-burgundy transition-all hover:scale-105 maroon-glow flex items-center gap-3"
              >
                Explore Work <ChevronRight size={20} />
              </button>
              <div className="flex items-center gap-4">
                <a href={data.user.github} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all">
                  <Github size={24} />
                </a>
                <a href={`https://instagram.com/${data.user.instagram.replace('@', '')}`} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-brand-maroon rounded-[40px] rotate-6 blur-2xl opacity-20 animate-pulse" />
              <div className="relative glass p-4 rounded-[40px] border-white/10 overflow-hidden h-full">
                <img 
                  src={data.user.profileImage} 
                  alt="Davin" 
                  className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 rounded-3xl border-brand-maroon/20 maroon-glow"
            >
              <Trophy className="text-brand-maroon mb-2" size={32} />
              <p className="text-xs font-black uppercase tracking-widest">Esports Pro</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden glass border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                alt="Workspace" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-brand-maroon font-black text-5xl mb-2">01</p>
                <p className="text-white font-bold uppercase tracking-[0.3em] text-sm">The Visionary</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="flex items-center gap-3 text-brand-maroon">
              <div className="w-12 h-[2px] bg-brand-maroon" />
              <span className="font-black uppercase tracking-[0.4em] text-xs">About Me</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              CRAFTING <span className="text-brand-maroon">DIGITAL</span> EXCELLENCE
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed font-medium">
              {data.user.about}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-3xl font-black text-white mb-1">10+</p>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Projects Built</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1">3rd</p>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Esports Rank</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="flex items-center gap-3 text-brand-maroon mb-6">
              <Trophy size={24} />
              <span className="font-black uppercase tracking-[0.4em] text-xs">Milestones</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">PROVEN TRACK RECORD</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {data.experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative glass rounded-[40px] p-10 md:p-16 border-white/5 hover:border-brand-maroon/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-maroon/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-brand-maroon/10 transition-all" />
                
                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <div>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-maroon/10 text-brand-maroon text-xs font-black uppercase tracking-widest mb-6">
                      {exp.date} • {exp.type}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 group-hover:text-brand-maroon transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-gray-400 text-lg font-medium mb-8">
                      {exp.organization}
                    </p>
                    <p className="text-gray-500 leading-relaxed text-lg">
                      {exp.description}
                    </p>
                  </div>
                  
                  {exp.image && (
                    <div className="relative">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden glass p-2 border-white/10">
                        <img 
                          src={exp.image} 
                          alt={exp.title} 
                          className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-maroon rounded-full flex items-center justify-center maroon-glow">
                        <Trophy size={32} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Section */}
      <section id="skill" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 text-brand-maroon">
                <Code2 size={24} />
                <span className="font-black uppercase tracking-[0.4em] text-xs">Capabilities</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter">TECHNICAL ARSENAL</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Constantly evolving my skill set to stay at the forefront of modern web development and digital design.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.skills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, backgroundColor: 'rgba(128, 0, 0, 0.1)', borderColor: 'rgba(128, 0, 0, 0.3)' }}
                  className="glass p-8 rounded-3xl border-white/5 flex flex-col items-center justify-center text-center group transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-maroon/20 transition-colors">
                    <Code2 size={24} className="text-gray-400 group-hover:text-brand-maroon transition-colors" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{skill.category}</p>
                  <p className="text-lg font-bold text-white">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="portfolio-preview" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 text-brand-maroon mb-6">
                <div className="w-12 h-[2px] bg-brand-maroon" />
                <span className="font-black uppercase tracking-[0.4em] text-xs">Portfolio</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">SELECTED WORKS</h2>
            </div>
            <Link 
              to="/portfolio" 
              className="px-8 py-4 glass rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-maroon transition-all"
            >
              View All Projects
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.slice(0, 2).map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                className="group relative aspect-[16/10] rounded-[40px] overflow-hidden glass border-white/5"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-brand-maroon font-black uppercase tracking-widest text-xs mb-3">{project.tags.join(' • ')}</p>
                  <h3 className="text-4xl font-black tracking-tighter text-white mb-4">{project.title}</h3>
                  <p className="text-gray-400 text-sm max-w-md line-clamp-2">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-maroon/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-5xl mx-auto glass rounded-[50px] p-12 md:p-24 border-white/5 relative">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center gap-3 text-brand-maroon mb-8">
                <Send size={24} />
                <span className="font-black uppercase tracking-[0.4em] text-xs">Contact</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                LET'S <span className="text-brand-maroon">TALK</span> ABOUT YOUR NEXT PROJECT
              </h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                Have a question or want to work together? Feel free to reach out through any of these platforms.
              </p>
              
              <div className="space-y-6">
                <a href={`mailto:${data.user.email}`} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-brand-maroon group-hover:border-brand-maroon/50 transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500">Email Me</p>
                    <p className="text-lg font-bold text-white">{data.user.email}</p>
                  </div>
                </a>
                <a href={`https://wa.me/${data.user.whatsapp}`} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-brand-maroon group-hover:border-brand-maroon/50 transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500">WhatsApp</p>
                    <p className="text-lg font-bold text-white">+{data.user.whatsapp}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-maroon/50 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-maroon/50 transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-maroon/50 transition-all resize-none" placeholder="Tell me about your project..." />
                </div>
                <button className="w-full py-5 bg-brand-maroon text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-burgundy transition-all maroon-glow flex items-center justify-center gap-3">
                  Send Message <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PortfolioPage = ({ data }: { data?: PortfolioData }) => {
  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <div className="flex items-center gap-3 text-brand-maroon mb-8">
            <div className="w-12 h-[2px] bg-brand-maroon" />
            <span className="font-black uppercase tracking-[0.4em] text-xs">Portfolio</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-12">
            CREATIVE <br /> <span className="text-gradient">ARCHIVE</span>
          </h1>
          <p className="text-gray-400 text-2xl max-w-2xl font-medium leading-relaxed">
            A deep dive into the projects, experiments, and digital solutions I've crafted over the years.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass rounded-[40px] overflow-hidden hover:border-brand-maroon/50 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
                <div className="absolute top-6 right-6">
                  <a 
                    href={project.link} 
                    className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-brand-maroon transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-10">
                <div className="flex gap-3 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-maroon bg-brand-maroon/10 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-brand-maroon transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [data, setData] = useState<PortfolioData | undefined>();

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to fetch data:", err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen selection:bg-brand-maroon selection:text-white bg-brand-dark text-white font-sans antialiased">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/portfolio" element={<PortfolioPage data={data} />} />
          </Routes>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
}

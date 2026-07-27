import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Phone, Sparkles } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/Button';
// import profileImg from '../assets/images/profile.jpeg';
import profileImg from '../../public/assets/images/profile.jpeg';
export const Hero: React.FC = () => {
  // Motion values for the "view fully" interactive effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Transforms: When mouse moves, the image shifts slightly in the opposite direction
  // This creates the "peek" or "edge adjustment" effect you requested
  const imgX = useTransform(mouseX, [-0.5, 0.5], ['15%', '-15%']);
  const imgY = useTransform(mouseY, [-0.5, 0.5], ['15%', '-15%']);
  const imgScale = useTransform(mouseX, [-0.5, 0.5], [1.1, 1.1]); // Keep slightly zoomed to allow movement

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-12" id="home">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content: Name & Role (Compact & Sleek) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-400"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            </span>
            2 Years Backend Architect
          </motion.div>

          <h1 className="mb-4 text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Sibin Silu<span className="text-indigo-500">.</span><br/>
            <span className="text-3xl md:text-5xl font-bold text-slate-500">
              Backend Systems Engineer
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed">
            I architect robust server-side ecosystems using the MERN stack. Focused on scalability, MVC patterns, and high-performance API design.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Button variant="primary" size="md" className="group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="ghost" size="md" className="text-slate-400 hover:text-white" onClick={() => window.location.href = 'mailto:sibinthekkel@gmail.com'}>
              Hire Me
            </Button>
          </div>

          <div className="flex gap-6 text-slate-500">
            <motion.a whileHover={{ y: -3, color: '#fff' }} href="#" className="transition-all"><Github className="h-5 w-5" /></motion.a>
            <motion.a whileHover={{ y: -3, color: '#fff' }} href="#" className="transition-all"><Linkedin className="h-5 w-5" /></motion.a>
            <motion.a whileHover={{ y: -3, color: '#fff' }} href="tel:+919567049403" className="transition-all"><Phone className="h-5 w-5" /></motion.a>
          </div>
        </motion.div>

        {/* Right Content: Interactive Image (Compact & High-Tech) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div 
            className="relative h-64 w-64 md:h-80 md:w-80 group cursor-none-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Animated Ring */}
            <div className="absolute -inset-4 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-[2px] transition-transform duration-500 group-hover:scale-105" />
            
            {/* The Image Container with "Adjustment" effect */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
               <motion.img 
                 style={{ 
                   x: imgX, 
                   y: imgY, 
                   scale: imgScale 
                 }}
                //  src="/assets/images/profile.jpeg" 
             src={profileImg}                
             onError={(e) => {
                   (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sibin";
                 }}
                 alt="Sibin Silu" 
                 className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
               />
               
               {/* Interactive Overlay Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-widest uppercase">
                    <Sparkles className="h-3 w-3 text-indigo-400" />
                    Interactive View
                  </div>
               </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute -top-2 -left-2 h-8 w-8 border-t-2 border-l-2 border-indigo-500 rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-emerald-500 rounded-br-lg" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

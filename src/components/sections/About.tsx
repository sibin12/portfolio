import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Map, 
  Cpu, 
  Target,
  GraduationCap,
  Code2,
  CheckCircle2,
  Camera,
  Layers,
  Zap,
  Briefcase,
  Globe,
  ShieldCheck,
  Server
} from 'lucide-react';
import { ShatterCard } from '../ui/ShatterCard';

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  // Expanded skills for 2+ years of experience
  const mainSkills = [
    "Node.js", "Express.js", "PostgreSQL", "MongoDB", "ReactJS", "Bun", "Go (Learning)",
    "TypeScript", "Docker", "Redis", "Socket.io", "AWS (EC2, S3, RDS)", "Nginx", "Cloudflare"
  ];

  const devOpsSkills = [
    "CI/CD Pipelines", "System Architecture", "Microservices", "RESTful APIs", "JWT Auth", 
    "Unit Testing", "Git/GitHub", "MVC Pattern", "Postman", "Linux/Bash"
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="about">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Target className="text-emerald-400" />
          The Evolution
        </h2>
        <p className="text-slate-400 max-w-2xl text-lg">
          Transforming from a MERN developer to a Backend Architect at Magadh Industries. I build systems that scale.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px]"
      >
        {/* Core Technical Stack */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
          <ShatterCard gradient="indigo" className="h-full flex flex-col justify-between p-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Zap size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Technical Arsenal</h3>
              </div>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Expertise in modern backend runtimes and high-performance databases. Specialized in architecting scalable MERN and SQL-based ecosystems.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {mainSkills.map(tag => (
                <span key={tag} className="text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </ShatterCard>
        </motion.div>

        {/* Experience & Professional Growth */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
          <ShatterCard gradient="emerald" className="h-full flex flex-col justify-between p-8">
             <div className="p-3 w-fit rounded-xl bg-emerald-500/20 text-emerald-400 mb-6">
               <Briefcase size={28} />
             </div>
             <div className="space-y-6">
               <div className="relative pl-5 border-l-2 border-emerald-500/30">
                 <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                 <h4 className="text-base font-bold text-white">Magadh Industries</h4>
                 <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Software Engineer</p>
                 <p className="text-[11px] text-slate-500 italic mt-1">2024 - Present</p>
               </div>
               <div className="relative pl-5 border-l-2 border-slate-700">
                 <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-slate-700" />
                 <h4 className="text-sm font-bold text-slate-300">Brototype</h4>
                 <p className="text-xs text-slate-500">MERN Specialist</p>
                 <p className="text-[11px] text-slate-600 italic mt-1">Dec 2023 (Certified)</p>
               </div>
               <div className="relative pl-5 border-l-2 border-slate-700">
                 <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-slate-700" />
                 <h4 className="text-sm font-bold text-slate-300">MG University</h4>
                 <p className="text-xs text-slate-500">BCA Graduate</p>
               </div>
             </div>
          </ShatterCard>
        </motion.div>

        {/* DevOps & Best Practices */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
          <ShatterCard gradient="slate" className="h-full flex flex-col justify-center p-8">
             <div className="flex items-center gap-4 mb-4">
               <ShieldCheck size={24} className="text-slate-400" />
               <h3 className="text-lg font-bold text-white">System Architecture & DevOps</h3>
             </div>
             <div className="flex flex-wrap gap-2">
                {devOpsSkills.map(skill => (
                  <span key={skill} className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-slate-600" /> {skill}
                  </span>
                ))}
             </div>
          </ShatterCard>
        </motion.div>

        {/* Life Outside Code */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
           <ShatterCard gradient="indigo" className="h-full p-0 overflow-hidden relative group">
              <div className="flex h-full w-full">
                <div className="relative h-full w-1/4 overflow-hidden border-r border-white/5">
                   <img src="https://images.unsplash.com/photo-1551632432-c735eef3279c?q=80&w=400&h=300&auto=format&fit=crop" alt="Trekking" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="relative h-full w-1/4 overflow-hidden border-r border-white/5">
                   <img src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=400&h=300&auto=format&fit=crop" alt="Football" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="relative h-full w-1/4 overflow-hidden border-r border-white/5">
                   <img src="https://images.unsplash.com/photo-1529697210530-8c4bb1358ce5?q=80&w=400&h=300&auto=format&fit=crop" alt="Chess" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="relative h-full w-1/4 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=300&auto=format&fit=crop" alt="Work" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-700">
                <div className="flex items-center gap-3">
                  <Camera size={20} className="text-indigo-400" />
                  <span className="text-xs font-black tracking-[0.2em] text-white uppercase">Snapshots</span>
                </div>
              </div>
           </ShatterCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

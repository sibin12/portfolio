import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Layers, Briefcase } from 'lucide-react';
import { Card } from '../ui/Card';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  features: string[];
}

const projects: Project[] = [
  {
    title: "GADGETGALAXY",
    description: "A fully responsive e-commerce platform for gadgets featuring OTP verification, Razorpay integration, and a comprehensive admin dashboard.",
    tags: ["Node.js", "Express", "MongoDB", "Razorpay", "Twilio", "EJS"],
    link: "http://gadgetgalaxy.live",
    github: "#",
    features: ["OTP Verification", "Razorpay Integration", "Admin Dashboard", "Sales Reports"]
  },
  {
    title: "LOOPNET",
    description: "A real-time video sharing platform with group chat, Google Auth, and Firebase storage. (Ongoing MERN project)",
    tags: ["React", "Node.js", "Socket.io", "Firebase", "MongoDB", "Redux"],
    link: "http://loopnet.gadgetgalaxy.live",
    github: "#",
    features: ["Real-time Chat", "Group Chat", "Google Auth", "Video Reporting"]
  },
  {
    title: "MERN Blog App",
    description: "A full-stack blog application demonstrating proficiency in the MERN stack and clean architecture.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    link: "#",
    github: "#",
    features: ["CRUD Operations", "User Auth", "Rich Text Editor"]
  }
];

export const Projects: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="projects">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Layers className="text-indigo-400" />
          Featured Work
        </h2>
        <p className="text-slate-400 max-w-2xl">
          From e-commerce platforms to real-time communication tools, here are some of the key projects I've built.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full flex flex-col group">
              <div className="mb-6 h-48 w-full overflow-hidden rounded-lg bg-slate-800 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 mix-blend-overlay group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/60 backdrop-blur-sm">
                   <div className="flex gap-4">
                     <a href={project.github} className="p-2 rounded-full bg-slate-800 text-white hover:bg-indigo-600 transition-colors">
                        <Github size={20} />
                     </a>
                     <a href={project.link} target="_blank" className="p-2 rounded-full bg-slate-800 text-white hover:bg-indigo-600 transition-colors">
                        <ExternalLink size={20} />
                     </a>
                   </div>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                   <span className="bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white px-2 py-1 rounded border border-slate-700">
                     PROJECT
                   </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <ul className="mb-6 space-y-1.5">
                  {project.features.slice(0, 3).map(feature => (
                    <li key={feature} className="text-xs text-slate-500 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-indigo-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center text-center">
         <p className="text-slate-500 text-sm mb-8 italic">"Building and deploying web applications with passion."</p>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            {['Weather App', 'OLX Clone', 'Todo App', 'Netflix Clone'].map(mini => (
              <div key={mini} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col items-center gap-2 group hover:border-indigo-500/30 transition-colors">
                <Code2 size={20} className="text-slate-600 group-hover:text-indigo-400" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-white">{mini}</span>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};

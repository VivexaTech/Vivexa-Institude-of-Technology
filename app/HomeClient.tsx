"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  MonitorPlay, Code, PenTool, Database, Award, Users, 
  BookOpen, Briefcase, ArrowRight, ChevronRight, Star
} from "lucide-react";

// --- Data Arrays ---
const COURSES = [
  { title: "ADCA", desc: "Advanced Diploma in Computer Applications.", icon: MonitorPlay },
  { title: "DCA", desc: "Diploma in Computer Applications.", icon: BookOpen },
  { title: "Tally + GST", desc: "Master accounting and taxation.", icon: Database },
  { title: "Web Development", desc: "MERN stack, React, Next.js.", icon: Code },
  { title: "Graphic Design", desc: "Photoshop, Illustrator, UI/UX.", icon: PenTool },
  { title: "AI Tools", desc: "Master ChatGPT, Midjourney, and more.", icon: Award },
];

const STATS = [
  { value: "500+", label: "Students Trained" },
  { value: "20+", label: "Premium Courses" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "100%", label: "Career Support" },
];

const FEATURES = [
  { title: "Expert Faculty", icon: Users, desc: "Learn from industry veterans with years of real-world experience." },
  { title: "Practical Training", icon: Code, desc: "100% hands-on learning with live projects and assignments." },
  { title: "Industry Skills", icon: Briefcase, desc: "Curriculum designed to match current IT industry requirements." },
  { title: "Career Guidance", icon: Award, desc: "Dedicated placement assistance and resume building workshops." },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma", role: "Web Developer", text: "Vivexa completely changed my career trajectory. The practical training is unmatched." },
  { name: "Priya Singh", role: "Graphic Designer", text: "The UI/UX and design courses are incredibly detailed. Highly recommend to everyone." },
  { name: "Amit Kumar", role: "Accountant", text: "Tally+GST course helped me secure a job within weeks of completion. Great faculty!" },
];

// --- Animation Variants ---
// ADDED: Explicit 'Variants' typing to satisfy TypeScript build checks
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background Glow Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer} 
            className="max-w-2xl z-10"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold mb-6 tracking-wide uppercase backdrop-blur-sm">
              Empowering the Next Generation
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              Build Your Future With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Technology</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
              Join Vivexa Institute of Technology and master future-ready digital skills. Get practical training from industry experts and accelerate your career.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link 
                  href="/courses" 
                  className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Explore Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              
                <Link 
                  href="/contact" 
                  className="px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-white/5 transition-all font-semibold flex items-center justify-center"
                >
                  Contact Us
                </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="relative hidden lg:block z-10"
          >
            <div className="w-full aspect-square bg-gradient-to-tr from-blue-600/10 to-cyan-400/10 rounded-[2.5rem] border border-white/20 dark:border-white/5 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-10 dark:opacity-30 mix-blend-overlay"></div>
              <div className="relative z-10 grid grid-cols-2 gap-6 p-8">
                 {[Code, MonitorPlay, Database, Award].map((Icon, i) => (
                    <div key={i} className="w-24 h-24 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-xl animate-bounce" style={{animationDelay: `${i * 0.2}s`, animationDuration: '3s'}}>
                       <Icon className="text-blue-600 dark:text-cyan-400" size={36} />
                    </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#0d1425]/50 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-white/10">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="text-center px-4">
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{stat.value}</h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Why Choose <span className="text-blue-600 dark:text-cyan-400">Vivexa</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">We provide an ecosystem designed for your rapid growth, combining theory with intensive practical application.</p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} variants={fadeInUp} className="p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 hover:border-blue-500/50 dark:hover:border-cyan-400/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Popular Courses */}
      <section className="py-24 px-6 bg-slate-100 dark:bg-[#0d1425] relative border-y border-slate-200 dark:border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Popular <span className="text-blue-600 dark:text-cyan-400">Courses</span></h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl text-lg">Master the most in-demand skills of 2026. From basic computing to advanced AI tools.</p>
            </div>
            <Link href="/courses" className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-semibold hover:gap-3 transition-all">
              View All Courses <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, i) => {
              const Icon = course.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="group rounded-3xl p-[1px] bg-gradient-to-b from-slate-200 to-slate-100 dark:from-white/10 dark:to-transparent hover:from-blue-600 hover:to-cyan-400 transition-all duration-500 overflow-hidden">
                  <div className="h-full bg-white dark:bg-[#111827] rounded-[23px] p-8 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 text-slate-600 dark:text-slate-300 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300 shadow-sm">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{course.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow">{course.desc}</p>
                    <Link href="/courses" className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 font-semibold text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center justify-center">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 dark:text-white">Student <span className="text-blue-600 dark:text-cyan-400">Success Stories</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-white dark:bg-[#111827] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm relative">
                <div className="flex gap-1 text-yellow-400 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-400 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                  <span className="text-sm text-blue-600 dark:text-cyan-400 font-medium">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Admission CTA Banner */}
      <section className="py-12 px-6 pb-24">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 shadow-2xl shadow-blue-500/20">
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Admissions Open for 2026</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">Take the first step towards a lucrative career in tech. Limited seats available for our upcoming premium batches.</p>
              <Link href="/admission" className="inline-block px-10 py-4 rounded-full bg-white text-blue-700 font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
                Enroll Today
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
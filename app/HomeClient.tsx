"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  MonitorPlay, Code, PenTool, Database, Award, Users, 
  BookOpen, Briefcase, ArrowRight, ChevronRight,
  CheckCircle2, ShieldCheck, Building2, Rocket, FileCheck, Search
} from "lucide-react";
import { usePublicCourses } from "@/hooks/usePublicCourses";
import { getCourseIcon } from "@/lib/courseIcons";

const FEATURES = [
  { title: "Expert Faculty", icon: Users, desc: "Learn from industry veterans with years of real-world experience." },
  { title: "Practical Training", icon: Code, desc: "100% hands-on learning with live projects and assignments." },
  { title: "Industry Skills", icon: Briefcase, desc: "Curriculum designed to match current IT industry requirements." },
  { title: "Career Guidance", icon: Award, desc: "Dedicated placement assistance and resume building workshops." },
];

const TRUST_PILLARS = [
  { title: "Industry-Aligned Curriculum", desc: "Courses updated to match current IT and digital skill requirements." },
  { title: "Hands-On Learning", desc: "Practical labs, assignments, and real-world projects in every program." },
  { title: "Verified Credentials", desc: "Secure online certificate verification for employers and students." },
];

const INTERNSHIP_BENEFITS = [
  "Real Project Experience",
  "Industry Exposure",
  "Practical Skill Development",
  "Portfolio Building",
  "Work Experience Certificate",
  "Career Growth Opportunities"
];

const VERIFY_FEATURES = [
  "Instant Certificate Verification",
  "Secure Verification System",
  "Unique Certificate ID",
  "Verified Student Information",
  "Authenticity Check"
];

// --- Animation Variants ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  }
};


export default function HomeClient() {
  const { displayCourses, courses, loading: coursesLoading } = usePublicCourses();

  const stats = [
    { value: courses.length > 0 ? `${courses.length}+` : "—", label: "Active Courses" },
    { value: "100%", label: "Practical Training" },
    { value: "Live", label: "Expert Faculty" },
    { value: "24/7", label: "Career Support" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-18 lg:pb-32 px-6">
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
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="text-center px-4">
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{stat.value}</h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
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
            {coursesLoading && (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-64 rounded-3xl bg-slate-200 dark:bg-white/5 animate-pulse" />
              ))
            )}
            {!coursesLoading && displayCourses.length === 0 && (
              <p className="col-span-full text-center text-slate-500 dark:text-slate-400 py-12">
                Courses are being updated. Please check back soon or{" "}
                <Link href="/contact" className="text-blue-600 dark:text-cyan-400 font-semibold">contact us</Link>.
              </p>
            )}
            {!coursesLoading && displayCourses.map((course, i) => {
              const Icon = getCourseIcon(course.title, course.category);
              return (
                <motion.div key={course.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="group rounded-3xl p-[1px] bg-gradient-to-b from-slate-200 to-slate-100 dark:from-white/10 dark:to-transparent hover:from-blue-600 hover:to-cyan-400 transition-all duration-500 overflow-hidden">
                  <div className="h-full bg-white dark:bg-[#111827] rounded-[23px] p-8 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 text-slate-600 dark:text-slate-300 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300 shadow-sm">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{course.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow line-clamp-3">{course.description}</p>
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

      {/* NEW SECTION 1: Internship Program */}
      <section className="py-24 px-6 relative border-t border-slate-200 dark:border-white/5 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold mb-6 tracking-wide uppercase">
              <Rocket size={16} /> Exclusive For Students
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 text-slate-900 dark:text-white">
              Internship Opportunities <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Also Available</span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Gain real-world experience through exclusive internship programs. Selected students may get opportunities to work on live projects after course completion through our parent company, Vivexa Tech.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {INTERNSHIP_BENEFITS.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Card Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="p-10 rounded-[2.5rem] bg-white/60 dark:bg-[#111827]/80 border border-slate-200 dark:border-white/10 backdrop-blur-2xl shadow-2xl hover:shadow-blue-500/10 transition-shadow group relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/20 to-cyan-400/0 rounded-full blur-2xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-8">
                <Building2 size={32} />
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Powered By Vivexa Tech</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Selected students may get internship opportunities through Vivexa Tech based on overall performance, project execution, and skill level during the training program.
              </p>
              
              <Link href="/contact" className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg transition-all active:scale-95 group/btn">
                Explore Opportunities <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>



      {/* 5. Trust Pillars */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 dark:text-white">Why Students <span className="text-blue-600 dark:text-cyan-400">Choose Vivexa</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TRUST_PILLARS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-white dark:bg-[#111827] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Certificate Verification */}
      <section className="py-24 px-6 bg-slate-100 dark:bg-[#0d1425] border-y border-slate-200 dark:border-white/5 relative overflow-hidden">
        {/* Glow Background */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:col-span-5 text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
                Verify Certificates <span className="text-blue-600 dark:text-cyan-400">Online</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Vivexa Institute of Technology provides secure, online certificate verification for authenticity and trust. Students and organizations can verify credentials instantly.
              </p>

              <div className="space-y-5 mb-10 inline-block text-left">
                {VERIFY_FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center lg:text-left">
                <Link href="/verify" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all active:scale-95 gap-2 group">
                  <ShieldCheck size={20} /> Verify Certificate
                </Link>
              </div>
            </motion.div>

            {/* Right UI Example Card */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-2xl relative">
                
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <FileCheck size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Certificate Search</h4>
                    <p className="text-sm text-slate-500">Enter unique ID to verify</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certificate ID</label>
                    <div className="flex items-center w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-400">
                      <Search size={18} className="mr-3 text-slate-400 shrink-0" />
                      <span className="font-mono tracking-wider text-sm">Enter certificate ID on verify page</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification URL</label>
                    <div className="flex items-center w-full px-5 py-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-cyan-400 break-all">
                      <span className="font-mono text-sm">vit.vivexatech.in/verify</span>
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-4">
                    <ShieldCheck className="text-blue-600 dark:text-cyan-400 shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-slate-700 dark:text-slate-200">Secure verification portal</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Use your unique certificate ID to confirm authenticity</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

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
              <Link href="/admissions" className="inline-block px-10 py-4 rounded-full bg-white text-blue-700 font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
                Enroll Today
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
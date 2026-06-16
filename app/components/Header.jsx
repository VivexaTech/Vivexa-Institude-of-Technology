"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Standardized Navigation Array
const NAV_LINKS = [
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Admissions", path: "/admissions" },
  { name: "Verify Certificate", path: "/verify" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism background
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu automatically if window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-sm border-b border-slate-200 dark:border-slate-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Branding */}
        <Link href="/" className="flex items-center gap-3 group z-50">
          
          <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white ">
            Vivexa<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Institute of Technology</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          {/* Apply Now Button */}
          <Link 
            href="/admissions" 
            className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:bg-blue-600 dark:hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-md hover:shadow-blue-500/25"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden z-50">
          <button 
            className="p-2 -mr-2 text-slate-900 dark:text-white transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 origin-top overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-5">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {/* Mobile Theme Toggle */}

            <Link 
              href="/admissions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-shadow"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
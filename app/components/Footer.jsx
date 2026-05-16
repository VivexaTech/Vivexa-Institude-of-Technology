import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pt-20 pb-10 px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand & About */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              V
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Vivexa<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Institute of Technology</span>
            </span>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
            A premium computer education institute focused on practical skills, modern technologies, and career-driven growth for the innovators of tomorrow.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 text-slate-500 dark:text-slate-400">
            {[
              { icon: FaLinkedinIn, label: "LinkedIn" },
              { icon: FaFacebookF, label: "Facebook" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaXTwitter, label: "Twitter" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-6 text-lg text-slate-900 dark:text-white">Quick Links</h4>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            {[ "About", "Courses", "Admissions", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                key={item}
                  href= {`${item.toLowerCase()}`} 
                  className="inline-block hover:text-blue-600 dark:hover:text-cyan-400 hover:translate-x-1 transition-all duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-6 text-lg text-slate-900 dark:text-white">Contact Info</h4>
          <ul className="space-y-4 text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3 group">
              <MapPin size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" /> 
              <span>Cyber Hub, Gurugram,<br/>Haryana, India</span>
            </li>
            <li className="flex items-center gap-3 group">
              <Phone size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" /> 
              <a href="tel:+919354486861" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">+91 93544 86861</a>
            </li>
            <li className="flex items-center gap-3 group">
              <Mail size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" /> 
              <a href="mailto:info@vivexatech.in" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">info@vivexatech.in</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200 dark:border-slate-800 pt-8 text-slate-500 dark:text-slate-400 text-sm">
        <p>© {currentYear} Vivexa Institute of Technology. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
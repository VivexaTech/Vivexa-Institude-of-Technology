import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const QUICK_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "All Courses", href: "/courses" },
  { name: "Admissions", href: "/admissions" },
  { name: "Verify Certificate", href: "/verify" },
  { name: "Contact Us", href: "/contact" },
];

const SOCIAL_LINKS = [
  { icon: FaLinkedinIn, label: "LinkedIn", url: "https://www.linkedin.com/company/vivexa-institute-of-technology" },
  { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/vivexainstituteoftechnology" },
  { icon: FaXTwitter, label: "Twitter", url: "https://twitter.com/vivexatech" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 pt-20 pb-10 px-6 overflow-hidden border-t border-slate-200 dark:border-white/5 ">
      {/* Subtle Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* Brand & About */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
            <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Vivexa<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Institute of Technology</span>
            </div>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
            A premium computer education institute focused on practical skills, modern technologies, and career-driven growth for the innovators of tomorrow.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 text-slate-500 dark:text-slate-400">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
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
            {QUICK_LINKS.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="inline-block hover:text-blue-600 dark:hover:text-cyan-400 hover:translate-x-1 transition-all duration-200 font-medium"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-6 text-lg text-slate-900 dark:text-white">Contact Info</h4>
          <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-medium">
            <li className="flex items-start gap-3 group">
              <MapPin size={20} className="text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" /> 
              <span>Ekta tower, Basement, Main Rd,<br /> Ashok Vihar Phase III Extension, <br /> Gurugram, Haryana 122006</span>
            </li>
            <li className="flex items-center gap-3 group">
              <Phone size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" /> 
              <a href="tel:+919582194338" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">+91 95821 94338</a>
            </li>
            <li className="flex items-center gap-3 group">
              <Mail size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" /> 
              <a href="mailto:info@vivexatech.in" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">info@vivexatech.in</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200 dark:border-white/10 pt-8 text-slate-500 dark:text-slate-400 text-sm">
        <p className="text-center md:text-left">
          © {currentYear} Vivexa Institute of Technology. All rights reserved. <br className="md:hidden" />
          Powered by <a href="https://www.vivexatech.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-cyan-400 hover:underline transition-colors">Vivexa Tech</a>
        </p>
        <div className="flex gap-6 font-medium">
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
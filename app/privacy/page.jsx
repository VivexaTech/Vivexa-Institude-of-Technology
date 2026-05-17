import { Shield, Lock, Phone, Mail, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Vivexa Institute of Technology",
  description: "Read the Privacy Policy of Vivexa Institute of Technology. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://vit.vivexatech.in/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 2026";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] py-16 md:py-24 px-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 mb-6">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Policy</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your privacy matters to us. Please read this privacy policy carefully to understand how Vivexa Institute of Technology collects and uses your information.
          </p>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-4 uppercase tracking-wider">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed relative z-10">
            
            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
              <p>
                At Vivexa Institute of Technology, we deeply value user privacy and are committed to protecting our students' personal information. This Privacy Policy outlines our practices regarding the collection, use, and safeguarding of your data when you visit our website, submit inquiries, or enroll in our computer education courses.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Information We Collect</h2>
              <p className="mb-3">When you interact with our website or admission desk, we may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li><strong>Personal Identification:</strong> Full Name, Date of Birth, Gender.</li>
                <li><strong>Contact Details:</strong> Email Address, Phone/WhatsApp Number, Full Address.</li>
                <li><strong>Academic Details:</strong> Previous qualifications and course inquiry details.</li>
                <li><strong>Direct Communications:</strong> Any messages or feedback submitted through our contact and admission forms.</li>
              </ul>
            </section>

            {/* 3. How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. How We Use Information</h2>
              <p className="mb-3">The information we collect is strictly used to provide a seamless educational experience. We may use your data for:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>Processing your admission and enrollment applications.</li>
                <li>Communicating with you regarding course updates, schedules, and class links.</li>
                <li>Providing technical support and career counseling.</li>
                <li>Improving our website, course curriculum, and overall services.</li>
              </ul>
            </section>

            {/* 4. Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. Data Security</h2>
              </div>
              <p>
                We prioritize the security of your personal data. Vivexa Institute of Technology implements reasonable, industry-standard security measures to protect student information from unauthorized access, alteration, disclosure, or destruction. Your personal information is securely stored and is not publicly shared.
              </p>
            </section>

            {/* 5. Online Classes & Communication */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Online Classes & Communication</h2>
              <p>
                Official institute communication may occur through Email, Phone Calls, WhatsApp, or designated Online Learning Platforms. To maintain privacy and security for all students, online class links, digital study materials, and recorded sessions must not be shared with unauthorized third parties without explicit permission from the institute.
              </p>
            </section>

            {/* 6. Cookies & Website Analytics */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Cookies & Website Analytics</h2>
              <p>
                Our website may use cookies to enhance your browsing experience, remember your preferences, and track site traffic. Additionally, we may use basic analytics tools to understand how users interact with our website, helping us optimize page performance and user experience.
              </p>
            </section>

            {/* 7. Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Third-Party Services</h2>
              <p>
                We may utilize trusted third-party services—such as Google Workspace, secure hosting providers, payment gateways, and form processors—when necessary to facilitate our operations. These services only have access to the information strictly required to perform their designated functions on our behalf.
              </p>
            </section>

            {/* 8. Information Sharing Policy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Information Sharing Policy</h2>
              <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  We do not sell, rent, or trade your personal information to third parties.
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Your data is exclusively utilized for educational, administrative, and institute-related purposes. We will only disclose personal information if required by law or to protect the rights and safety of our institute and its students.
                </p>
              </div>
            </section>

            {/* 9. Student Rights */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. Student Rights</h2>
              <p>
                As a student or user, you have the right to request the correction or update of your personal information in our records. If you have any concerns regarding your privacy or wish to update your data, you can contact our administrative desk.
              </p>
            </section>

            {/* 10. Policy Updates */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10. Policy Updates</h2>
              <p>
                Vivexa Institute of Technology reserves the right to modify or update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We encourage you to review this page periodically for any updates.
              </p>
            </section>

            {/* 11. Contact Information */}
            <section className="pt-8 border-t border-slate-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">11. Contact Information</h2>
              <p className="mb-6">
                If you have any questions, concerns, or requests related to this Privacy Policy, please contact us using the information below:
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex flex-col p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <Phone className="text-blue-500 mb-3" size={24} />
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Call Us</span>
                  <a href="tel:+919354486861" className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">+91 93544 86861</a>
                </div>
                
                <div className="flex flex-col p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <Mail className="text-blue-500 mb-3" size={24} />
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Email Us</span>
                  <a href="mailto:contact@vivexatech.in" className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">contact@vivexatech.in</a>
                </div>

                <div className="flex flex-col p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <Globe className="text-blue-500 mb-3" size={24} />
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Website</span>
                  <a href="https://vit.vivexatech.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">vit.vivexatech.in</a>
                </div>
              </div>
            </section>

          </div>
        </div>
        
      </div>
    </main>
  );
}
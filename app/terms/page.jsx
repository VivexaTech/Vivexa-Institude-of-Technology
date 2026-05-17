import { Phone, Mail, Globe, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Vivexa Institute of Technology",
  description: "Read the terms and conditions for enrolling in professional computer courses at Vivexa Institute of Technology.",
  alternates: {
    canonical: "https://vit.vivexatech.in/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "May 2026";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] py-16 md:py-24 px-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Conditions</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before enrolling in any course at Vivexa Institute of Technology.
          </p>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-4 uppercase tracking-wider">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-xl p-8 md:p-12 lg:p-16">
          
          <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed">
            
            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to Vivexa Institute of Technology. By enrolling in any of our courses, browsing our website, or using our educational services, you acknowledge that you have read, understood, and agreed to be bound by these terms and policies. If you do not agree with any part of these terms, please refrain from using our services.
              </p>
            </section>

            {/* 2. Course Enrollment Policy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Course Enrollment Policy</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>All admissions are subject to seat availability in the respective batches.</li>
                <li>Students must provide accurate, current, and complete information during the registration and admission process.</li>
                <li>Vivexa Institute of Technology reserves the right to reject incomplete applications or cancel admissions if false information is detected.</li>
              </ul>
            </section>

            {/* 3. Fees & Payment Policy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Fees & Payment Policy</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>Course fees must be paid on or before the designated due dates.</li>
                <li>If an installment plan is applicable, students must strictly adhere to the payment schedule.</li>
                <li>Delayed payments may result in the temporary suspension of course access or cancellation of enrollment without prior notice.</li>
              </ul>
            </section>

            {/* 4. Online Classes Policy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Online Classes Policy</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>Currently, Vivexa Institute of Technology provides educational services exclusively through online classes.</li>
                <li>It is the student's responsibility to ensure they have a stable internet connection and compatible hardware to attend classes.</li>
                <li>Recording, capturing, distributing, or sharing live class streams or proprietary institute materials without explicit written permission is strictly prohibited.</li>
              </ul>
            </section>

            {/* 5. Attendance & Participation */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Attendance & Participation</h2>
              <p>
                Consistent attendance is crucial for skill development. Students are expected to attend live classes regularly. Active participation in practical learning sessions, assignments, and live projects is highly encouraged to maximize the value of the education provided.
              </p>
            </section>

            {/* 6. Certificates Policy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Certificates Policy</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>A Certificate of Completion will only be issued after the successful completion of the course curriculum.</li>
                <li>Certificate eligibility is contingent upon maintaining adequate attendance, completing assigned projects, and clearing final assessments (if any).</li>
              </ul>
            </section>

            {/* 7. Refund & Cancellation Policy */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Refund & Cancellation Policy</h2>
              <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Course fees, once paid, are strictly non-refundable and non-transferable.
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Refunds or batch transfers are only considered under highly exceptional circumstances and are entirely at the discretion of the institute's management team.
                </p>
              </div>
            </section>

            {/* 8. Student Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Student Conduct</h2>
              <p>
                Vivexa Institute of Technology maintains a strict code of conduct. Respectful and professional behavior is expected toward faculty and peers at all times. Any misuse of the digital learning platform, abusive behavior, or disruption of classes will result in immediate suspension or termination of enrollment.
              </p>
            </section>

            {/* 9. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. Intellectual Property</h2>
              <p>
                All study materials, videos, PDFs, presentations, and code snippets provided during the course are the exclusive intellectual property of Vivexa Institute of Technology. Unauthorized distribution, reselling, or uploading of these materials to public platforms is legally prohibited.
              </p>
            </section>

            {/* 10. Privacy & Data Usage */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10. Privacy & Data Usage</h2>
              <p>
                We respect your privacy. Student information collected during enrollment will remain highly secure and confidential. Your data will only be used for educational tracking, administrative communication, and internal institute updates.
              </p>
            </section>

            {/* 11. Modification of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11. Modification of Terms</h2>
              <p>
                The institute reserves the right to update, modify, or replace these terms and conditions at any time without prior notice. Continued use of our services after any such changes constitutes your consent to the new terms.
              </p>
            </section>

            {/* 12. Contact Information */}
            <section className="pt-8 border-t border-slate-200 dark:border-white/10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">12. Contact Information</h2>
              <p className="mb-6">
                If you have any questions or concerns regarding these terms, please reach out to our administrative desk:
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
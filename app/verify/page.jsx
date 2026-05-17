import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export const metadata = {
  title: "Certificate Verification | Vivexa Institute of Technology",
  description: "Verify the authenticity of certificates issued by Vivexa Institute of Technology.",
};

export default function CertificateVerificationPage() {
  return (
    <Suspense fallback={<VerificationSkeleton />}>
      <VerifyClient />
    </Suspense>
  );
}

// Premium futuristic loader fallback
function VerificationSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] flex items-center justify-center">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
        <div className="w-10 h-10 bg-blue-500/10 rounded-full animate-pulse"></div>
      </div>
    </main>
  );
}
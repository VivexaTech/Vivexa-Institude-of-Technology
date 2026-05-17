import AdmissionClient from "./AdmissionClient";

export const metadata = {
  title: "Admissions Open 2026 | Vivexa Institute of Technology",
  description: "Apply for admission at Vivexa Institute of Technology. Start your journey toward future-ready digital skills with our premium computer courses.",
  keywords: [
    "Computer Institute Admission", 
    "Vivexa Institute Of Technology Admission Form", 
    "Apply for Computer Courses", 
    "IT Training Admissions Gurugram", 
    "DCA ADCA Admission 2026"
  ],
  authors: [{ name: "Vivexa Institute of Technology" }],
  alternates: {
    canonical: "https://vit.vivexatech.in/admission",
  },
  openGraph: {
    title: "Admissions Open 2026 | Vivexa Institute of Technology",
    description: "Start your journey toward future-ready digital skills. Apply today for our premium computer courses.",
    url: "https://vit.vivexatech.in/admission",
    siteName: "Vivexa Institute of Technology",
    images: [
      {
        url: "/og-admission.jpg",
        width: 1200,
        height: 630,
        alt: "Vivexa Institute of Technology Admissions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admissions Open 2026 | Vivexa Tech",
    description: "Apply today and start learning professional computer skills at Vivexa Institute of Technology.",
    images: ["/og-admission.jpg"],
  },
};

export default function AdmissionPage() {
  return <AdmissionClient />;
}
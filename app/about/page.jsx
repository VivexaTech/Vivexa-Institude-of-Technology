import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us | Vivexa Institute of Technology",
  description: "Discover Vivexa Institute of Technology, Gurugram's premium computer education center. We offer practical IT training, expert faculty, and career support.",
  keywords: [
    "Computer Institute in Gurugram", 
    "IT Training Center", 
    "Learn Programming", 
    "Web Development Course", 
    "Vivexa Tech", 
    "Digital Skills Training"
  ],
  authors: [{ name: "Vivexa Institute of Technology" }],
  alternates: {
    canonical: "https://vit.vivexatech.in/about",
  },
  openGraph: {
    title: "About Vivexa Institute of Technology",
    description: "Empowering students with practical computer skills and technology education for future-ready careers.",
    url: "https://vit.vivexatech.in/about",
    siteName: "Vivexa Institute of Technology",
    images: [
      {
        url: "/og-image.jpg", // Ensure this file exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Vivexa Institute of Technology Campus and Students",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vivexa Institute of Technology",
    description: "Gurugram's premium computer education center. Practical training & career support.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  // JSON-LD Structured Data for Local SEO (Educational Organization)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Vivexa Institute of Technology",
    "url": "https://vit.vivexatech.in",
    "logo": "https://vit.vivexatech.in/logo.png",
    "description": "Premium computer education institute offering practical digital skills and programming courses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/vivexatech",
      "https://www.instagram.com/vivexatech",
      "https://www.linkedin.com/company/vivexatech"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Vivexa Institute of Technology | Premium Computer Education",
  description: "Build your future with future-ready digital skills. Vivexa Institute of Technology offers practical training in Web Development, Design, Tally, and AI tools.",
  keywords: [
    "Computer Education Institute", 
    "IT Training Center", 
    "Web Development Courses", 
    "Graphic Design Institute", 
    "Tally and GST Training", 
    "Vivexa Tech Gurugram"
  ],
  authors: [{ name: "Vivexa Institute of Technology" }],
  alternates: {
    canonical: "https://vit.vivexatech.in",
  },
  openGraph: {
    title: "Vivexa Institute of Technology | Premium Computer Education",
    description: "Master future-ready digital skills with 100% practical training from industry experts.",
    url: "https://vit.vivexatech.in",
    siteName: "Vivexa Institute of Technology",
    images: [
      {
        url: "https://vit.vivexatech.in/logo.png", // Ensure this image exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Vivexa Institute of Technology Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivexa Institute of Technology",
    description: "Premium computer education and digital skills training.",
    images: ["https://vit.vivexatech.in/logo.png"],
  },
};

export default function HomePage() {
  // JSON-LD Structured Data for Root Domain
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://vit.vivexatech.in/#website",
        "url": "https://vit.vivexatech.in",
        "name": "Vivexa Institute of Technology",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://vit.vivexatech.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://vit.vivexatech.in/#organization",
        "name": "Vivexa Institute of Technology",
        "url": "https://vit.vivexatech.in",
        "logo": "https://vit.vivexatech.in/logo.png",
        "description": "Premium computer education institute offering practical digital skills training.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gurugram",
          "addressRegion": "Haryana",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
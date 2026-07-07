import ContactClient from "./ContactClient";
import { SITE } from "@/lib/siteConfig";

export const metadata = {
  title: "Contact Us | Vivexa Institute of Technology",
  description: `Get in touch with ${SITE.name} for admission inquiries, course counseling, and career guidance. ${SITE.addressFormatted}.`,
  keywords: [
    "Contact Vivexa Tech", 
    "Computer Institute Phone Number", 
    "IT Training Center Gurugram Location", 
    "Admission Inquiry Vivexa", 
    "Course Counseling"
  ],
  authors: [{ name: "Vivexa Institute of Technology" }],
  alternates: {
    canonical: "https://vit.vivexatech.in/contact",
  },
  openGraph: {
    title: "Contact Us | Vivexa Institute of Technology",
    description: "Reach out for admissions, courses, and career guidance. We are here to help you start your tech journey.",
    url: "https://vit.vivexatech.in/contact",
    siteName: "Vivexa Institute of Technology",
    images: [
      {
        url: "/og-contact.jpg", // Ensure this image exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Contact Vivexa Institute of Technology",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Vivexa Institute of Technology",
    description: "Get in touch with us for premium computer education and admission details in Gurugram.",
    images: ["/og-contact.jpg"],
  },
};

export default function ContactPage() {
  // JSON-LD Structured Data for Local Business / Contact Info
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Vivexa Institute of Technology",
    "url": "https://vit.vivexatech.in",
    "logo": "https://vit.vivexatech.in/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SITE.phoneTel,
      "contactType": "admissions",
      "email": SITE.email,
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE.address.street,
      "addressLocality": SITE.address.locality,
      "addressRegion": SITE.address.region,
      "postalCode": SITE.address.postalCode,
      "addressCountry": SITE.address.country
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
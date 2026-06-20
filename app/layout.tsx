import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vit.vivexatech.in"),

  title: {
    default: "Vivexa Institute of Technology",
    template: "%s | Vivexa Institute of Technology",
  },

  description:
    "Vivexa Institute of Technology offers premium computer education, practical IT training, web development, graphic design, digital skills, and future-ready technology courses.",

  keywords: [
    "Vivexa Institute of Technology",
    "Computer Institute Gurgaon",
    "Computer Courses",
    "Web Development Course",
    "Graphic Design Course",
    "Digital Marketing Course",
    "Computer Training Institute",
    "IT Courses Gurgaon",
    "Online Computer Classes",
    "Technology Institute",
  ],

  authors: [{ name: "Vivexa Institute of Technology" }],

  creator: "Vivexa Institute of Technology",

  publisher: "Vivexa Institute of Technology",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Vivexa Institute of Technology",
    description:
      "Premium computer education and practical IT training for future-ready digital skills.",
    url: "https://vit.vivexatech.in",
    siteName: "Vivexa Institute of Technology",
    images: [
      {
        url: "/icon1.png",
        width: 1200,
        height: 630,
        alt: "Vivexa Institute of Technology",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vivexa Institute of Technology",
    description:
      "Premium computer education and practical IT training.",
    images: ["/icon1.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://vit.vivexatech.in/#organization",

  name: "Vivexa Institute of Technology",
  alternateName: "VIT",

  url: "https://vit.vivexatech.in",
  logo: "https://vit.vivexatech.in/icon1.png",
  image: "https://vit.vivexatech.in/icon1.png",

  description:
    "Vivexa Institute of Technology provides professional computer education, web development, graphic design, digital marketing, AI and industry-ready IT training.",

  email: "contact@vivexatech.in",
  telephone: "+91 9354486861",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    addressCountry: "IN"
  },

  sameAs: [
    "https://www.instagram.com/vivexainstituteoftechnology",
    "https://www.linkedin.com/company/vivexa-institute-of-technology"
  ]
};


const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  "@id": "https://vit.vivexatech.in/#website",

  url: "https://vit.vivexatech.in",
  name: "Vivexa Institute of Technology",

  publisher: {
    "@id": "https://vit.vivexatech.in/#organization"
  },

  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://vit.vivexatech.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="apple-mobile-web-app-title"
          content="Vivexa Institute of Technology"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
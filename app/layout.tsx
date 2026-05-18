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
    name: "Vivexa Institute of Technology",
    url: "https://vit.vivexatech.in",
    logo: "https://vit.vivexatech.in/icon1.png",
    description:
      "Premium computer education institute offering practical IT training and future-ready digital skills.",
    email: "contact@vivexatech.in",
    telephone: "+91 9354486861",
    sameAs: [
      "https://www.linkedin.com/company/vivexa-tech",
      "https://www.instagram.com/vivexainstituteoftechnology",
    ],
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
      </head>

      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
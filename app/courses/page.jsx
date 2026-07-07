import CoursesClient from "./CoursesClient";
import { getPublicCourses } from "@/lib/getPublicCourses";

export const metadata = {
  title: "Professional Computer Courses | Vivexa Institute of Technology",
  description: "Explore premium computer courses at Vivexa Institute of Technology. We offer Web Development, DCA, ADCA, Tally Prime, Graphic Design, and Future AI Skills.",
  keywords: [
    "Computer Courses in Gurugram", 
    "Web Development Course", 
    "DCA Course", 
    "ADCA Certification", 
    "Tally Prime Training", 
    "Graphic Design Classes",
    "AI Tools Training",
    "Vivexa Tech Courses"
  ],
  authors: [{ name: "Vivexa Institute of Technology" }],
  alternates: {
    canonical: "https://vit.vivexatech.in/courses",
  },
  openGraph: {
    title: "Professional Computer Courses | Vivexa Institute of Technology",
    description: "Learn practical digital skills and build your future with industry-relevant computer education.",
    url: "https://vit.vivexatech.in/courses",
    siteName: "Vivexa Institute of Technology",
    images: [
      {
        url: "/og-courses.jpg", // Ensure this image exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Vivexa Tech Computer Courses and Training",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Computer Courses | Vivexa Tech",
    description: "Master digital skills with our hands-on Web Development, Design, and Accounting courses.",
    images: ["/og-courses.jpg"],
  },
};

export default async function CoursesPage() {
  const courses = await getPublicCourses();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": courses.slice(0, 12).map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        url: "https://vit.vivexatech.in/courses",
        name: course.title || course.id,
        description: course.description || "",
        provider: {
          "@type": "EducationalOrganization",
          name: "Vivexa Institute of Technology",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoursesClient initialCourses={courses} />
    </>
  );
}
import type { PersonalInfo, Project, ServiceItem } from "@/types";
import type { SeoConfig } from "./data-fetchers";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PersonSchemaCustom {
  alternateName?: string;
  givenName?: string;
  familyName?: string;
  alumniName?: string;
  alumniUrl?: string;
  knowsAbout?: string[];
  newsArticles?: Array<{ name: string; url: string }>;
}

export interface GenerateSchemasInput {
  seoConfig: SeoConfig;
  personalInfo?: PersonalInfo;
  services?: ServiceItem[];
  projects?: Project[];
  faqList?: FaqItem[];
  personCustom?: PersonSchemaCustom;
  customRawJsonLd?: string;
}

export const defaultFaqList: FaqItem[] = [
  {
    question: "Vũ Bảo Khanh chuyên xây dựng loại website nào?",
    answer:
      "Tôi chuyên xây dựng website doanh nghiệp tùy biến, hệ thống thương mại điện tử, admin & ERP panel và tối ưu hóa hiệu năng SEO. Các công nghệ chính bao gồm Laravel, React, Next.js, NestJS và TypeScript.",
  },
  {
    question: "What technologies does Vu Bao Khanh use for web development?",
    answer:
      "Vu Bao Khanh specializes in fullstack development using Laravel (PHP), NestJS (Node.js), React, Next.js, TypeScript, MySQL, PostgreSQL, and Docker for enterprise-grade web applications.",
  },
  {
    question: "Vũ Bảo Khanh có nhận làm website thương mại điện tử không?",
    answer:
      "Có. Tôi xây dựng các cửa hàng trực tuyến tỷ lệ chuyển đổi cao với giỏ hàng bảo mật, quy trình thanh toán mượt mà và tích hợp các cổng thanh toán phổ biến như VNPay, Momo, và Stripe.",
  },
  {
    question: "How can I contact Vu Bao Khanh for a web development project?",
    answer:
      "You can reach Vu Bao Khanh via email at vubaokhanh2311@gmail.com, connect on LinkedIn at linkedin.com/in/vubaokhannh, or browse the portfolio at vubaokhanh.tech.",
  },
  {
    question: "Vũ Bảo Khanh có kinh nghiệm làm việc tại công ty nào?",
    answer:
      "Hiện tại tôi đang làm Fullstack PHP Developer tại BM WEB (từ tháng 1/2026). Trước đó tôi thực tập Frontend Developer tại Trung tâm Phần mềm Đại học Cần Thơ (CUSC) từ tháng 5 đến tháng 8 năm 2025.",
  },
];

export const defaultPersonCustom: PersonSchemaCustom = {
  alternateName: "Vũ Bảo Khanh",
  givenName: "Bao Khanh",
  familyName: "Vu",
  alumniName: "FPT Polytechnic",
  alumniUrl: "https://caodang.fpt.edu.vn",
  knowsAbout: [
    "PHP",
    "Laravel",
    "React",
    "TypeScript",
    "NestJS",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "Next.js",
    "Docker",
    "Redis",
    "Prisma",
    "Web Development",
    "Backend Engineering",
    "Frontend Development",
    "RESTful APIs",
    "System Design",
  ],
  newsArticles: [
    {
      name: "Dự án tốt nghiệp: Xây dựng website hệ thống đặt vé xe bus tích hợp hệ thống bản đồ định vị",
      url: "https://caodang.fpt.edu.vn/tin-tuc-poly/du-an-tot-nghiep-xay-dung-website-he-thong-dat-ve-xe-bus-tich-hop-he-thong-ban-do-dinh-vi.html",
    },
    {
      name: "Ấn tượng với dự án Xưởng phần mềm: Website quản lý sinh viên tích hợp Google Drive API",
      url: "https://caodang.fpt.edu.vn/tin-tuc-poly/an-tuong-voi-du-an-xuong-phan-mem-website-quan-ly-sinh-vien-tich-hop-google-drive-api.html",
    },
    {
      name: "Sinh viên FPT Polytechnic Cần Thơ thiết kế và xây dựng hệ thống bán hàng laptop trực tuyến",
      url: "https://caodang.fpt.edu.vn/tin-tuc-poly/sinh-vien-fpt-polytechnic-can-tho-thiet-ke-va-xay-dung-he-thong-ban-hang-laptop-truc-tuyen.html",
    },
  ],
};

export function generateAllSchemas(input: GenerateSchemasInput): Record<string, unknown>[] {
  const { seoConfig, personalInfo, services, projects } = input;

  const baseUrl = seoConfig.canonicalUrl || "https://vubaokhanh.tech";
  const authorName = seoConfig.authorName || personalInfo?.name || "Vũ Bảo Khanh";
  const jobTitle = seoConfig.jobTitle || personalInfo?.role || "Fullstack Web Engineer";
  const organization = seoConfig.organization || "BM WEB";
  const email = personalInfo?.email || "vubaokhanh2311@gmail.com";
  const ogImage = seoConfig.ogImageUrl || `${baseUrl}/og-image.png`;

  const personCustom = input.personCustom || defaultPersonCustom;
  const faqList = input.faqList && input.faqList.length > 0 ? input.faqList : defaultFaqList;

  // 1. Person Schema
  const personSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: authorName,
    alternateName: personCustom.alternateName || "Vũ Bảo Khanh",
    givenName: personCustom.givenName || "Bao Khanh",
    familyName: personCustom.familyName || "Vu",
    url: baseUrl,
    image: ogImage,
    jobTitle: jobTitle,
    description: seoConfig.seoDescription,
    email: email,
    sameAs: [
      personalInfo?.github || "https://github.com/vubaokhannh",
      personalInfo?.linkedin || "https://linkedin.com/in/vubaokhannh",
      personalInfo?.facebook || "https://facebook.com/vubaokhannh",
    ].filter(Boolean),
    worksFor: {
      "@type": "Organization",
      name: organization,
    },
    hasOccupation: [
      {
        "@type": "Role",
        roleName: jobTitle,
        startDate: "2026-01",
        worksFor: { "@type": "Organization", name: organization },
      },
      {
        "@type": "Role",
        roleName: "Frontend Developer (Intern)",
        startDate: "2025-05",
        endDate: "2025-08",
        worksFor: {
          "@type": "Organization",
          name: "Cantho University Software Center (CUSC)",
          url: "https://www.ctu.edu.vn",
        },
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: personCustom.alumniName || "FPT Polytechnic",
      url: personCustom.alumniUrl || "https://caodang.fpt.edu.vn",
    },
    knowsAbout: personCustom.knowsAbout && personCustom.knowsAbout.length > 0 ? personCustom.knowsAbout : defaultPersonCustom.knowsAbout,
    nationality: {
      "@type": "Country",
      name: "Vietnam",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Can Tho",
      addressCountry: "VN",
    },
    subjectOf: (personCustom.newsArticles && personCustom.newsArticles.length > 0
      ? personCustom.newsArticles
      : defaultPersonCustom.newsArticles
    )?.map((art) => ({
      "@type": "NewsArticle",
      name: art.name,
      url: art.url,
    })),
  };

  // 2. WebSite Schema
  const websiteSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: `${authorName} - Portfolio & Services`,
    url: baseUrl,
    description: seoConfig.seoDescription,
    author: { "@id": `${baseUrl}/#person` },
    inLanguage: ["en", "vi"],
  };

  // 3. ProfessionalService Schema (built dynamically from live services or defaults)
  const serviceOfferItems = (services && services.length > 0 ? services : [
    { title: "Custom Web Development", description: "Building fast, standard-compliant, responsive, and SEO-friendly websites tailored to your brand identity." },
    { title: "E-Commerce Solutions", description: "Creating high-converting online stores with secure carts, checkout pipelines, and popular payment gateways." },
    { title: "Admin & ERP Panels", description: "Tailoring back-office management dashboards and databases to automate and streamline your operations." },
    { title: "Performance & SEO Optimization", description: "Auditing user experience, optimizing page loading speed, and structuring metadata for top search rankings." },
  ]).map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.title,
      description: s.description,
    },
  }));

  const professionalServiceSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${authorName} Web Development Services`,
    image: ogImage,
    url: baseUrl,
    priceRange: "$$",
    telephone: "",
    email: email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Can Tho",
      addressCountry: "VN",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: serviceOfferItems,
    },
  };

  // 4. SoftwareApplication Schema (built dynamically from live projects or defaults)
  const projectItems = (projects && projects.length > 0 ? projects : [
    {
      title: "Task Management System (Krello)",
      description: "A real-time collaborative workspace inspired by Trello, featuring live data sync, role-based access control (RBAC), and mobile push notifications.",
      liveUrl: "https://web.krello.biz/",
      tech: ["TypeScript", "NestJS", "React", "PostgreSQL", "Socket.IO"],
      year: "2025",
    },
    {
      title: "Online Vehicle Ticketing System",
      description: "An intelligent bus booking platform featuring live route tracking maps, automated IoT smart cameras, and digital wallet payments.",
      liveUrl: baseUrl,
      tech: ["Laravel", "React", "InertiaJS", "MySQL"],
      year: "2025",
    },
    {
      title: "E-commerce Platform for Wine Sales",
      description: "A premium custom-built online wine store with AI-powered voice search, behavioral recommendations, and dynamic multi-variant product handling.",
      liveUrl: baseUrl,
      tech: ["PHP", "JavaScript", "MySQL"],
      year: "2024",
    },
  ]).map((p, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "SoftwareApplication",
      name: p.title,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: p.liveUrl || baseUrl,
      author: { "@id": `${baseUrl}/#person` },
      description: p.description,
      programmingLanguage: p.tech || [],
      dateCreated: p.year || "2025",
    },
  }));

  const softwareAppsSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Portfolio Projects by ${authorName}`,
    itemListElement: projectItems,
  };

  // 5. FAQPage Schema (for Google Rich Snippets)
  const faqSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // 6. SiteNavigationElement Schema
  const siteNavSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Site Navigation",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "About", url: `${baseUrl}/about` },
      { "@type": "SiteNavigationElement", position: 2, name: "Services", url: `${baseUrl}/services` },
      { "@type": "SiteNavigationElement", position: 3, name: "Projects", url: `${baseUrl}/#projects` },
      { "@type": "SiteNavigationElement", position: 4, name: "Skills", url: `${baseUrl}/#skills` },
      { "@type": "SiteNavigationElement", position: 5, name: "Experience", url: `${baseUrl}/#experience` },
      { "@type": "SiteNavigationElement", position: 6, name: "Contact", url: `${baseUrl}/#contact` },
      { "@type": "SiteNavigationElement", position: 7, name: "Blog", url: `${baseUrl}/blog` },
    ],
  };

  const schemas: Record<string, unknown>[] = [
    personSchema,
    websiteSchema,
    professionalServiceSchema,
    softwareAppsSchema,
    faqSchema,
    siteNavSchema,
  ];

  // 7. Optional Custom Raw JSON-LD Schema
  if (input.customRawJsonLd && input.customRawJsonLd.trim().length > 0) {
    try {
      const parsedCustom = JSON.parse(input.customRawJsonLd.trim());
      schemas.push(parsedCustom);
    } catch {
      // Ignore invalid raw JSON
    }
  }

  return schemas;
}

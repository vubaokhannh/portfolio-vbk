import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Custom Web Development",
    description: "Building fast, standard-compliant, responsive, and SEO-friendly websites tailored to your brand identity.",
    icon: "globe",
    color: "#00D9FF",
    tags: ["React/Next.js", "Laravel MVC", "Tailwind CSS", "RESTful APIs"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    description: "Creating high-converting online stores with secure carts, checkout pipelines, and popular payment gateways.",
    icon: "shopping-bag",
    color: "#7C3AED",
    tags: ["Shopping Cart", "Payment APIs", "Product Inventory", "Order Pipeline"],
  },
  {
    id: "admin-system",
    title: "Admin & ERP Panels",
    description: "Tailoring back-office management dashboards and databases to automate and streamline your operations.",
    icon: "layers",
    color: "#4F46E5",
    tags: ["CRM/ERP Panels", "Data Analytics", "Filament CMS", "Access Control"],
  },
  {
    id: "optimization",
    title: "Performance & SEO",
    description: "Auditing user experience, optimizing page loading speed, and structuring metadata for top search rankings.",
    icon: "zap",
    color: "#F59E0B",
    tags: ["PageSpeed Audit", "Technical SEO", "Analytics Setup", "UX Auditing"],
  },
];

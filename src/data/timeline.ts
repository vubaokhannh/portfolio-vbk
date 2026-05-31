import type { TimelineItem } from "@/types";

export const timeline: TimelineItem[] = [
  {
    id: "t1",
    year: "2023",
    title: "Started Professional Development",
    description:
      "Began my journey in professional web development, diving deep into Laravel and PHP backend development. Built foundational skills in REST APIs, MVC architecture, and relational databases.",
    tags: ["PHP", "Laravel", "MySQL", "REST API"],
    type: "milestone",
    color: "#4F46E5",
  },
  {
    id: "t2",
    year: "2024",
    title: "Built Enterprise Applications",
    description:
      "Delivered multiple production-grade applications including ERP systems, booking platforms, and data dashboards. Expanded stack to include React, TypeScript, Redis, and Filament admin panels.",
    tags: ["React", "TypeScript", "Filament", "Redis", "Docker"],
    type: "work",
    color: "#7C3AED",
  },
  {
    id: "t3",
    year: "2025",
    title: "Fullstack Developer",
    description:
      "Operating as a confident Fullstack Developer, building and maintaining enterprise systems end-to-end. Leading frontend architecture decisions and API design for complex business applications.",
    tags: ["Fullstack", "Architecture", "Team Lead", "Performance"],
    type: "work",
    color: "#00D9FF",
  },
  {
    id: "t4",
    year: "2026",
    title: "Learning Node.js & Architecture",
    description:
      "Expanding expertise into Node.js ecosystem, system design patterns, and software architecture. Studying distributed systems, microservices, and performance optimization techniques.",
    tags: ["Node.js", "Next.js", "System Design", "Architecture"],
    type: "learning",
    color: "#00D9FF",
  },
];

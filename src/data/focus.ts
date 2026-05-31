import type { FocusItem } from "@/types";

export const focusItems: FocusItem[] = [
  {
    id: "nodejs",
    title: "Learning Node.js",
    description:
      "Building server-side applications with Express, Fastify, and the Node.js ecosystem. Exploring async patterns, streams, and performance optimization.",
    icon: "🟢",
    progress: 45,
    color: "#339933",
    tags: ["Express", "Fastify", "NPM", "Streams"],
  },
  {
    id: "enterprise",
    title: "Building Enterprise Systems",
    description:
      "Designing and implementing large-scale enterprise applications with complex business logic, multi-tenant architecture, and high availability requirements.",
    icon: "🏗️",
    progress: 70,
    color: "#4F46E5",
    tags: ["Multi-tenant", "RBAC", "High Availability", "DDD"],
  },
  {
    id: "architecture",
    title: "Improving Architecture Skills",
    description:
      "Studying software architecture patterns — Clean Architecture, Hexagonal Architecture, CQRS, and Event-Driven design for building maintainable systems.",
    icon: "🧠",
    progress: 40,
    color: "#7C3AED",
    tags: ["Clean Architecture", "CQRS", "Event-Driven", "DDD"],
  },
  {
    id: "performance",
    title: "Exploring Performance Optimization",
    description:
      "Mastering database query optimization, caching strategies, CDN configuration, and profiling tools to build lightning-fast applications.",
    icon: "⚡",
    progress: 55,
    color: "#00D9FF",
    tags: ["Redis", "Query Opt", "CDN", "Profiling"],
  },
];

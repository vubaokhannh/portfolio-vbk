import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "krello-task-management",
    title: "Task Management System (Krello)",
    description:
      "A real-time collaborative workspace inspired by Trello, designed for seamless team project tracking.",
    longDescription:
      "A comprehensive Kanban-style project management application. It handles live data synchronization across multiple users, enforces strict role-based access control (RBAC), and manages real-time mobile push notifications.",
    tech: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "React",
      "Socket.IO",
      "Redis",
      "Mantine UI",
      "Tailwind CSS",
    ],
    features: [
      "Real-time UI syncing (Socket.IO)",
      "Fluid drag-and-drop (@dnd-kit)",
      "Secure JWT & RBAC infrastructure",
      "Boards, lists, cards & attachments",
      "N+1 query optimization via Prisma",
      "Automated CI/CD (GitHub Actions, PM2)",
    ],
    image: "/projects/krello.png",
    color: "#E0234E",
    accentColor: "rgba(224, 35, 78, 0.15)",
    status: "completed",
    year: "2025",
    githubUrl: "https://github.com/vubaokhannh/trello-backend",
    liveUrl: "https://web.krello.biz/",
  },
  {
    id: "online-vehicle-ticketing",
    title: "Online Vehicle Ticketing System",
    description:
      "An intelligent booking platform featuring live route tracking maps and automated passenger counter cameras.",
    longDescription:
      "A modern transportation management ecosystem built on an MVC architecture. Passengers can book tickets, check seat availability, register for monthly passes, and make digital wallet payments. It integrates a live vehicle tracking map and connects to IoT-enabled smart cameras at vehicle doors for automated passenger auditing.",
    tech: [
      "Laravel",
      "React",
      "InertiaJS",
      "Filament",
      "MySQL",
      "Tailwind CSS",
    ],
    features: [
      "Online seat booking & validation",
      "Digital wallet & gateway payments",
      "Live vehicle tracking on maps",
      "AI Smart Camera crowd counting",
      "Admin revenue analytics portal",
      "Student & teacher monthly pass",
    ],
    image: "/projects/bus-ticket.png",
    color: "#00D9FF",
    accentColor: "rgba(0, 217, 255, 0.15)",
    status: "completed",
    year: "2025",
    githubUrl: "https://github.com/vubaokhannh",
    liveUrl: "", // Leave empty if not hosted, button will auto-adjust or hide
  },
  {
    id: "wine-ecommerce",
    title: "E-commerce Platform for Wine Sales",
    description:
      "A premium custom-built online shopping application with advanced product indexing and voice search.",
    longDescription:
      "A fast and elegant wine distribution storefront developed using pure PHP MVC architecture. It features a complete end-to-end purchasing pipeline including dynamic product attribute filters, user wishlist collections, and behavior-driven recommendation engines.",
    tech: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "MVC Architecture"],
    features: [
      "AI-powered voice-based search",
      "Behavioral recommendation matrix",
      "Dynamic multi-variant matrix handling",
      "Interactive cart & wishlist modules",
      "Order tracing & historical ledger",
      "Voucher management dashboard",
    ],
    image: "/projects/wine.png",
    color: "#7C3AED",
    accentColor: "rgba(124, 58, 237, 0.15)",
    status: "completed",
    year: "2024",
    githubUrl: "https://github.com/vubaokhannh",
    liveUrl: "",
  },
];

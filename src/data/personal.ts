import type { PersonalInfo } from "@/types";

export const personalEn: PersonalInfo = {
  name: "Vu Bao Khanh",
  firstName: "Vu Bao",
  lastName: "Khanh",
  role: "Fullstack Developer",
  tagline: "Building real-time, scalable web systems from API to UI.",
  bio: "Fullstack Developer with hands-on experience building web applications using React, TypeScript, NestJS, and PostgreSQL through personal projects involving real-time systems, asynchronous processing, authentication, and payment integration. Familiar with Docker, Redis, Socket.IO, and CI/CD workflows. Currently developing and maintaining client websites in a professional PHP environment, with experience across development, deployment, and production troubleshooting.",
  location: "Ho Chi Minh City, Vietnam",
  email: "vubaokhanh2311@gmail.com",
  phone: "+84949542325",
  github: "https://github.com/vubaokhannh",
  linkedin: "https://linkedin.com/in/vubaokhannh",
  facebook: "https://www.facebook.com/vubaokhanh08901",
  cvUrl: "/Vu-Bao-Khanh-Fullstack-Developer.pdf",
  stack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Redis", "PHP"],
  stats: [
    {
      id: "experience",
      value: "1",
      suffix: "+",
      label: "Years Experience",
      icon: "calendar",
    },
    {
      id: "projects",
      value: "10",
      suffix: "+",
      label: "Projects Delivered",
      icon: "package",
    },
    {
      id: "technologies",
      value: "25",
      suffix: "+",
      label: "Technologies",
      icon: "cpu",
    },
  ],
};

export const personalVi: PersonalInfo = {
  ...personalEn,
  tagline: "Xây dựng hệ thống web thời gian thực, có khả năng mở rộng từ API đến giao diện.",
  bio: "Lập trình viên Fullstack có kinh nghiệm thực tế xây dựng ứng dụng web với React, TypeScript, NestJS và PostgreSQL qua các dự án cá nhân về hệ thống thời gian thực, xử lý bất đồng bộ, xác thực và tích hợp thanh toán. Quen thuộc với Docker, Redis, Socket.IO và quy trình CI/CD. Hiện đang phát triển và bảo trì website cho khách hàng trong môi trường PHP chuyên nghiệp, có kinh nghiệm từ phát triển, triển khai đến xử lý sự cố production.",
  stats: [
    {
      id: "experience",
      value: "1",
      suffix: "+",
      label: "Năm kinh nghiệm",
      icon: "calendar",
    },
    {
      id: "projects",
      value: "10",
      suffix: "+",
      label: "Dự án hoàn thành",
      icon: "package",
    },
    {
      id: "technologies",
      value: "25",
      suffix: "+",
      label: "Công nghệ nắm vững",
      icon: "cpu",
    },
  ],
};

export const personal = personalEn;

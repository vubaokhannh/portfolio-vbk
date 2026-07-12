import type { PersonalInfo } from "@/types";

export const personalEn: PersonalInfo = {
  name: "Vu Bao Khanh",
  firstName: "Vu Bao",
  lastName: "Khanh",
  role: "Fullstack Developer",
  tagline: "Building scalable digital experiences and enterprise systems.",
  bio: "I'm a Fullstack Developer passionate about crafting scalable enterprise applications and seamless digital experiences. Currently working with Laravel, React, and TypeScript — exploring Node.js and modern system design.",
  location: "Vietnam",
  email: "vubaokhanh2311@gmail.com",
  github: "https://github.com/vubaokhannh",
  linkedin: "https://linkedin.com/in/vubaokhannh",
  facebook: "https://www.facebook.com/vubaokhanh08901",
  cvUrl: "/cv-vubaokhanh.pdf",
  stack: ["Laravel", "React", "TypeScript", "Node.js", "NestJS", "PostgreSQL"],
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
      value: "15",
      suffix: "+",
      label: "Technologies",
      icon: "cpu",
    },
  ],
};

export const personalVi: PersonalInfo = {
  ...personalEn,
  tagline: "Xây dựng trải nghiệm kỹ thuật số quy mô lớn và hệ thống doanh nghiệp.",
  bio: "Tôi là một nhà phát triển Fullstack đam mê kiến tạo các ứng dụng doanh nghiệp có khả năng mở rộng cao và trải nghiệm mượt mà. Hiện đang làm việc chủ yếu với Laravel, React, và TypeScript — đồng thời nghiên cứu chuyên sâu về Node.js và thiết kế hệ thống hiện đại.",
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
      value: "15",
      suffix: "+",
      label: "Công nghệ nắm vững",
      icon: "cpu",
    },
  ],
};

export const personal = personalEn;

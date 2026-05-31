import type { PersonalInfo } from "@/types";

export const personal: PersonalInfo = {
  name: "Vu Bao Khanh",
  firstName: "Vu Bao",
  lastName: "Khanh",
  role: "Fullstack Developer",
  tagline: "Building scalable digital experiences and enterprise systems.",
  bio: "I'm a Fullstack Developer passionate about crafting scalable enterprise applications and seamless digital experiences. Currently working with Laravel, React, and TypeScript — exploring Node.js and modern system design.",
  location: "Vietnam",
  email: "vubaokhanh@example.com",
  github: "https://github.com/vubaokhanh",
  linkedin: "https://linkedin.com/in/vubaokhanh",
  facebook: "https://facebook.com/vubaokhanh",
  cvUrl: "/cv-vubaokhanh.pdf",
  stack: ["Laravel", "React", "TypeScript", "Node.js"],
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

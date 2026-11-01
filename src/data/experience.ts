import type { EducationItem, ExperienceItem } from "@/types";

export const experienceEn: ExperienceItem[] = [
  {
    id: "e2",
    company: "BM WEB Co., Ltd",
    role: "PHP Developer",
    duration: "Jan 2026 - Present",
    description:
      "Developing and maintaining client websites in a professional PHP environment, from requirements to production.",
    highlights: [
      "Developed and customized numerous client websites using PHP, MySQL, JavaScript, and AJAX, translating business requirements from the Business team into technical implementation.",
      "Optimized website performance and SEO — improving slow MySQL queries, implementing caching strategies, reducing page load time, and applying on-page SEO best practices (meta tags, sitemap, structured data).",
      "Ensured responsive, cross-browser compatible interfaces, delivering consistent user experience across devices and browsers.",
      "Managed the full website lifecycle from development and deployment to maintenance, feature updates, and bug fixes, including SMTP email configuration for contact forms and notifications.",
      "Deployed and maintained production environments: configured domains, DNS, SSL certificates, databases, and cPanel hosting; diagnosed and resolved issues across application and server layers.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "AJAX", "SEO", "cPanel", "DNS & SSL", "SMTP"],
    color: "#7C3AED",
  },
  {
    id: "e1",
    company: "Cantho University Software Center (CUSC)",
    role: "Frontend Developer (Intern)",
    duration: "May 2025 - Aug 2025",
    description:
      "Built responsive web interfaces and collaborated with backend developers to deliver assigned features.",
    highlights: [
      "Developed responsive web interfaces using Next.js, Mantine UI, and Tailwind CSS.",
      "Integrated RESTful APIs with Axios to display and update application data.",
      "Built reusable UI components and implemented frontend state handling.",
      "Collaborated with backend developers to integrate APIs, debug issues, and deliver assigned features.",
    ],
    tags: ["Next.js", "React", "Mantine UI", "Tailwind CSS", "Axios", "RESTful APIs"],
    color: "#00D9FF",
  },
];

export const experienceVi: ExperienceItem[] = [
  {
    id: "e2",
    company: "Công ty TNHH BM WEB",
    role: "Lập trình viên PHP",
    duration: "Tháng 1 2026 - Hiện tại",
    description:
      "Phát triển và bảo trì website cho khách hàng trong môi trường PHP chuyên nghiệp, từ phân tích yêu cầu đến vận hành production.",
    highlights: [
      "Phát triển và tùy biến nhiều website khách hàng bằng PHP, MySQL, JavaScript và AJAX, chuyển hóa yêu cầu nghiệp vụ từ team Business thành giải pháp kỹ thuật.",
      "Tối ưu hiệu năng và SEO — cải thiện truy vấn MySQL chậm, áp dụng caching, giảm thời gian tải trang và triển khai SEO on-page (meta tags, sitemap, structured data).",
      "Đảm bảo giao diện responsive, tương thích đa trình duyệt, mang lại trải nghiệm nhất quán trên mọi thiết bị.",
      "Quản lý toàn bộ vòng đời website: phát triển, triển khai, bảo trì, cập nhật tính năng, sửa lỗi, bao gồm cấu hình email SMTP cho form liên hệ và thông báo.",
      "Triển khai và duy trì môi trường production: cấu hình tên miền, DNS, chứng chỉ SSL, cơ sở dữ liệu và hosting cPanel; chẩn đoán và xử lý sự cố ở cả tầng ứng dụng lẫn máy chủ.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "AJAX", "SEO", "cPanel", "DNS & SSL", "SMTP"],
    color: "#7C3AED",
  },
  {
    id: "e1",
    company: "Trung tâm Phần mềm Đại học Cần Thơ (CUSC)",
    role: "Lập trình viên Frontend (Thực tập sinh)",
    duration: "Tháng 5 2025 - Tháng 8 2025",
    description:
      "Xây dựng giao diện web responsive và phối hợp cùng backend để hoàn thành các tính năng được giao.",
    highlights: [
      "Phát triển giao diện web responsive bằng Next.js, Mantine UI và Tailwind CSS.",
      "Tích hợp RESTful API với Axios để hiển thị và cập nhật dữ liệu ứng dụng.",
      "Xây dựng các UI component tái sử dụng và xử lý state phía frontend.",
      "Phối hợp với backend để tích hợp API, gỡ lỗi và hoàn thành tính năng được giao.",
    ],
    tags: ["Next.js", "React", "Mantine UI", "Tailwind CSS", "Axios", "RESTful APIs"],
    color: "#00D9FF",
  },
];

export const educationEn: EducationItem[] = [
  {
    id: "fpoly",
    school: "FPT Polytechnic Can Tho",
    major: "Web Development",
    duration: "Aug 2023 - Aug 2025",
    gpa: "3.75/4.0",
  },
];

export const educationVi: EducationItem[] = [
  {
    id: "fpoly",
    school: "Cao đẳng FPT Polytechnic Cần Thơ",
    major: "Phát triển Web",
    duration: "Tháng 8 2023 - Tháng 8 2025",
    gpa: "3.75/4.0",
  },
];

export const experience = experienceEn;

import type { ServiceItem } from "@/types";

export const servicesEn: ServiceItem[] = [
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

export const servicesVi: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Phát triển Web Tùy biến",
    description: "Xây dựng các trang web nhanh, chuẩn SEO, responsive và tương thích tốt với nhận diện thương hiệu của bạn.",
    icon: "globe",
    color: "#00D9FF",
    tags: ["React/Next.js", "Laravel MVC", "Tailwind CSS", "RESTful APIs"],
  },
  {
    id: "ecommerce",
    title: "Giải pháp Thương mại Điện tử",
    description: "Tạo các cửa hàng trực tuyến tỷ lệ chuyển đổi cao với giỏ hàng bảo mật, quy trình thanh toán mượt mà và tích hợp cổng thanh toán.",
    icon: "shopping-bag",
    color: "#7C3AED",
    tags: ["Giỏ hàng", "APIs Thanh toán", "Quản lý Sản phẩm", "Quy trình Đơn hàng"],
  },
  {
    id: "admin-system",
    title: "Hệ thống Admin & ERP",
    description: "Thiết kế bảng quản trị nội bộ và cơ sở dữ liệu tùy biến nhằm tự động hóa và tinh gọn hóa quy trình vận hành của bạn.",
    icon: "layers",
    color: "#4F46E5",
    tags: ["Bảng CRM/ERP", "Phân tích Dữ liệu", "Filament CMS", "Phân quyền truy cập"],
  },
  {
    id: "optimization",
    title: "Tối ưu hóa Hiệu năng & SEO",
    description: "Đánh giá trải nghiệm người dùng, tối ưu hóa tốc độ tải trang và xây dựng cấu trúc siêu dữ liệu để đạt thứ hạng tìm kiếm cao.",
    icon: "zap",
    color: "#F59E0B",
    tags: ["Kiểm thử PageSpeed", "SEO Kỹ thuật", "Cấu hình Analytics", "Đánh giá UX"],
  },
];

export const services = servicesEn;

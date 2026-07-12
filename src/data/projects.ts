import type { Project } from "@/types";

export const projectsEn: Project[] = [
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
    liveUrl: "",
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

export const projectsVi: Project[] = [
  {
    id: "krello-task-management",
    title: "Hệ thống Quản lý Công việc (Krello)",
    description:
      "Không gian làm việc cộng tác thời gian thực lấy cảm hứng từ Trello, được thiết kế để theo dõi tiến độ công việc nhóm mượt mà.",
    longDescription:
      "Ứng dụng quản lý dự án kiểu Kanban toàn diện. Xử lý đồng bộ hóa dữ liệu thời gian thực giữa nhiều người dùng, áp dụng phân quyền truy cập nghiêm ngặt (RBAC) và quản lý thông báo đẩy thời gian thực trên thiết bị di động.",
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
      "Đồng bộ UI thời gian thực (Socket.IO)",
      "Kéo thả mượt mà (@dnd-kit)",
      "Bảo mật qua JWT & hạ tầng RBAC",
      "Bảng công việc, danh sách, thẻ & tệp đính kèm",
      "Tối ưu hóa truy vấn N+1 qua Prisma ORM",
      "Tự động hóa CI/CD (GitHub Actions, PM2)",
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
    title: "Hệ thống Đặt vé Xe trực tuyến",
    description:
      "Nền tảng đặt vé thông minh tích hợp bản đồ theo dõi lộ trình trực tiếp và camera đếm hành khách tự động.",
    longDescription:
      "Hệ sinh thái quản lý giao thông vận tải hiện đại xây dựng trên kiến trúc MVC. Hành khách có thể đặt vé trực tuyến, kiểm tra số chỗ trống, đăng ký thẻ tháng và thanh toán qua ví điện tử. Tích hợp bản đồ định vị xe trực tiếp và kết nối với camera cửa xe IoT để kiểm toán số lượng hành khách tự động.",
    tech: [
      "Laravel",
      "React",
      "InertiaJS",
      "Filament",
      "MySQL",
      "Tailwind CSS",
    ],
    features: [
      "Đặt vé & kiểm tra vé trực tuyến",
      "Thanh toán cổng điện tử & ví số",
      "Theo dõi xe chạy trực tiếp trên bản đồ",
      "Camera AI đếm số lượng hành khách thông minh",
      "Cổng thống kê doanh thu cho Quản trị viên",
      "Đăng ký thẻ tháng cho học sinh/giáo viên",
    ],
    image: "/projects/bus-ticket.png",
    color: "#00D9FF",
    accentColor: "rgba(0, 217, 255, 0.15)",
    status: "completed",
    year: "2025",
    githubUrl: "https://github.com/vubaokhannh",
    liveUrl: "",
  },
  {
    id: "wine-ecommerce",
    title: "Trang Thương mại Điện tử Bán rượu",
    description:
      "Ứng dụng mua sắm trực tuyến cao cấp tự thiết kế với chức năng lọc thuộc tính nâng cao và tìm kiếm bằng giọng nói.",
    longDescription:
      "Cửa hàng trực tuyến phân phối rượu vang sang trọng và nhanh chóng phát triển bằng kiến trúc thuần PHP MVC. Sở hữu đầy đủ quy trình mua hàng khép kín bao gồm bộ lọc động, bộ sưu tập yêu thích và hệ thống gợi ý dựa trên hành vi khách hàng.",
    tech: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Kiến trúc MVC"],
    features: [
      "Tìm kiếm bằng giọng nói tích hợp trí tuệ nhân tạo",
      "Hệ thống gợi ý sản phẩm theo hành vi người dùng",
      "Xử lý động ma trận biến thể sản phẩm",
      "Mô-đun giỏ hàng và danh sách yêu thích tương tác",
      "Theo dõi lịch sử đơn hàng",
      "Trang quản lý mã giảm giá trực quan",
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

export const projects = projectsEn;

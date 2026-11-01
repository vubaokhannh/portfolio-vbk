export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // Rich HTML format
  date: string;
  isoDate: string; // Standard format for SEO crawlers (YYYY-MM-DD)
  tags: string[];
  author: string;
  readTime: string;
  coverImage: string;
}

export const postsEn: BlogPost[] = [
  {
    slug: "about-vu-bao-khanh-fullstack-developer",
    title: "Vu Bao Khanh: Fullstack Developer (React, NestJS, PHP)",
    description: "Meet Vu Bao Khanh, a Fullstack Developer in Ho Chi Minh City building real-time systems with React, NestJS and PostgreSQL, plus production PHP sites at BM WEB.",
    date: "July 13, 2026",
    isoDate: "2026-07-13",
    tags: ["About Me", "Fullstack Developer", "NestJS", "React", "PHP"],
    author: "Vu Bao Khanh",
    readTime: "7 min read",
    coverImage: "/og-image.png",
    content: `
      <p><strong>Vu Bao Khanh</strong> (Vũ Bảo Khanh) is a Fullstack Developer based in Ho Chi Minh City, Vietnam. He builds real-time web systems with <strong>React, TypeScript, NestJS and PostgreSQL</strong>, and currently develops and maintains client websites as a <strong>PHP Developer at BM WEB Co., Ltd</strong>. This page is the short, honest version of who I am, what I have built and how I work.</p>

      <h2>Quick Facts</h2>
      <ul>
        <li><strong>Role:</strong> Fullstack Developer (PHP Developer at BM WEB Co., Ltd since January 2026)</li>
        <li><strong>Location:</strong> Ho Chi Minh City, Vietnam</li>
        <li><strong>Education:</strong> FPT Polytechnic Can Tho, Web Development, 2023–2025, GPA 3.75/4.0</li>
        <li><strong>Core stack:</strong> TypeScript, React, Next.js, NestJS, Prisma, PostgreSQL, MySQL, Redis, Docker</li>
        <li><strong>Featured projects:</strong> StreamHub (video streaming platform) and Krello (real-time task management)</li>
        <li><strong>Contact:</strong> <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a></li>
      </ul>

      <h2>What I Do as a Fullstack Developer</h2>
      <p>I work across the whole product: database design, REST APIs, background jobs, authentication, a responsive frontend and deployment. My personal projects focus on problems that only appear once a system is real — concurrency, asynchronous processing, security and payments.</p>
      <ul>
        <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS, Mantine UI, Zustand, TanStack Query and dnd-kit.</li>
        <li><strong>Backend:</strong> Node.js, NestJS, Prisma ORM, RESTful APIs, Socket.IO and BullMQ.</li>
        <li><strong>Data:</strong> PostgreSQL, MySQL and Redis for storage and caching.</li>
        <li><strong>Tooling:</strong> Docker, Git, JWT, OAuth 2.0, FCM, FFmpeg, HLS.js and Cloudflare R2.</li>
      </ul>

      <h2>StreamHub: A Video Streaming Platform</h2>
      <p><a href="https://streamhub.tforge.life" target="_blank" rel="noopener noreferrer">StreamHub</a> is a full-stack video streaming platform with user-facing features and an admin management system.</p>
      <ul>
        <li><strong>Decoupled processing:</strong> CPU-heavy transcoding is separated from the API server using BullMQ, Redis and a standalone worker.</li>
        <li><strong>Adaptive streaming:</strong> FFmpeg converts uploads into Adaptive Bitrate HLS (360p–1080p), stored on Cloudflare R2.</li>
        <li><strong>Custom player:</strong> an HLS.js player with quality selection, episode navigation and cross-device watch-progress sync.</li>
        <li><strong>Security:</strong> JWT refresh-token rotation, Google OAuth 2.0, multi-device sessions and dynamic RBAC.</li>
        <li><strong>Payments:</strong> PayOS (VietQR) with signature verification and idempotent webhooks to prevent duplicate transactions.</li>
      </ul>

      <h2>Krello: Real-Time Collaborative Task Management</h2>
      <p><a href="https://krello.click/" target="_blank" rel="noopener noreferrer">Krello</a> is a Trello-inspired platform with a NestJS/Prisma API and an interactive Kanban UI built with React and dnd-kit.</p>
      <ul>
        <li><strong>Real-time collaboration:</strong> Socket.IO and Redis sync board and card updates, comments, typing indicators and user presence.</li>
        <li><strong>Efficient ordering:</strong> position-based drag-and-drop that minimizes unnecessary database updates.</li>
        <li><strong>Authentication:</strong> JWT access/refresh rotation, device-based sessions, Google OAuth 2.0, board-level permissions and RBAC.</li>
        <li><strong>Resilient client:</strong> a concurrency-safe Axios silent-refresh queue that retries pending requests after a 401.</li>
        <li><strong>Delivery:</strong> automated deployment to an Ubuntu VM (Proxmox) with GitHub Actions, a self-hosted runner, SSH, PM2 and Cloudflare DNS.</li>
      </ul>

      <h2>Professional Experience</h2>
      <h3>PHP Developer, BM WEB Co., Ltd (January 2026 – Present)</h3>
      <p>I develop and customize client websites with PHP, MySQL, JavaScript and AJAX, turning requirements from the business team into working features. Beyond coding, I own the full website lifecycle:</p>
      <ul>
        <li>Improving slow MySQL queries, adding caching and applying on-page SEO (meta tags, sitemap, structured data) to cut page load time.</li>
        <li>Delivering responsive, cross-browser compatible interfaces.</li>
        <li>Configuring domains, DNS, SSL certificates, databases, SMTP email and cPanel hosting, and diagnosing issues in both the application and server layers.</li>
      </ul>

      <h3>Frontend Developer Intern, Cantho University Software Center (May – August 2025)</h3>
      <p>I built responsive interfaces with Next.js, Mantine UI and Tailwind CSS, integrated RESTful APIs with Axios, created reusable components and worked with backend developers to debug and ship assigned features.</p>

      <h2>How I Work</h2>
      <ul>
        <li><strong>Start simple.</strong> I choose the simplest architecture that solves the problem reliably and add complexity only when there is a measurable reason.</li>
        <li><strong>Design the data first.</strong> Schema, indexes and caching decisions come before application code.</li>
        <li><strong>Separate slow work from fast paths.</strong> Queues and workers keep APIs responsive.</li>
        <li><strong>Treat security as a feature.</strong> Token rotation, RBAC and verified webhooks are part of the first version.</li>
        <li><strong>Make it observable and documented.</strong> Future teammates, including future me, should understand why a decision was made.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <h3>Who is Vu Bao Khanh?</h3>
      <p>Vu Bao Khanh is a Fullstack Developer in Ho Chi Minh City, Vietnam, working with React, TypeScript, NestJS, PostgreSQL and PHP.</p>
      <h3>Where does Vu Bao Khanh work?</h3>
      <p>He is a PHP Developer at BM WEB Co., Ltd, and previously interned as a Frontend Developer at Cantho University Software Center in 2025.</p>
      <h3>What technologies does he use?</h3>
      <p>TypeScript, JavaScript and PHP; React, Next.js and Tailwind CSS on the frontend; NestJS, Prisma, Socket.IO and BullMQ on the backend; PostgreSQL, MySQL and Redis for data; and Docker for deployment.</p>
      <h3>How can I contact him?</h3>
      <p>Email <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a>, connect on <a href="https://linkedin.com/in/vubaokhannh" target="_blank" rel="noopener noreferrer">LinkedIn</a>, or browse <a href="https://github.com/vubaokhannh" target="_blank" rel="noopener noreferrer">GitHub</a> and <a href="https://vubaokhanh.tech">vubaokhanh.tech</a>.</p>

    `,
  },
];

export const postsVi: BlogPost[] = [
  {
    slug: "about-vu-bao-khanh-fullstack-developer",
    title: "Vũ Bảo Khanh: Lập trình viên Fullstack (React, NestJS, PHP)",
    description: "Giới thiệu Vũ Bảo Khanh, lập trình viên Fullstack tại TP.HCM: xây hệ thống thời gian thực với React, NestJS, PostgreSQL và website PHP production tại BM WEB.",
    date: "13 tháng 7, 2026",
    isoDate: "2026-07-13",
    tags: ["Giới thiệu", "Lập trình viên Fullstack", "NestJS", "React", "PHP"],
    author: "Vũ Bảo Khanh",
    readTime: "7 phút đọc",
    coverImage: "/og-image.png",
    content: `
      <p><strong>Vũ Bảo Khanh</strong> (Vu Bao Khanh) là lập trình viên Fullstack tại TP. Hồ Chí Minh, Việt Nam. Tôi xây dựng các hệ thống web thời gian thực với <strong>React, TypeScript, NestJS và PostgreSQL</strong>, đồng thời đang phát triển và bảo trì website cho khách hàng với vai trò <strong>Lập trình viên PHP tại Công ty TNHH BM WEB</strong>. Đây là bản giới thiệu ngắn gọn và trung thực về con người, dự án và cách làm việc của tôi.</p>

      <h2>Thông tin nhanh</h2>
      <ul>
        <li><strong>Vị trí:</strong> Lập trình viên Fullstack (PHP Developer tại BM WEB từ tháng 1/2026)</li>
        <li><strong>Địa điểm:</strong> TP. Hồ Chí Minh, Việt Nam</li>
        <li><strong>Học vấn:</strong> FPT Polytechnic Cần Thơ, ngành Phát triển Web, 2023–2025, GPA 3.75/4.0</li>
        <li><strong>Công nghệ chính:</strong> TypeScript, React, Next.js, NestJS, Prisma, PostgreSQL, MySQL, Redis, Docker</li>
        <li><strong>Dự án nổi bật:</strong> StreamHub (nền tảng streaming video) và Krello (quản lý công việc thời gian thực)</li>
        <li><strong>Liên hệ:</strong> <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a></li>
      </ul>

      <h2>Tôi làm gì với vai trò Fullstack Developer</h2>
      <p>Tôi làm việc xuyên suốt sản phẩm: thiết kế cơ sở dữ liệu, REST API, tác vụ nền, xác thực, giao diện responsive và triển khai. Các dự án cá nhân của tôi tập trung vào những bài toán chỉ xuất hiện khi hệ thống chạy thật: đồng thời (concurrency), xử lý bất đồng bộ, bảo mật và thanh toán.</p>
      <ul>
        <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS, Mantine UI, Zustand, TanStack Query, dnd-kit.</li>
        <li><strong>Backend:</strong> Node.js, NestJS, Prisma ORM, RESTful APIs, Socket.IO, BullMQ.</li>
        <li><strong>Dữ liệu:</strong> PostgreSQL, MySQL và Redis cho lưu trữ và caching.</li>
        <li><strong>Công cụ:</strong> Docker, Git, JWT, OAuth 2.0, FCM, FFmpeg, HLS.js, Cloudflare R2.</li>
      </ul>

      <h2>StreamHub: Nền tảng streaming video</h2>
      <p><a href="https://streamhub.tforge.life" target="_blank" rel="noopener noreferrer">StreamHub</a> là nền tảng streaming video fullstack gồm tính năng cho người dùng và hệ thống quản trị.</p>
      <ul>
        <li><strong>Tách biệt xử lý nặng:</strong> tác vụ transcoding tốn CPU được tách khỏi API server bằng BullMQ, Redis và worker độc lập.</li>
        <li><strong>Streaming thích ứng:</strong> FFmpeg chuyển video tải lên thành HLS Adaptive Bitrate (360p–1080p), lưu trên Cloudflare R2.</li>
        <li><strong>Trình phát tùy biến:</strong> trình phát HLS.js có chọn chất lượng, chuyển tập và đồng bộ tiến độ xem giữa các thiết bị.</li>
        <li><strong>Bảo mật:</strong> JWT refresh-token rotation, Google OAuth 2.0, quản lý phiên đa thiết bị và RBAC động.</li>
        <li><strong>Thanh toán:</strong> PayOS (VietQR) với xác thực chữ ký và webhook idempotent để tránh xử lý trùng giao dịch.</li>
      </ul>

      <h2>Krello: Quản lý công việc cộng tác thời gian thực</h2>
      <p><a href="https://krello.click/" target="_blank" rel="noopener noreferrer">Krello</a> là nền tảng lấy cảm hứng từ Trello, với API NestJS/Prisma và giao diện Kanban tương tác xây bằng React và dnd-kit.</p>
      <ul>
        <li><strong>Cộng tác thời gian thực:</strong> Socket.IO và Redis đồng bộ cập nhật board/card, bình luận, trạng thái đang gõ và presence người dùng.</li>
        <li><strong>Sắp xếp hiệu quả:</strong> kéo thả theo vị trí, giảm cập nhật cơ sở dữ liệu không cần thiết.</li>
        <li><strong>Xác thực:</strong> JWT access/refresh rotation, phiên theo thiết bị, Google OAuth 2.0, phân quyền cấp board và RBAC.</li>
        <li><strong>Client bền bỉ:</strong> hàng đợi silent-refresh Axios an toàn khi nhiều lỗi 401 xảy ra cùng lúc, tự động gửi lại các request đang chờ.</li>
        <li><strong>Triển khai:</strong> tự động deploy lên Ubuntu VM (Proxmox) bằng GitHub Actions, self-hosted runner, SSH, PM2 và Cloudflare DNS.</li>
      </ul>

      <h2>Kinh nghiệm làm việc</h2>
      <h3>Lập trình viên PHP, Công ty TNHH BM WEB (Tháng 1/2026 – Hiện tại)</h3>
      <p>Tôi phát triển và tùy biến website khách hàng bằng PHP, MySQL, JavaScript và AJAX, chuyển yêu cầu từ team Business thành tính năng hoạt động. Ngoài lập trình, tôi phụ trách toàn bộ vòng đời website:</p>
      <ul>
        <li>Cải thiện truy vấn MySQL chậm, áp dụng caching và SEO on-page (meta tags, sitemap, structured data) để giảm thời gian tải trang.</li>
        <li>Đảm bảo giao diện responsive, tương thích đa trình duyệt.</li>
        <li>Cấu hình tên miền, DNS, chứng chỉ SSL, cơ sở dữ liệu, email SMTP và hosting cPanel; chẩn đoán sự cố ở cả tầng ứng dụng lẫn máy chủ.</li>
      </ul>

      <h3>Thực tập sinh Frontend, Trung tâm Phần mềm Đại học Cần Thơ (Tháng 5 – Tháng 8/2025)</h3>
      <p>Tôi xây dựng giao diện responsive với Next.js, Mantine UI và Tailwind CSS, tích hợp RESTful API bằng Axios, tạo component tái sử dụng và phối hợp với backend để gỡ lỗi và hoàn thành tính năng được giao.</p>

      <h2>Cách tôi làm việc</h2>
      <ul>
        <li><strong>Bắt đầu đơn giản.</strong> Chọn kiến trúc đơn giản nhất giải quyết được vấn đề và chỉ thêm độ phức tạp khi có lý do đo đếm được.</li>
        <li><strong>Thiết kế dữ liệu trước.</strong> Schema, index và chiến lược cache được quyết định trước khi viết code ứng dụng.</li>
        <li><strong>Tách việc chậm khỏi luồng nhanh.</strong> Queue và worker giúp API luôn phản hồi nhanh.</li>
        <li><strong>Bảo mật là tính năng.</strong> Token rotation, RBAC và webhook có xác thực có mặt ngay từ phiên bản đầu.</li>
        <li><strong>Dễ quan sát và có tài liệu.</strong> Đồng đội tương lai, kể cả chính tôi, cần hiểu vì sao một quyết định được đưa ra.</li>
      </ul>

      <h2>Câu hỏi thường gặp</h2>
      <h3>Vũ Bảo Khanh là ai?</h3>
      <p>Vũ Bảo Khanh là lập trình viên Fullstack tại TP. Hồ Chí Minh, làm việc với React, TypeScript, NestJS, PostgreSQL và PHP.</p>
      <h3>Vũ Bảo Khanh đang làm việc ở đâu?</h3>
      <p>Anh là Lập trình viên PHP tại Công ty TNHH BM WEB, và trước đó thực tập Frontend tại Trung tâm Phần mềm Đại học Cần Thơ năm 2025.</p>
      <h3>Anh sử dụng những công nghệ nào?</h3>
      <p>TypeScript, JavaScript và PHP; React, Next.js, Tailwind CSS ở frontend; NestJS, Prisma, Socket.IO, BullMQ ở backend; PostgreSQL, MySQL, Redis cho dữ liệu; Docker để triển khai.</p>
      <h3>Làm sao để liên hệ?</h3>
      <p>Gửi email tới <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a>, kết nối qua <a href="https://linkedin.com/in/vubaokhannh" target="_blank" rel="noopener noreferrer">LinkedIn</a>, hoặc xem <a href="https://github.com/vubaokhannh" target="_blank" rel="noopener noreferrer">GitHub</a> và <a href="https://vubaokhanh.tech">vubaokhanh.tech</a>.</p>

    `,
  },
];

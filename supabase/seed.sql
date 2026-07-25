-- ============================================================
-- COMPLETE SEED DATA for vubaokhanh portfolio
-- Run this in the Supabase SQL Editor after running schema.sql
-- ============================================================

-- ── 1. PERSONAL INFO ──────────────────────────────────────────
INSERT INTO public.personal_info (
  key, name, first_name, last_name,
  role_en, role_vi,
  tagline_en, tagline_vi,
  bio_en, bio_vi,
  location, email, github, linkedin, facebook,
  cv_url, stack, stats, theme_color, theme_config
) VALUES (
  'vubaokhanh',
  'Vu Bao Khanh',
  'Vu Bao',
  'Khanh',
  'Fullstack Developer',
  'Lập trình viên Fullstack',
  'Building scalable digital experiences and enterprise systems.',
  'Xây dựng trải nghiệm kỹ thuật số quy mô lớn và hệ thống doanh nghiệp.',
  'I''m a Fullstack Developer passionate about crafting scalable enterprise applications and seamless digital experiences. Currently working with Laravel, React, and TypeScript — exploring Node.js and modern system design.',
  'Tôi là một nhà phát triển Fullstack đam mê kiến tạo các ứng dụng doanh nghiệp có khả năng mở rộng cao và trải nghiệm mượt mà. Hiện đang làm việc chủ yếu với Laravel, React, và TypeScript — đồng thời nghiên cứu chuyên sâu về Node.js và thiết kế hệ thống hiện đại.',
  'Vietnam',
  'vubaokhanh2311@gmail.com',
  'https://github.com/vubaokhannh',
  'https://linkedin.com/in/vubaokhannh',
  'https://www.facebook.com/vubaokhanh08901',
  '/cv-vubaokhanh.pdf',
  ARRAY['Laravel', 'React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL'],
  '[
    {"id": "experience", "value": "1", "suffix": "+", "label": "Years Experience", "label_vi": "Năm kinh nghiệm", "icon": "calendar"},
    {"id": "projects",   "value": "10","suffix": "+", "label": "Projects Delivered","label_vi": "Dự án hoàn thành",  "icon": "package"},
    {"id": "technologies","value":"15","suffix": "+", "label": "Technologies",       "label_vi": "Công nghệ nắm vững","icon": "cpu"}
  ]'::jsonb,
  '#00D9FF',
  '{"themeColor":"#00D9FF","secondaryColor":"#7C3AED","bgColor":"#050505","cardBgColor":"#0f1117","blurStrength":"20px","borderRadius":"16px"}'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
  name          = EXCLUDED.name,
  first_name    = EXCLUDED.first_name,
  last_name     = EXCLUDED.last_name,
  role_en       = EXCLUDED.role_en,
  role_vi       = EXCLUDED.role_vi,
  tagline_en    = EXCLUDED.tagline_en,
  tagline_vi    = EXCLUDED.tagline_vi,
  bio_en        = EXCLUDED.bio_en,
  bio_vi        = EXCLUDED.bio_vi,
  location      = EXCLUDED.location,
  email         = EXCLUDED.email,
  github        = EXCLUDED.github,
  linkedin      = EXCLUDED.linkedin,
  facebook      = EXCLUDED.facebook,
  cv_url        = EXCLUDED.cv_url,
  stack         = EXCLUDED.stack,
  stats         = EXCLUDED.stats,
  theme_color   = EXCLUDED.theme_color,
  theme_config  = EXCLUDED.theme_config,
  updated_at    = now();


-- ── 2. SERVICES ───────────────────────────────────────────────
INSERT INTO public.services (id, title_en, title_vi, description_en, description_vi, icon, color, tags, sort_order) VALUES
(
  'web-dev',
  'Custom Web Development',
  'Phát triển Web Tùy biến',
  'Building fast, standard-compliant, responsive, and SEO-friendly websites tailored to your brand identity.',
  'Xây dựng các trang web nhanh, chuẩn SEO, responsive và tương thích tốt với nhận diện thương hiệu của bạn.',
  'globe',
  '#00D9FF',
  ARRAY['React/Next.js', 'Laravel MVC', 'Tailwind CSS', 'RESTful APIs'],
  1
),
(
  'ecommerce',
  'E-Commerce Solutions',
  'Giải pháp Thương mại Điện tử',
  'Creating high-converting online stores with secure carts, checkout pipelines, and popular payment gateways.',
  'Tạo các cửa hàng trực tuyến tỷ lệ chuyển đổi cao với giỏ hàng bảo mật, quy trình thanh toán mượt mà và tích hợp cổng thanh toán.',
  'shopping-bag',
  '#7C3AED',
  ARRAY['Shopping Cart', 'Payment APIs', 'Product Inventory', 'Order Pipeline'],
  2
),
(
  'admin-system',
  'Admin & ERP Panels',
  'Hệ thống Admin & ERP',
  'Tailoring back-office management dashboards and databases to automate and streamline your operations.',
  'Thiết kế bảng quản trị nội bộ và cơ sở dữ liệu tùy biến nhằm tự động hóa và tinh gọn hóa quy trình vận hành của bạn.',
  'layers',
  '#4F46E5',
  ARRAY['CRM/ERP Panels', 'Data Analytics', 'Filament CMS', 'Access Control'],
  3
),
(
  'optimization',
  'Performance & SEO',
  'Tối ưu hóa Hiệu năng & SEO',
  'Auditing user experience, optimizing page loading speed, and structuring metadata for top search rankings.',
  'Đánh giá trải nghiệm người dùng, tối ưu hóa tốc độ tải trang và xây dựng cấu trúc siêu dữ liệu để đạt thứ hạng tìm kiếm cao.',
  'zap',
  '#F59E0B',
  ARRAY['PageSpeed Audit', 'Technical SEO', 'Analytics Setup', 'UX Auditing'],
  4
)
ON CONFLICT (id) DO UPDATE SET
  title_en       = EXCLUDED.title_en,
  title_vi       = EXCLUDED.title_vi,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  icon           = EXCLUDED.icon,
  color          = EXCLUDED.color,
  tags           = EXCLUDED.tags,
  sort_order     = EXCLUDED.sort_order;


-- ── 3. PROJECTS ───────────────────────────────────────────────
INSERT INTO public.projects (
  id, title_en, title_vi, description_en, description_vi,
  long_description_en, long_description_vi,
  tech, features_en, features_vi,
  image, color, accent_color, status, year,
  github_url, live_url, sort_order
) VALUES
(
  'krello-task-management',
  'Task Management System (Krello)',
  'Hệ thống Quản lý Công việc (Krello)',
  'A real-time collaborative workspace inspired by Trello, designed for seamless team project tracking.',
  'Không gian làm việc cộng tác thời gian thực lấy cảm hứng từ Trello, được thiết kế để theo dõi tiến độ công việc nhóm mượt mà.',
  'A comprehensive Kanban-style project management application. It handles live data synchronization across multiple users, enforces strict role-based access control (RBAC), and manages real-time mobile push notifications.',
  'Ứng dụng quản lý dự án kiểu Kanban toàn diện. Xử lý đồng bộ hóa dữ liệu thời gian thực giữa nhiều người dùng, áp dụng phân quyền truy cập nghiêm ngặt (RBAC) và quản lý thông báo đẩy thời gian thực trên thiết bị di động.',
  ARRAY['NestJS','TypeScript','PostgreSQL','Prisma','React','Socket.IO','Redis','Mantine UI','Tailwind CSS'],
  ARRAY['Real-time UI syncing (Socket.IO)','Fluid drag-and-drop (@dnd-kit)','Secure JWT & RBAC infrastructure','Boards, lists, cards & attachments','N+1 query optimization via Prisma','Automated CI/CD (GitHub Actions, PM2)'],
  ARRAY['Đồng bộ UI thời gian thực (Socket.IO)','Kéo thả mượt mà (@dnd-kit)','Bảo mật qua JWT & hạ tầng RBAC','Bảng công việc, danh sách, thẻ & tệp đính kèm','Tối ưu hóa truy vấn N+1 qua Prisma ORM','Tự động hóa CI/CD (GitHub Actions, PM2)'],
  '/projects/krello.png',
  '#E0234E',
  'rgba(224, 35, 78, 0.15)',
  'completed',
  '2025',
  'https://github.com/vubaokhannh/trello-backend',
  'https://web.krello.biz/',
  1
),
(
  'online-vehicle-ticketing',
  'Online Vehicle Ticketing System',
  'Hệ thống Đặt vé Xe trực tuyến',
  'An intelligent booking platform featuring live route tracking maps and automated passenger counter cameras.',
  'Nền tảng đặt vé thông minh tích hợp bản đồ theo dõi lộ trình trực tiếp và camera đếm hành khách tự động.',
  'A modern transportation management ecosystem built on an MVC architecture. Passengers can book tickets, check seat availability, register for monthly passes, and make digital wallet payments. It integrates a live vehicle tracking map and connects to IoT-enabled smart cameras at vehicle doors for automated passenger auditing.',
  'Hệ sinh thái quản lý giao thông vận tải hiện đại xây dựng trên kiến trúc MVC. Hành khách có thể đặt vé trực tuyến, kiểm tra số chỗ trống, đăng ký thẻ tháng và thanh toán qua ví điện tử. Tích hợp bản đồ định vị xe trực tiếp và kết nối với camera cửa xe IoT để kiểm toán số lượng hành khách tự động.',
  ARRAY['Laravel','React','InertiaJS','Filament','MySQL','Tailwind CSS'],
  ARRAY['Online seat booking & validation','Digital wallet & gateway payments','Live vehicle tracking on maps','AI Smart Camera crowd counting','Admin revenue analytics portal','Student & teacher monthly pass'],
  ARRAY['Đặt vé & kiểm tra vé trực tuyến','Thanh toán cổng điện tử & ví số','Theo dõi xe chạy trực tiếp trên bản đồ','Camera AI đếm số lượng hành khách thông minh','Cổng thống kê doanh thu cho Quản trị viên','Đăng ký thẻ tháng cho học sinh/giáo viên'],
  '/projects/bus-ticket.png',
  '#00D9FF',
  'rgba(0, 217, 255, 0.15)',
  'completed',
  '2025',
  'https://github.com/vubaokhannh',
  '',
  2
),
(
  'wine-ecommerce',
  'E-commerce Platform for Wine Sales',
  'Trang Thương mại Điện tử Bán rượu',
  'A premium custom-built online shopping application with advanced product indexing and voice search.',
  'Ứng dụng mua sắm trực tuyến cao cấp tự thiết kế với chức năng lọc thuộc tính nâng cao và tìm kiếm bằng giọng nói.',
  'A fast and elegant wine distribution storefront developed using pure PHP MVC architecture. It features a complete end-to-end purchasing pipeline including dynamic product attribute filters, user wishlist collections, and behavior-driven recommendation engines.',
  'Cửa hàng trực tuyến phân phối rượu vang sang trọng và nhanh chóng phát triển bằng kiến trúc thuần PHP MVC. Sở hữu đầy đủ quy trình mua hàng khép kín bao gồm bộ lọc động, bộ sưu tập yêu thích và hệ thống gợi ý dựa trên hành vi khách hàng.',
  ARRAY['PHP','JavaScript','MySQL','HTML','CSS','MVC Architecture'],
  ARRAY['AI-powered voice-based search','Behavioral recommendation matrix','Dynamic multi-variant matrix handling','Interactive cart & wishlist modules','Order tracing & historical ledger','Voucher management dashboard'],
  ARRAY['Tìm kiếm bằng giọng nói tích hợp trí tuệ nhân tạo','Hệ thống gợi ý sản phẩm theo hành vi người dùng','Xử lý động ma trận biến thể sản phẩm','Mô-đun giỏ hàng và danh sách yêu thích tương tác','Theo dõi lịch sử đơn hàng','Trang quản lý mã giảm giá trực quan'],
  '/projects/wine.png',
  '#7C3AED',
  'rgba(124, 58, 237, 0.15)',
  'completed',
  '2024',
  'https://github.com/vubaokhannh',
  '',
  3
)
ON CONFLICT (id) DO UPDATE SET
  title_en            = EXCLUDED.title_en,
  title_vi            = EXCLUDED.title_vi,
  description_en      = EXCLUDED.description_en,
  description_vi      = EXCLUDED.description_vi,
  long_description_en = EXCLUDED.long_description_en,
  long_description_vi = EXCLUDED.long_description_vi,
  tech                = EXCLUDED.tech,
  features_en         = EXCLUDED.features_en,
  features_vi         = EXCLUDED.features_vi,
  image               = EXCLUDED.image,
  color               = EXCLUDED.color,
  accent_color        = EXCLUDED.accent_color,
  status              = EXCLUDED.status,
  year                = EXCLUDED.year,
  github_url          = EXCLUDED.github_url,
  live_url            = EXCLUDED.live_url,
  sort_order          = EXCLUDED.sort_order;


-- ── 4. EXPERIENCE ─────────────────────────────────────────────
INSERT INTO public.experience (
  id, company, role_en, role_vi,
  duration_en, duration_vi,
  description_en, description_vi,
  tags, color, sort_order
) VALUES
(
  'e2',
  'BM WEB',
  'Fullstack PHP Developer',
  'Nhà phát triển Fullstack PHP',
  'Jan 2026 - Present',
  'Tháng 1 2026 - Hiện tại',
  'Designing and developing high-performance, responsive custom websites based on client specifications. Building solid backend infrastructures and administrative panels using PHP, Laravel, and MySQL to ensure standard-compliant, SEO-friendly, and scalable web solutions.',
  'Thiết kế và phát triển các trang web tùy biến hiệu năng cao, tương thích tốt và chuẩn SEO theo yêu cầu khách hàng. Xây dựng hạ tầng máy chủ vững chắc và các trang quản trị admin panel sử dụng PHP, Laravel và MySQL để đảm bảo các giải pháp web chạy tối ưu và dễ mở rộng rộng rãi.',
  ARRAY['PHP','Laravel','React','InertiaJS','MySQL','Tailwind CSS','Custom Web'],
  '#7C3AED',
  1
),
(
  'e1',
  'Cantho University Software Center (CUSC)',
  'Frontend Developer (Intern)',
  'Nhà phát triển Frontend (Thực tập sinh)',
  'May 2025 - Aug 2025',
  'Tháng 5 2025 - Tháng 8 2025',
  'Built responsive, user-friendly frontend interfaces ensuring smooth user experiences across devices. Integrated RESTful APIs with Axios to fetch and display dynamic data in real time, and cooperated with backend developers to optimize data flow and improve system performance.',
  'Xây dựng giao diện frontend thân thiện, tối ưu khả năng responsive giúp tăng trải nghiệm người dùng trên mọi thiết bị di động. Kết nối RESTful APIs sử dụng thư viện Axios để lấy và hiển thị dữ liệu thời gian thực động, phối hợp cùng các lập trình viên backend để tối ưu hóa lưu lượng luồng dữ liệu và nâng cao hiệu năng hệ thống.',
  ARRAY['Next.js','React','Mantine UI','Tailwind CSS','Axios','RESTful APIs'],
  '#00D9FF',
  2
)
ON CONFLICT (id) DO UPDATE SET
  company        = EXCLUDED.company,
  role_en        = EXCLUDED.role_en,
  role_vi        = EXCLUDED.role_vi,
  duration_en    = EXCLUDED.duration_en,
  duration_vi    = EXCLUDED.duration_vi,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  tags           = EXCLUDED.tags,
  color          = EXCLUDED.color,
  sort_order     = EXCLUDED.sort_order;


-- ── 5. BLOG POSTS ─────────────────────────────────────────────
INSERT INTO public.blog_posts (
  slug, title_en, title_vi,
  description_en, description_vi,
  content_en, content_vi,
  date_en, date_vi, iso_date,
  tags, author_en, author_vi,
  read_time_en, read_time_vi,
  cover_image
) VALUES
(
  'about-vu-bao-khanh-fullstack-developer',
  'Who is Vu Bao Khanh? The Journey of a Full Stack Developer',
  'Vũ Bảo Khanh Là Ai? Hành Trình Định Hình Tư Duy Của Một Full Stack Developer',
  'An in-depth personal story of how Vu Bao Khanh built his expertise in PHP, Laravel, NestJS, and React from FPT Polytechnic to BM WEB.',
  'Câu chuyện tự sự chi tiết về cách Vũ Bảo Khanh xây dựng chuyên môn lập trình PHP, Laravel, NestJS và React từ FPT Polytechnic đến BM WEB.',
  '
      <h2>The Philosophy That Drives Everything I Build</h2>
      <p>My name is <strong>Vu Bao Khanh</strong> (Vũ Bảo Khanh). I am a Full Stack Developer based in Can Tho, Vietnam, currently working at <strong>BM WEB</strong> as a Full Stack PHP Developer. But before I get into the technical details of what I do, I want to tell you something more important — the <em>why</em> behind it.</p>
      <p>I have always believed that code is not just a series of instructions a machine executes. It is a form of craftsmanship. A well-architected system is elegant: it scales without drama, fails gracefully, and communicates its intent clearly to any engineer who reads it six months later. This is the standard I hold myself to on every project, whether it is a small internal admin panel or a production system handling thousands of concurrent users.</p>
      <h2>Chapter 1 — Starting From Zero at FPT Polytechnic Can Tho</h2>
      <p>My formal education was at <strong>FPT Polytechnic Can Tho</strong>, a vocational school that prioritizes hands-on project work over theoretical lectures.</p>
      <h2>Chapter 2 — The Internship That Taught Me How Teams Actually Work</h2>
      <p>After graduating, I joined the <strong>Cantho University Software Center (CUSC)</strong> as a Frontend Developer Intern. This was my first exposure to a professional software development environment.</p>
      <h2>Chapter 3 — Going Full Stack at BM WEB</h2>
      <p>My current role at <strong>BM WEB</strong> as a Full Stack PHP Developer is where I operate at my highest level of complexity.</p>
      <h2>If You Are Reading This as a Recruiter or Client</h2>
      <p>You can reach me at <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a>, connect on <a href="https://linkedin.com/in/vubaokhannh">LinkedIn</a>, or explore my work on <a href="https://github.com/vubaokhannh">GitHub</a>.</p>
  ',
  '
      <h2>Triết lý: Mã nguồn không chỉ là logic, đó là nghệ thuật thủ công</h2>
      <p>Tên tôi là <strong>Vũ Bảo Khanh</strong>. Là một Full Stack Developer, tôi luôn tin rằng kỹ thuật phần mềm là sự cân bằng giữa tính kỷ luật kỹ thuật và tư duy giải quyết vấn đề sáng tạo.</p>
      <h2>1. Nền tảng thực chiến: FPT Polytechnic Cần Thơ</h2>
      <p>Hành trình chuyên nghiệp của tôi bắt đầu tại FPT Polytechnic Cần Thơ. Khác với các chương trình học truyền thống, FPT Poly buộc tôi phải làm quen với các dự án thực tế ngay từ ngày đầu.</p>
      <h2>2. Làm chủ bộ kỹ năng Frontend và Backend</h2>
      <ul>
        <li><strong>Backend core (PHP & Laravel):</strong> Laravel là công cụ tôi tin tưởng lựa chọn để xây dựng các cấu trúc máy chủ mạnh mẽ.</li>
        <li><strong>Công nghệ thời gian thực (NestJS & Socket.IO):</strong> Khi xây dựng các hệ thống đồng bộ dữ liệu thời gian thực, tôi lựa chọn NestJS.</li>
        <li><strong>Frontend tương tác cao (React & Next.js):</strong> Tôi sử dụng React để phát triển giao diện người dùng mượt mà.</li>
      </ul>
      <h2>Kết luận</h2>
      <p>Xây dựng thương hiệu cá nhân và viết code sạch luôn song hành. Nếu bạn là nhà tuyển dụng, hãy liên hệ với tôi!</p>
  ',
  'July 13, 2026',
  '13 Tháng 7, 2026',
  '2026-07-13',
  ARRAY['About Me','Career','Laravel','React'],
  'Vu Bao Khanh',
  'Vũ Bảo Khanh',
  '15 min read',
  '12 phút đọc',
  '/og-image.png'
),
(
  'building-krello-realtime-task-management-nestjs-react',
  'Architecting Krello: Building a Real-Time Collaborative Engine with NestJS and React',
  'Kiến trúc Krello: Xây dựng hệ thống quản lý công việc thời gian thực bằng NestJS và React',
  'A technical case study on how Vu Bao Khanh architected Krello, a real-time collaborative task board using NestJS, Socket.IO, and React.',
  'Bài nghiên cứu kỹ thuật chuyên sâu về cách Vũ Bảo Khanh thiết kế Krello, hệ thống bảng Kanban cộng tác thời gian thực bằng NestJS, Socket.IO và React.',
  '
      <h2>The Goal: Achieving Sub-Second Collaborative Sync</h2>
      <p>When designing Krello, my objective was clear: build a task management board similar to Trello where team members can drag, drop, and edit tasks, with all changes syncing globally across users in under 100ms.</p>
  ',
  '
      <h2>Mục tiêu: Đạt tốc độ đồng bộ dữ liệu thời gian thực dưới 100ms</h2>
      <p>Khi thiết kế Krello, mục tiêu của tôi rất rõ ràng: xây dựng một bảng quản lý công việc tương tự Trello nơi các thành viên có thể kéo, thả và chỉnh sửa thẻ tác vụ với tốc độ đồng bộ tức thì.</p>
  ',
  'July 10, 2026',
  '10 Tháng 7, 2026',
  '2026-07-10',
  ARRAY['Projects','NestJS','Socket.IO','React'],
  'Vu Bao Khanh',
  'Vũ Bảo Khanh',
  '15 min read',
  '15 phút đọc',
  '/og-image.png'
)
ON CONFLICT (slug) DO UPDATE SET
  title_en       = EXCLUDED.title_en,
  title_vi       = EXCLUDED.title_vi,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  content_en     = EXCLUDED.content_en,
  content_vi     = EXCLUDED.content_vi,
  date_en        = EXCLUDED.date_en,
  date_vi        = EXCLUDED.date_vi,
  iso_date       = EXCLUDED.iso_date,
  tags           = EXCLUDED.tags,
  author_en      = EXCLUDED.author_en,
  author_vi      = EXCLUDED.author_vi,
  read_time_en   = EXCLUDED.read_time_en,
  read_time_vi   = EXCLUDED.read_time_vi,
  cover_image    = EXCLUDED.cover_image;


-- ── 6. SEO & SCHEMA.ORG CONFIG ──────────────────────────────────
INSERT INTO public.seo_config (
  key,
  seo_title,
  seo_description,
  canonical_url,
  google_verification,
  keywords_input,
  og_image_url,
  twitter_handle,
  author_name,
  job_title,
  organization,
  allow_indexing,
  faq_schema,
  person_schema_custom,
  custom_raw_jsonld
) VALUES (
  'vubaokhanh',
  'Vũ Bảo Khanh - Fullstack Web Engineer',
  'Portfolio và dịch vụ phát triển web của Vũ Bảo Khanh (Vu Bao Khanh) — Lập trình viên Fullstack chuyên nghiệp (Laravel, NestJS, React, Next.js) tại Việt Nam.',
  'https://vubaokhanh.tech',
  '',
  'Vu Bao Khanh, Vũ Bảo Khanh, vubaokhanh.tech, Fullstack Developer, Laravel Developer Vietnam, NestJS Developer, React Developer, Custom Web Development, Thiết kế website chuẩn SEO',
  'https://vubaokhanh.tech/og-image.png',
  '@vubaokhannh',
  'Vũ Bảo Khanh',
  'Fullstack Web Engineer',
  'BM WEB',
  true,
  '[
    {"question": "Vũ Bảo Khanh chuyên xây dựng loại website nào?", "answer": "Tôi chuyên xây dựng website doanh nghiệp tùy biến, hệ thống thương mại điện tử, admin & ERP panel và tối ưu hóa hiệu năng SEO. Các công nghệ chính bao gồm Laravel, React, Next.js, NestJS và TypeScript."},
    {"question": "What technologies does Vu Bao Khanh use for web development?", "answer": "Vu Bao Khanh specializes in fullstack development using Laravel (PHP), NestJS (Node.js), React, Next.js, TypeScript, MySQL, PostgreSQL, and Docker for enterprise-grade web applications."},
    {"question": "Vũ Bảo Khanh có nhận làm website thương mại điện tử không?", "answer": "Có. Tôi xây dựng các cửa hàng trực tuyến tỷ lệ chuyển đổi cao với giỏ hàng bảo mật, quy trình thanh toán mượt mà và tích hợp các cổng thanh toán phổ biến như VNPay, Momo, và Stripe."},
    {"question": "How can I contact Vu Bao Khanh for a web development project?", "answer": "You can reach Vu Bao Khanh via email at vubaokhanh2311@gmail.com, connect on LinkedIn at linkedin.com/in/vubaokhannh, or browse the portfolio at vubaokhanh.tech."},
    {"question": "Vũ Bảo Khanh có kinh nghiệm làm việc tại công ty nào?", "answer": "Hiện tại tôi đang làm Fullstack PHP Developer tại BM WEB (từ tháng 1/2026). Trước đó tôi thực tập Frontend Developer tại Trung tâm Phần mềm Đại học Cần Thơ (CUSC) từ tháng 5 đến tháng 8 năm 2025."}
  ]'::jsonb,
  '{
    "alternateName": "Vũ Bảo Khanh",
    "givenName": "Bao Khanh",
    "familyName": "Vu",
    "alumniName": "FPT Polytechnic",
    "alumniUrl": "https://caodang.fpt.edu.vn",
    "knowsAbout": ["PHP", "Laravel", "React", "TypeScript", "NestJS", "Node.js", "MySQL", "PostgreSQL", "Next.js", "Docker", "Redis", "Prisma", "Web Development", "Backend Engineering", "Frontend Development", "RESTful APIs", "System Design"],
    "newsArticles": [
      {"name": "Dự án tốt nghiệp: Xây dựng website hệ thống đặt vé xe bus tích hợp hệ thống bản đồ định vị", "url": "https://caodang.fpt.edu.vn/tin-tuc-poly/du-an-tot-nghiep-xay-dung-website-he-thong-dat-ve-xe-bus-tich-hop-he-thong-ban-do-dinh-vi.html"},
      {"name": "Ấn tượng với dự án Xưởng phần mềm: Website quản lý sinh viên tích hợp Google Drive API", "url": "https://caodang.fpt.edu.vn/tin-tuc-poly/an-tuong-voi-du-an-xuong-phan-mem-website-quan-ly-sinh-vien-tich-hop-google-drive-api.html"},
      {"name": "Sinh viên FPT Polytechnic Cần Thơ thiết kế và xây dựng hệ thống bán hàng laptop trực tuyến", "url": "https://caodang.fpt.edu.vn/tin-tuc-poly/sinh-vien-fpt-polytechnic-can-tho-thiet-ke-va-xay-dung-he-thong-ban-hang-laptop-truc-tuyen.html"}
    ]
  }'::jsonb,
  ''
)
ON CONFLICT (key) DO UPDATE SET
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  canonical_url = EXCLUDED.canonical_url,
  google_verification = EXCLUDED.google_verification,
  keywords_input = EXCLUDED.keywords_input,
  og_image_url = EXCLUDED.og_image_url,
  twitter_handle = EXCLUDED.twitter_handle,
  author_name = EXCLUDED.author_name,
  job_title = EXCLUDED.job_title,
  organization = EXCLUDED.organization,
  allow_indexing = EXCLUDED.allow_indexing,
  faq_schema = EXCLUDED.faq_schema,
  person_schema_custom = EXCLUDED.person_schema_custom,
  custom_raw_jsonld = EXCLUDED.custom_raw_jsonld,
  updated_at = now();


-- ── 7. SKILLS ─────────────────────────────────────────────────
INSERT INTO public.skills (id, name, icon, category, level, description_en, description_vi, color, sort_order) VALUES
  ('react', 'React', '⚛️', 'frontend', 4, 'Component-driven UIs with hooks & context', 'Giao diện hướng thành phần với react hooks & context state', '#61DAFB', 1),
  ('typescript', 'TypeScript', '🔷', 'frontend', 4, 'Type-safe development at scale', 'Lập trình an toàn kiểu dữ liệu ở quy mô lớn', '#3178C6', 2),
  ('tailwind', 'Tailwind CSS', '🎨', 'frontend', 5, 'Utility-first styling with design systems', 'Tạo kiểu nhanh dựa trên hệ thống thiết kế tiện ích', '#06B6D4', 3),
  ('nextjs', 'Next.js', '▲', 'frontend', 4, 'Full-stack React framework', 'Khung lập trình React full-stack', '#FFFFFF', 4),
  ('laravel', 'Laravel', '🔴', 'backend', 5, 'PHP framework for enterprise apps', 'Khung PHP tối ưu cho ứng dụng doanh nghiệp', '#FF2D20', 5),
  ('php', 'PHP', '🐘', 'backend', 4, 'Server-side scripting language', 'Ngôn ngữ kịch bản phía máy chủ mạnh mẽ', '#8892BF', 6),
  ('nodejs', 'Node.js', '🟢', 'backend', 4, 'TypeScript & JavaScript backend runtime', 'Môi trường chạy JavaScript/TypeScript phía máy chủ', '#339933', 7),
  ('nestjs', 'NestJS', '🐈', 'backend', 4, 'Modular enterprise Node.js framework', 'Khung Node.js hướng module cấp doanh nghiệp', '#E0234E', 8),
  ('prisma', 'Prisma', '◭', 'backend', 4, 'Type-safe Next-gen TypeScript ORM', 'Trình ORM TypeScript an toàn kiểu dữ liệu thế hệ mới', '#2D3748', 9),
  ('filament', 'Filament', '⚡', 'backend', 5, 'Laravel admin panel framework', 'Khung phát triển trang admin nhanh cho Laravel', '#F59E0B', 10),
  ('mysql', 'MySQL', '🐬', 'database', 4, 'Relational DB design & optimization', 'Thiết kế cơ sở dữ liệu quan hệ & tối ưu truy vấn', '#4479A1', 11),
  ('postgresql', 'PostgreSQL', '🐘', 'database', 4, 'Advanced open-source relational database', 'Hệ quản trị cơ sở dữ liệu quan hệ nguồn mở tiên tiến', '#336791', 12),
  ('redis', 'Redis', '🔴', 'database', 3, 'In-memory caching & queues', 'Bộ nhớ đệm trong ram (caching) & hàng đợi công việc', '#DC382D', 13),
  ('docker', 'Docker', '🐳', 'devops', 3, 'Containerization & orchestration', 'Đóng gói ứng dụng trong container & điều phối', '#2496ED', 14),
  ('git', 'Git', '🌿', 'devops', 5, 'Version control & collaboration', 'Hệ thống quản lý phiên bản mã nguồn & cộng tác', '#F05032', 15),
  ('vscode', 'VS Code', '💻', 'tools', 5, 'Primary development environment', 'Môi trường lập trình soạn thảo code chính', '#007ACC', 16),
  ('postman', 'Postman', '📮', 'tools', 4, 'API testing & documentation', 'Kiểm thử và viết tài liệu hướng dẫn API', '#FF6C37', 17),
  ('figma', 'Figma', '🎯', 'tools', 3, 'UI/UX design & prototyping', 'Thiết kế và mô phỏng giao diện người dùng UI/UX', '#F24E1E', 18)
ON CONFLICT (id) DO UPDATE SET
  name           = EXCLUDED.name,
  icon           = EXCLUDED.icon,
  category       = EXCLUDED.category,
  level          = EXCLUDED.level,
  description_en = EXCLUDED.description_en,
  description_vi = EXCLUDED.description_vi,
  color          = EXCLUDED.color,
  sort_order     = EXCLUDED.sort_order;

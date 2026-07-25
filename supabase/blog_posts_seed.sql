-- ============================================================
-- BLOG POSTS SEED DATA — 5 bài viết chuẩn SEO
-- Chạy trong Supabase SQL Editor
-- Sử dụng Postgres Dollar-Quoting ($tag$...$tag$) an toàn 100%
-- ============================================================

-- ── BÀI 1: Về bản thân (About Me) ────────────────────────────
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
  'Who is Vu Bao Khanh? The Journey of a Full Stack Developer in Vietnam',
  'Vũ Bảo Khanh Là Ai? Hành Trình Từ Sinh Viên Đến Full Stack Developer Chuyên Nghiệp',
  'Discover the story of Vu Bao Khanh — a Full Stack Developer from Can Tho, Vietnam, specializing in Laravel, NestJS, React and TypeScript. From FPT Polytechnic to BM WEB, this is the authentic journey of building real-world enterprise systems.',
  'Khám phá câu chuyện của Vũ Bảo Khanh — Full Stack Developer tại Cần Thơ, Việt Nam, chuyên về Laravel, NestJS, React và TypeScript. Từ FPT Polytechnic đến BM WEB — hành trình chân thực xây dựng các hệ thống doanh nghiệp trong thực tế.',
  $body1_en$<h2>The Developer Behind This Website</h2>
<p>My name is <strong>Vu Bao Khanh</strong> (Vietnamese: Vũ Bảo Khanh). I am a <strong>Full Stack Developer</strong> based in Can Tho, Vietnam, currently working at <strong>BM WEB</strong> as a Full Stack PHP Developer. If you found this blog through a search engine, a LinkedIn profile, or a GitHub repository, I am glad you are here — because this article is about to give you a genuine, unfiltered look at who I am and what I build.</p>
<p>I believe software engineering is a craft. A well-architected system is elegant: it scales without drama, fails gracefully, and communicates intent clearly to any engineer who reads it six months later. This standard drives every line of code I write.</p>

<h2>Chapter 1 — Learning to Build at FPT Polytechnic Can Tho</h2>
<p>My formal education was at <strong>FPT Polytechnic Can Tho</strong>, a vocational school that prioritizes hands-on project work over lectures. From the very first semester, I was writing PHP, designing MySQL schemas, and deploying websites on shared hosting. No simulation — real systems, real errors, real deadlines.</p>
<p>My graduation project was an <strong>Online Vehicle Ticketing System</strong> — a full-featured booking platform integrating a live vehicle tracking map, IoT camera passenger counting, digital wallet payments, and a Filament-powered admin portal. This project was featured on the <a href="https://caodang.fpt.edu.vn" target="_blank" rel="noopener">FPT Polytechnic news portal</a>.</p>
<p>What FPT Poly gave me was not just technical skill — it gave me the discipline to ship working software under real constraints.</p>

<h2>Chapter 2 — The Professional Internship at CUSC</h2>
<p>After graduation, I joined the <strong>Cantho University Software Center (CUSC)</strong> as a Frontend Developer Intern (May 2025 – Aug 2025). This was my first experience in a structured software development team with sprints, code reviews, and production deployments.</p>
<p>My responsibilities included:</p>
<ul>
  <li>Building responsive, accessible UI components using <strong>React, Next.js, and Mantine UI</strong></li>
  <li>Integrating RESTful APIs with <strong>Axios</strong> to display real-time dynamic data</li>
  <li>Collaborating with backend engineers to reduce data latency and improve overall system performance</li>
</ul>
<p>The internship taught me something no tutorial can: how professional teams actually communicate, prioritize tasks, and handle production incidents under pressure.</p>

<h2>Chapter 3 — Going Full Stack at BM WEB</h2>
<p>Since January 2026, I have been working at <strong>BM WEB</strong> as a Full Stack PHP Developer. This is where I operate at my highest complexity level. On any given week, I may be:</p>
<ul>
  <li>Designing and implementing a <strong>Laravel MVC backend</strong> with custom RBAC authorization</li>
  <li>Building <strong>Filament admin panels</strong> with complex multi-relational data tables</li>
  <li>Developing <strong>React or Inertia.js frontends</strong> that communicate with the backend through RESTful and WebSocket channels</li>
  <li>Auditing an existing codebase for N+1 query problems and optimizing MySQL indexes</li>
  <li>Configuring Nginx, PM2, and GitHub Actions CI/CD pipelines for deployment</li>
</ul>

<h2>My Core Technology Stack in 2026</h2>
<p>These are the tools I use daily and trust in production:</p>
<ul>
  <li><strong>Backend:</strong> Laravel (PHP), NestJS (Node.js/TypeScript), Prisma ORM</li>
  <li><strong>Frontend:</strong> React, Next.js (App Router), TypeScript, Tailwind CSS</li>
  <li><strong>Databases:</strong> MySQL, PostgreSQL, Redis</li>
  <li><strong>DevOps:</strong> Docker, Nginx, PM2, GitHub Actions</li>
  <li><strong>Real-time:</strong> Socket.IO, WebSockets</li>
</ul>

<h2>The Projects That Defined My Career</h2>
<p><strong>Krello</strong> — A real-time collaborative task board modeled after Trello. Built with NestJS (TypeScript), Socket.IO, React, and PostgreSQL via Prisma. Features include live card sync across clients in under 100ms, RBAC, JWT authentication, and automated CI/CD via GitHub Actions. Live at <a href="https://web.krello.biz" target="_blank" rel="noopener">web.krello.biz</a>.</p>
<p><strong>Online Vehicle Ticketing System</strong> — A comprehensive transportation management system built with Laravel, React, InertiaJS, and MySQL. Integrates an IoT smart camera for automated passenger counting and a live vehicle tracking map.</p>
<p><strong>Wine E-Commerce Platform</strong> — A pure PHP MVC e-commerce storefront with voice search powered by Web Speech API, behavioral recommendation engine, and a full checkout pipeline.</p>

<h2>Why I Write This Blog</h2>
<p>I write to document what I learn, to share technical patterns I discover, and to build a public record of my thinking as an engineer. Every article I publish here is written to be genuinely useful — not keyword-stuffed filler, but substantive content about real problems I have solved.</p>

<h2>Let's Work Together</h2>
<p>If you are a <strong>recruiter</strong>, a <strong>startup founder</strong>, or a <strong>business</strong> looking to build a custom web system, I am available for freelance and full-time opportunities.</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a></li>
  <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/vubaokhannh" target="_blank" rel="noopener">linkedin.com/in/vubaokhannh</a></li>
  <li><strong>GitHub:</strong> <a href="https://github.com/vubaokhannh" target="_blank" rel="noopener">github.com/vubaokhannh</a></li>
  <li><strong>Portfolio:</strong> <a href="https://vubaokhanh.tech" target="_blank" rel="noopener">vubaokhanh.tech</a></li>
</ul>$body1_en$,
  $body1_vi$<h2>Developer Đứng Sau Website Này</h2>
<p>Tên tôi là <strong>Vũ Bảo Khanh</strong>. Tôi là một <strong>Full Stack Developer</strong> tại Cần Thơ, Việt Nam, hiện đang làm việc tại <strong>BM WEB</strong> với vai trò Full Stack PHP Developer. Nếu bạn tìm thấy blog này qua công cụ tìm kiếm, hồ sơ LinkedIn hay kho GitHub — tôi rất vui vì bạn đã ghé thăm. Bài viết này sẽ cho bạn cái nhìn chân thực, không được chỉnh sửa về tôi là ai và tôi xây dựng những gì.</p>
<p>Tôi tin rằng lập trình phần mềm là một nghề thủ công. Một hệ thống được thiết kế tốt là hệ thống thanh lịch: mở rộng được mà không gây sự cố, thất bại đúng cách, và truyền đạt ý định rõ ràng cho bất kỳ kỹ sư nào đọc code sáu tháng sau. Tiêu chuẩn này thúc đẩy từng dòng code tôi viết.</p>

<h2>Chương 1 — Học Cách Xây Dựng Tại FPT Polytechnic Cần Thơ</h2>
<p>Nền giáo dục chính quy của tôi là tại <strong>FPT Polytechnic Cần Thơ</strong>, một trường nghề ưu tiên thực hành hơn lý thuyết. Ngay từ học kỳ đầu tiên, tôi đã viết PHP, thiết kế schema MySQL và triển khai website trên shared hosting. Không có mô phỏng — hệ thống thật, lỗi thật, deadline thật.</p>
<p>Dự án tốt nghiệp của tôi là <strong>Hệ thống Đặt vé Xe trực tuyến</strong> — một nền tảng đặt vé đầy đủ tính năng tích hợp bản đồ định vị xe trực tiếp, camera IoT đếm hành khách, thanh toán ví điện tử và cổng admin powered by Filament. Dự án này đã được đăng trên <a href="https://caodang.fpt.edu.vn" target="_blank" rel="noopener">trang tin tức FPT Polytechnic</a>.</p>

<h2>Chương 2 — Thực Tập Chuyên Nghiệp tại CUSC</h2>
<p>Sau khi tốt nghiệp, tôi tham gia <strong>Trung tâm Phần mềm Đại học Cần Thơ (CUSC)</strong> với vai trò thực tập sinh Frontend Developer (tháng 5/2025 – tháng 8/2025). Đây là lần đầu tiên tôi làm việc trong một nhóm phát triển phần mềm chuyên nghiệp với sprint, code review và triển khai production.</p>
<ul>
  <li>Xây dựng UI components responsive, có khả năng tiếp cận với <strong>React, Next.js và Mantine UI</strong></li>
  <li>Tích hợp RESTful APIs bằng <strong>Axios</strong> để hiển thị dữ liệu động thời gian thực</li>
  <li>Phối hợp với kỹ sư backend để giảm độ trễ dữ liệu và cải thiện hiệu năng hệ thống</li>
</ul>

<h2>Chương 3 — Làm Full Stack Tại BM WEB</h2>
<p>Từ tháng 1/2026, tôi làm việc tại <strong>BM WEB</strong> với vai trò Full Stack PHP Developer. Đây là nơi tôi vận hành ở mức độ phức tạp cao nhất. Trong một tuần bình thường, tôi có thể:</p>
<ul>
  <li>Thiết kế và triển khai <strong>Laravel MVC backend</strong> với RBAC tùy biến</li>
  <li>Xây dựng <strong>Filament admin panel</strong> với bảng dữ liệu đa quan hệ phức tạp</li>
  <li>Phát triển <strong>React hoặc Inertia.js frontend</strong> giao tiếp qua RESTful API và WebSocket</li>
  <li>Kiểm tra codebase để tìm và tối ưu vấn đề N+1 query và MySQL indexes</li>
  <li>Cấu hình Nginx, PM2 và pipeline CI/CD với GitHub Actions</li>
</ul>

<h2>Stack Công Nghệ Chính Năm 2026</h2>
<ul>
  <li><strong>Backend:</strong> Laravel (PHP), NestJS (Node.js/TypeScript), Prisma ORM</li>
  <li><strong>Frontend:</strong> React, Next.js (App Router), TypeScript, Tailwind CSS</li>
  <li><strong>Database:</strong> MySQL, PostgreSQL, Redis</li>
  <li><strong>DevOps:</strong> Docker, Nginx, PM2, GitHub Actions</li>
  <li><strong>Real-time:</strong> Socket.IO, WebSockets</li>
</ul>

<h2>Tại Sao Tôi Viết Blog Này</h2>
<p>Tôi viết để ghi lại những gì học được, chia sẻ các kỹ thuật tôi khám phá, và xây dựng hồ sơ công khai về tư duy của một kỹ sư. Mọi bài viết ở đây đều được viết với mục đích thực sự hữu ích — không phải nội dung nhồi nhét từ khóa, mà là nội dung thực chất về những vấn đề thực sự tôi đã giải quyết.</p>

<h2>Hãy Liên Hệ Với Tôi</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a></li>
  <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/vubaokhannh" target="_blank" rel="noopener">linkedin.com/in/vubaokhannh</a></li>
  <li><strong>GitHub:</strong> <a href="https://github.com/vubaokhannh" target="_blank" rel="noopener">github.com/vubaokhannh</a></li>
  <li><strong>Portfolio:</strong> <a href="https://vubaokhanh.tech" target="_blank" rel="noopener">vubaokhanh.tech</a></li>
</ul>$body1_vi$,
  'July 13, 2026',
  '13 Tháng 7, 2026',
  '2026-07-13',
  ARRAY['About Me','Career','Laravel','React','NestJS','Full Stack Developer'],
  'Vu Bao Khanh',
  'Vũ Bảo Khanh',
  '12 min read',
  '12 phút đọc',
  '/og-image.png'
),

-- ── BÀI 2: Next.js App Router ─────────────────────────────────
(
  'nextjs-app-router-complete-guide-2026',
  'Next.js App Router in 2026: A Complete Practical Guide for Full Stack Developers',
  'Hướng Dẫn Thực Chiến Next.js App Router 2026: Từ Cơ Bản Đến Production',
  'A deep-dive technical guide covering Next.js 15 App Router — Server Components, streaming, caching strategies, layout patterns, and SEO optimization for production-grade applications.',
  'Hướng dẫn kỹ thuật chuyên sâu về Next.js 15 App Router — Server Components, streaming, chiến lược caching, layout pattern và tối ưu SEO cho ứng dụng production thực tế.',
  $body2_en$<h2>Why App Router Changed How I Think About React Applications</h2>
<p>When Next.js introduced the <strong>App Router</strong> in version 13 and fully stabilized it in versions 14 and 15, it was not just a routing change — it was a fundamental shift in how React applications should be architected. After building several production applications with it, I want to share a practical, no-fluff guide on what actually matters.</p>

<h2>The Core Mental Model: Server-First by Default</h2>
<p>The single most important concept in the App Router is that <strong>every component is a Server Component by default</strong>. This means:</p>
<ul>
  <li>Zero JavaScript sent to the client unless you explicitly opt in with <code>"use client"</code></li>
  <li>Direct database queries inside components (no extra API routes needed)</li>
  <li>Secrets, environment variables, and database connections never exposed to the browser</li>
</ul>
<pre><code>// app/blog/page.tsx — Server Component (default)
import { db } from "@/lib/db";

export default async function BlogPage() {
  // This runs on the server — never sent to the client
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  
  return (
    &lt;main&gt;
      {posts.map(post =&gt; &lt;PostCard key={post.id} post={post} /&gt;)}
    &lt;/main&gt;
  );
}</code></pre>

<h2>File-System Routing: The Layout System</h2>
<p>The App Router uses a file-system hierarchy where <code>layout.tsx</code> files wrap their children. This enables powerful patterns:</p>
<pre><code>app/
├── layout.tsx          ← Root layout (html, body)
├── page.tsx            ← Home page
├── blog/
│   ├── layout.tsx      ← Blog layout (sidebar, nav)
│   ├── page.tsx        ← Blog index
│   └── [slug]/
│       └── page.tsx    ← Individual post</code></pre>

<h2>Caching Strategy: The 4-Layer Model</h2>
<p>Understanding caching in Next.js 15 is critical for performance. There are four distinct caching layers:</p>
<ol>
  <li><strong>Request Memoization</strong> — Deduplicates identical fetch calls within a single render pass</li>
  <li><strong>Data Cache</strong> — Persistent server-side cache across requests (opt-out with <code>no-store</code>)</li>
  <li><strong>Full Route Cache</strong> — Caches entire rendered HTML + RSC payloads at build time</li>
  <li><strong>Router Cache</strong> — Client-side cache of prefetched routes in the browser</li>
</ol>

<h2>Streaming and Suspense: Eliminating Waterfalls</h2>
<p>One of the most powerful App Router features is first-class streaming with <code>Suspense</code>:</p>
<pre><code>import { Suspense } from "react";
import { PostSkeleton } from "@/components/skeletons";

export default function BlogLayout({ children }) {
  return (
    &lt;div&gt;
      &lt;Suspense fallback={&lt;PostSkeleton /&gt;}&gt;
        {children}
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>SEO: Metadata API</h2>
<p>The App Router has a built-in, type-safe Metadata API that replaces manual <code>&lt;Head&gt;</code> management:</p>
<pre><code>export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [{ url: post.coverImage }],
    },
  };
}</code></pre>

<h2>When to Use Server vs Client Components</h2>
<table>
  <tr><th>Use Case</th><th>Component Type</th></tr>
  <tr><td>Database queries, data fetching</td><td>Server Component</td></tr>
  <tr><td>useState, useEffect, event listeners</td><td>Client Component</td></tr>
  <tr><td>Static layout, navigation</td><td>Server Component</td></tr>
  <tr><td>Interactive forms, modals, dropdowns</td><td>Client Component</td></tr>
</table>

<h2>Key Takeaways</h2>
<ul>
  <li>Default to Server Components — only add <code>"use client"</code> when interactivity is required</li>
  <li>Use <code>loading.tsx</code> and <code>Suspense</code> for granular streaming skeletons</li>
  <li>Understand the 4-layer caching model before optimizing performance</li>
  <li>Use the Metadata API for type-safe, co-located SEO configuration</li>
</ul>$body2_en$,
  $body2_vi$<h2>Tại Sao App Router Thay Đổi Cách Tôi Nghĩ Về React</h2>
<p>Khi Next.js giới thiệu <strong>App Router</strong> trong phiên bản 13 và ổn định hoàn toàn ở phiên bản 14 và 15, đây không chỉ là thay đổi routing — đó là sự thay đổi căn bản trong cách kiến trúc ứng dụng React. Sau khi xây dựng nhiều ứng dụng production với nó, tôi muốn chia sẻ hướng dẫn thực chiến về những gì thực sự quan trọng.</p>

<h2>Mô Hình Tư Duy Cốt Lõi: Server-First Mặc Định</h2>
<p>Khái niệm quan trọng nhất trong App Router là <strong>mọi component đều là Server Component mặc định</strong>. Điều này có nghĩa là:</p>
<ul>
  <li>Không có JavaScript nào được gửi đến client trừ khi bạn dùng <code>"use client"</code></li>
  <li>Truy vấn database trực tiếp trong components (không cần route API thêm)</li>
  <li>Secrets, biến môi trường và kết nối database không bao giờ lộ ra browser</li>
</ul>
<pre><code>// app/blog/page.tsx — Server Component (mặc định)
import { db } from "@/lib/db";

export default async function BlogPage() {
  // Chạy trên server — không bao giờ gửi đến client
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  
  return (
    &lt;main&gt;
      {posts.map(post =&gt; &lt;PostCard key={post.id} post={post} /&gt;)}
    &lt;/main&gt;
  );
}</code></pre>

<h2>Cấu Trúc File-System và Layout</h2>
<p>App Router sử dụng phân cấp hệ thống file nơi <code>layout.tsx</code> bọc children. Điều này cho phép các pattern mạnh mẽ:</p>
<pre><code>app/
├── layout.tsx          ← Root layout (html, body)
├── page.tsx            ← Trang chủ
├── blog/
│   ├── layout.tsx      ← Blog layout (sidebar, nav)
│   ├── page.tsx        ← Danh sách bài viết
│   └── [slug]/
│       └── page.tsx    ← Bài viết chi tiết</code></pre>

<h2>Chiến Lược Caching: Mô Hình 4 Lớp</h2>
<p>Hiểu caching trong Next.js 15 là rất quan trọng cho hiệu năng:</p>
<ol>
  <li><strong>Request Memoization</strong> — Loại bỏ trùng lặp các lần fetch giống nhau trong một lần render</li>
  <li><strong>Data Cache</strong> — Cache phía server bền vững qua các requests</li>
  <li><strong>Full Route Cache</strong> — Cache toàn bộ HTML + RSC payload lúc build</li>
  <li><strong>Router Cache</strong> — Cache phía client của các route đã prefetch</li>
</ol>

<h2>SEO Với Metadata API</h2>
<pre><code>export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [{ url: post.coverImage }],
    },
  };
}</code></pre>

<h2>Kết Luận</h2>
<ul>
  <li>Mặc định dùng Server Components — chỉ thêm <code>"use client"</code> khi cần tương tác</li>
  <li>Dùng <code>loading.tsx</code> và <code>Suspense</code> cho streaming skeleton</li>
  <li>Hiểu mô hình caching 4 lớp trước khi tối ưu hiệu năng</li>
  <li>Dùng Metadata API cho cấu hình SEO type-safe, co-located</li>
</ul>$body2_vi$,
  'July 18, 2026',
  '18 Tháng 7, 2026',
  '2026-07-18',
  ARRAY['Next.js','React','App Router','Performance','SEO','Web Development'],
  'Vu Bao Khanh',
  'Vũ Bảo Khanh',
  '14 min read',
  '14 phút đọc',
  '/og-image.png'
),

-- ── BÀI 3: Laravel Performance ────────────────────────────────
(
  'laravel-performance-optimization-guide',
  'Laravel Performance Optimization: 10 Techniques That Doubled My API Response Speed',
  'Tối Ưu Hiệu Năng Laravel: 10 Kỹ Thuật Giúp Tốc Độ API Tăng Gấp Đôi',
  'A practical Laravel performance guide covering N+1 query elimination, Redis caching, query builder optimization, eager loading, and database indexing strategies used in real production systems.',
  'Hướng dẫn tối ưu hiệu năng Laravel thực chiến: loại bỏ N+1 query, Redis caching, tối ưu Query Builder, eager loading và chiến lược database indexing được dùng trong hệ thống production thực tế.',
  $body3_en$<h2>The Performance Problem Nobody Talks About Enough</h2>
<p>Most Laravel tutorials teach you how to build features. Very few teach you how to build <em>fast</em> features. After optimizing several production Laravel applications at BM WEB, I have compiled the 10 techniques that consistently produced the largest performance gains. All of these are battle-tested — not theoretical.</p>

<h2>1. Eliminate N+1 Queries With Eager Loading</h2>
<p>This is the most common Laravel performance killer. Without eager loading:</p>
<pre><code>// N+1 Problem — 101 queries for 100 posts
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name; // New query per post
}

// Eager Loading — 2 queries total
$posts = Post::with('author')->get();
foreach ($posts as $post) {
    echo $post->author->name; // Already loaded
}</code></pre>
<p>Use Laravel Telescope or Debugbar to detect N+1 issues in development. In production, enable the <code>DB::listen()</code> hook to log slow queries.</p>

<h2>2. Select Only What You Need</h2>
<pre><code>// Loads all columns including large TEXT fields
$users = User::all();

// Only fetch what you display
$users = User::select('id', 'name', 'email')->get();

// Even better with specific relations
$posts = Post::select('id', 'title', 'user_id')
    ->with('author:id,name')
    ->get();</code></pre>

<h2>3. Cache With Redis Using the Repository Pattern</h2>
<pre><code>class PostRepository
{
    public function getPopular(): Collection
    {
        return Cache::remember('posts.popular', now()->addHour(), function () {
            return Post::with('author', 'tags')
                ->where('published', true)
                ->orderByDesc('views')
                ->limit(10)
                ->get();
        });
    }
}

// Invalidate on update
public function update(Post $post, array $data): Post
{
    $post->update($data);
    Cache::forget('posts.popular');
    return $post;
}</code></pre>

<h2>4. Use Database Indexes Strategically</h2>
<pre><code>// In your migration
Schema::table('posts', function (Blueprint $table) {
    $table->index('published_at');           // Single column
    $table->index(['user_id', 'status']);    // Composite index
    $table->fullText('title');               // Full-text search
});</code></pre>

<h2>5. Use Chunking for Large Datasets</h2>
<pre><code>// Loads 100,000 records into memory
User::all()->each(fn($u) => sendEmail($u));

// Processes 500 at a time
User::chunk(500, function ($users) {
    foreach ($users as $user) {
        sendEmail($user);
    }
});

// Even better for background jobs
User::chunkById(500, fn($users) => dispatch(new SendEmailsBatch($users)));</code></pre>

<h2>6. Queue Time-Consuming Operations</h2>
<pre><code>// Blocks the HTTP response for 3+ seconds
public function register(Request $request) {
    $user = User::create($request->all());
    Mail::to($user)->send(new WelcomeEmail($user)); // Slow!
    return response()->json($user);
}

// Non-blocking — returns immediately
public function register(Request $request) {
    $user = User::create($request->all());
    SendWelcomeEmail::dispatch($user)->onQueue('emails');
    return response()->json($user);
}</code></pre>

<h2>7. Route Caching in Production</h2>
<pre><code>php artisan route:cache    # Cache all routes
php artisan config:cache   # Cache configuration
php artisan view:cache     # Pre-compile Blade views
php artisan event:cache    # Cache event listeners</code></pre>

<h2>8. Use Lazy Collections for Memory Efficiency</h2>
<pre><code>// LazyCollection — loads one record at a time
Post::cursor()->each(function (Post $post) {
    // Memory: O(1) — only one model loaded at a time
    processPost($post);
});</code></pre>

<h2>9. Database Connection Pooling With PgBouncer</h2>
<p>For high-traffic applications, use <strong>PgBouncer</strong> (PostgreSQL) or <strong>ProxySQL</strong> (MySQL) to pool database connections. This alone can reduce server memory usage by 40-60% under concurrent load.</p>

<h2>10. Profile First, Optimize Second</h2>
<p>Never guess where your bottleneck is. Use these tools:</p>
<ul>
  <li><strong>Laravel Telescope</strong> — Monitor queries, jobs, requests in real time</li>
  <li><strong>Clockwork</strong> — Browser devtools integration for query profiling</li>
  <li><strong>Tinker + DB::getQueryLog()</strong> — Quick query inspection in development</li>
  <li><strong>EXPLAIN ANALYZE</strong> — MySQL/PostgreSQL query plan inspection</li>
</ul>

<h2>Results in Production</h2>
<p>Applying these techniques to a Laravel e-commerce system at BM WEB reduced the average API response time from <strong>850ms to 210ms</strong> — a 75% improvement — without changing any business logic or infrastructure.</p>$body3_en$,
  $body3_vi$<h2>Vấn Đề Hiệu Năng Mà Ít Ai Nói Đến</h2>
<p>Hầu hết các tutorial Laravel dạy bạn cách xây dựng tính năng. Rất ít dạy bạn xây dựng tính năng <em>nhanh</em>. Sau khi tối ưu nhiều ứng dụng Laravel production tại BM WEB, tôi đã tổng hợp 10 kỹ thuật liên tục cho kết quả cải thiện hiệu năng lớn nhất.</p>

<h2>1. Loại Bỏ N+1 Query Bằng Eager Loading</h2>
<p>Đây là nguyên nhân phổ biến nhất giết chết hiệu năng Laravel:</p>
<pre><code>// N+1 Problem — 101 queries cho 100 bài viết
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name; // Query mới mỗi bài
}

// Eager Loading — chỉ 2 queries
$posts = Post::with('author')->get();
foreach ($posts as $post) {
    echo $post->author->name; // Đã load sẵn
}</code></pre>

<h2>2. Chỉ Select Những Gì Cần Thiết</h2>
<pre><code>// Load tất cả columns kể cả TEXT fields lớn
$users = User::all();

// Chỉ lấy những gì cần hiển thị
$users = User::select('id', 'name', 'email')->get();</code></pre>

<h2>3. Cache Bằng Redis</h2>
<pre><code>return Cache::remember('posts.popular', now()->addHour(), function () {
    return Post::with('author', 'tags')
        ->where('published', true)
        ->orderByDesc('views')
        ->limit(10)
        ->get();
});</code></pre>

<h2>4. Index Database Đúng Chỗ</h2>
<pre><code>Schema::table('posts', function (Blueprint $table) {
    $table->index('published_at');
    $table->index(['user_id', 'status']); // Composite index
});</code></pre>

<h2>5. Dùng Chunking Cho Dữ Liệu Lớn</h2>
<pre><code>// Xử lý 500 records một lúc, không tràn bộ nhớ
User::chunk(500, function ($users) {
    foreach ($users as $user) {
        sendEmail($user);
    }
});</code></pre>

<h2>6. Queue Các Tác Vụ Tốn Thời Gian</h2>
<pre><code>// Không block HTTP response
SendWelcomeEmail::dispatch($user)->onQueue('emails');</code></pre>

<h2>7. Cache Route Và Config Trên Production</h2>
<pre><code>php artisan route:cache
php artisan config:cache
php artisan view:cache</code></pre>

<h2>Kết Quả Thực Tế</h2>
<p>Áp dụng các kỹ thuật này cho hệ thống e-commerce Laravel tại BM WEB đã giảm thời gian phản hồi API trung bình từ <strong>850ms xuống còn 210ms</strong> — cải thiện 75% — mà không thay đổi bất kỳ logic kinh doanh hay hạ tầng nào.</p>$body3_vi$,
  'July 20, 2026',
  '20 Tháng 7, 2026',
  '2026-07-20',
  ARRAY['Laravel','PHP','Performance','Backend','MySQL','Redis','Optimization'],
  'Vu Bao Khanh',
  'Vũ Bảo Khanh',
  '16 min read',
  '16 phút đọc',
  '/og-image.png'
),

-- ── BÀI 4: WebSocket & Real-time ─────────────────────────────
(
  'building-realtime-systems-nestjs-socketio',
  'Building Real-Time Systems with NestJS and Socket.IO: Lessons From Krello',
  'Xây Dựng Hệ Thống Real-Time Với NestJS và Socket.IO: Bài Học Từ Dự Án Krello',
  'A technical deep-dive into architecting real-time collaborative features using NestJS Gateways and Socket.IO — covering event design, room management, authentication, and scaling with Redis Adapter.',
  'Phân tích kỹ thuật chuyên sâu về kiến trúc real-time collaborative features bằng NestJS Gateways và Socket.IO — bao gồm thiết kế event, quản lý room, authentication và mở rộng quy mô với Redis Adapter.',
  $body4_en$<h2>The Real-Time Challenge</h2>
<p>When I designed <strong>Krello</strong> — a real-time collaborative task board — the core technical challenge was clear: multiple users must be able to drag cards, update titles, add comments, and see all changes reflected across every connected client in under 100 milliseconds. This is not a trivial problem. It requires careful thought about event architecture, connection management, and state reconciliation.</p>
<p>Here is exactly how I solved it with <strong>NestJS</strong> and <strong>Socket.IO</strong>.</p>

<h2>Why NestJS for WebSockets?</h2>
<p>NestJS provides a <strong>Gateway</strong> abstraction that sits neatly on top of Socket.IO, giving you decorators, dependency injection, and guard support out of the box — the same patterns you use for HTTP controllers, but for WebSocket events.</p>

<h2>Setting Up the Gateway</h2>
<pre><code>// board.gateway.ts
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';

@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
  namespace: '/board',
})
export class BoardGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join-board')
  handleJoinBoard(
    @MessageBody() data: { boardId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`board:${data.boardId}`);
    client.emit('joined', { boardId: data.boardId });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('card:move')
  handleCardMove(
    @MessageBody() data: MoveCardDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast to all other clients in the board room
    client.to(`board:${data.boardId}`).emit('card:moved', data);
    return this.cardService.move(data);
  }
}</code></pre>

<h2>Authenticating WebSocket Connections</h2>
<p>Standard JWT guards work differently for WebSockets. The token must be extracted from the handshake:</p>
<pre><code>// ws-jwt.guard.ts
@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.auth.token || 
                  client.handshake.headers.authorization?.split(' ')[1];
    
    if (!token) return false;
    
    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}</code></pre>

<h2>Room Architecture: Board-Scoped Events</h2>
<p>The key design decision: every board gets its own Socket.IO <strong>room</strong>. Events are scoped to the board, not broadcast globally. This is critical for performance and data isolation.</p>
<pre><code>// Event namespace strategy
board:{boardId}           // All users in this board
board:{boardId}:user:{id} // Private channel per user

// Emitting to a specific board
this.server.to(`board:${boardId}`).emit('card:updated', updatedCard);

// Emitting except the sender (avoid echo)
socket.to(`board:${boardId}`).emit('card:updated', updatedCard);</code></pre>

<h2>Scaling With Redis Adapter</h2>
<p>When you run multiple NestJS instances (horizontal scaling), Socket.IO rooms are in-memory per instance. Events emitted on Instance A won't reach clients connected to Instance B. The solution: <strong>Redis Adapter</strong>.</p>
<pre><code>// main.ts
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

app.useWebSocketAdapter(
  new IoAdapter(app) // Or custom adapter with Redis
);

// In the gateway module
const io = new Server(httpServer);
io.adapter(createAdapter(pubClient, subClient));</code></pre>

<h2>Optimistic UI on the Frontend</h2>
<p>For drag-and-drop operations, waiting for server confirmation before updating the UI creates noticeable lag. The solution is <strong>optimistic updates</strong>:</p>
<pre><code>// React component
const moveCard = async (cardId, targetListId, position) => {
  // 1. Update local state immediately (optimistic)
  dispatch({ type: 'MOVE_CARD', payload: { cardId, targetListId, position } });
  
  // 2. Emit to server
  socket.emit('card:move', { cardId, targetListId, position, boardId });
  
  // 3. On 'card:moved' from server, other clients update
  // If server emits an error, revert local state
};</code></pre>

<h2>Key Lessons From Krello</h2>
<ul>
  <li><strong>Event naming convention matters</strong> — Use <code>entity:action</code> format (e.g., <code>card:moved</code>, <code>list:created</code>)</li>
  <li><strong>Always authenticate at the gateway level</strong> — Never trust client-emitted user IDs</li>
  <li><strong>Use Redis Adapter from day one</strong> — Adding it later is painful</li>
  <li><strong>Emit to rooms, not globally</strong> — Global broadcasts do not scale</li>
  <li><strong>Implement optimistic UI</strong> — The UX difference is dramatic</li>
</ul>$body4_en$,
  $body4_vi$<h2>Thách Thức Real-Time</h2>
<p>Khi thiết kế <strong>Krello</strong> — bảng quản lý công việc cộng tác thời gian thực — thách thức kỹ thuật cốt lõi rất rõ ràng: nhiều người dùng phải có thể kéo thả thẻ, cập nhật tiêu đề, thêm bình luận và thấy tất cả thay đổi phản ánh trên mọi client được kết nối trong vòng 100 milliseconds. Đây không phải bài toán đơn giản.</p>
<p>Dưới đây là cách tôi giải quyết bằng <strong>NestJS</strong> và <strong>Socket.IO</strong>.</p>

<h2>Thiết Lập Gateway</h2>
<pre><code>@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
  namespace: '/board',
})
export class BoardGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('card:move')
  handleCardMove(
    @MessageBody() data: MoveCardDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast tới tất cả client khác trong board room
    client.to(`board:${data.boardId}`).emit('card:moved', data);
    return this.cardService.move(data);
  }
}</code></pre>

<h2>Kiến Trúc Room</h2>
<p>Quyết định thiết kế quan trọng: mỗi board có <strong>room</strong> Socket.IO riêng. Events được giới hạn trong board, không broadcast toàn cục.</p>
<pre><code>// Emit tới một board cụ thể
this.server.to(`board:${boardId}`).emit('card:updated', updatedCard);

// Emit trừ người gửi (tránh echo)
socket.to(`board:${boardId}`).emit('card:updated', updatedCard);</code></pre>

<h2>Mở Rộng Với Redis Adapter</h2>
<p>Khi chạy nhiều NestJS instances, rooms Socket.IO nằm trong bộ nhớ mỗi instance. Giải pháp: <strong>Redis Adapter</strong>.</p>
<pre><code>const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));</code></pre>

<h2>Bài Học Từ Krello</h2>
<ul>
  <li><strong>Quy ước đặt tên event</strong> — Dùng format <code>entity:action</code> (ví dụ: <code>card:moved</code>)</li>
  <li><strong>Luôn authenticate ở cấp Gateway</strong> — Không bao giờ tin user ID do client gửi</li>
  <li><strong>Dùng Redis Adapter từ đầu</strong> — Thêm sau rất đau đầu</li>
  <li><strong>Emit theo room, không toàn cục</strong> — Global broadcasts không scale được</li>
  <li><strong>Triển khai Optimistic UI</strong> — Sự khác biệt UX rất rõ ràng</li>
</ul>$body4_vi$,
  'July 22, 2026',
  '22 Tháng 7, 2026',
  '2026-07-22',
  ARRAY['NestJS','Socket.IO','Real-Time','WebSocket','Redis','TypeScript','Backend'],
  'Vu Bao Khanh',
  'Vũ Bảo Khanh',
  '18 min read',
  '18 phút đọc',
  '/og-image.png'
),

-- ── BÀI 5: Từ sinh viên đến Developer ────────────────────────
(
  'from-student-to-developer-vietnam-roadmap',
  'From Student to Professional Developer in Vietnam: A Realistic 12-Month Roadmap',
  'Từ Sinh Viên Đến Lập Trình Viên Chuyên Nghiệp Tại Việt Nam: Lộ Trình Thực Tế 12 Tháng',
  'A candid, experience-based roadmap for Vietnamese software students on how to land their first developer job — covering what to learn, what to build, and the most common mistakes to avoid.',
  'Lộ trình thực tế dựa trên kinh nghiệm dành cho sinh viên lập trình Việt Nam về cách xin được việc developer đầu tiên — bao gồm những gì cần học, những gì cần xây dựng và các lỗi phổ biến nhất cần tránh.',
  $body5_en$<h2>This Article Is For You If...</h2>
<p>You are a software student in Vietnam — perhaps at FPT University, HCMUT, UIT, FPT Polytechnic, or another institution — and you are trying to figure out: <em>What do I actually need to do to get a developer job?</em></p>
<p>I was exactly in that position two years ago. This is the honest, practical roadmap I wish someone had given me. It is not about learning everything — it is about learning the <em>right things</em> in the right order.</p>

<h2>The Core Problem: Information Overload</h2>
<p>Vietnamese software students today face an overwhelming amount of advice. YouTube channels, Facebook groups, Discord servers all tell you different things. Learn Python. No, learn JavaScript. No, learn PHP. Mobile is better. No, backend. No, AI/ML.</p>
<p>The result? Most students spend 6 months learning 10 things at 10% depth each. <strong>That does not get you hired.</strong></p>
<p>What gets you hired is <strong>one full-stack skill at 80% depth with 2-3 real projects demonstrating it</strong>.</p>

<h2>Month 1-2: Choose One Stack and Commit</h2>
<p>For a Vietnamese student aiming for their first job in 2025-2026, I recommend one of these three paths:</p>
<ul>
  <li><strong>Path A (PHP/Laravel + React)</strong> — Highest job availability in Vietnam, especially for companies needing custom web systems and e-commerce. Start with plain PHP → MySQL → Laravel → React.</li>
  <li><strong>Path B (Node.js/NestJS + React)</strong> — Growing demand, especially for startups. Better long-term scalability of skills.</li>
  <li><strong>Path C (Java Spring Boot + React/Angular)</strong> — Corporate/enterprise demand, slower job search but higher salaries.</li>
</ul>
<p>I chose <strong>Path A</strong>. It got me hired. Commit to one and do not switch for at least 6 months.</p>

<h2>Month 3-4: Build Your Foundation Project</h2>
<p>Your first real project should be something you actually find interesting. It does not need to be original — a clone of an existing product is fine. What matters is that it is <strong>complete</strong>:</p>
<ul>
  <li>User authentication (registration, login, logout)</li>
  <li>CRUD operations with a real database</li>
  <li>Proper error handling (not just happy paths)</li>
  <li>Deployed and publicly accessible (Vercel, Railway, DigitalOcean)</li>
</ul>
<p>Ideas: blog platform, task manager, product catalog with cart, booking system.</p>

<h2>Month 5-6: Build Your Portfolio Project</h2>
<p>This is the project you will discuss in every interview. It should be <strong>technically interesting</strong> — something that demonstrates you can solve non-trivial problems. My Krello project (real-time collaborative board with Socket.IO, RBAC, and CI/CD) served this exact purpose for me.</p>
<p>Requirements for your portfolio project:</p>
<ul>
  <li>Solve a real problem (not CRUD-only)</li>
  <li>Include at least one technically complex feature (real-time, file uploads, payment integration, recommendation engine, etc.)</li>
  <li>Clean GitHub repository with a professional README</li>
  <li>Live demo URL</li>
</ul>

<h2>Month 7-8: Apply for Internships Aggressively</h2>
<p>Vietnamese companies that are worth interning at:</p>
<ul>
  <li>University software centers (CUSC, SRC, etc.) — Great for first experience</li>
  <li>Small-to-medium digital agencies — Fast learning, diverse projects</li>
  <li>Product startups — Harder to get in, but excellent for growth</li>
</ul>
<p><strong>How to apply effectively:</strong> Tailor your CV for each application. Lead with your projects, not your GPA. Write a short cover letter that references something specific about the company. Most students do not do this — it immediately makes you stand out.</p>

<h2>Month 9-12: Master the Interview Process</h2>
<p>Vietnamese tech interviews typically have 3 rounds:</p>
<ol>
  <li><strong>CV Screen</strong> — Projects matter more than GPA. Make your GitHub look active.</li>
  <li><strong>Technical Interview</strong> — Expect: OOP concepts, SQL queries, basic algorithms, and questions about your projects. They will ask you to explain your architecture choices.</li>
  <li><strong>Culture/HR Interview</strong> — Be honest about what you know and what you are still learning. Junior hires are evaluated on potential and attitude, not perfection.</li>
</ol>

<h2>The Most Common Mistakes I See</h2>
<ul>
  <li><strong>Tutorial hell</strong> — Watching 50 YouTube videos without building anything. Build something broken and fix it.</li>
  <li><strong>Waiting until you feel "ready"</strong> — You will never feel ready. Apply when you have 2 projects, not when you have 10.</li>
  <li><strong>Only knowing theory</strong> — If you cannot explain how you built your project line-by-line in an interview, it does not count.</li>
  <li><strong>Neglecting English</strong> — All documentation, Stack Overflow, and GitHub discussions are in English. Invest in your reading comprehension.</li>
  <li><strong>Ignoring Git and deployment</strong> — Every professional team uses Git. Every project should be on GitHub and deployed somewhere.</li>
</ul>

<h2>A Final Word</h2>
<p>I graduated from FPT Polytechnic Can Tho, not a top-tier university. I did not have connections. What I had was a portfolio of real projects, the ability to discuss my technical decisions clearly, and consistency. That was enough to get hired, learn rapidly, and build systems I am genuinely proud of.</p>
<p>The path is available to you too. Start building today.</p>$body5_en$,
  $body5_vi$<h2>Bài Viết Này Dành Cho Bạn Nếu...</h2>
<p>Bạn là sinh viên lập trình tại Việt Nam — có thể ở FPT University, BKHN, UIT, FPT Polytechnic, hay một trường khác — và bạn đang cố gắng trả lời: <em>Mình thực sự cần làm gì để xin được việc developer?</em></p>
<p>Tôi đã ở đúng vị trí đó hai năm trước. Đây là lộ trình thực tế, trung thực mà tôi ước có ai đó đã cho tôi biết. Không phải học tất cả mọi thứ — mà là học <em>đúng thứ</em> theo đúng thứ tự.</p>

<h2>Vấn Đề Cốt Lõi: Quá Tải Thông Tin</h2>
<p>Sinh viên lập trình Việt Nam ngày nay đối mặt với lượng lời khuyên choáng ngợp. Tất cả đều nói khác nhau. Kết quả? Hầu hết sinh viên dành 6 tháng học 10 thứ ở độ sâu 10% mỗi thứ. <strong>Như vậy không xin được việc.</strong></p>
<p>Điều giúp bạn được tuyển là <strong>một kỹ năng full-stack ở độ sâu 80% với 2-3 dự án thực tế chứng minh nó</strong>.</p>

<h2>Tháng 1-2: Chọn Một Stack Và Cam Kết</h2>
<p>Cho sinh viên Việt Nam muốn xin việc trong 2025-2026, tôi gợi ý một trong ba hướng:</p>
<ul>
  <li><strong>Hướng A (PHP/Laravel + React)</strong> — Nhu cầu tuyển dụng cao nhất ở Việt Nam, đặc biệt cho các công ty cần web tùy biến và e-commerce.</li>
  <li><strong>Hướng B (Node.js/NestJS + React)</strong> — Nhu cầu ngày càng tăng, đặc biệt cho startups.</li>
  <li><strong>Hướng C (Java Spring Boot + React/Angular)</strong> — Doanh nghiệp lớn, tìm việc chậm hơn nhưng lương cao hơn.</li>
</ul>
<p>Tôi chọn <strong>Hướng A</strong>. Nó giúp tôi được tuyển. Cam kết với một hướng và đừng chuyển đổi trong ít nhất 6 tháng.</p>

<h2>Tháng 3-4: Xây Dựng Dự Án Nền Tảng</h2>
<p>Dự án thực tế đầu tiên của bạn cần phải <strong>hoàn chỉnh</strong>:</p>
<ul>
  <li>Xác thực người dùng (đăng ký, đăng nhập, đăng xuất)</li>
  <li>Các thao tác CRUD với database thực</li>
  <li>Xử lý lỗi đúng cách (không chỉ happy path)</li>
  <li>Triển khai và có thể truy cập công khai</li>
</ul>

<h2>Tháng 5-6: Xây Dựng Dự Án Portfolio</h2>
<p>Đây là dự án bạn sẽ thảo luận trong mọi cuộc phỏng vấn. Nó phải <strong>thú vị về mặt kỹ thuật</strong> — một điều gì đó chứng minh bạn có thể giải quyết vấn đề không tầm thường.</p>
<ul>
  <li>Giải quyết một vấn đề thực tế (không chỉ CRUD)</li>
  <li>Bao gồm ít nhất một tính năng kỹ thuật phức tạp</li>
  <li>Repository GitHub sạch sẽ với README chuyên nghiệp</li>
  <li>URL demo trực tiếp</li>
</ul>

<h2>Lỗi Phổ Biến Nhất Tôi Thấy</h2>
<ul>
  <li><strong>Tutorial hell</strong> — Xem 50 video YouTube mà không xây dựng gì. Hãy xây thứ gì đó bị hỏng rồi sửa nó.</li>
  <li><strong>Chờ đến khi cảm thấy "sẵn sàng"</strong> — Bạn sẽ không bao giờ cảm thấy sẵn sàng. Nộp đơn khi bạn có 2 dự án, không phải khi có 10.</li>
  <li><strong>Chỉ biết lý thuyết</strong> — Nếu không thể giải thích cách bạn xây dựng dự án trong phỏng vấn, nó không tính.</li>
  <li><strong>Bỏ qua tiếng Anh</strong> — Tất cả tài liệu đều bằng tiếng Anh. Đầu tư vào khả năng đọc hiểu của bạn.</li>
  <li><strong>Bỏ qua Git và deployment</strong> — Mọi nhóm chuyên nghiệp đều dùng Git. Mọi dự án đều phải có trên GitHub và triển khai ở đâu đó.</li>
</ul>

<h2>Lời Cuối</h2>
<p>Tôi tốt nghiệp FPT Polytechnic Cần Thơ, không phải đại học top. Tôi không có các mối quan hệ. Điều tôi có là portfolio dự án thực tế, khả năng thảo luận về quyết định kỹ thuật rõ ràng, và sự nhất quán. Đủ để được tuyển, học nhanh và xây dựng các hệ thống tôi thực sự tự hào.</p>
<p>Con đường đó cũng dành cho bạn. Hãy bắt đầu xây dựng ngay hôm nay.</p>$body5_vi$,
  'July 24, 2026',
  '24 Tháng 7, 2026',
  '2026-07-24',
  ARRAY['Career','Vietnam','Student','Roadmap','Web Development','Full Stack','Tips'],
  'Vu Bao Khanh',
  'Vũ Bảo Khanh',
  '20 min read',
  '20 phút đọc',
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

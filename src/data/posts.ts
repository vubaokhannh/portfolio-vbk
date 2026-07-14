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
    title: "Who is Vu Bao Khanh? The Journey of a Full Stack Developer",
    description: "An in-depth personal story of how Vu Bao Khanh built his expertise in PHP, Laravel, NestJS, and React from FPT Polytechnic to BM WEB.",
    date: "July 13, 2026",
    isoDate: "2026-07-13",
    tags: ["About Me", "Career", "Laravel", "React"],
    author: "Vu Bao Khanh",
    readTime: "15 min read",
    coverImage: "/og-image.png",
    content: `
      <h2>The Philosophy That Drives Everything I Build</h2>
      <p>My name is <strong>Vu Bao Khanh</strong> (Vũ Bảo Khanh). I am a Full Stack Developer based in Can Tho, Vietnam, currently working at <strong>BM WEB</strong> as a Full Stack PHP Developer. But before I get into the technical details of what I do, I want to tell you something more important — the <em>why</em> behind it.</p>
      <p>I have always believed that code is not just a series of instructions a machine executes. It is a form of craftsmanship. A well-architected system is elegant: it scales without drama, fails gracefully, and communicates its intent clearly to any engineer who reads it six months later. This is the standard I hold myself to on every project, whether it is a small internal admin panel or a production system handling thousands of concurrent users.</p>
      <p>This article is my attempt to be transparent — about where I started, what I built, what I broke, and what I learned from all of it. If you are a recruiter, a fellow developer, or a business evaluating whether to work with me, I hope this gives you a clear, honest picture.</p>

      <h2>Chapter 1 — Starting From Zero at FPT Polytechnic Can Tho</h2>
      <p>I did not come from a privileged academic background in computer science. My formal education was at <strong>FPT Polytechnic Can Tho</strong>, a vocational school that prioritizes hands-on project work over theoretical lectures. At the time, I was not even sure software engineering was the right path for me. What convinced me was the moment I built something that actually worked — a simple form that wrote to a database, and the page updated in real time. That moment of cause-and-effect hooked me completely.</p>
      <p>FPT Poly's curriculum pushed students into real projects almost immediately. By my second semester, I was already managing database relationships, writing server-side PHP, and learning why a misplaced semicolon could bring down an entire application. The lack of hand-holding was initially frustrating, but in retrospect, it was exactly the training I needed.</p>
      <p>My capstone project — an <strong>Online Vehicle Ticketing System</strong> — is where everything came together. On the surface, it was a booking platform for intercity bus routes. But I refused to stop at a basic CRUD system. I integrated:</p>
      <ul>
        <li><strong>Live GPS map tracking</strong> of active bus routes using a mapping API, so passengers could see exactly where their vehicle was in real time.</li>
        <li><strong>Automated IoT smart cameras</strong> for ticket validation at boarding gates, connected to a counting algorithm that tracked passenger load per vehicle.</li>
        <li><strong>A digital wallet system</strong> allowing passengers to top up balance and pay without cash.</li>
      </ul>
      <p>Building this project forced me to confront the full vertical stack for the first time — database design, REST API architecture, WebSocket communication, third-party API integration, and a React-based frontend that consumed all of it. The complexity was terrifying and exhilarating at the same time. That project won recognition at FPT Polytechnic and was featured in the school's news coverage — not because it was perfect, but because it was ambitious and it worked.</p>

      <h2>Chapter 2 — The Internship That Taught Me How Teams Actually Work</h2>
      <p>After graduating, I joined the <strong>Cantho University Software Center (CUSC)</strong> as a Frontend Developer Intern. This was my first exposure to a professional software development environment, and it was humbling in the best possible way.</p>
      <p>Up to that point, all my projects had been solo efforts. At CUSC, I encountered something new: <em>other people's code</em>. Code written by engineers who were no longer on the team, in styles I had never seen, solving problems I had never thought about. I learned quickly that writing code for yourself and writing code for a team are two entirely different disciplines.</p>
      <p>The most valuable lessons from that internship had nothing to do with syntax:</p>
      <ul>
        <li><strong>Git discipline matters more than you think.</strong> Writing clear, atomic commit messages, using feature branches, and never force-pushing to <code>main</code> are not bureaucratic rules — they are survival skills in a collaborative codebase.</li>
        <li><strong>Component design has long-term consequences.</strong> A component that is too tightly coupled to a specific page is a liability. Modular, reusable components reduce duplication and make future changes predictable.</li>
        <li><strong>Code review is a gift, not a judgment.</strong> Having a senior engineer point out a subtle bug in a pull request before it reaches production is infinitely better than debugging it at 11pm on a Friday.</li>
      </ul>
      <p>I left the internship a better developer — not because of the tools I had learned, but because of the habits I had formed.</p>

      <h2>Chapter 3 — Going Full Stack at BM WEB</h2>
      <p>My current role at <strong>BM WEB</strong> as a Full Stack PHP Developer is where I operate at my highest level of complexity. Every day involves real production systems — systems where a deployment error means real users are impacted, and where slow queries mean real revenue lost.</p>
      <p>Here is a representative slice of what my work involves:</p>

      <h3>Backend Architecture with Laravel</h3>
      <p>Laravel is the backbone of most of our server-side systems. I have built and maintained RESTful APIs consumed by both web and mobile clients, handling authentication flows with <strong>Laravel Sanctum</strong>, complex query logic with <strong>Eloquent ORM</strong>, and scheduled background jobs with <strong>Laravel Queues</strong> backed by Redis.</p>
      <p>One of the most instructive experiences was diagnosing a critical performance issue in an e-commerce system. The symptom was simple: a product listing page was taking over 4 seconds to load. The root cause was not obvious until I profiled the queries with <strong>Laravel Telescope</strong> — Eloquent was firing 150 separate SQL queries to render 50 products. Classic N+1 problem. The fix (eager loading with <code>with()</code>) reduced the query count to 2 and brought page load time down under 200ms. That single experience changed how I approach data access patterns permanently.</p>

      <h3>Admin Systems with Filament</h3>
      <p>For internal admin dashboards, I have standardized on <strong>Filament PHP</strong>. It allows me to spin up feature-rich, properly secured back-office tools in a fraction of the time a custom-built panel would require. I have built full ERP-style dashboards that include order management, inventory control, and automated reporting workflows — all within Laravel's ecosystem.</p>

      <h3>Real-Time Features with NestJS and Socket.IO</h3>
      <p>Not every project can be solved with a request-response architecture. For systems that require live data synchronization across multiple users — collaborative task boards, live inventory dashboards, multi-agent chat systems — I switch to <strong>NestJS</strong> on the backend, paired with <strong>Socket.IO</strong>.</p>
      <p>My personal project <strong>Krello</strong> is the clearest demonstration of this. It is a real-time task management board inspired by Trello, where multiple team members can drag, drop, and edit tasks simultaneously. Changes propagate to all connected clients in under 100ms. Building Krello required solving non-trivial problems around WebSocket room isolation, optimistic UI updates, and debounced database writes — all of which I documented separately in my technical blog posts.</p>

      <h3>Frontend with React and Next.js</h3>
      <p>On the frontend, React is my default. I build component libraries that prioritize reusability and predictability over cleverness. For production web applications, I layer in <strong>Next.js</strong> for server-side rendering — not as a trend, but as a deliberate performance and SEO strategy. Getting a site to pass Google Core Web Vitals consistently requires thinking carefully about hydration, font loading, image optimization, and code splitting from the very beginning of a project.</p>

      <h2>Chapter 4 — The Mistakes That Shaped Me</h2>
      <p>I want to be explicit about the failures, because I think they are more instructive than the successes.</p>
      <ul>
        <li><strong>I ignored database indexes for too long.</strong> Early in my career, I treated database design as an afterthought — get the relationships right, worry about performance later. The problem is that "later" eventually arrives, usually in production with real traffic. I learned this lesson painfully when a table with no index on a frequently-queried <code>status</code> column caused a full table scan on every page load. Now, I define index strategies during the schema design phase, before a single line of application code is written.</li>
        <li><strong>I chased complexity instead of solving problems.</strong> There was a phase where I was drawn to every new technology announcement — microservices, event sourcing, GraphQL, CQRS. I tried to apply these patterns to projects that did not need them. The result was over-engineered systems that were harder to debug and slower to develop than a simple, well-structured monolith would have been. I now apply a simple heuristic: choose the simplest architecture that solves the problem reliably, and only introduce complexity when you have a concrete, measurable reason to do so.</li>
        <li><strong>I underestimated documentation.</strong> Code that lacks clear documentation is a tax on every future engineer — including yourself three months later. I now treat documentation as part of the development process, not a post-launch chore.</li>
      </ul>

      <h2>Chapter 5 — What I Am Optimizing For Now</h2>
      <p>At this point in my career, I am less focused on learning new technologies for their own sake and more focused on deepening my understanding of fundamentals: database internals, distributed systems concepts, system design patterns, and security best practices. These are the things that make a senior engineer different from a mid-level one — not the number of frameworks on their resume, but the depth of their mental models.</p>
      <p>I am also investing in communication skills. The ability to explain a technical tradeoff clearly to a non-technical stakeholder, or to write a design document that your team can align on quickly, is just as valuable as any programming skill. It is something I am deliberately working on.</p>
      <p>This blog is part of that effort. Writing forces clarity. If I cannot explain something simply, I probably do not understand it as well as I think I do.</p>

      <h2>If You Are Reading This as a Recruiter or Client</h2>
      <p>Here is what I want you to know: I am not looking for a job where I maintain legacy code without any opportunity to improve it. I am looking for environments where engineering quality is valued, where code reviews happen, where the team has healthy disagreements about architecture, and where shipping something right matters more than shipping something fast.</p>
      <p>If your team builds ambitious products and cares about how they are built — I would love to talk.</p>
      <p>You can reach me at <a href="mailto:vubaokhanh2311@gmail.com">vubaokhanh2311@gmail.com</a>, connect on <a href="https://linkedin.com/in/vubaokhannh" target="_blank" rel="noopener noreferrer">LinkedIn</a>, or explore my work on <a href="https://github.com/vubaokhannh" target="_blank" rel="noopener noreferrer">GitHub</a> and <a href="https://vubaokhanh.tech">vubaokhanh.tech</a>.</p>

      <hr />
      <h3>Continue Reading</h3>
      <ul>
        <li><a href="/blog/building-krello-realtime-task-management-nestjs-react">Architecting Krello: Building a Real-Time Collaborative Engine with NestJS and React</a></li>
        <li><a href="/blog/debugging-production-performance-laravel-eloquent-mysql">Laravel Eloquent in Production: Lessons Learned from Database Bottlenecks</a></li>
      </ul>
    `,
  },
  {
    slug: "building-krello-realtime-task-management-nestjs-react",
    title: "Architecting Krello: Building a Real-Time Collaborative Engine with NestJS and React",
    description: "A technical case study on how Vu Bao Khanh architected Krello, a real-time collaborative task board using NestJS, Socket.IO, and React.",
    date: "July 10, 2026",
    isoDate: "2026-07-10",
    tags: ["Projects", "NestJS", "Socket.IO", "React"],
    author: "Vu Bao Khanh",
    readTime: "15 min read",
    coverImage: "/og-image.png",
    content: `
      <h2>The Goal: Achieving Sub-Second Collaborative Sync</h2>
      <p>When designing Krello, my objective was clear: build a task management board similar to Trello where team members can drag, drop, and edit tasks, with all changes syncing globally across users in under 100ms. Achieving this required a robust WebSocket gateway, a fast reactivity layer, and safe database updates. In this article, I, <strong>Vu Bao Khanh</strong>, will break down the exact architecture, code patterns, and performance optimizations used to build Krello as a Full Stack Developer.</p>

      <h2>1. The Real-time Engine Architecture</h2>
      <p>We chose NestJS for the backend WebSocket Gateway because of its built-in abstractions for events, dependency injection, and security. On the client side, a React frontend listens to Socket events and updates the UI state dynamically.</p>
      <pre><code>// NestJS Board Gateway
@WebSocketGateway({ cors: { origin: '*' } })
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('BoardGateway');

  @SubscribeMessage('joinWorkspace')
  handleJoinWorkspace(client: Socket, payload: { boardId: string }) {
    client.join(\`board_\${payload.boardId}\`);
    this.logger.log(\`Client \${client.id} joined board_\${payload.boardId}\`);
  }
}</code></pre>

      <h2>2. Synchronizing State and Concurrency Control</h2>
      <p>A common mistake when designing real-time boards is broadcasting events globally. This degrades server performance. In Krello, I isolated users into rooms based on the active <code>boardId</code>. When a card moves, only clients in that specific room are updated:</p>
      <pre><code>@SubscribeMessage('moveCard')
handleMoveCard(client: Socket, payload: { boardId: string, cardId: string, toColumn: string }) {
  // Broadcast update to all other clients in the board room
  client.to(\`board_\${payload.boardId}\`).emit('cardUpdated', payload);
}</code></pre>

      <h2>3. Solving Database Bottlenecks</h2>
      <p>Frequent drag-and-drop operations trigger a high frequency of database updates. If we run an update query on PostgreSQL for every pixel of movement, the database pool will lock. To resolve this, I implemented:
      <ul>
        <li><strong>Optimistic Updates:</strong> The React UI updates immediately before receiving confirmation from the NestJS server. If the server fails, the state rolls back.</li>
        <li><strong>Debounced Saves:</strong> In-flight movements are managed in memory (or Redis) and synced to the database only after the user drops the card.</li>
      </ul>

      <h2>Best Practices for WebSocket Architecture</h2>
      <ul>
        <li><strong>Token Validation:</strong> Never trust socket connections. Validate JWT tokens during the handshake stage in NestJS.</li>
        <li><strong>Auto-Reconnect:</strong> Implement automatic reconnection logic on the React client with exponential backoff.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Building Krello was an incredible showcase of real-time engineering. Combining the structure of NestJS, safety of TypeScript, and speed of React created an outstanding user experience. Explore the repository on my GitHub profile!</p>

      <hr />
      <h3>Related Articles</h3>
      <ul>
        <li><a href="/blog/about-vu-bao-khanh-fullstack-developer">Who is Vu Bao Khanh? The Journey of a Full Stack Developer</a></li>
        <li><a href="/blog/debugging-production-performance-laravel-eloquent-mysql">Laravel Eloquent in Production: Lessons Learned from Database Bottlenecks</a></li>
      </ul>

      <hr />
      <h3>About the Author</h3>
      <p><strong>Author:</strong> Vu Bao Khanh<br /><em>Full Stack Web Developer</em></p>
      <p>Currently working as a Full Stack PHP Developer at BM WEB.</p>
      <p>Specialized in:</p>
      <ul>
        <li>PHP</li>
        <li>Laravel</li>
        <li>React</li>
        <li>NestJS</li>
        <li>TypeScript</li>
        <li>MySQL</li>
        <li>PostgreSQL</li>
      </ul>
      <p>Portfolio: <a href="https://vubaokhanh.tech">https://vubaokhanh.tech</a><br />GitHub: <a href="https://github.com/vubaokhannh">https://github.com/vubaokhannh</a></p>
    `,
  },
  {
    slug: "debugging-production-performance-laravel-eloquent-mysql",
    title: "Laravel Eloquent in Production: Lessons Learned from Database Bottlenecks",
    description: "Vu Bao Khanh shares real-world debugging stories, Eloquent optimizations, and database scaling practices from production apps.",
    date: "June 25, 2026",
    isoDate: "2026-06-25",
    tags: ["Technical", "Laravel", "MySQL", "PHP"],
    author: "Vu Bao Khanh",
    readTime: "14 min read",
    coverImage: "/og-image.png",
    content: `
      <h2>The Silent Killer: Lazy Loading in Production</h2>
      <p>As a PHP developer, Laravel's Eloquent ORM is one of the most powerful tools available. It makes database queries readable. However, in production environments with thousands of concurrent users, unoptimized Eloquent queries can slow down your application. In this article, I, <strong>Vu Bao Khanh</strong>, will share real-world database issues I solved as a Full Stack Developer at BM WEB, and how you can optimize your Laravel applications.</p>

      <h2>1. The N+1 Query Issue: A Real Production Story</h2>
      <p>During my work on a complex project, we noticed a page loading time of over 4 seconds. By debugging the queries, we discovered that Eloquent was executing 150 separate queries to render a list of 50 items. This was the classic N+1 query problem. The solution was simple: replace lazy loading with **eager loading** using the <code>with()</code> method.</p>
      <pre><code>// ❌ Bad: Triggers 51 database queries
$projects = Project::all();
foreach ($projects as $project) {
    echo $project->client->name;
}

// ✅ Good: Triggers only 2 database queries
$projects = Project::with('client')->get();
foreach ($projects as $project) {
    echo $project->client->name;
}</code></pre>

      <h2>2. Optimizing Indexes in MySQL</h2>
      <p>Many developers ignore database indexes during migrations. If your application queries a database table using columns in the <code>where</code> clause that are not indexed, MySQL must read every single row in the table (a full table scan). Always define indexes in your Laravel migrations for query columns:</p>
      <pre><code>Schema::table('orders', function (Blueprint $table) {
    $table->index(['user_id', 'status']);
});</code></pre>

      <h2>3. Memory Exhaustion: Loading Too Much Data</h2>
      <p>Another common mistake is calling <code>get()</code> on millions of records. This loads all data into PHP's memory, causing the script to crash. Use <code>cursor()</code> or <code>chunk()</code> to process large datasets efficiently:</p>
      <pre><code>// Memory efficient processing
User::where('active', true)->chunk(500, function ($users) {
    foreach ($users as $user) {
        $user->sendNotification();
    }
});</code></pre>

      <h2>Conclusion</h2>
      <p>Optimizing Laravel Eloquent is a critical skill for any Full Stack Developer. By checking query profiles, writing clean migrations with proper indexes, and eager loading relations, you can keep your system fast and reliable under heavy user traffic.</p>

      <hr />
      <h3>Related Articles</h3>
      <ul>
        <li><a href="/blog/about-vu-bao-khanh-fullstack-developer">Who is Vu Bao Khanh? The Journey of a Full Stack Developer</a></li>
        <li><a href="/blog/building-krello-realtime-task-management-nestjs-react">Architecting Krello: Building a Real-Time Collaborative Engine with NestJS and React</a></li>
      </ul>

      <hr />
      <h3>About the Author</h3>
      <p><strong>Author:</strong> Vu Bao Khanh<br /><em>Full Stack Web Developer</em></p>
      <p>Currently working as a Full Stack PHP Developer at BM WEB.</p>
      <p>Specialized in:</p>
      <ul>
        <li>PHP</li>
        <li>Laravel</li>
        <li>React</li>
        <li>NestJS</li>
        <li>TypeScript</li>
        <li>MySQL</li>
        <li>PostgreSQL</li>
      </ul>
      <p>Portfolio: <a href="https://vubaokhanh.tech">https://vubaokhanh.tech</a><br />GitHub: <a href="https://github.com/vubaokhannh">https://github.com/vubaokhannh</a></p>
    `,
  },
];

export const postsVi: BlogPost[] = [
  {
    slug: "about-vu-bao-khanh-fullstack-developer",
    title: "Vũ Bảo Khanh Là Ai? Hành Trình Định Hình Tư Duy Của Một Full Stack Developer",
    description: "Câu chuyện tự sự chi tiết về cách Vũ Bảo Khanh xây dựng chuyên môn lập trình PHP, Laravel, NestJS và React từ FPT Polytechnic đến BM WEB.",
    date: "13 Tháng 7, 2026",
    isoDate: "2026-07-13",
    tags: ["Giới thiệu", "Sự nghiệp", "Laravel", "React"],
    author: "Vũ Bảo Khanh",
    readTime: "12 phút đọc",
    coverImage: "/og-image.png",
    content: `
      <h2>Triết lý: Mã nguồn không chỉ là logic, đó là nghệ thuật thủ công</h2>
      <p>Tên tôi là <strong>Vũ Bảo Khanh</strong> (Vu Bao Khanh). Là một Full Stack Developer, tôi luôn tin rằng kỹ thuật phần mềm là sự cân bằng giữa tính kỷ luật kỹ thuật và tư duy giải quyết vấn đề sáng tạo. Một hệ thống không nên chỉ chạy được; nó cần chạy tối ưu, mở rộng dễ dàng và mang lại trải nghiệm tốt nhất cho người dùng cuối. Bài viết này ghi lại hành trình của tôi—từ những dòng code cơ bản đầu tiên tại FPT Polytechnic cho đến khi trực tiếp vận hành các cấu trúc hệ thống lớn ở vai trò Full Stack PHP Developer tại BM WEB.</p>
      
      <h2>1. Nền tảng thực chiến: FPT Polytechnic Cần Thơ</h2>
      <p>Hành trình chuyên nghiệp của tôi bắt đầu tại FPT Polytechnic Cần Thơ. Khác với các chương trình học truyền thống tập trung quá nhiều vào lý thuyết trừu tượng, FPT Poly buộc tôi phải làm quen với các dự án thực tế ngay từ ngày đầu. Trong suốt quá trình học, tôi tập trung vào việc nghiên cứu cách các bảng cơ sở dữ liệu tương tác, cách các giao thức bảo mật bảo vệ dữ liệu và cách các hệ thống client-server giao tiếp với nhau.</p>
      <p>Một trong những dấu mốc quan trọng nhất của tôi là thiết kế Hệ thống Đặt vé Xe trực tuyến. Không chỉ dừng lại ở giao diện nhập thông tin thông thường, tôi đã tích hợp định vị GPS trực tiếp của xe trên bản đồ và xây dựng hệ thống kiểm vé tự động bằng camera IoT sử dụng AI để đếm hành khách. Dự án này giúp tôi có tư duy vững chắc về Full Stack, hiểu được cách database, backend server và web sockets kết nối đồng bộ trong thực tế.</p>

      <h2>2. Làm chủ bộ kỹ năng Frontend và Backend</h2>
      <p>Khi gia nhập môi trường doanh nghiệp chuyên nghiệp, tôi nhận ra năng lực Full Stack thực sự yêu cầu sự thấu hiểu sâu sắc ở cả hai phía frontend và backend. Tôi đã định hình sự nghiệp của mình xoay quanh việc làm chủ hai hệ sinh thái chính:</p>
      <ul>
        <li><strong>Backend core (PHP & Laravel):</strong> Laravel là công cụ tôi tin tưởng lựa chọn để xây dựng các cấu trúc máy chủ mạnh mẽ. Eloquent ORM, hệ thống migration và các middleware bảo mật giúp tôi tạo ra các API chuẩn chỉ và hệ thống quản trị admin ERP toàn diện bằng Filament.</li>
        <li><strong>Công nghệ thời gian thực (NestJS, TypeScript & Socket.IO):</strong> Khi xây dựng các hệ thống đồng bộ dữ liệu thời gian thực (như các ứng dụng cộng tác hay bảng theo dõi tiến độ), tôi lựa chọn xây dựng backend bằng NestJS. TypeScript giúp mã nguồn luôn sạch sẽ và an toàn về kiểu dữ liệu.</li>
        <li><strong>Frontend tương tác cao (React & Next.js):</strong> Tôi sử dụng React để phát triển giao diện người dùng mượt mà, phản hồi nhanh. Kết hợp React với cơ chế render phía máy chủ (SSR) của Next.js giúp website tối ưu điểm Core Web Vitals của Google.</li>
      </ul>

      <h2>3. Bước tiến sự nghiệp: Từ thực tập sinh CUSC đến lập trình viên BM WEB</h2>
      <p>Hành trình chuyên nghiệp của tôi bắt đầu với vị trí Thực tập sinh Frontend Developer tại Trung tâm Phần mềm Đại học Cần Thơ (CUSC). Tại đây, tôi được làm việc dưới sự hướng dẫn của các kỹ sư giàu kinh nghiệm, học hỏi về quy trình Git chuyên nghiệp, thiết kế thành phần modular và các quy chuẩn tối ưu hóa CSS. Đó là bước đệm quan trọng để hiểu cách một đội ngũ phần mềm phối hợp làm việc.</p>
      <p>Hiện tại, ở vai trò Full Stack PHP Developer tại <strong>BM WEB</strong>, tôi làm việc trực tiếp với code production mỗi ngày. Tôi thiết kế cấu trúc database, tối ưu hiệu năng các câu lệnh SQL, xây dựng cổng thanh toán và cải thiện mã nguồn frontend. Làm việc dưới các chu kỳ phát hành sản phẩm nhanh giúp tôi rèn luyện thói quen viết code dễ đọc, dễ mở rộng cho các lập trình viên khác.</p>

      <h2>Những bài học xương máu tôi đã rút ra</h2>
      <ul>
        <li><strong>Bỏ qua Database Index:</strong> Trong các dự án đầu tay, tôi chưa bao giờ nghĩ tới việc đánh chỉ mục (index) cho các cột trong bảng. Khi lượng dữ liệu tăng lên hàng chục ngàn dòng, hiệu suất truy vấn giảm rõ rệt. Giờ đây, tôi luôn lập chiến lược đánh index ngay khi thiết kế database.</li>
        <li><strong>Phức tạp hóa bộ công nghệ:</strong> Tôi từng chọn các công nghệ chỉ vì chúng đang là xu hướng. Bài học thực tế cho tôi thấy việc chọn các công cụ đơn giản, ổn định (như Laravel và MySQL) mang lại hiệu quả vận hành cao hơn rất nhiều so với việc cố gắng áp dụng microservices khi dự án chưa cần thiết.</li>
      </ul>

      <h2>Kết luận</h2>
      <p>Xây dựng thương hiệu cá nhân và viết code sạch luôn song hành. Tôi sẽ tiếp tục chia sẻ các bài học kinh nghiệm kỹ thuật trên blog này. Nếu bạn là nhà tuyển dụng đang tìm kiếm một lập trình viên có tiêu chuẩn làm việc cao, hoặc doanh nghiệp cần giải pháp phát triển web chất lượng, hãy liên hệ với tôi!</p>

      <hr />
      <h3>Bài viết liên quan</h3>
      <ul>
        <li><a href="/blog/building-krello-realtime-task-management-nestjs-react">Kiến trúc Krello: Xây dựng hệ thống quản lý công việc thời gian thực bằng NestJS và React</a></li>
        <li><a href="/blog/debugging-production-performance-laravel-eloquent-mysql">Eloquent ORM trong môi trường Production: Bài học xương máu từ việc tối ưu hóa truy vấn Database</a></li>
      </ul>

      <hr />
      <h3>Thông tin tác giả</h3>
      <p><strong>Tác giả:</strong> Vũ Bảo Khanh<br /><em>Full Stack Web Developer</em></p>
      <p>Hiện tại đang làm việc ở vị trí Full Stack PHP Developer tại công ty BM WEB.</p>
      <p>Công nghệ chuyên sâu:</p>
      <ul>
        <li>PHP</li>
        <li>Laravel</li>
        <li>React</li>
        <li>NestJS</li>
        <li>TypeScript</li>
        <li>MySQL</li>
        <li>PostgreSQL</li>
      </ul>
      <p>Portfolio: <a href="https://vubaokhanh.tech">https://vubaokhanh.tech</a><br />GitHub: <a href="https://github.com/vubaokhannh">https://github.com/vubaokhannh</a></p>
    `,
  },
  {
    slug: "building-krello-realtime-task-management-nestjs-react",
    title: "Kiến trúc Krello: Xây dựng hệ thống quản lý công việc thời gian thực bằng NestJS và React",
    description: "Bài nghiên cứu kỹ thuật chuyên sâu về cách Vũ Bảo Khanh thiết kế Krello, hệ thống bảng Kanban cộng tác thời gian thực bằng NestJS, Socket.IO và React.",
    date: "10 Tháng 7, 2026",
    isoDate: "2026-07-10",
    tags: ["Dự án", "NestJS", "Socket.IO", "React"],
    author: "Vũ Bảo Khanh",
    readTime: "15 phút đọc",
    coverImage: "/og-image.png",
    content: `
      <h2>Mục tiêu: Đạt tốc độ đồng bộ dữ liệu thời gian thực dưới 100ms</h2>
      <p>Khi thiết kế Krello, mục tiêu của tôi rất rõ ràng: xây dựng một bảng quản lý công việc tương tự Trello nơi các thành viên có thể kéo, thả và chỉnh sửa thẻ tác vụ với tốc độ đồng bộ tức thì trên màn hình của những người dùng khác. Để đạt được điều này đòi hỏi một cổng kết nối WebSocket vững chắc, cơ chế phản hồi frontend nhanh nhạy và các câu lệnh cập nhật database an toàn. Trong bài viết này, tôi, <strong>Vũ Bảo Khanh</strong>, sẽ phân tích chi tiết cấu trúc kiến trúc, các mẫu code và các kỹ thuật tối ưu hóa tôi đã áp dụng làm lập trình viên Full Stack.</p>

      <h2>1. Kiến trúc luồng truyền nhận dữ liệu thời gian thực</h2>
      <p>Tôi lựa chọn NestJS cho WebSocket Gateway ở backend vì khả năng tổ chức mã nguồn tốt, hỗ trợ dependency injection và các tầng bảo mật tích hợp sẵn. Phía client sử dụng React để lắng nghe các sự kiện socket và cập nhật trực tiếp state giao diện.</p>
      <pre><code>// NestJS Board Gateway
@WebSocketGateway({ cors: { origin: '*' } })
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('BoardGateway');

  @SubscribeMessage('joinWorkspace')
  handleJoinWorkspace(client: Socket, payload: { boardId: string }) {
    client.join(\`board_\${payload.boardId}\`);
    this.logger.log(\`Client \${client.id} joined board_\${payload.boardId}\`);
  }
}</code></pre>

      <h2>2. Đồng bộ trạng thái và quản lý phòng kết nối</h2>
      <p>Một lỗi phổ biến khi thiết kế các bảng cộng tác thời gian thực là broadcast sự kiện cho tất cả người dùng đang kết nối trên server. Điều này gây tốn băng thông và làm chậm server. Trong dự án Krello, tôi phân chia người dùng vào các phòng (room) riêng biệt dựa trên <code>boardId</code> đang mở. Khi một thẻ di chuyển, chỉ các client nằm trong phòng đó nhận được cập nhật:</p>
      <pre><code>@SubscribeMessage('moveCard')
handleMoveCard(client: Socket, payload: { boardId: string, cardId: string, toColumn: string }) {
  // Gửi sự kiện cho các client khác trong cùng phòng bảng công việc
  client.to(\`board_\${payload.boardId}\`).emit('cardUpdated', payload);
}</code></pre>

      <h2>3. Tối ưu hóa điểm nghẽn ghi dữ liệu vào Database</h2>
      <p>Thao tác kéo thả thẻ tác vụ diễn ra liên tục và sinh ra lượng request cập nhật database rất lớn. Nếu cập nhật trực tiếp vào cơ sở dữ liệu PostgreSQL cho mỗi pixel dịch chuyển, pool kết nối sẽ bị nghẽn. Để giải quyết, tôi đã áp dụng:
      <ul>
        <li><strong>Cập nhật lạc quan (Optimistic Updates):</strong> React frontend cập nhật giao diện ngay lập tức trước khi nhận phản hồi từ server. Nếu server ghi lỗi, giao diện sẽ rollback về trạng thái cũ.</li>
        <li><strong>Đồng bộ trì hoãn (Debounced Saves):</strong> Trạng thái di chuyển được lưu tạm trên memory (hoặc Redis) và chỉ ghi vào cơ sở dữ liệu sau khi người dùng thả chuột hoàn tất thao tác kéo thẻ.</li>
      </ul>

      <h2>Các quy chuẩn tốt nhất khi phát triển WebSocket</h2>
      <ul>
        <li><strong>Xác thực Token:</strong> Luôn kiểm tra tính hợp lệ của mã JWT trong quá trình bắt tay (handshake) kết nối socket trong NestJS.</li>
        <li><strong>Tự động kết nối lại:</strong> Xây dựng logic tự động thử lại trên React client với thuật toán exponential backoff để khôi phục kết nối khi mạng chập chờn.</li>
      </ul>

      <h2>Kết luận</h2>
      <p>Xây dựng Krello là một cơ hội tuyệt vời để thực hành kỹ thuật real-time. Sự kết hợp giữa NestJS, an toàn kiểu dữ liệu của TypeScript và tính linh hoạt của React mang lại một trải nghiệm sản phẩm xuất sắc. Bạn có thể xem toàn bộ mã nguồn trên profile GitHub của tôi!</p>

      <hr />
      <h3>Bài viết liên quan</h3>
      <ul>
        <li><a href="/blog/about-vu-bao-khanh-fullstack-developer">Vũ Bảo Khanh Là Ai? Hành Trình Định Hỏi Tư Duy Của Một Full Stack Developer</a></li>
        <li><a href="/blog/debugging-production-performance-laravel-eloquent-mysql">Eloquent ORM trong môi trường Production: Bài học xương máu từ việc tối ưu hóa truy vấn Database</a></li>
      </ul>

      <hr />
      <h3>Thông tin tác giả</h3>
      <p><strong>Tác giả:</strong> Vũ Bảo Khanh<br /><em>Full Stack Web Developer</em></p>
      <p>Hiện tại đang làm việc ở vị trí Full Stack PHP Developer tại công ty BM WEB.</p>
      <p>Công nghệ chuyên sâu:</p>
      <ul>
        <li>PHP</li>
        <li>Laravel</li>
        <li>React</li>
        <li>NestJS</li>
        <li>TypeScript</li>
        <li>MySQL</li>
        <li>PostgreSQL</li>
      </ul>
      <p>Portfolio: <a href="https://vubaokhanh.tech">https://vubaokhanh.tech</a><br />GitHub: <a href="https://github.com/vubaokhannh">https://github.com/vubaokhannh</a></p>
    `,
  },
  {
    slug: "debugging-production-performance-laravel-eloquent-mysql",
    title: "Eloquent ORM trong môi trường Production: Bài học xương máu từ việc tối ưu hóa truy vấn Database",
    description: "Vũ Bảo Khanh chia sẻ các tình huống gỡ lỗi thực tế, cách tối ưu Eloquent ORM và chiến lược mở rộng cơ sở dữ liệu MySQL.",
    date: "25 Tháng 6, 2026",
    isoDate: "2026-06-25",
    tags: ["Kỹ thuật", "Laravel", "MySQL", "PHP"],
    author: "Vũ Bảo Khanh",
    readTime: "14 phút đọc",
    coverImage: "/og-image.png",
    content: `
      <h2>Hiểm họa ngầm: Lazy Loading trong môi trường Production</h2>
      <p>Với các nhà phát triển PHP, Eloquent ORM của Laravel là một công cụ cực kỳ hữu ích giúp truy vấn cơ sở dữ liệu dễ đọc hơn. Tuy nhiên, khi đưa ứng dụng vào vận hành thực tế với hàng ngàn người dùng truy cập cùng lúc, các câu lệnh Eloquent không tối ưu sẽ nhanh chóng làm chậm toàn bộ hệ thống. Trong bài viết này, tôi, <strong>Vũ Bảo Khanh</strong>, sẽ chia sẻ những sự cố database thực tế tôi đã giải quyết ở vai trò Full Stack Developer tại BM WEB, và cách bạn có thể tối ưu ứng dụng Laravel của mình.</p>

      <h2>1. Lỗi N+1 Query: Bài học từ hệ thống thực tế</h2>
      <p>Trong quá trình tối ưu hóa một ứng dụng chạy thực tế, chúng tôi phát hiện thời gian load trang danh sách sản phẩm mất hơn 4 giây. Sau khi sử dụng Laravel Telescope để đo đạc, chúng tôi phát hiện hệ thống chạy tới 150 câu lệnh SQL để hiển thị 50 sản phẩm trên màn hình. Đây chính là lỗi N+1 Query kinh điển. Giải pháp rất đơn giản: thay thế cơ chế lazy loading mặc định bằng **eager loading** sử dụng phương thức <code>with()</code>.</p>
      <pre><code>// ❌ Tệ: Sinh ra tới 51 câu lệnh SQL truy vấn database
$projects = Project::all();
foreach ($projects as $project) {
    echo $project->client->name;
}

// ✅ Tốt: Chỉ sinh ra đúng 2 câu lệnh SQL truy vấn database
$projects = Project::with('client')->get();
foreach ($projects as $project) {
    echo $project->client->name;
}</code></pre>

      <h2>2. Đánh Index đúng cách cho MySQL</h2>
      <p>Rất nhiều lập trình viên bỏ qua việc cấu hình index trong các tệp migration. Khi bạn truy vấn một bảng dữ liệu lớn bằng điều kiện nằm trong mệnh đề <code>where</code> mà không đánh index cho cột đó, MySQL bắt buộc phải đọc qua tất cả các dòng dữ liệu của bảng (full table scan). Hãy luôn đánh index cho các trường thường xuyên tìm kiếm:</p>
      <pre><code>Schema::table('orders', function (Blueprint $table) {
    $table->index(['user_id', 'status']);
});</code></pre>

      <h2>3. Tránh tràn bộ nhớ (Memory Exhaustion) khi đọc file dữ liệu lớn</h2>
      <p>Một lỗi phổ biến khác là gọi hàm <code>get()</code> để lấy ra hàng triệu dòng bản ghi cùng lúc. Điều này nạp toàn bộ dữ liệu thô vào bộ nhớ RAM của PHP, gây ra lỗi Crash Script. Hãy thay thế bằng hàm <code>cursor()</code> hoặc chia nhỏ dữ liệu bằng <code>chunk()</code>:</p>
      <pre><code>// Xử lý tối ưu bộ nhớ RAM
User::where('active', true)->chunk(500, function ($users) {
    foreach ($users as $user) {
        $user->sendNotification();
    }
});</code></pre>

      <h2>Kết luận</h2>
      <p>Tối ưu hóa các câu lệnh Eloquent ORM là kỹ năng sống còn của mọi Full Stack Developer làm việc với PHP. Bằng cách thiết lập index đúng, sử dụng eager loading và kiểm tra query profile thường xuyên, bạn sẽ giữ cho hệ thống luôn chạy mượt mà dưới tải trọng lớn.</p>

      <hr />
      <h3>Bài viết liên quan</h3>
      <ul>
        <li><a href="/blog/about-vu-bao-khanh-fullstack-developer">Vũ Bảo Khanh Là Ai? Hành Trình Định Hỏi Tư Duy Của Một Full Stack Developer</a></li>
        <li><a href="/blog/building-krello-realtime-task-management-nestjs-react">Kiến trúc Krello: Xây dựng hệ thống quản lý công việc thời gian thực bằng NestJS và React</a></li>
      </ul>

      <hr />
      <h3>Thông tin tác giả</h3>
      <p><strong>Tác giả:</strong> Vũ Bảo Khanh<br /><em>Full Stack Web Developer</em></p>
      <p>Hiện tại đang làm việc ở vị trí Full Stack PHP Developer tại công ty BM WEB.</p>
      <p>Công nghệ chuyên sâu:</p>
      <ul>
        <li>PHP</li>
        <li>Laravel</li>
        <li>React</li>
        <li>NestJS</li>
        <li>TypeScript</li>
        <li>MySQL</li>
        <li>PostgreSQL</li>
      </ul>
      <p>Portfolio: <a href="https://vubaokhanh.tech">https://vubaokhanh.tech</a><br />GitHub: <a href="https://github.com/vubaokhannh">https://github.com/vubaokhannh</a></p>
    `,
  },
];

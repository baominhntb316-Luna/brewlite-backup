# -*- coding: utf-8 -*-
import os

svg_dir = r"D:\CODE programe\CNPM\brewlite\docs\diagrams\exports"
os.makedirs(svg_dir, exist_ok=True)

# 1. order-state-machine.svg
osm_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 320" width="950" height="320" style="background:#ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2b5b84"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#c0392b"/>
    </marker>
    <marker id="arrow-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#e67e22"/>
    </marker>
  </defs>
  <text x="475" y="35" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e3d59">MÁY TRẠNG THÁI ĐƠN HÀNG BREWLITE (ORDER STATE MACHINE)</text>
  
  <!-- Start -->
  <circle cx="50" cy="120" r="14" fill="#2b5b84"/>
  <line x1="64" y1="120" x2="110" y2="120" stroke="#2b5b84" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="85" y="112" font-size="11" text-anchor="middle" fill="#555">tạo đơn</text>

  <!-- PENDING -->
  <rect x="110" y="95" width="120" height="50" rx="10" fill="#e1f5fe" stroke="#0288d1" stroke-width="2"/>
  <text x="170" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#01579b">PENDING</text>
  <text x="170" y="140" font-size="10" text-anchor="middle" fill="#0288d1">chờ thanh toán</text>

  <!-- PENDING to PAID -->
  <line x1="230" y1="120" x2="300" y2="120" stroke="#2b5b84" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="265" y="112" font-size="11" text-anchor="middle" fill="#2e7d32">success</text>

  <!-- PAID -->
  <rect x="300" y="95" width="120" height="50" rx="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
  <text x="360" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#1b5e20">PAID</text>
  <text x="360" y="140" font-size="10" text-anchor="middle" fill="#2e7d32">đã thanh toán</text>

  <!-- PAID to PREPARING -->
  <line x1="420" y1="120" x2="490" y2="120" stroke="#2b5b84" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="455" y="112" font-size="11" text-anchor="middle" fill="#555">nhận pha</text>

  <!-- PREPARING -->
  <rect x="490" y="95" width="130" height="50" rx="10" fill="#fff3e0" stroke="#ef6c00" stroke-width="2"/>
  <text x="555" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#e65100">PREPARING</text>
  <text x="555" y="140" font-size="10" text-anchor="middle" fill="#ef6c00">đang pha chế</text>

  <!-- PREPARING to READY -->
  <line x1="620" y1="120" x2="690" y2="120" stroke="#2b5b84" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="655" y="112" font-size="11" text-anchor="middle" fill="#555">pha xong</text>

  <!-- READY -->
  <rect x="690" y="95" width="110" height="50" rx="10" fill="#e0f7fa" stroke="#00838f" stroke-width="2"/>
  <text x="745" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#006064">READY</text>
  <text x="745" y="140" font-size="10" text-anchor="middle" fill="#00838f">sẵn sàng</text>

  <!-- READY to COMPLETED -->
  <line x1="800" y1="120" x2="850" y2="120" stroke="#2b5b84" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="825" y="112" font-size="11" text-anchor="middle" fill="#555">giao</text>

  <!-- COMPLETED -->
  <rect x="850" y="95" width="80" height="50" rx="10" fill="#ede7f6" stroke="#4527a0" stroke-width="2"/>
  <text x="890" y="125" font-size="11" font-weight="bold" text-anchor="middle" fill="#311b92">COMPLETED</text>
  <text x="890" y="140" font-size="9" text-anchor="middle" fill="#4527a0">hoàn tất</text>

  <!-- PENDING to PAYMENT_FAILED -->
  <line x1="170" y1="145" x2="170" y2="220" stroke="#c0392b" stroke-width="2" marker-end="url(#arrow-red)"/>
  <text x="180" y="185" font-size="11" fill="#c0392b">lỗi thanh toán</text>

  <!-- PAYMENT_FAILED -->
  <rect x="90" y="220" width="160" height="50" rx="10" fill="#ffebee" stroke="#c62828" stroke-width="2"/>
  <text x="170" y="248" font-size="12" font-weight="bold" text-anchor="middle" fill="#b71c1c">PAYMENT_FAILED</text>
  <text x="170" y="262" font-size="10" text-anchor="middle" fill="#c62828">thanh toán thất bại</text>

  <!-- PAYMENT_FAILED retry to PENDING -->
  <path d="M 130 220 C 100 185, 100 160, 130 145" fill="none" stroke="#e67e22" stroke-width="2" marker-end="url(#arrow-orange)"/>
  <text x="85" y="185" font-size="11" fill="#e67e22">thử lại</text>

  <!-- CANCELLED -->
  <rect x="330" y="220" width="130" height="50" rx="10" fill="#eceff1" stroke="#455a64" stroke-width="2"/>
  <text x="395" y="248" font-size="13" font-weight="bold" text-anchor="middle" fill="#263238">CANCELLED</text>
  <text x="395" y="262" font-size="10" text-anchor="middle" fill="#455a64">đã hủy đơn</text>

  <line x1="250" y1="245" x2="330" y2="245" stroke="#78909c" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrow)"/>
  <text x="290" y="238" font-size="10" text-anchor="middle" fill="#78909c">hủy</text>
  <line x1="200" y1="145" x2="340" y2="220" stroke="#78909c" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrow)"/>
</svg>"""

with open(os.path.join(svg_dir, "order-state-machine.svg"), "w", encoding="utf-8") as f:
    f.write(osm_svg)

# 2. usecase-overview.svg
uc_overview_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 480" width="850" height="480" style="background:#ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <text x="425" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e3d59">SƠ ĐỒ USE-CASE TỔNG QUÁT HỆ THỐNG BREWLITE</text>
  
  <!-- Boundary -->
  <rect x="180" y="55" width="480" height="410" rx="15" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
  <text x="420" y="80" font-size="14" font-weight="bold" text-anchor="middle" fill="#334155">HỆ THỐNG BREWLITE (MVP)</text>

  <!-- Actors -->
  <text x="70" y="180" font-size="13" font-weight="bold" text-anchor="middle" fill="#1e293b">KHÁCH HÀNG</text>
  <text x="70" y="198" font-size="11" text-anchor="middle" fill="#64748b">(Primary Actor)</text>
  <circle cx="70" cy="130" r="18" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
  <line x1="70" y1="148" x2="70" y2="168" stroke="#334155" stroke-width="2"/>

  <text x="760" y="220" font-size="13" font-weight="bold" text-anchor="middle" fill="#1e293b">MOCK PAYMENT</text>
  <text x="760" y="238" font-size="11" text-anchor="middle" fill="#64748b">(Secondary Actor)</text>
  <rect x="710" y="160" width="100" height="40" rx="5" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
  <text x="760" y="185" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Gateway</text>

  <!-- Use cases -->
  <!-- UC1 -->
  <ellipse cx="290" cy="115" rx="80" ry="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
  <text x="290" y="120" font-size="11" font-weight="bold" text-anchor="middle" fill="#0369a1">UC-01: Xem menu</text>
  <!-- UC2 -->
  <ellipse cx="290" cy="170" rx="80" ry="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
  <text x="290" y="175" font-size="11" font-weight="bold" text-anchor="middle" fill="#0369a1">UC-02: Chi tiết &amp; tùy chọn</text>
  <!-- UC3 -->
  <ellipse cx="290" cy="225" rx="80" ry="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
  <text x="290" y="230" font-size="11" font-weight="bold" text-anchor="middle" fill="#0369a1">UC-03: Giỏ hàng</text>
  <!-- UC4 -->
  <ellipse cx="530" cy="115" rx="85" ry="22" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="530" y="120" font-size="11" font-weight="bold" text-anchor="middle" fill="#b45309">UC-04: Đăng ký / Đăng nhập</text>
  <!-- UC5 -->
  <ellipse cx="420" cy="290" rx="95" ry="26" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="420" y="295" font-size="12" font-weight="bold" text-anchor="middle" fill="#15803d">UC-05: Đặt &amp; thanh toán</text>
  <!-- UC6 -->
  <ellipse cx="290" cy="360" rx="80" ry="22" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>
  <text x="290" y="365" font-size="11" font-weight="bold" text-anchor="middle" fill="#334155">UC-06: Xác nhận &amp; lịch sử</text>
  <!-- UC7 -->
  <ellipse cx="290" cy="415" rx="80" ry="22" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>
  <text x="290" y="420" font-size="11" font-weight="bold" text-anchor="middle" fill="#334155">UC-07: Theo dõi trạng thái</text>
  <!-- UC9 -->
  <ellipse cx="530" cy="370" rx="85" ry="22" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="530" y="375" font-size="11" font-weight="bold" text-anchor="middle" fill="#b45309">UC-09: Khuyến mãi &amp; điểm</text>

  <!-- Connectors -->
  <line x1="88" y1="130" x2="210" y2="115" stroke="#475569" stroke-width="1.5"/>
  <line x1="88" y1="135" x2="210" y2="170" stroke="#475569" stroke-width="1.5"/>
  <line x1="88" y1="140" x2="210" y2="225" stroke="#475569" stroke-width="1.5"/>
  <line x1="88" y1="150" x2="330" y2="285" stroke="#15803d" stroke-width="2"/>
  <line x1="88" y1="160" x2="210" y2="360" stroke="#475569" stroke-width="1.5"/>
  <line x1="88" y1="170" x2="210" y2="415" stroke="#475569" stroke-width="1.5"/>
  <line x1="515" y1="290" x2="710" y2="185" stroke="#16a34a" stroke-width="2"/>

  <!-- Relationships -->
  <line x1="440" y1="264" x2="510" y2="137" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4"/>
  <text x="500" y="200" font-size="10" fill="#0284c7">&lt;&lt;include&gt;&gt;</text>
  <line x1="450" y1="316" x2="500" y2="350" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4"/>
  <text x="500" y="330" font-size="10" fill="#d97706">&lt;&lt;extend&gt;&gt;</text>
</svg>"""

with open(os.path.join(svg_dir, "usecase-overview.svg"), "w", encoding="utf-8") as f:
    f.write(uc_overview_svg)

# 3. architecture.svg
arch_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 480" width="920" height="480" style="background:#ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <text x="460" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e3d59">KIẾN TRÚC PHÂN LỚP VÀ CÁC MODULE MIỀN NGHIỆP VỤ BREWLITE</text>
  
  <!-- Presentation Layer -->
  <rect x="40" y="60" width="840" height="100" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
  <text x="60" y="85" font-size="14" font-weight="bold" fill="#0369a1">TẦNG TRÌNH DIỄN (Presentation Layer - Next.js 14+ / PWA)</text>
  <rect x="60" y="100" width="140" height="45" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="130" y="128" font-size="11" text-anchor="middle" fill="#0369a1">Mobile-First Menu</text>
  <rect x="220" y="100" width="140" height="45" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="290" y="128" font-size="11" text-anchor="middle" fill="#0369a1">Cart State Store</text>
  <rect x="380" y="100" width="140" height="45" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="450" y="128" font-size="11" text-anchor="middle" fill="#0369a1">Options &amp; Toppings</text>
  <rect x="540" y="100" width="150" height="45" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="615" y="128" font-size="11" text-anchor="middle" fill="#0369a1">Checkout &amp; Status</text>
  <rect x="710" y="100" width="150" height="45" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="785" y="128" font-size="11" text-anchor="middle" fill="#0369a1">Order History View</text>

  <!-- Flow Arrow -->
  <line x1="460" y1="160" x2="460" y2="190" stroke="#0284c7" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="560" y="180" font-size="11" text-anchor="middle" fill="#64748b">REST API / JSON (Bearer JWT, Idempotency-Key)</text>

  <!-- Application / Domain Layer -->
  <rect x="40" y="190" width="840" height="150" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
  <text x="60" y="215" font-size="14" font-weight="bold" fill="#b45309">TẦNG ỨNG DỤNG &amp; MIỀN NGHIỆP VỤ (Application / Domain Layer - NestJS Modular Monolith)</text>
  
  <rect x="60" y="235" width="130" height="85" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
  <text x="125" y="265" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">AuthModule</text>
  <text x="125" y="285" font-size="10" text-anchor="middle" fill="#78350f">Bcrypt / JWT Guard</text>

  <rect x="210" y="235" width="140" height="85" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
  <text x="280" y="265" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">ProductsModule</text>
  <text x="280" y="285" font-size="10" text-anchor="middle" fill="#78350f">GET /products (Active)</text>
  <text x="280" y="300" font-size="10" text-anchor="middle" fill="#78350f">GET /products/:id</text>

  <rect x="370" y="235" width="160" height="85" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
  <text x="450" y="265" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">OrdersModule</text>
  <text x="450" y="285" font-size="10" text-anchor="middle" fill="#78350f">State Machine (PENDING..)</text>
  <text x="450" y="300" font-size="10" text-anchor="middle" fill="#78350f">Atomic Stock Reservation</text>

  <rect x="550" y="235" width="160" height="85" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
  <text x="630" y="265" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">PaymentsModule</text>
  <text x="630" y="285" font-size="10" text-anchor="middle" fill="#78350f">Idempotency Engine</text>
  <text x="630" y="300" font-size="10" text-anchor="middle" fill="#78350f">Mock WALLET / CARD</text>

  <rect x="730" y="235" width="130" height="85" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
  <text x="795" y="265" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">Health &amp; Filters</text>
  <text x="795" y="285" font-size="10" text-anchor="middle" fill="#78350f">GET /health</text>
  <text x="795" y="300" font-size="10" text-anchor="middle" fill="#78350f">ValidationPipe</text>

  <!-- Flow Arrow -->
  <line x1="460" y1="340" x2="460" y2="370" stroke="#d97706" stroke-width="2"/>
  <text x="560" y="360" font-size="11" text-anchor="middle" fill="#64748b">Prisma ORM / Connection Pool / ACID Transactions</text>

  <!-- Persistence Layer -->
  <rect x="40" y="370" width="840" height="90" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
  <text x="60" y="395" font-size="14" font-weight="bold" fill="#15803d">TẦNG LƯU TRỮ BỀN VỮNG (Persistence Layer - PostgreSQL 16 &amp; Persistent Volume)</text>
  <rect x="60" y="405" width="180" height="40" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <text x="150" y="430" font-size="11" text-anchor="middle" fill="#15803d">Users &amp; Loyalty</text>
  <rect x="260" y="405" width="180" height="40" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <text x="350" y="430" font-size="11" text-anchor="middle" fill="#15803d">Products, Variants, Toppings</text>
  <rect x="460" y="405" width="180" height="40" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <text x="550" y="430" font-size="11" text-anchor="middle" fill="#15803d">Orders &amp; OrderItems</text>
  <rect x="660" y="405" width="200" height="40" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <text x="760" y="430" font-size="11" text-anchor="middle" fill="#15803d">Payments &amp; Idempotency</text>
</svg>"""

with open(os.path.join(svg_dir, "architecture.svg"), "w", encoding="utf-8") as f:
    f.write(arch_svg)

# 4. deployment.svg
deploy_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 460" width="960" height="460" style="background:#ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <text x="480" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e3d59">SƠ ĐỒ TRIỂN KHAI PRODUCTION (LINUX VPS, DOCKER COMPOSE &amp; CADDY TLS)</text>

  <!-- Client -->
  <rect x="30" y="170" width="120" height="90" rx="8" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="90" y="200" font-size="12" font-weight="bold" text-anchor="middle" fill="#1e293b">Client Device</text>
  <text x="90" y="220" font-size="10" text-anchor="middle" fill="#64748b">Browser / PWA</text>
  <text x="90" y="245" font-size="9" text-anchor="middle" fill="#0284c7">HTTPS :443</text>

  <line x1="150" y1="215" x2="220" y2="215" stroke="#0284c7" stroke-width="2"/>

  <!-- Internet -->
  <ellipse cx="250" cy="215" rx="30" ry="20" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
  <text x="250" y="220" font-size="10" text-anchor="middle" fill="#0369a1">Internet</text>

  <line x1="280" y1="215" x2="350" y2="215" stroke="#0284c7" stroke-width="2"/>

  <!-- Production VPS Box -->
  <rect x="350" y="60" width="580" height="380" rx="15" fill="#fafafa" stroke="#334155" stroke-width="2.5"/>
  <text x="640" y="90" font-size="15" font-weight="bold" text-anchor="middle" fill="#1e293b">PRODUCTION LINUX VPS (Ubuntu Server)</text>

  <!-- Caddy -->
  <rect x="370" y="180" width="120" height="70" rx="8" fill="#e0f7fa" stroke="#00838f" stroke-width="2"/>
  <text x="430" y="205" font-size="12" font-weight="bold" text-anchor="middle" fill="#006064">Caddy Proxy</text>
  <text x="430" y="225" font-size="10" text-anchor="middle" fill="#00838f">TLS Certificate</text>
  <text x="430" y="240" font-size="9" text-anchor="middle" fill="#00838f">:80 -&gt; :443 redirect</text>

  <!-- Docker Compose Network -->
  <rect x="520" y="115" width="390" height="305" rx="10" fill="#f8fafc" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5"/>
  <text x="715" y="140" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Docker Compose Private Network (internal only)</text>

  <!-- Web Container -->
  <rect x="540" y="160" width="160" height="65" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="620" y="185" font-size="12" font-weight="bold" text-anchor="middle" fill="#0369a1">web container</text>
  <text x="620" y="205" font-size="10" text-anchor="middle" fill="#0284c7">Next.js :3000</text>

  <!-- API Container -->
  <rect x="730" y="160" width="160" height="65" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
  <text x="810" y="185" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">api container</text>
  <text x="810" y="205" font-size="10" text-anchor="middle" fill="#d97706">NestJS :3001 (/health)</text>

  <!-- DB Container -->
  <rect x="635" y="260" width="180" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="725" y="285" font-size="12" font-weight="bold" text-anchor="middle" fill="#15803d">db container</text>
  <text x="725" y="305" font-size="10" text-anchor="middle" fill="#16a34a">PostgreSQL :5432 (Internal)</text>
  <text x="725" y="320" font-size="9" text-anchor="middle" fill="#dc2626">CẤM public Internet</text>

  <!-- Persistent Volume -->
  <rect x="635" y="355" width="180" height="45" rx="6" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="725" y="382" font-size="11" text-anchor="middle" fill="#5b21b6">Volume: postgres_data</text>

  <!-- Lines -->
  <line x1="490" y1="195" x2="540" y2="195" stroke="#0284c7" stroke-width="1.5"/>
  <line x1="490" y1="220" x2="730" y2="195" stroke="#d97706" stroke-width="1.5"/>
  <line x1="810" y1="225" x2="750" y2="260" stroke="#16a34a" stroke-width="1.5"/>
  <line x1="725" y1="330" x2="725" y2="355" stroke="#7c3aed" stroke-width="1.5"/>
</svg>"""

with open(os.path.join(svg_dir, "deployment.svg"), "w", encoding="utf-8") as f:
    f.write(deploy_svg)

print("Generated all SVGs in:", svg_dir)

Build a single-page AI Resume Agent web app with 4 states: Home, Loading, Report+Chat, and Fullscreen Chat. All Chinese text.

=== COLOR SYSTEM ===
- Primary: #2563EB, Secondary: #3B82F6, Success: #10B981, Warning: #F59E0B, Danger: #EF4444
- Background: #F8FAFC, Card: #FFFFFF, Text: #1E293B, Text-secondary: #64748B
- Chat user bubble: bg #EFF6FF text #2563EB, Chat AI bubble: bg #FFFFFF
- Border radius: cards 12px, buttons 8px, chat bubbles 20px

=== STATE 1: HOME (Dual Upload) ===
Centered layout on light gray bg with max-w-3xl card.
- H1: "读懂JD，写好简历" (bold, text-4xl)
- Subtitle: "上传JD和简历，AI帮你理解招聘方真正想要什么"
- TWO upload cards side by side (flex-row on desktop, flex-col on mobile):
  LEFT: "📋 上传岗位JD" with dashed border upload zone. "点击上传或拖拽 PDF / DOCX / TXT". File icon centered. Below: "✏️ 或直接粘贴JD文本..." text link. After upload: ✓ checkmark + filename + size + text preview (first 50 chars). Blue accent (#2563EB).
  RIGHT: "📄 上传简历" with dashed border upload zone. "点击上传或拖拽 PDF / DOCX". After upload: ✓ checkmark + filename + size. Emerald accent (#10B981).
- CTA: Full-width pill button "🔍 开始分析"
  - Disabled when missing uploads: gray bg, opacity 0.5
  - Enabled when both uploaded: blue gradient (#2563EB to #3B82F6), pulse animation, text "已就绪，开始分析"
- Footer steps: "1. 上传 → 2. 分析 → 3. 对话优化" with numbered circles
- Hover/drag effects: border color change, subtle shadow lift
- Upload zones have min-height 200px

=== STATE 2: LOADING (Progress) ===
Same centered card. Content replaced:
- Pulsing animated document+mag icon
- "正在分析..." title
- 3 sequential steps with fade-in animation:
  "✓ 解析JD — 提取4层语义结构" (green checkmark)
  "⟳ 生成理想简历 — 反向推导匹配画像" (spinning icon, blue highlight, active)
  "○ 对比分析 — 识别差距与改进路径" (gray, pending)
- Smooth animated progress bar
- "大约需要15-20秒" below

=== STATE 3: REPORT + CHAT (Split Screen) ===
DESKTOP: Left 60% report | Right 40% chat. MOBILE: report full width, chat as bottom sheet.

LEFT SIDE — Report (scrollable):

Fixed frosted-glass top bar (backdrop-blur): "📊 分析报告" + 3 icon buttons [📋 复制 | 🔗 分享 | 📄 导出飞书文档]

6 scrollable sections:

1. 📌 JD概览 — Blue left-accent border. 2-column grid: L1公司背景/L2岗位职责 | L3技能要求/L4隐含期望. Each has 3-5 bullet points. Clean card.

2. 🎯 理想简历 — Light blue bg (#EFF6FF). "⭐ 核心差异" badge. Resume-style card showing AI-generated ideal candidate profile: Work Experience (3-5 quantified bullets), Skills (tag chips), Projects (2-3 items). Label: "AI生成的理想画像".

3. 📊 匹配度总览 — Large circular donut chart (overall percentage). Below: 4 horizontal bar charts with labels 工作经历/技能匹配/项目经验/教育背景. Color: >80% green, 50-80% yellow, <50% red.

4. 🔍 差距分析 — Two side-by-side cards: "你的简历" (left) "JD期望" (right). Each gap row: description + severity badge (🔴高/🟡中/🟢低) + [💬 问AI] chip button. Missing items in red dashed border.

5. 💡 改进建议 — Numbered expandable cards (collapsed by default). Each: problem → suggestion → example rewrite. Each has [✨ 让AI改写] button.

6. 📄 优化后简历预览 — Synthesized resume with green-underlined AI changes. Updates in real-time when chat applies rewrites. "导出飞书文档" CTA at bottom.

Floating mini-TOC on right side (desktop only) highlighting current section.

RIGHT SIDE — AI Chat Panel (40%):

Header: "💬 简历优化助手" with subtitle "我可以帮你改写简历、弥补差距、优化表达". Right: [🔄 新对话] [🗑 清空] icons.

Chat area (independently scrollable):
- Welcome message from AI: context-aware, mentions match score, suggests 3 optimization starting points as tappable chips
- User messages: right-aligned, #EFF6FF bg, 20px border-radius
- AI messages: left-aligned, white bg with subtle border, 🤖 avatar
- AI response that includes a rewrite: special "📝 建议改写" card inside bubble with [✅ 应用到简历] [🔄 再改一版] buttons
- Typing indicator: 3 bouncing dots
- Messages animate in with slide-up + fade

Input area (fixed bottom of chat panel):
- Quick-action suggestion chips row above input (context-sensitive)
- Text input with placeholder "输入你的问题..." 
- Send button (✈️ icon)
- Press Enter to send

=== STATE 4: FULLSCREEN CHAT ===
- Report collapses to slim left sidebar (60px) showing only match score ring and gap count badge
- Chat expands full width
- "返回报告" icon button in chat header
- Clicking sidebar items jumps chat to relevant context

=== GLOBAL ===
- Font: Inter for headings, system sans-serif for CJK
- All transitions: 300ms ease-out (Framer Motion)
- No navbar, no auth, no dark mode, no footer links
- Demo badge at bottom: "Demo版本 · 仅供演示 · 不存储上传数据"
- Responsive: 375px to 1440px, mobile-first
- Subtle shadows: shadow-sm, shadow-md

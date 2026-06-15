Create a single-page web app for a Resume Agent Demo that provides an AI-powered, conversational resume optimization experience. The product is a "Grammarly for Resumes" — it reverse-engineers JDs to show what the ideal resume should look like, then lets users iteratively refine their resume through an AI chat interface.

This is the MVP demo: no auth, no templates, no navigation. One page with smooth transitions between 4 states.

CORE DIFFERENTIATOR: This is NOT a one-shot analysis tool. After the initial report, users enter an AI chat mode where they can have ongoing conversations to refine every aspect of their resume — rewrite bullet points, close specific gaps, rephrase for tone, add missing skills, etc. The AI retains full context of the JD, original resume, and analysis results throughout the conversation.

---

PAGE 1: HOME — Dual Upload

Layout: Centered card on clean white/light gray background with generous padding.

Content (top to bottom):
1. Hero title: "读懂JD，写好简历" — large bold Chinese heading with a subtitle: "上传JD和简历，AI帮你理解招聘方真正想要什么"
2. Two upload zones side by side:

   Left card — JD Upload:
   - Label "📋 上传岗位JD" with subtitle "粘贴文本或拖拽文件"
   - Dashed border upload area with upload icon and "点击上传或拖拽 PDF / DOCX / TXT"
   - Below: a text area "或直接粘贴JD文本..." (collapsed by default, expands on click)
   - After upload: show filename + file size + green checkmark + text preview snippet

   Right card — Resume Upload:
   - Label "📄 上传简历" with subtitle "拖拽你的简历文件"
   - Dashed border upload area with upload icon and "点击上传或拖拽 PDF / DOCX"
   - After upload: show filename + file size + green checkmark

3. CTA Button: "🔍 开始分析" — large pill button, full width below the upload cards
   - Disabled (grayed out, opacity 0.5) when either upload is missing
   - Pulsing blue gradient when both files are uploaded
   - Text changes to "已就绪，开始分析" when both uploaded

4. Footer: 3 tiny step icons showing "1. 上传 → 2. 分析 → 3. 对话优化" as a subtle onboarding hint

Design notes:
- Upload zones have hover effects (border color changes, subtle shadow lift)
- Drag-over state: border turns solid blue, background gets light blue tint
- File format validation: show inline error if wrong format

---

PAGE 2: LOADING — Analysis Progress

Layout: Same centered card, content replaced with progress animation.

1. Large animated icon: pulsing document/magnifying glass combo or subtle dots
2. Title: "正在分析..."
3. Progress stages (3 steps, sequential, each fades in):
   - "✓ 解析JD — 提取4层语义结构" (green checkmark, completed)
   - "⟳ 生成理想简历 — 反向推导匹配画像" (spinning icon, active, blue highlight)
   - "○ 对比分析 — 识别差距与改进路径" (gray dot, pending)
4. Animated progress bar below
5. Subtle message: "大约需要15-20秒"

Design notes:
- Use CSS animations for stage transitions
- Progress bar is smooth, not stepped

---

PAGE 3: REPORT — Analysis Results + AI Chat Panel

Layout: Split-screen on desktop (60% report | 40% chat), stacked on mobile (report on top, chat bottom sheet).

LEFT PANEL — Report (scrollable, 60% width on desktop):

Fixed Top Bar:
- Left: "📊 分析报告" title
- Right: 3 icon buttons: "📋 复制" | "🔗 分享" | "📄 导出飞书文档"

Report Content (6 sections, vertical scroll):

Section 1 — 📌 JD概览 (blue accent bar on left):
- 2-column grid showing JD 4-layer analysis
- Left column: "L1 公司背景" | "L2 岗位职责"
- Right column: "L3 技能要求" | "L4 隐含期望"
- Each layer shows 3-5 bullet points extracted from JD
- Clean card with subtle border

Section 2 — 🎯 理想简历 (highlighted section, light blue background, "⭐ 核心差异" badge):
- A visual resume card showing what the ideal candidate's resume would look like
- Sections: Work Experience (3-5 bullet points with quantified achievements), Skills (category tags), Projects (2-3 items)
- Styled like a resume but clearly labeled as "AI生成的理想画像"
- Each bullet point uses placeholder names like "某公司" "某项目"

Section 3 — 📊 匹配度总览 (summary card):
- Big circular donut score: 0-100% overall match percentage
- Below: horizontal bar chart for each dimension:
  - 工作经历: ████████░░ 78%
  - 技能匹配: ██████░░░░ 62%
  - 项目经验: ███░░░░░░░ 35%
  - 教育背景: ██████████ 100%
- Color coding: Green (>80%), Yellow (50-80%), Red (<50%)

Section 4 — 🔍 差距分析 (most important section):
- Side-by-side comparison cards
- Left card: "你的简历" with original content, missing items highlighted in red dashed border
- Right card: "JD期望" with expected content
- Each gap row shows:
  - Gap description: "缺少：高并发系统设计经验"
  - Severity badge: 🔴 高 | 🟡 中 | 🟢 低
  - A "💬 问AI" chip button next to each gap — clicking it auto-fills the chat input with a contextual prompt like "如何弥补高并发系统设计经验这个差距？"

Section 5 — 💡 改进建议 (actionable, like Grammarly suggestions):
- Numbered list of concrete fixes
- Each item has: problem → suggestion → example rewrite
- Each suggestion has a "✨ 让AI改写" button that sends the specific rewrite request to the chat
- Expandable cards, collapsed by default showing just the headline

Section 6 — 📄 优化后简历预览 (final deliverable):
- A synthesized resume combining original content with AI improvements
- Changes highlighted with subtle green underlines
- This section updates IN REAL-TIME as the user refines through chat
- "导出飞书文档" call-to-action at bottom

RIGHT PANEL — AI Chat (40% width on desktop, bottom sheet on mobile):

Chat Panel Header:
- Title: "💬 简历优化助手"
- Subtitle: "我可以帮你改写简历、弥补差距、优化表达"
- Right side: "🔄 新对话" and "🗑 清空" icons

Chat Area (scrollable messages):
- System welcome message at top: "我已经分析了你的简历和JD。你的整体匹配度是73%。我们可以从以下几个方面优化：\n• 量化项目成果\n• 补充高并发经验描述\n• 调整技能关键词\n你想从哪里开始？"
- User messages: right-aligned, blue bubble
- AI messages: left-aligned, white/gray bubble with avatar "🤖"
- AI responses include inline actions within the response when suggesting rewrites:
  - A rewritten bullet point shown in a special "📝 建议改写" card inside the chat bubble
  - Below the rewrite: two buttons "✅ 应用到简历" and "🔄 再改一版"
  - When user clicks "应用到简历", the Section 6 optimized resume preview updates in real-time, and a green toast appears: "已更新到优化简历"
- Typing indicator: animated 3-dot bouncing animation when AI is thinking

Chat Input Area (fixed at bottom of chat panel):
- Text input field with placeholder "输入你的问题，比如'帮我重写项目经历'..."
- Quick-action suggestion chips above input (context-sensitive):
  - "帮我润色工作经历"
  - "用更专业的词汇改写技能"
  - "针对这个JD调整项目描述"
  - "生成英文版简历"
- Send button with paper plane icon (✈️)
- Press Enter to send, Shift+Enter for newline

Chat AI Capabilities:
- The AI has full context: JD, original resume, analysis report, gap analysis
- Common user requests the AI handles:
  - "帮我把XX经历写得更量化"
  - "这个项目描述能更技术化吗"
  - "我缺的技能怎么在现有经历里体现"
  - "帮我把整段工作经历用STAR法则重写"
  - "调整语气，让它更符合外企风格"
  - "帮我写一段自我评价"
  - "这个JD更看重什么，我该怎么调整策略"
- AI responses reference specific gaps from the analysis
- AI can ask clarifying questions: "你的这个项目中，QPS大概是什么量级？"

Design notes for report page:
- The report section uses a Grammarly-like "underline with explanation" pattern
- Gap severity colors: Red #EF4444, Yellow #F59E0B, Green #10B981
- Fixed top nav bar with frosted glass effect (backdrop-blur)
- Right side: floating mini TOC that highlights current section (desktop only)
- The chat panel has a subtle left border separating it from the report
- Chat panel is independently scrollable from the report
- Smooth scroll behavior with section snap

---

PAGE 4: CHAT-FOCUSED MODE (optional, triggered by "全屏对话" button)

- Report collapses into a slim left sidebar showing only the match score and gap count
- Chat expands to full width
- Report sidebar items are clickable — clicking "差距分析" scrolls the chat to relevant messages
- "返回报告" button to go back to split view

---

GLOBAL DESIGN SYSTEM:
- Primary: #2563EB (professional blue)
- Secondary: #3B82F6 (lighter blue, hover states)
- Success: #10B981 (green)
- Warning: #F59E0B (yellow/amber)
- Danger: #EF4444 (red)
- Chat bubble user: #EFF6FF (light blue bg) with #2563EB text
- Chat bubble AI: #FFFFFF with #1E293B text, subtle border
- Background: #F8FAFC (light gray)
- Card: #FFFFFF with subtle shadow
- Text: #1E293B (dark, high contrast)
- Secondary text: #64748B
- Font: Inter (headings), system sans-serif for CJK
- Border radius: 12px for cards, 8px for buttons, 20px for chat bubbles, 4px for small elements
- Shadows: subtle, use shadow-sm and shadow-md from Tailwind

TECHNICAL:
- React + Next.js (App Router) + Tailwind CSS
- No external UI library — custom components only
- Use shadcn/ui patterns for accessible primitives
- Framer Motion for page transitions, scroll reveals, and chat message animations
- Responsive design: fluid from 375px to 1440px (mobile-first but desktop-optimized)
- All text in Chinese, with occasional English for technical terms
- Chat uses streaming API response (Server-Sent Events) for real-time AI replies
- Chat API endpoint: POST /api/chat with { messages, context: { jd, resume, report } }
- Report sections auto-highlight when mentioned in chat (e.g., if AI says "如差距分析第3条所示", that gap card pulses)
- Demo-mode banner at very bottom: "Demo版本 · 仅供演示 · 不存储上传数据"

INTERACTIONS:
- Upload: drag-and-drop + click-to-browse, with visual feedback
- Analysis: progress bar with animated stage transitions
- Report: scroll-triggered section reveals, collapsible suggestion cards
- Chat: real-time streaming responses, inline action buttons, resume live-update
- "问AI" chips in gaps section: click to auto-focus chat with contextual prompt
- "让AI改写" buttons in suggestions: click to send specific rewrite request
- Export: button triggers download/share action with brief success toast
- All transitions smooth (300ms ease-out)
- Chat messages animate in with slide-up + fade

DO NOT include:
- Header/navbar (no navigation needed — single page app)
- Authentication UI
- Template selectors or resume builders
- Dark mode toggle
- Footer with links
- Any multi-step wizards or onboarding flows

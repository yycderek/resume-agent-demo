Create a single-page web app for a Resume Agent Demo that analyzes job descriptions against resumes. The product is a "Grammarly for Resumes" — it reverse-engineers JDs to show what the ideal resume should look like, then compares the user's actual resume against it.

This is the MVP demo: no auth, no templates, no navigation. One page with smooth transitions between 3 states.

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

4. Footer: 3 tiny step icons showing "1. 上传 → 2. 分析 → 3. 查看报告" as a subtle onboarding hint

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

PAGE 3: REPORT — Analysis Results

Layout: Full-width reading layout with fixed top navigation and scrollable content.

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
  - AI insight: "你在校做过数据库课程设计，可以包装成'处理xxx QPS'来弥补"

Section 5 — 💡 改进建议 (actionable, like Grammarly suggestions):
- Numbered list of concrete fixes
- Each item has: problem → suggestion → example rewrite
- Expandable cards, collapsed by default showing just the headline
- Example:
  > **#1 量化你的项目成果**
  > 当前: "负责系统性能优化"
  > 建议: "主导系统性能优化，将API响应时间从800ms降至120ms"
  > 💡 JD偏好数据驱动的候选人，量化成果能提升匹配度27%

Section 6 — 📄 优化后简历预览 (final deliverable):
- A synthesized resume combining original content with AI improvements
- Styled like a clean resume (not ATS-optimized, human-readable)
- Changes highlighted with subtle green underlines
- "导出飞书文档" call-to-action at bottom

Design notes:
- The report section uses a Grammarly-like "underline with explanation" pattern
- Gap severity colors: Red #EF4444, Yellow #F59E0B, Green #10B981
- Fixed top nav bar with frosted glass effect (backdrop-blur)
- Right side: floating mini TOC that highlights current section (desktop only)
- Smooth scroll behavior with section snap

---

GLOBAL DESIGN SYSTEM:
- Primary: #2563EB (professional blue)
- Secondary: #3B82F6 (lighter blue, hover states)
- Success: #10B981 (green)
- Warning: #F59E0B (yellow/amber)
- Danger: #EF4444 (red)
- Background: #F8FAFC (light gray)
- Card: #FFFFFF with subtle shadow
- Text: #1E293B (dark, high contrast)
- Secondary text: #64748B
- Font: Inter (headings), system sans-serif for CJK
- Border radius: 12px for cards, 8px for buttons, 4px for small elements
- Shadows: subtle, use shadow-sm and shadow-md from Tailwind

TECHNICAL:
- React + Next.js (App Router) + Tailwind CSS
- No external UI library — custom components only
- Use shadcn/ui patterns for accessible primitives
- Framer Motion for page transitions and scroll reveals
- Responsive design: fluid from 375px to 1440px (mobile-first but desktop-optimized)
- All text in Chinese, with occasional English for technical terms
- Demo-mode banner at very bottom: "Demo版本 · 仅供演示 · 不存储上传数据"

INTERACTIONS:
- Upload: drag-and-drop + click-to-browse, with visual feedback
- Analysis: progress bar with animated stage transitions
- Report: scroll-triggered section reveals, collapsible suggestion cards
- Export: button triggers download/share action with brief success toast
- All transitions smooth (300ms ease-out)

DO NOT include:
- Header/navbar (no navigation needed — single page app)
- Authentication UI
- Template selectors or resume builders
- Dark mode toggle
- Footer with links
- Any multi-step wizards or onboarding flows

export const translations = {
  en: {
    // HomeView
    heroTitle: "Read JD, Write Resume",
    heroSubtitle: "Upload a JD and your resume. AI helps you understand what recruiters really want",
    uploadJD: "📋 Upload JD",
    uploadJDSub: "Paste text or drag & drop file",
    uploadResume: "📄 Upload Resume",
    uploadResumeSub: "Drag & drop your resume",
    jdDropHint: "Click or drag PDF / DOCX / TXT",
    resumeDropHint: "Click or drag PDF / DOCX",
    pasteJD: "✏️ or paste JD text...",
    pasteResume: "✏️ or paste resume text...",
    pastePlaceholder: "Paste text here...",
    confirm: "Confirm",
    cancel: "Cancel",
    reupload: "Re-upload",
    preview: "Preview:",
    invalidFormat: "Unsupported format. Please upload",
    readyAnalyze: "🔍 Ready — Start Analysis",
    startAnalyze: "🔍 Start Analysis",
    step1: "Upload",
    step2: "Analyze",
    step3: "Chat & Refine",
    demoBadge: "Demo · For demonstration only · No data stored",
    manualPasteText: "Pasted text",
    chars: "chars",

    // LoadingView
    analyzing: "Analyzing...",
    stage1Label: "Parse JD",
    stage1Sub: "Extract 4-layer semantic structure",
    stage2Label: "Generate Ideal Resume",
    stage2Sub: "Reverse-engineer matching profile",
    stage3Label: "Compare & Analyze",
    stage3Sub: "Identify gaps and improvement paths",
    progress: "Progress",
    estimatedTime: "Approximately 15–20 seconds",

    // ReportView nav
    reportTitle: "📊 Analysis Report",
    copy: "📋 Copy",
    share: "🔗 Share",
    exportFeishu: "📄 Export to Feishu",
    back: "← Back",
    copiedToast: "Copied to clipboard",
    sharedToast: "Share link generated (Demo)",
    feishuToast: "Exporting to Feishu (Demo)",

    // ReportView section titles
    jdOverview: "📌 JD Overview",
    idealResume: "🎯 Ideal Resume",
    matchOverview: "📊 Match Overview",
    gapAnalysis: "🔍 Gap Analysis",
    improvementSuggestions: "💡 Improvement Suggestions",
    optimizedResume: "📄 Optimized Resume Preview",

    // ReportView section content labels
    coreDiff: "⭐ Core Differentiator",
    aiGeneratedProfile: "AI-generated ideal profile — reverse-engineered from JD",
    workExperience: "💼 Work Experience",
    skills: "🛠 Skills",
    projectExperience: "📁 Project Experience",
    education: "🎓 Education",
    overallMatch: "Overall Match",
    yourResume: "Your Resume",
    jdExpectation: "JD Expectation",
    aiInsight: "💡 AI Insight",
    suggestion: "📝 Suggestion",
    example: "✏️ Edit Example",
    impact: "📈 Impact",

    // Chat actions
    askAI: "💬 Ask AI",
    letAIRewrite: "✨ Let AI Rewrite",
    applyToResume: "✅ Apply to Resume",
    rewriteAgain: "🔄 Try Again",

    // Section titles array for mini TOC
    sectionTitles: [
      "JD Overview",
      "Ideal Resume",
      "Match Overview",
      "Gap Analysis",
      "Improvement Suggestions",
      "Optimized Resume",
    ],

    // Gap severity
    severityHigh: "High",
    severityMedium: "Medium",
    severityLow: "Low",

    // JD layers
    L1_companyBackground: "L1 Company Background",
    L2_jobResponsibilities: "L2 Job Responsibilities",
    L3_skillRequirements: "L3 Skill Requirements",
    L4_implicitExpectations: "L4 Implicit Expectations",

    // Export button at bottom
    exportFeishuDoc: "📄 Export to Feishu Document",

    // Language toggle
    langToggle: "中",

    // Chat panel
    chatTitle: "💬 Resume Optimizer",
    chatSubtitle: "I can help rewrite, close gaps, and polish your resume",
    newChat: "🔄 New Chat",
    clearChat: "🗑 Clear",
    chatPlaceholder: "Ask anything... e.g. \"Help me rewrite my project experience\"",
    chatWelcome: "I\'ve analyzed your JD and resume. Your overall match is {score}%. We can work on:\n• Quantifying your achievements\n• Closing experience gaps\n• Optimizing keywords\nWhere would you like to start?",
    chatSuggestRewrite: "📝 Suggested Rewrite",
    chatApplied: "Applied to optimized resume",

    // Quick actions
    quickPolish: "Polish work experience",
    quickKeywords: "Optimize keywords",
    quickProject: "Rewrite project description",
    quickEnglish: "Generate English version",

    // Fullscreen chat
    fullscreenChat: "Fullscreen Chat",
    backToReport: "Back to Report",
  },

  zh: {
    // HomeView
    heroTitle: "读懂JD，写好简历",
    heroSubtitle: "上传JD和简历，AI帮你理解招聘方真正想要什么",
    uploadJD: "📋 上传岗位JD",
    uploadJDSub: "粘贴文本或拖拽文件",
    uploadResume: "📄 上传简历",
    uploadResumeSub: "拖拽你的简历文件",
    jdDropHint: "点击上传或拖拽 PDF / DOCX / TXT",
    resumeDropHint: "点击上传或拖拽 PDF / DOCX",
    pasteJD: "✏️ 或直接粘贴JD文本...",
    pasteResume: "✏️ 或直接粘贴简历文本...",
    pastePlaceholder: "在此粘贴文本内容...",
    confirm: "确认",
    cancel: "取消",
    reupload: "重新上传",
    preview: "预览:",
    invalidFormat: "不支持的文件格式，请上传",
    readyAnalyze: "🔍 已就绪，开始分析",
    startAnalyze: "🔍 开始分析",
    step1: "上传",
    step2: "分析",
    step3: "对话优化",
    demoBadge: "Demo版本 · 仅供演示 · 不存储上传数据",
    manualPasteText: "手动粘贴文本",
    chars: "字符",

    // LoadingView
    analyzing: "正在分析...",
    stage1Label: "解析JD",
    stage1Sub: "提取4层语义结构",
    stage2Label: "生成理想简历",
    stage2Sub: "反向推导匹配画像",
    stage3Label: "对比分析",
    stage3Sub: "识别差距与改进路径",
    progress: "分析进度",
    estimatedTime: "大约需要15-20秒",

    // ReportView nav
    reportTitle: "📊 分析报告",
    copy: "📋 复制",
    share: "🔗 分享",
    exportFeishu: "📄 导出飞书文档",
    back: "← 返回",
    copiedToast: "已复制到剪贴板",
    sharedToast: "分享链接已生成（Demo）",
    feishuToast: "飞书文档导出中（Demo）",

    // ReportView section titles
    jdOverview: "📌 JD概览",
    idealResume: "🎯 理想简历",
    matchOverview: "📊 匹配度总览",
    gapAnalysis: "🔍 差距分析",
    improvementSuggestions: "💡 改进建议",
    optimizedResume: "📄 优化后简历预览",

    // ReportView section content labels
    coreDiff: "⭐ 核心差异",
    aiGeneratedProfile: "AI生成的理想画像 — 基于JD反向推导",
    workExperience: "💼 工作经历",
    skills: "🛠 技能",
    projectExperience: "📁 项目经验",
    education: "🎓 教育背景",
    overallMatch: "综合匹配度",
    yourResume: "你的简历",
    jdExpectation: "JD期望",
    aiInsight: "💡 AI洞察",
    suggestion: "📝 建议",
    example: "✏️ 修改示例",
    impact: "📈 影响",

    // Chat actions
    askAI: "💬 问AI",
    letAIRewrite: "✨ 让AI改写",
    applyToResume: "✅ 应用到简历",
    rewriteAgain: "🔄 再改一版",

    // Section titles array for mini TOC
    sectionTitles: [
      "JD概览",
      "理想简历",
      "匹配度总览",
      "差距分析",
      "改进建议",
      "优化简历",
    ],

    // Gap severity
    severityHigh: "高",
    severityMedium: "中",
    severityLow: "低",

    // JD layers
    L1_companyBackground: "L1 公司背景",
    L2_jobResponsibilities: "L2 岗位职责",
    L3_skillRequirements: "L3 技能要求",
    L4_implicitExpectations: "L4 隐含期望",

    // Export button at bottom
    exportFeishuDoc: "📄 导出为飞书文档",

    // Language toggle
    langToggle: "EN",

    // Chat panel
    chatTitle: "💬 简历优化助手",
    chatSubtitle: "我可以帮你改写简历、弥补差距、优化表达",
    newChat: "🔄 新对话",
    clearChat: "🗑 清空",
    chatPlaceholder: "输入你的问题，比如\"帮我重写项目经历\"...",
    chatWelcome: "我已经分析了你的JD和简历，整体匹配度是{score}%。我们可以从以下方面优化：\n• 量化项目成果\n• 弥补经验差距\n• 优化技能关键词\n你想从哪里开始？",
    chatSuggestRewrite: "📝 建议改写",
    chatApplied: "已更新到优化简历",

    // Quick actions
    quickPolish: "帮我润色工作经历",
    quickKeywords: "优化技能关键词",
    quickProject: "改写项目描述",
    quickEnglish: "生成英文版简历",

    // Fullscreen chat
    fullscreenChat: "全屏对话",
    backToReport: "返回报告",
  },
} as const;

export type Translations = typeof translations.en;

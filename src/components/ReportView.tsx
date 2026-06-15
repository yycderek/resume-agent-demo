"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

interface ReportData {
  jdAnalysis: { L1_公司背景: string[]; L2_岗位职责: string[]; L3_技能要求: string[]; L4_隐含期望: string[] };
  idealResume: { name: string; experience: string[]; skills: string[]; projects: string[]; education: string };
  matchScore: { overall: number; dimensions: { name: string; score: number; color: string }[] };
  gaps: { description: string; severity: "high" | "medium" | "low"; yourContent: string; expectedContent: string; aiInsight: string }[];
  suggestions: { problem: string; suggestion: string; example: string; impact: string }[];
  optimizedResume: { header: string; sections: { title: string; items: string[] }[] };
  lang?: string;
}

function DonutChart({ percentage, label }: { percentage: number; label: string }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color = percentage >= 80 ? "#10B981" : percentage >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="12" />
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-4xl font-bold text-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {percentage}%
        </motion.span>
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
    </div>
  );
}

function BarChart({
  dimensions,
}: {
  dimensions: { name: string; score: number; color: string }[];
}) {
  return (
    <div className="space-y-3">
      {dimensions.map((dim, i) => (
        <motion.div
          key={dim.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-text">{dim.name}</span>
            <span
              className={`font-semibold ${
                dim.color === "success"
                  ? "text-success"
                  : dim.color === "warning"
                  ? "text-warning"
                  : "text-danger"
              }`}
            >
              {dim.score}%
            </span>
          </div>
          <div className="h-3 bg-text-secondary/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                dim.color === "success"
                  ? "bg-success"
                  : dim.color === "warning"
                  ? "bg-warning"
                  : "bg-danger"
              }`}
              initial={{ width: 0 }}
              whileInView={{ width: `${dim.score}%` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ReportView({ report, onBack }: { report: ReportData; onBack?: () => void }) {
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState(0);
  const [expandedSuggestions, setExpandedSuggestions] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const severityConfig = {
    high: { label: t.severityHigh, color: "bg-danger/10 text-danger border-danger/30", dot: "text-danger" },
    medium: { label: t.severityMedium, color: "bg-warning/10 text-warning border-warning/30", dot: "text-warning" },
    low: { label: t.severityLow, color: "bg-success/10 text-success border-success/30", dot: "text-success" },
  };

  // Scroll-triggered active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.current.map((ref) => {
        if (!ref) return Infinity;
        const rect = ref.getBoundingClientRect();
        return Math.abs(rect.top - 100);
      });
      const minIdx = offsets.indexOf(Math.min(...offsets));
      if (minIdx >= 0) setActiveSection(minIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const toggleSuggestion = (i: number) => {
    setExpandedSuggestions((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const sectionTitles = t.sectionTitles;

  const jdLayerTitles = [
    t.L1_companyBackground,
    t.L2_jobResponsibilities,
    t.L3_skillRequirements,
    t.L4_implicitExpectations,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg"
    >
      {/* Fixed Top Nav */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-text-secondary/10"
      >
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-text">{t.reportTitle}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(report, null, 2));
                showToast(t.copiedToast);
              }}
              className="px-3 py-1.5 text-sm rounded-lg border border-text-secondary/20 text-text-secondary hover:bg-text-secondary/5 transition-colors"
            >
              {t.copy}
            </button>
            <button
              onClick={() => showToast(t.sharedToast)}
              className="px-3 py-1.5 text-sm rounded-lg border border-text-secondary/20 text-text-secondary hover:bg-text-secondary/5 transition-colors"
            >
              {t.share}
            </button>
            <button
              onClick={() => showToast(t.feishuToast)}
              className="px-3 py-1.5 text-sm rounded-lg bg-primary text-white hover:bg-primary-light transition-colors"
            >
              {t.exportFeishu}
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="ml-2 px-3 py-1.5 text-sm rounded-lg border border-text-secondary/20 text-text-secondary hover:bg-text-secondary/5 transition-colors"
              >
                {t.back}
              </button>
            )}
          </div>
        </div>
        {/* Mini TOC */}
        <div className="max-w-4xl mx-auto px-6 pb-2 flex gap-3 overflow-x-auto text-xs">
          {sectionTitles.map((title, i) => (
            <button
              key={i}
              onClick={() =>
                sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className={`whitespace-nowrap px-2 py-1 rounded transition-colors ${
                activeSection === i
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Scrollable Content */}
      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 space-y-8">
        {/* Section 1: JD Overview */}
        <motion.section
          ref={(el) => { sectionRefs.current[0] = el; }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-2xl shadow-sm border border-text-secondary/10 p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-6 rounded-full bg-primary" />
            <h2 className="text-xl font-bold text-text">{t.jdOverview}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: jdLayerTitles[0], data: report.jdAnalysis.L1_公司背景 },
              { title: jdLayerTitles[1], data: report.jdAnalysis.L2_岗位职责 },
              { title: jdLayerTitles[2], data: report.jdAnalysis.L3_技能要求 },
              { title: jdLayerTitles[3], data: report.jdAnalysis.L4_隐含期望 },
            ].map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-bg/50 border border-text-secondary/10"
              >
                <h3 className="font-semibold text-primary text-sm mb-2">{layer.title}</h3>
                <ul className="space-y-1.5">
                  {layer.data.map((item, j) => (
                    <li key={j} className="text-sm text-text flex gap-2">
                      <span className="text-primary-light mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Ideal Resume */}
        <motion.section
          ref={(el) => { sectionRefs.current[1] = el; }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-primary/5 rounded-2xl border border-primary/20 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              <h2 className="text-xl font-bold text-text">{t.idealResume}</h2>
            </div>
            <span className="px-3 py-1 text-xs font-semibold bg-warning/10 text-warning rounded-full border border-warning/30">
              {t.coreDiff}
            </span>
          </div>
          <p className="text-xs text-text-secondary mb-4">{t.aiGeneratedProfile}</p>

          <div className="space-y-4">
            {/* Experience */}
            <div>
              <h3 className="font-semibold text-text text-sm mb-2">{t.workExperience}</h3>
              <ul className="space-y-2">
                {report.idealResume.experience.map((exp, i) => (
                  <li key={i} className="text-sm text-text pl-4 border-l-2 border-primary/30">
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skills */}
            <div>
              <h3 className="font-semibold text-text text-sm mb-2">{t.skills}</h3>
              <div className="flex flex-wrap gap-2">
                {report.idealResume.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Projects */}
            <div>
              <h3 className="font-semibold text-text text-sm mb-2">{t.projectExperience}</h3>
              <ul className="space-y-2">
                {report.idealResume.projects.map((proj, i) => (
                  <li key={i} className="text-sm text-text pl-4 border-l-2 border-primary/30">
                    {proj}
                  </li>
                ))}
              </ul>
            </div>
            {/* Education */}
            <div>
              <h3 className="font-semibold text-text text-sm mb-2">{t.education}</h3>
              <p className="text-sm text-text">{report.idealResume.education}</p>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Match Overview */}
        <motion.section
          ref={(el) => { sectionRefs.current[2] = el; }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-2xl shadow-sm border border-text-secondary/10 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-6 rounded-full bg-primary" />
            <h2 className="text-xl font-bold text-text">{t.matchOverview}</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <DonutChart percentage={report.matchScore.overall} label={t.overallMatch} />
            <div className="flex-1 w-full">
              <BarChart dimensions={report.matchScore.dimensions} />
            </div>
          </div>
        </motion.section>

        {/* Section 4: Gap Analysis */}
        <motion.section
          ref={(el) => { sectionRefs.current[3] = el; }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-2xl shadow-sm border border-text-secondary/10 p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-6 rounded-full bg-primary" />
            <h2 className="text-xl font-bold text-text">{t.gapAnalysis}</h2>
          </div>
          <div className="space-y-4">
            {report.gaps.map((gap, i) => {
              const sev = severityConfig[gap.severity];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl border border-text-secondary/10 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-2 rounded-full ${sev.dot}`} />
                    <h3 className="font-semibold text-text text-sm">{gap.description}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${sev.color}`}>
                      {sev.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-danger/5 border border-danger/20">
                      <p className="text-xs font-medium text-danger mb-1">{t.yourResume}</p>
                      <p className="text-xs text-text">{gap.yourContent}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                      <p className="text-xs font-medium text-success mb-1">{t.jdExpectation}</p>
                      <p className="text-xs text-text">{gap.expectedContent}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5">
                    <p className="text-xs font-medium text-primary mb-1">{t.aiInsight}</p>
                    <p className="text-xs text-text-secondary">{gap.aiInsight}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Section 5: Improvement Suggestions */}
        <motion.section
          ref={(el) => { sectionRefs.current[4] = el; }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-2xl shadow-sm border border-text-secondary/10 p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-6 rounded-full bg-primary" />
            <h2 className="text-xl font-bold text-text">{t.improvementSuggestions}</h2>
          </div>
          <div className="space-y-3">
            {report.suggestions.map((sug, i) => {
              const expanded = expandedSuggestions.has(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="border border-text-secondary/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleSuggestion(i)}
                    className="w-full flex items-center justify-between p-4 hover:bg-bg/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-text text-sm">{sug.problem}</p>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: expanded ? 180 : 0 }}
                      className="text-text-secondary text-sm"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3">
                          <div className="p-3 rounded-lg bg-bg">
                            <p className="text-xs font-medium text-text mb-1">{t.suggestion}</p>
                            <p className="text-sm text-text">{sug.suggestion}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                            <p className="text-xs font-medium text-success mb-1">{t.example}</p>
                            <p className="text-xs text-text whitespace-pre-line">{sug.example}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-primary/5">
                            <p className="text-xs font-medium text-primary mb-1">{t.impact}</p>
                            <p className="text-xs text-text-secondary">{sug.impact}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Section 6: Optimized Resume */}
        <motion.section
          ref={(el) => { sectionRefs.current[5] = el; }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-2xl shadow-sm border border-text-secondary/10 p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-6 rounded-full bg-primary" />
            <h2 className="text-xl font-bold text-text">{t.optimizedResume}</h2>
          </div>

          {/* Resume header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6 pb-4 border-b border-text-secondary/10"
          >
            <h3 className="text-xl font-bold text-text">{report.optimizedResume.header}</h3>
          </motion.div>

          <div className="space-y-5">
            {report.optimizedResume.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-text text-base mb-2 border-b-2 border-text pb-1">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item, j) => {
                    const isOptimized = item.includes("优化") || item.includes("降至") || item.includes("提升") || item.includes("缩短") || item.includes("降低");
                    return (
                      <li key={j} className="text-sm text-text leading-relaxed">
                        {isOptimized ? (
                          <span className="bg-success/10 border-b-2 border-success/60 px-0.5">
                            {item}
                          </span>
                        ) : (
                          item
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Export CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => showToast(t.feishuToast)}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors font-medium shadow-lg shadow-primary/30"
            >
              {t.exportFeishuDoc}
            </button>
          </motion.div>
        </motion.section>

        {/* Demo badge */}
        <p className="text-center text-text-secondary/30 text-xs pt-4">
          {t.demoBadge}
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-text text-white rounded-xl shadow-xl text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

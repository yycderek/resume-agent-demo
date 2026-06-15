"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

export default function LoadingView() {
  const { t } = useLang();
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { label: t.stage1Label, sub: t.stage1Sub, icon: "📋" },
    { label: t.stage2Label, sub: t.stage2Sub, icon: "🎯" },
    { label: t.stage3Label, sub: t.stage3Sub, icon: "🔍" },
  ];

  useEffect(() => {
    // Stage 1 completes immediately
    const t1 = setTimeout(() => setActiveStage(1), 600);
    // Stage 2 completes after ~8 seconds
    const t2 = setTimeout(() => setActiveStage(2), 8000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 18000; // 18 seconds total animation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // Non-linear progress: fast at start, slower towards end
      const raw = Math.min(elapsed / totalDuration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed >= totalDuration) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getStageState = (index: number) => {
    if (index < activeStage) return "done";
    if (index === activeStage) return "active";
    return "pending";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-10"
        >
          {/* Animated icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="text-4xl"
              >
                🔍
              </motion.span>
            </motion.div>
          </div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-center text-text mb-8"
          >
            {t.analyzing}
          </motion.h2>

          {/* Progress stages */}
          <div className="space-y-4 mb-8">
            {stages.map((stage, i) => {
              const state = getStageState(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-500
                    ${state === "active" ? "bg-primary/5" : ""}`}
                >
                  {/* Status icon */}
                  <div className="flex-shrink-0">
                    {state === "done" && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-7 h-7 rounded-full bg-success flex items-center justify-center text-white text-sm"
                      >
                        ✓
                      </motion.span>
                    )}
                    {state === "active" && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent"
                      />
                    )}
                    {state === "pending" && (
                      <div className="w-7 h-7 rounded-full border-2 border-text-secondary/30 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/30" />
                      </div>
                    )}
                  </div>

                  {/* Stage text */}
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        state === "active"
                          ? "text-primary"
                          : state === "done"
                          ? "text-success"
                          : "text-text-secondary"
                      }`}
                    >
                      {stage.icon} {stage.label}
                    </p>
                    <p className="text-xs text-text-secondary/70">{stage.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>{t.progress}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-text-secondary/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Time hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-text-secondary text-sm"
          >
            {t.estimatedTime}
          </motion.p>

          {/* Pulsing dots */}
          <motion.div
            className="flex justify-center gap-1.5 mt-4"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-primary-light" />
            <span className="w-2 h-2 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

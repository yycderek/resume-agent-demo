"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HomeView from "@/components/HomeView";
import LoadingView from "@/components/LoadingView";
import ReportView from "@/components/ReportView";
import { useLang } from "@/i18n/LanguageContext";

type AppState = "home" | "loading" | "report";

export default function Home() {
  const [state, setState] = useState<AppState>("home");
  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [report, setReport] = useState<any>(null);
  const { lang } = useLang();

  const handleAnalyze = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd: jdText, resume: resumeText, lang }),
      });
      const data = await res.json();
      setReport(data);
      setState("report");
    } catch {
      setState("home");
    }
  };

  const handleReset = () => {
    setState("home");
    setJdText("");
    setResumeText("");
    setReport(null);
  };

  return (
    <main className="min-h-screen bg-bg">
      <AnimatePresence mode="wait">
        {state === "home" && (
          <HomeView
            key="home"
            onJdUpload={setJdText}
            onResumeUpload={setResumeText}
            jdText={jdText}
            resumeText={resumeText}
            onAnalyze={handleAnalyze}
          />
        )}
        {state === "loading" && <LoadingView key="loading" />}
        {state === "report" && report && (
          <ReportView key="report" report={report} onBack={handleReset} />
        )}
      </AnimatePresence>
    </main>
  );
}

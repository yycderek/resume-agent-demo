"use client";
import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import HomeView from "@/components/HomeView";
import LoadingView from "@/components/LoadingView";
import ReportView from "@/components/ReportView";
import ChatPanel from "@/components/ChatPanel";
import { useLang } from "@/i18n/LanguageContext";

type AppState = "home" | "loading" | "report" | "chatFullscreen";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestion?: string;
}

export default function Home() {
  const [state, setState] = useState<AppState>("home");
  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [report, setReport] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const { t } = useLang();
  const reportRef = useRef<any>(null);

  const handleAnalyze = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd: jdText, resume: resumeText, lang: "en" }),
      });
      const data = await res.json();
      setReport(data);
      // Initialize chat with welcome message
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: t.chatWelcome.replace("{score}", String(data.matchScore.overall)),
        },
      ]);
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
    setMessages([]);
  };

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setIsStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
            context: { jd: jdText, resume: resumeText, report },
            lang: "en",
          }),
        });

        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content,
          suggestion: data.suggestion,
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (data.suggestion) {
          reportRef.current = data.suggestion;
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
      }
      setIsStreaming(false);
    },
    [messages, jdText, resumeText, report]
  );

  const handleApplySuggestion = useCallback((content: string) => {
    // Update optimized resume in report
    if (report) {
      const updated = {
        ...report,
        optimizedResume: {
          ...report.optimizedResume,
          sections: report.optimizedResume.sections.map((s: any, i: number) =>
            i === 0
              ? { ...s, items: [...s.items, content] }
              : s
          ),
        },
      };
      setReport(updated);
    }
  }, [report]);

  const handleQuickAction = useCallback((action: string) => {
    handleSendMessage(action);
  }, [handleSendMessage]);

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
          <div key="report" className="flex h-screen">
            {/* Report: 60% */}
            <div className="w-[60%] overflow-y-auto border-r border-text-secondary/10 hidden md:block">
              <ReportView
                report={report}
                onBack={handleReset}
                onAskAI={handleSendMessage}
                onRewrite={handleSendMessage}
              />
            </div>
            {/* Report: full width on mobile when no chat focus */}
            <div className="w-full md:hidden overflow-y-auto">
              <ReportView
                report={report}
                onBack={handleReset}
                onAskAI={handleSendMessage}
                onRewrite={handleSendMessage}
              />
            </div>
            {/* Chat: 40% desktop, hidden on mobile until chat opened */}
            <div className="hidden md:flex w-[40%] flex-col bg-white">
              <ChatPanel
                messages={messages}
                isStreaming={isStreaming}
                onSend={handleSendMessage}
                onApply={handleApplySuggestion}
                onQuickAction={handleQuickAction}
                onToggleFullscreen={() => setState("chatFullscreen")}
                matchScore={report.matchScore.overall}
                gapCount={report.gaps.length}
              />
            </div>
          </div>
        )}
        {state === "chatFullscreen" && report && (
          <div key="chatFullscreen" className="flex h-screen">
            {/* Slim sidebar with match score */}
            <div className="w-[60px] bg-bg border-r border-text-secondary/10 flex flex-col items-center py-4 gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {report.matchScore.overall}%
              </div>
              <div className="text-[10px] text-text-secondary text-center">
                {report.gaps.length} gaps
              </div>
              <button
                onClick={() => setState("report")}
                className="mt-auto text-xs text-primary hover:underline"
              >
                ←
              </button>
            </div>
            {/* Chat full width */}
            <div className="flex-1 flex flex-col bg-white">
              <ChatPanel
                messages={messages}
                isStreaming={isStreaming}
                onSend={handleSendMessage}
                onApply={handleApplySuggestion}
                onQuickAction={handleQuickAction}
                onToggleFullscreen={() => setState("report")}
                matchScore={report.matchScore.overall}
                gapCount={report.gaps.length}
                isFullscreen
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

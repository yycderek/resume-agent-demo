"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestion?: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  onSend: (text: string) => void;
  onApply: (content: string) => void;
  onQuickAction: (action: string) => void;
  onToggleFullscreen: () => void;
  matchScore: number;
  gapCount: number;
  isFullscreen?: boolean;
}

export default function ChatPanel({
  messages,
  isStreaming,
  onSend,
  onApply,
  onQuickAction,
  onToggleFullscreen,
  isFullscreen,
}: ChatPanelProps) {
  const { t } = useLang();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim() || isStreaming) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const quickActions = [t.quickPolish, t.quickKeywords, t.quickProject, t.quickEnglish];

  return (
    <>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-text-secondary/10 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-text text-sm">{t.chatTitle}</h3>
          <p className="text-text-secondary text-xs">{t.chatSubtitle}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onToggleFullscreen()}
            className="px-2 py-1 text-xs text-text-secondary hover:text-text rounded hover:bg-text-secondary/5 transition-colors"
          >
            {isFullscreen ? t.backToReport : "⛶"}
          </button>
          <button
            onClick={() => {
              onQuickAction("");
            }}
            className="px-2 py-1 text-xs text-text-secondary hover:text-text rounded hover:bg-text-secondary/5 transition-colors"
          >
            {t.clearChat}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 mr-2 mt-1">
                  <span className="text-lg">🤖</span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-[#EFF6FF] text-[#2563EB] rounded-br-md"
                    : "bg-white border border-text-secondary/10 text-text rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {/* Inline suggestion card */}
                {msg.suggestion && (
                  <div className="mt-3 p-3 rounded-xl bg-success/5 border border-success/20">
                    <p className="text-xs font-medium text-success mb-1">{t.chatSuggestRewrite}</p>
                    <p className="text-xs text-text whitespace-pre-wrap mb-3">{msg.suggestion}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onApply(msg.suggestion!);
                        }}
                        className="px-3 py-1 text-xs bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
                      >
                        {t.applyToResume}
                      </button>
                      <button
                        onClick={() => {
                          onSend("Can you rewrite that differently?");
                        }}
                        className="px-3 py-1 text-xs border border-text-secondary/20 text-text-secondary rounded-lg hover:bg-text-secondary/5 transition-colors"
                      >
                        {t.rewriteAgain}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex-shrink-0 ml-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-bold">
                    U
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isStreaming && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start items-center gap-2 pl-8"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/40"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-text-secondary/10 px-4 py-3">
        {/* Quick action chips */}
        <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => onQuickAction(action)}
              className="whitespace-nowrap px-3 py-1 text-xs rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chatPlaceholder}
            rows={1}
            className="flex-1 p-3 text-sm border border-text-secondary/20 rounded-xl resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-bg text-text"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isStreaming}
            className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-lg">✈</span>
          </button>
        </div>
      </div>
    </>
  );
}

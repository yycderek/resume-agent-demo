"use client";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";

function LanguageToggle() {
  const { lang, t, toggleLang } = useLang();
  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs font-medium rounded-full border border-text-secondary/30 bg-white/80 backdrop-blur-sm text-text-secondary hover:text-text hover:border-text-secondary/50 transition-colors shadow-sm"
    >
      {t.langToggle}
    </button>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageToggle />
      {children}
    </LanguageProvider>
  );
}

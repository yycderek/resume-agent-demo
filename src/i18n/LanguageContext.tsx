"use client";
import { createContext, useContext, useState, useMemo, ReactNode, useCallback } from "react";
import { translations } from "./translations";

type Lang = "en" | "zh";

interface LangContextType {
  lang: Lang;
  t: typeof translations.en;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({} as LangContextType);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = useCallback(() => setLang((p) => (p === "en" ? "zh" : "en")), []);
  const value = useMemo(
    () => ({ lang, t: translations[lang] as typeof translations.en, toggleLang }),
    [lang, toggleLang]
  );
  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

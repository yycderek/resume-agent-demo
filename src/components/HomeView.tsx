"use client";
import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import type { Translations } from "@/i18n/translations";

interface HomeViewProps {
  onJdUpload: (text: string) => void;
  onResumeUpload: (text: string) => void;
  jdText: string;
  resumeText: string;
  onAnalyze: () => void;
}

function UploadZone({
  label,
  subtitle,
  acceptHint,
  acceptedFormats,
  fileText,
  onUpload,
  bgColor,
  icon,
  t,
  isJD,
}: {
  label: string;
  subtitle: string;
  acceptHint: string;
  acceptedFormats: string[];
  fileText: string;
  onUpload: (text: string) => void;
  bgColor: string;
  icon: string;
  t: Translations;
  isJD: boolean;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcess = useCallback(
    (file: File) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!acceptedFormats.includes(ext)) {
        setError(`${t.invalidFormat} ${acceptedFormats.join(" / ")}`);
        setTimeout(() => setError(""), 3000);
        return;
      }
      setError("");
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onUpload(text);
      };
      reader.readAsText(file);
    },
    [acceptedFormats, onUpload, t]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndProcess(file);
    },
    [validateAndProcess]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndProcess(file);
    },
    [validateAndProcess]
  );

  const handlePasteConfirm = () => {
    if (pasteText.trim()) {
      onUpload(pasteText.trim());
      setFileName(t.manualPasteText);
      setFileSize(`${pasteText.length} ${t.chars}`);
      setShowPaste(false);
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <div>
          <h3 className="font-semibold text-text text-base">{label}</h3>
          <p className="text-text-secondary text-xs">{subtitle}</p>
        </div>
      </div>

      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
          ${isDragOver ? "border-primary bg-primary/5" : "border-text-secondary/30 hover:border-primary/50 hover:shadow-md"}
          ${fileText ? "border-success/50 bg-success/5" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFormats.join(",")}
          onChange={handleFileChange}
        />

        {fileText ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl text-success">✓</span>
            <p className="font-medium text-text text-sm">{fileName}</p>
            <p className="text-text-secondary text-xs">{fileSize}</p>
            <p className="text-text-secondary text-xs mt-1 truncate max-w-full">
              {t.preview} {fileText.slice(0, 50)}...
            </p>
            <button
              className="mt-2 text-xs text-primary-light hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onUpload("");
                setFileName("");
                setFileSize("");
              }}
            >
              {t.reupload}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">📁</span>
            <p className="text-text-secondary text-sm">{acceptHint}</p>
          </div>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-danger text-xs mt-2"
        >
          {error}
        </motion.p>
      )}

      {!fileText && (
        <div className="mt-3">
          {!showPaste ? (
            <button
              className="text-primary-light text-xs hover:underline"
              onClick={() => setShowPaste(true)}
            >
              {isJD ? t.pasteJD : t.pasteResume}
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col gap-2"
            >
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={t.pastePlaceholder}
                className="w-full h-24 p-3 border border-text-secondary/30 rounded-lg text-sm resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white text-text"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
                  onClick={handlePasteConfirm}
                >
                  {t.confirm}
                </button>
                <button
                  className="px-3 py-1 text-xs text-text-secondary hover:text-text transition-colors"
                  onClick={() => setShowPaste(false)}
                >
                  {t.cancel}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function HomeView({ onJdUpload, onResumeUpload, jdText, resumeText, onAnalyze }: HomeViewProps) {
  const { t } = useLang();
  const bothReady = jdText.length > 0 && resumeText.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-text mb-2"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            {t.heroSubtitle}
          </motion.p>
        </div>

        {/* Upload Cards */}
        <div className="flex gap-6 flex-col md:flex-row mb-8">
          <UploadZone
            label={t.uploadJD}
            subtitle={t.uploadJDSub}
            acceptHint={t.jdDropHint}
            acceptedFormats={[".pdf", ".docx", ".txt"]}
            fileText={jdText}
            onUpload={onJdUpload}
            bgColor="bg-blue-50"
            icon="📋"
            t={t}
            isJD={true}
          />
          <UploadZone
            label={t.uploadResume}
            subtitle={t.uploadResumeSub}
            acceptHint={t.resumeDropHint}
            acceptedFormats={[".pdf", ".docx"]}
            fileText={resumeText}
            onUpload={onResumeUpload}
            bgColor="bg-emerald-50"
            icon="📄"
            t={t}
            isJD={false}
          />
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={bothReady ? onAnalyze : undefined}
          disabled={!bothReady}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300
            ${
              bothReady
                ? "bg-primary text-white cursor-pointer shadow-lg shadow-primary/30 animate-pulse hover:bg-primary-light"
                : "bg-text-secondary/20 text-text-secondary/50 cursor-not-allowed"
            }`}
          whileHover={bothReady ? { scale: 1.02 } : {}}
          whileTap={bothReady ? { scale: 0.98 } : {}}
        >
          {bothReady ? t.readyAnalyze : t.startAnalyze}
        </motion.button>

        {/* Footer Steps */}
        <div className="flex items-center justify-center gap-4 mt-8 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
            {t.step1}
          </span>
          <span className="text-text-secondary/40">→</span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-text-secondary/30 text-text flex items-center justify-center text-[10px]">2</span>
            {t.step2}
          </span>
          <span className="text-text-secondary/40">→</span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-text-secondary/30 text-text flex items-center justify-center text-[10px]">3</span>
            {t.step3}
          </span>
        </div>

        {/* Demo badge */}
        <p className="text-center text-text-secondary/40 text-[10px] mt-6">
          {t.demoBadge}
        </p>
      </div>
    </motion.div>
  );
}

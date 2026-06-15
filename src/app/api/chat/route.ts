import { NextResponse } from "next/server";

// ── Mock response bank (used when no API key configured) ──
const MOCK_RESPONSES: Record<string, { content: string; suggestion?: string }> = {
  polish: {
    content:
      "Here's a polished version of your work experience with quantified metrics and stronger action verbs. I focused on adding measurable outcomes and aligning keywords with the JD requirements.",
    suggestion:
      "【某科技有限公司】Senior Java Developer (2022.06 - Present)\n" +
      "• Led architecture optimization of internal management system, reducing API response time from 800ms to 120ms, P99 latency from 2.1s to 350ms\n" +
      "• Architected Redis Cluster-based distributed caching solution achieving 95%+ hit rate, reducing database load by 60% at 5M+ daily reads\n" +
      "• Refactored order domain using DDD principles, implementing CQRS read-write separation, raising system availability to 99.95%",
  },
  keyword: {
    content:
      "Here are JD-aligned keywords to add to your resume. I've identified the top matches based on frequency and importance in the job description.",
    suggestion:
      "Technical Keywords to Add:\n" +
      "• High-concurrency systems, Distributed architecture, Performance tuning\n" +
      "• Redis Cluster, Kafka, Docker/K8s, CI/CD pipeline\n" +
      "• DDD (Domain-Driven Design), CQRS, Event-driven architecture\n" +
      "• System design, Technical leadership, Cross-team collaboration",
  },
  project: {
    content:
      "I've rewritten your project descriptions using the STAR method (Situation, Task, Action, Result). Each bullet now clearly shows your impact.",
    suggestion:
      "【Enterprise OA System - Backend Lead | Spring Boot + MySQL + Redis + Docker】\n" +
      "• Situation: 2000+ employee org using legacy approval system with 2-day average turnaround\n" +
      "• Task: Modernize workflow engine while maintaining zero-downtime migration\n" +
      "• Action: Designed modular service-oriented architecture, introduced Redis caching for hot rules\n" +
      "• Result: Reduced approval time from 2 days to 4 hours (92% improvement), handled 300+ daily approvals",
  },
  english: {
    content:
      "Here's the English version of your optimized resume. I've adapted it for international job applications while preserving all quantified achievements.",
    suggestion:
      "ZHANG SAN\n" +
      "Senior Java Developer | M.S. Computer Science | 3+ Years Experience\n\n" +
      "WORK EXPERIENCE\n" +
      "[Tech Company] Java Developer (2022.06 - Present)\n" +
      "• Led architecture optimization reducing API latency from 800ms to 120ms (85% improvement)\n" +
      "• Built Redis Cluster distributed cache with 95%+ hit rate, serving 5M+ daily reads\n" +
      "• Refactored order system using DDD/CQRS, achieving 99.95% availability",
  },
  gap: {
    content:
      "Great question! Let me help you address this gap. The key is to reframe your existing experience to demonstrate the relevant competency. Even if your system handled 1000 requests/day, you can demonstrate understanding by describing your architecture decisions with scale in mind.",
    suggestion:
      "• Reframe: 'Designed system with horizontal scalability in mind, using stateless services and Redis caching to support future growth'\n" +
      "• Add: 'Conducted load testing with JMeter, identified and resolved 3 performance bottlenecks'\n" +
      "• Quantify: 'Optimized database queries reducing average response time by 65%, preparing system for 10x traffic growth'",
  },
};

function getMockResponse(lastMsg: string) {
  const msg = lastMsg.toLowerCase();
  if (msg.includes("polish") || msg.includes("润色") || msg.includes("work experience")) return MOCK_RESPONSES.polish;
  if (msg.includes("keyword") || msg.includes("关键词")) return MOCK_RESPONSES.keyword;
  if (msg.includes("project") || msg.includes("项目") || msg.includes("rewrite")) return MOCK_RESPONSES.project;
  if (msg.includes("english") || msg.includes("英文")) return MOCK_RESPONSES.english;
  if (msg.includes("gap") || msg.includes("差距") || msg.includes("缺少") || msg.includes("弥补")) return MOCK_RESPONSES.gap;
  return {
    content:
      "I understand you'd like to improve your resume. Based on your JD match analysis, here are the top areas we should work on:\n\n" +
      "1. Your match score shows room for improvement in **Project Experience** — let's quantify your impact\n" +
      "2. **Skill matching** can be boosted by adding middleware depth (Redis/Kafka specifics)\n" +
      "3. Your education background is a strong point — let's feature it prominently\n\n" +
      "What would you like to tackle first?",
  };
}

// ── Real LLM call ──
async function callLLM(
  messages: { role: string; content: string }[],
  context: { jd: string; resume: string; report: any }
) {
  const baseUrl = process.env.AI_API_BASE_URL || "";
  const apiKey = process.env.AI_API_KEY || "";
  const model = process.env.AI_MODEL || "deepseek-chat";
  const systemPrompt = process.env.AI_SYSTEM_PROMPT || "You are a resume optimization assistant.";

  const systemMsg = {
    role: "system",
    content: `${systemPrompt}\n\nContext:\n- JD: ${context.jd}\n- Resume: ${context.resume}\n- Match Score: ${context.report?.matchScore?.overall || "N/A"}%\n- Gaps: ${JSON.stringify(context.report?.gaps?.map((g: any) => g.description) || [])}\n\nWhen you suggest a rewrite, format it as a separate "SUGGESTION:" block at the end of your response so it can be extracted.`,
  };

  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [systemMsg, ...messages],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  const fullContent = json.choices?.[0]?.message?.content || "";

  // Parse suggestion block: look for "SUGGESTION:" marker
  let content = fullContent;
  let suggestion: string | undefined;

  const sugIdx = fullContent.indexOf("SUGGESTION:");
  if (sugIdx > -1) {
    content = fullContent.substring(0, sugIdx).trim();
    suggestion = fullContent.substring(sugIdx + "SUGGESTION:".length).trim();
  }

  return { content, suggestion };
}

// ── API Route ──
export async function POST(request: Request) {
  const { messages, context, lang } = await request.json();

  const apiKey = process.env.AI_API_KEY || "";

  // Use real LLM if configured, otherwise mock
  if (apiKey && apiKey !== "sk-your-api-key-here") {
    try {
      const response = await callLLM(messages, context);
      return NextResponse.json(response);
    } catch (err: any) {
      console.error("LLM call failed, falling back to mock:", err.message);
    }
  }

  // Fallback: mock response
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const lastMsg = messages[messages.length - 1]?.content || "";
  return NextResponse.json(getMockResponse(lastMsg));
}

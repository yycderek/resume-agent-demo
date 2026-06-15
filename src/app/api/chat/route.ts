import { NextResponse } from "next/server";

const RESPONSES: Record<string, { content: string; suggestion?: string }> = {
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

export async function POST(request: Request) {
  const { messages, context, lang } = await request.json();

  // Simulate AI response delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lastMsg = (messages[messages.length - 1]?.content || "").toLowerCase();

  let response: { content: string; suggestion?: string };

  if (lastMsg.includes("polish") || lastMsg.includes("润色") || lastMsg.includes("work experience")) {
    response = RESPONSES.polish;
  } else if (lastMsg.includes("keyword") || lastMsg.includes("关键词")) {
    response = RESPONSES.keyword;
  } else if (lastMsg.includes("project") || lastMsg.includes("项目") || lastMsg.includes("rewrite")) {
    response = RESPONSES.project;
  } else if (lastMsg.includes("english") || lastMsg.includes("英文")) {
    response = RESPONSES.english;
  } else if (lastMsg.includes("gap") || lastMsg.includes("差距") || lastMsg.includes("缺少") || lastMsg.includes("弥补")) {
    response = RESPONSES.gap;
  } else {
    response = {
      content:
        "I understand you'd like to improve your resume. Based on your JD match analysis, here are the top areas we should work on:\n\n" +
        "1. Your match score shows room for improvement in **Project Experience** — let's quantify your impact\n" +
        "2. **Skill matching** can be boosted by adding middleware depth (Redis/Kafka specifics)\n" +
        "3. Your education background is a strong point — let's feature it prominently\n\n" +
        "What would you like to tackle first?",
    };
  }

  return NextResponse.json(response);
}

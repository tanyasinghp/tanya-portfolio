"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import ProfileImage from "./ProfileImage";
import SocialLinks from "./SocialLinks";
import type { SocialLink } from "./SocialLinks";

interface AboutSectionProps {
  socialLinks: SocialLink[];
}

/** Placeholder content — replace with your own copy later. */
const EXPANDED_PLACEHOLDER = {
  background: [
    "I studied AI & ML during my undergrad and now an M.Tech in Software Engineering. Over time, I’ve worked on enterprise-scale GenAI projects, LLM evaluation pipelines, RAG systems, and backend APIs.",
    "Before diving deep into AI, I built full-stack applications, microservices, and internal tools used by thousands. I enjoy the mix of research curiosity and production pragmatism, breaking problems down, running experiments, and building systems end-to-end to truly understand their underlying architecture",
  ],
  currently: [
    "Working across LLMs, RAG pipelines, evaluation frameworks, and agentic workflows, including experiments on large and complex datasets to study how retrieval, reasoning, and orchestration behave at scale.",
    "Designing and refining AI system architectures that combine tools, memory, retrieval components, and multi-step agentic reasoning into reliable end-to-end workflows.",
    "Building and maintaining backend services, APIs, automation layers, and full-stack features that support scalable experimentation, data processing, and GenAI-driven applications.",
  ],
  outsidetheJD:
    "I enjoy creating spaces where people can connect and grow. In college, I led an AI club and organised events with 1000+ attendees in collaboration with major industry partners, and at SAP Labs I’ve contributed to and led company wide early-talent engagement initiatives, from internal sporting festivals to knowledge-sharing sessions and cohort engagement meetups, keeping the energy up!",
};

export default function AboutSection({ socialLinks }: AboutSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionCard>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div className="flex-1 text-left min-w-0">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F5F5F7] tracking-tight">
            Tanya Singh
          </h1>
          <p className="text-[#C78BFF] mt-1 sm:mt-2 tracking-wide text-base sm:text-lg">
            AI ML & Data Science Engineer • Full Stack Developer
          </p>
          <SocialLinks links={socialLinks} />
          <p className="text-[#CFCFCF] mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed max-w-xl">
            I work at the intersection of AI ML research and engineering. My focus is on making generative models reliable and deployable, from training 
            and evaluation to production systems. 
          </p>
            {/* When I&apos;m not coding or reading papers, you&apos;ll find me outdoors or with a book. */}

          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="
              inline-block mt-4 sm:mt-6 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium
              border border-[#2A2A2D] bg-[#1A1A1E] text-[#CFCFCF]
              hover:border-[#C78BFF]/40 hover:text-[#C78BFF] hover:shadow-[0_0_20px_rgba(199,139,255,0.1)]
              transition-all duration-200 cursor-pointer
            "
          >
            {expanded ? "Show less" : "More About Me"}
          </button>

          {/* Expandable content — smooth open/close */}
          <div
            className={`
              grid transition-[grid-template-rows] duration-300 ease-in-out
              ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
            `}
            aria-hidden={!expanded}
          >
            <div className="overflow-hidden">
              <div className="pt-6 sm:pt-8 mt-2 border-t border-[#2A2A2D] space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#C78BFF] tracking-wide uppercase mb-2">
                    Background
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base text-[#CFCFCF] leading-relaxed">
                    {EXPANDED_PLACEHOLDER.background.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C78BFF] tracking-wide uppercase mb-2">
                    Currently
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-[#CFCFCF] leading-relaxed">
                    {EXPANDED_PLACEHOLDER.currently.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C78BFF] tracking-wide uppercase mb-2">
                    Outside the JD
                  </h3>
                  <p className="text-sm sm:text-base text-[#CFCFCF] leading-relaxed">
                    {EXPANDED_PLACEHOLDER.outsidetheJD}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end shrink-0">
          <ProfileImage />
        </div>
      </div>
    </SectionCard>
  );
}

"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "Home", targets: [] as const },
  { id: "about", label: "About", targets: ["about"] as const },
  { id: "work", label: "Work", targets: ["work"] as const },
  { id: "skills", label: "Skills", targets: ["skills"] as const },
  { id: "blogs", label: "Blogs", targets: ["blogs"] as const },
  // OOO covers both "Experience Beyond Tech" and "When I'm OOO"
  { id: "ooo", label: "OOO", targets: ["work-outside", "ooo"] as const },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

const TARGET_IDS = ["about", "work", "skills", "blogs", "work-outside", "ooo"] as const;
type TargetId = (typeof TARGET_IDS)[number];

const TARGET_TO_NAV: Record<TargetId, NavId> = {
  about: "about",
  work: "work",
  skills: "skills",
  blogs: "blogs",
  "work-outside": "ooo",
  ooo: "ooo",
};

function NavIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Home: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    About: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    Work: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    Skills: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    Blogs: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    OOO: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    // Menu: (
    //   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    //   </svg>
    // ),
  };
  return <span className="shrink-0">{icons[name] ?? null}</span>;
}

export default function Navbar() {
  const [activeId, setActiveId] = useState<NavId>("hero");

  useEffect(() => {
    const targets: { id: TargetId; el: HTMLElement }[] = [];
    for (const tid of TARGET_IDS) {
      const el = document.getElementById(tid);
      if (el) targets.push({ id: tid, el });
    }

    if (targets.length === 0) return;

    let rafId: number | null = null;

    const updateActive = () => {
      rafId = null;

      // Top of page → Home
      if (window.scrollY < 24) {
        setActiveId("hero");
        return;
      }

      const vh = Math.max(1, window.innerHeight);
      let best: { id: TargetId; score: number } | null = null;

      for (const t of targets) {
        const rect = t.el.getBoundingClientRect();
        const visiblePx = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        const denom = Math.max(1, Math.min(vh, rect.height));
        const score = visiblePx / denom;

        if (!best || score > best.score) best = { id: t.id, score };
      }

      // If nothing is meaningfully visible, don't thrash state.
      if (best && best.score > 0.12) setActiveId(TARGET_TO_NAV[best.id]);
    };

    const scheduleUpdate = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (id: NavId) => {
    if (id === "hero") {
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Regular items scroll to their section.
    if (id !== "ooo") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // OOO toggles between "Experience Beyond Tech" and "When I'm OOO".
    const workOutside = document.getElementById("work-outside");
    const ooo = document.getElementById("ooo");
    if (!workOutside && !ooo) return;

    if (workOutside && ooo) {
      const wo = workOutside.getBoundingClientRect();
      const anchorY = window.innerHeight * 0.25;
      const inWorkOutside = wo.top <= anchorY && wo.bottom >= anchorY;
      (inWorkOutside ? ooo : workOutside).scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    (workOutside ?? ooo)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="
        fixed left-0 right-0 bottom-0 z-50
        px-3 py-3 sm:px-4 sm:py-3
        pb-[max(0.75rem,env(safe-area-inset-bottom))]
        flex justify-center
      "
    >
      <div
        className="
          w-full max-w-none sm:max-w-[640px]
          rounded-full
          bg-[#131316]/95 backdrop-blur-xl
          border border-[#2A2A2D]
          shadow-[0_0_30px_rgba(199,139,255,0.06)]
          py-2.5 px-2 sm:px-4
          overflow-x-auto overflow-y-hidden
          flex items-center gap-1 sm:gap-2
          justify-between
          scrollbar-hide nav-touch-scroll
        "
      >
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              type="button"
              className={`
                flex items-center gap-1.5 px-3 py-2.5 sm:px-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 justify-center shrink-0
                transition-all duration-200
                ${isActive
                  ? "text-[#C78BFF] bg-[#C78BFF]/10 shadow-[0_0_12px_rgba(199,139,255,0.15)]"
                  : "text-[#CFCFCF] hover:text-[#C78BFF] hover:bg-[#C78BFF]/5 active:bg-[#C78BFF]/10"
                }
              `}
            >
              <NavIcon name={label} />
              <span className="hidden sm:inline whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
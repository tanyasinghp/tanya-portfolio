"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "blogs", label: "Blog" },
  { id: "ooo", label: "OOO" },
  // { id: "menu", label: "Menu" },
] as const;

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
    Blog: (
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
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => ({ id, el: document.getElementById(id) })).filter(
      (s): s is { id: (typeof NAV_ITEMS)[number]["id"]; el: HTMLElement } => !!s.el
    );
    if (sections.length === 0) return;

    const onScroll = () => {
      const scrollY = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const top = sections[i].el.getBoundingClientRect().top + window.scrollY;
        if (scrollY >= top) {
          setActiveId(sections[i].id);
          return;
        }
      }
      setActiveId("hero");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // if (id === "menu") return; // placeholder
    // const el = document.getElementById(id);
    // el?.scrollIntoView({ behavior: "smooth" });
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
          w-full max-w-[640px]
          rounded-full
          bg-[#131316]/95 backdrop-blur-xl
          border border-[#2A2A2D]
          shadow-[0_0_30px_rgba(199,139,255,0.06)]
          py-2.5 px-2 sm:px-4
          overflow-x-auto overflow-y-hidden
          flex items-center gap-1 sm:gap-2
          justify-start sm:justify-center
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

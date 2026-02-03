"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ children, className = "" }: SectionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        bg-[#131316] rounded-2xl sm:rounded-3xl border border-[#2A2A2D]
        shadow-[0_0_25px_rgba(199,139,255,0.08)]
        px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

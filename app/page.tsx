"use client";

import { useState, useEffect } from "react";
import ScrambleText from "../components/ScrambleText";
import HomePage from "../components/HomePage";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Intro() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  useEffect(() => {
    if (!hideIntro) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // re-enable scroll
    }
  }, [hideIntro]);

  return (
    <div className={`w-full h-screen bg-[#0D0D0F] ${!hideIntro ? "overflow-hidden" : "overflow-x-hidden"}`}>
      {/* INTRO — ScrambleText first, then homepage (game is NOT part of intro flow) */}
      {!hideIntro && (
        <div
          className={`
            flex flex-col items-center justify-center
            h-screen w-full text-center
            px-4 sm:px-6 md:px-8
            transition-opacity duration-[1200ms]
            -translate-y-4 sm:-translate-y-6
            overflow-hidden touch-none  /* prevents scrolling */
            ${showHome ? "opacity-0" : "opacity-100"}
          `}
        >
          <h1
            className={`${spaceGrotesk.className}
              font-medium text-[#F5F5F7]
              text-[34px] sm:text-[56px] md:text-[84px] lg:text-[120px] xl:text-[170px]
              tracking-[0.05em] sm:tracking-[0.08em] md:tracking-widest
              leading-tight
            `}
          >
            <ScrambleText
              text="TANYA SINGH"
              delay={40}
              onHalfway={() => setShowSubtitle(true)}
              onComplete={() => {
                setTimeout(() => {
                  setShowHome(true);
                  setTimeout(() => setHideIntro(true), 1200);
                }, 1800);
              }}
            />
          </h1>

          <p
            className={`
              mt-3 sm:mt-4 w-full
              // text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
              text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.95rem]
              whitespace-nowrap
              tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.35em]
              text-[#C78BFF] uppercase text-center leading-snug
              transition-opacity duration-700
              ${showSubtitle ? "opacity-100" : "opacity-0"}
            `}
          >
            AI ML Engineer | Data Science | BUILDING GENERATIVE AI & FULL STACK SOLUTIONS AT SCALE
          </p>
        </div>
      )}

      {/* HOMEPAGE */}
      <div
        className={`
          transition-opacity duration-[1300ms]
          ${showHome ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* ⭐ IMPORTANT: NO FLEX ON HOMEPAGE WRAPPER */}
        <HomePage />
      </div>
    </div>
  );
}

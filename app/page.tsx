"use client";

import { useState } from "react";
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

  return (
    <div className="w-full min-h-screen min-h-[100dvh] bg-[#0D0D0F] overflow-x-hidden">
      {/* INTRO — ScrambleText first, then homepage (game is NOT part of intro flow) */}
      {!hideIntro && (
        <div
          className={`
            flex flex-col items-center justify-center
            min-h-screen min-h-[100dvh] w-full text-center
            px-4 sm:px-6 md:px-8
            transition-opacity duration-[1200ms]
            ${showHome ? "opacity-0" : "opacity-100"}
          `}
        >
          <h1
            className={`${spaceGrotesk.className}
              font-medium text-[#F5F5F7]
              text-[40px] sm:text-[64px] md:text-[96px] lg:text-[140px] xl:text-[200px]
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
              mt-3 sm:mt-4 max-w-[90vw] sm:max-w-md
              text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
              tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.35em]
              text-[#C78BFF] uppercase text-center leading-snug
              transition-opacity duration-700
              ${showSubtitle ? "opacity-100" : "opacity-0"}
            `}
          >
            AI ML & Data Science Engineer | BUILDING GENERATIVE AI & FULL STACK SOLUTIONS AT SCALE
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

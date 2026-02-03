"use client";
import React, { useEffect, useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

interface Props {
  text: string;
  delay?: number;
  onHalfway?: () => void;    // fires when half text is resolved
  onComplete?: () => void;   // fires when animation finishes
}

export default function ScrambleText({ text, delay = 50, onHalfway, onComplete }: Props) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let frame = 0;
    const halfwayIndex = Math.floor(text.length / 2);
    let halfwayCalled = false;
    let completedCalled = false;

    const interval = setInterval(() => {
      frame++;

      const updated = text
        .split("")
        .map((char, index) => {
          if (index < frame / 3) return char; // letter resolved
          if (char === " ") return " ";       // preserve spaces
          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join("");

      setOutput(updated);

      // FIRE HALFWAY CALLBACK ONCE
      if (!halfwayCalled && frame / 3 >= halfwayIndex) {
        halfwayCalled = true;
        if (onHalfway) onHalfway();
      }

      // FIRE COMPLETE CALLBACK WHEN DONE
      if (!completedCalled && frame / 3 >= text.length) {
        completedCalled = true;
        clearInterval(interval);
        if (onComplete) onComplete();
      }

    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, onHalfway, onComplete]);

  return (
    <span className="tracking-[0.1em] font-medium text-[#F5F5F7]">
      {output}
    </span>
  );
}



// import { Oxanium } from "next/font/google";
// const oxanium = Oxanium({ subsets: ["latin"], weight: ["200","300","400","500","600","700"] });
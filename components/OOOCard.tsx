"use client";

import { useState } from "react";

interface OOOCardProps {
  title: string;
  icon: string;
}

export default function OOOCard({ title, icon }: OOOCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TILE */}
      <div
        onClick={() => setOpen(true)}
        className="
          cursor-pointer
          bg-[#1A1A1E] border border-[#2A2A2D]
          rounded-lg p-1.5 sm:p-2
          flex flex-col items-center justify-center text-center
          hover:border-[#C78BFF]/40 transition
          min-w-[60px]
        "
      >
        <div className="text-lg sm:text-xl mb-1">{icon}</div>

        <p className="text-[11px] sm:text-[12px] text-[#F5F5F7] font-medium leading-tight">
          {title}
        </p>
      </div>

      {/* MODAL */}
      {/*
{open && (
  <div
    className="
      fixed inset-0 z-[80] flex items-center justify-center
      bg-black/55 backdrop-blur-sm
    "
    onClick={() => setOpen(false)}
  >
    <div
      className="
        max-w-md w-[90%] sm:w-[420px]
        bg-[#131316] rounded-2xl border border-[#2A2A2D]
        shadow-[0_0_30px_rgba(199,139,255,0.18)]
        p-5 sm:p-6
      "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1A1A1E] border border-[#2A2A2D] flex items-center justify-center text-lg">
            {icon}
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-[#F5F5F7]">
            {title}
          </h3>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="
            w-8 h-8 rounded-xl bg-[#1A1A1E] border border-[#2A2A2D]
            text-[#CFCFCF] hover:text-[#C78BFF] hover:border-[#C78BFF]/40
            flex items-center justify-center text-sm
          "
        >
          ✕
        </button>
      </div>

      <div className="mt-4 text-xs sm:text-sm text-[#CFCFCF] leading-relaxed space-y-3">
        <p className="text-[#C78BFF]">
          More about <span className="font-semibold">{title}</span> will appear here.  
          You can later add stories, achievements, photos, or anything you want to highlight.
        </p>
      </div>
    </div>
  </div>
)}
*/}
    </>
  );
}

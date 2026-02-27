"use client";

import { useState } from "react";

interface OutsideRole {
  description: string;
}

interface OWorkCardProps {
  icon: string;      // emoji or icon
  heading: string;   // e.g. "Dance Instructor"
  roles: OutsideRole[];
  details: string;
}

export default function OWorkCard({ icon, heading, roles, details }: OWorkCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        w-full min-w-[260px] bg-[#1A1A1E] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6
        border border-[#2A2A2D]
        shadow-[0_0_20px_rgba(199,139,255,0.05)]
        hover:shadow-[0_0_25px_rgba(199,139,255,0.1)]
        transition-all duration-300
      "
    >
      <div className="flex gap-3 sm:gap-4 min-w-0">
        
        {/* Emoji / Icon */}
        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl 
                        bg-[#131316] border border-[#2A2A2D] 
                        flex items-center justify-center 
                        text-xl sm:text-2xl">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          
          {/* Heading */}
          <h3 className="text-base sm:text-lg font-semibold text-[#F5F5F7] break-words">
            {heading}
          </h3>

          {/* Description(s) */}
          <div className="mt-3 space-y-4">
            {roles.map((r: OutsideRole, index: number) => (
              <div key={index}>
                <p className="text-[#CFCFCF] text-xs sm:text-sm leading-relaxed break-words whitespace-pre-line">
                  {r.description}
                </p>

                {/* Divider */}
                {index < roles.length - 1 && (
                  <div className="h-px bg-[#2A2A2D] my-3" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="
                inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium
                border border-[#2A2A2D] bg-[#1A1A1E] text-[#CFCFCF]
                hover:border-[#C78BFF]/40 hover:text-[#C78BFF]
                transition-colors
              "
            >
              Know more →
            </button>
          </div>

        </div>
      </div>

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
              max-w-lg w-[90%] sm:w-[480px]
              bg-[#131316] rounded-2xl border border-[#2A2A2D]
              shadow-[0_0_30px_rgba(199,139,255,0.18)]
              p-5 sm:p-6
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1A1A1E] border border-[#2A2A2D] flex items-center justify-center text-lg">
                  {icon}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#F5F5F7]">
                  {heading}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  w-8 h-8 rounded-xl bg-[#1A1A1E] border border-[#2A2A2D]
                  text-[#CFCFCF] hover:text-[#C78BFF] hover:border-[#C78BFF]/40
                  flex items-center justify-center text-sm
                "
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#CFCFCF] leading-relaxed">
              {roles.map((r, idx) => (
                <p key={idx}>{r.description}</p>
              ))}
              <p className="mt-2 text-[#CFCFCF]">
                {details}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

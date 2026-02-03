"use client";

import Link from "next/link";

interface WorkRole {
  role: string;
  dates: string;
  description: string;
}

interface WorkCardProps {
  companyName: string;
  tag?: string;
  roles: WorkRole[];
}

export default function WorkCard({
  companyName,
  tag = "On-site",
  roles,
}: WorkCardProps) {
  const slug = companyName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  return (
    <div
      className="
        w-full min-w-0 bg-[#1A1A1E] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6
        border border-[#2A2A2D]
        shadow-[0_0_20px_rgba(199,139,255,0.05)]
        hover:shadow-[0_0_25px_rgba(199,139,255,0.1)]
        transition-all duration-300
      "
    >
      <div className="flex gap-3 sm:gap-4 min-w-0">
        {/* Icon / First Letter */}
        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#131316] border border-[#2A2A2D] flex items-center justify-center text-[#C78BFF]/60 text-base sm:text-lg font-semibold">
          {companyName.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          {/* Company + Tag */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-[#F5F5F7] break-words">
              {companyName}
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#131316] border border-[#2A2A2D] text-[#CFCFCF] shrink-0">
              {tag}
            </span>
          </div>

          {/* Roles list */}
          <div className="mt-3 space-y-4">
            {roles.map((r: WorkRole, index: number) => (
              <div key={index}>
                <p className="text-xs sm:text-sm text-[#C78BFF] font-medium">
                  {r.role}
                </p>
                <p className="text-xs sm:text-sm text-[#CFCFCF]/80 mt-1">
                  {r.dates}
                </p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <p className="text-[#CFCFCF] text-xs sm:text-sm leading-relaxed break-words whitespace-pre-line flex-1">
                    {r.description}
                  </p>
                  {/* <div className="shrink-0">
                    <Link
                      href={`/work/${slug}`}
                      className="
                        inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium
                        border border-[#2A2A2D] bg-[#1A1A1E] text-[#CFCFCF]
                        hover:border-[#C78BFF]/40 hover:text-[#C78BFF]
                        transition-colors
                      "
                    >
                      Know more →
                    </Link>
                  </div> */}
                </div>

                {/* Divider between roles (except last) */}
                {index < roles.length - 1 && (
                  <div className="h-px bg-[#2A2A2D] my-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SkillTagProps {
  label: string;
}

export default function SkillTag({ label }: SkillTagProps) {
  return (
    <span
      className="
        inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium
        bg-[#1A1A1E] border border-[#2A2A2D] text-[#C78BFF]
        hover:border-[#C78BFF]/40 hover:text-[#D4A5FF] hover:shadow-[0_0_12px_rgba(199,139,255,0.15)]
        transition-all duration-200 cursor-default
      "
    >
      {label}
    </span>
  );
}

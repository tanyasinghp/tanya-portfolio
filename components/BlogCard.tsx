interface BlogCardProps {
  title: string;
  date: string;
  readTime: string;
  /** Intro / opening lines from the actual blog post (e.g. from Medium). */
  intro: string;
  /** Full URL to the blog post (e.g. Medium link). */
  href: string;
}

export default function BlogCard({
  title,
  date,
  readTime,
  intro,
  href,
}: BlogCardProps) {
  return (
    <article
      className="
        bg-[#1A1A1E] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 min-w-0
        border border-[#2A2A2D]
        shadow-[0_0_20px_rgba(199,139,255,0.05)]
        hover:shadow-[0_0_25px_rgba(199,139,255,0.12)]
        transition-all duration-300
      "
    >
      <h3 className="text-base sm:text-lg font-semibold text-[#F5F5F7] leading-tight break-words">{title}</h3>
      <p className="text-xs text-[#CFCFCF]/80 mt-2">
        {date} · {readTime}
      </p>
      <p className="text-xs sm:text-sm text-[#CFCFCF] leading-relaxed mt-3 line-clamp-3">{intro}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm font-medium text-[#C78BFF] hover:text-[#D4A5FF] transition-colors"
      >
        Read more →
      </a>
    </article>
  );
}

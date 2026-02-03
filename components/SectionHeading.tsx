interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#F5F5F7] tracking-[0.06em] sm:tracking-[0.08em] uppercase text-center mb-6 sm:mb-8 md:mb-10">
      <span className="text-[#C78BFF]">{title}</span>
    </h2>
  );
}

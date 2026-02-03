import Image from "next/image";

export default function ProfileImage() {
  return (
    <div
      className="
        shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] relative rounded-full overflow-hidden
        shadow-[0_0_30px_rgba(199,139,255,0.2)]
        border-2 border-[#2A2A2D]
        ring-2 ring-[#C78BFF]/30
      "
    >
      <Image
        src="/Image.jpeg"
        alt="Tanya Singh"
        fill
        priority
        sizes="(max-width: 768px) 120px, 140px"
        className="object-cover"
      />
    </div>
  );
}

import type { Metadata } from "next";

interface OutsideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Experience Beyond Tech | Tanya Singh",
};

function formatSlug(slug: string | undefined) {
  if (!slug) return "";
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function OutsideDetailPage({ params }: OutsideDetailPageProps) {
  const { slug } = await params;
  const name = formatSlug(slug);

  return (
    <main className="min-h-screen bg-[#0D0D0F] text-[#F5F5F7]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#131316] border border-[#2A2A2D] text-2xl shadow-[0_0_18px_rgba(199,139,255,0.25)]">
            <span role="img" aria-hidden="true">
              ✨
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7] mb-4">
          {name}
        </h1>

        <p className="text-sm sm:text-base text-[#CFCFCF] leading-relaxed">
          Detailed content about <span className="text-[#C78BFF]">{name}</span> will appear here.
          Use this space to talk about non-tech experiences, teaching, coaching, certifications, or
          anything that adds color to your profile. You can later replace this with richer content
          or even redirect to an external link.
        </p>
      </div>
    </main>
  );
}


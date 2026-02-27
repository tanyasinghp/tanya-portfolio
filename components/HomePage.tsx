"use client";

import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import SectionHeading from "./SectionHeading";
import AboutSection from "./AboutSection";
import WorkCard from "./WorkCard";
import OWorkCard from "./OWorkCard";
// import Link from "next/link";
import SkillTag from "./SkillTag";
import BlogCard from "./BlogCard";
import OOOCard from "./OOOCard";
import GameIntro from "./GameIntro";
import Navbar from "./Navbar";

/** Edit these URLs with your real profiles. Use mailto: for email. */
const SOCIAL_LINKS = [
  { type: "linkedin" as const, href: "https://www.linkedin.com/in/taanyyasingh/", label: "LinkedIn" },
  { type: "github" as const, href: "https://github.com/tanyasinghp", label: "GitHub" },
  { type: "email" as const, href: "mailto:taanyasinghp2001@gmail.com", label: "Email" },
  { type: "medium" as const, href: "https://medium.com/@taanyasingh2001/", label: "Medium" },
  { type: "substack" as const, href: "https://yourusername.substack.com", label: "Substack" },
];

const SKILLS = [
  // Core
  "Python",
  "Java",
  "SQL",
  "Node.js",

  // AI / ML / GenAI
  "Machine Learning",
  "Deep Learning",
  "GenAI",
  "LLMs",
  "RAG",
  "Embeddings",
  "Prompt Engineering",
  "LangChain",
  "LangGraph",
  "AutoGen",
  "LlamaIndex",
  "Benchmarking",

  // Backend & Frameworks
  "FastAPI",
  "Flask",
  "Pandas",
  "NumPy",
  "OpenCV",
  "NLTK",
  "TensorFlow",

  // Databases
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Pinecone",
  "FAISS",

  // Cloud & DevOps
  "AWS",
  "Docker",
  "Kubernetes",
  "SAP BTP",
  "SAP UI5",

  // APIs / Standards
  "REST APIs",
  "OData",
  "AJAX",

  // Tools
  "GitHub",
  "MLflow",
  "Postman",
  "Swagger",

  // Frontend Basics
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Canva"
];


const WORK_ITEMS = [
  {
    companyName: "SAP Labs",
    tag: "Bengaluru, India",
    roles: [
      {
        role: "AI Engineer",
        dates: "May 2025 – Present",
        description: "Build enterprise GenAI workflows for code-intelligence systems, including high-performance RAG pipelines, structured LLM evaluations, heterogeneous dataset curation, and knowledge-graph–augmented retrieval and orchestration to improve grounding and consistency for AI experiences powering SAP Joule.",
      },
      {
        role: "Full Stack Developer",
        dates: "August 2024 – May 2025",
        description: "Focused on building full-stack, employee-centric applications for the MD’s Office, delivering reliable platforms that streamline workflows and enhance productivity for 7,000+ employees across the organization."
      },
    ],
  },
  // {
  //   companyName: "ShipsKart",
  //   tag: "Delhi, India",
  //   roles: [
  //     {
  //       role: "Intern - Full Stack Developer",
  //       dates: "April 2024 – June 2024",
  //       description:
  //         "Developed backend systems for fleet and maritime operations for improving performance, enabling real-time communication features, and exploring LLM-driven product recommendations for their e-commerce platform",
  //     },
  //   ],
  // },
  // {
  //   companyName: "JMR Infotech",
  //   tag: "Bengaluru, India",
  //   roles: [
  //     {
  //       role: "Intern - Software Engineer",
  //       dates: "August 2022 – October 2022",
  //       description:
  //         "Worked on financial-domain data analysis and fraud-detection workflows, building ML models and visual analytics to support decision-making.",
  //     },
  //   ],
  // },
];

const INTERNSHIP_ITEMS = [
  {
    companyName: "ShipsKart",
    tag: "Delhi, India",
    roles: [
      {
        role: "Intern - Full Stack Developer",
        dates: "April 2024 – June 2024",
        description:
          "Developed backend systems for fleet and maritime operations and explored LLM-driven product recommendations for their e-commerce platform.",
      },
    ],
  },
  {
    companyName: "JMR Infotech",
    tag: "Bengaluru, India",
    roles: [
      {
        role: "Intern - Software Engineer",
        dates: "August 2022 – October 2022",
        description:
          "Worked on financial-domain data analysis and fraud-detection workflows, building ML models and visual analytics to support decision-making.",
      },
    ],
  },
];

/** Latest blog posts — use intro text (first lines) from each Medium post; href = full Medium post URL. */
const BLOG_ITEMS = [
      {
    title: "Enhancing DevSecOps with CI/CD using GitHub Actions, Snyk, Sentry, and Vercel",
    date: "May 15, 2025",
    readTime: "5 min read",
    intro:
      "A complete, real-world DevSecOps pipeline—GitHub Actions, Snyk, Sentry, and Vercel working together to deliver secure, automated deployments with zero manual effort.",
    href: "https://medium.com/@taanyasingh2001/enhancing-devsecops-with-ci-cd-using-github-actions-snyk-sentry-and-vercel-e19ec262f67f",
  },
  {
    title: "Real Integration Testing with Testcontainers: A Guide for Devs & Testers",
    date: "Jun 1, 2025",
    readTime: "5 min read",
    intro:
      "Stop relying on mocks, here’s how Testcontainers lets you run real infrastructure in your tests and finally catch the bugs that only show up in production.",
    href: "https://medium.com/@taanyasingh2001/testing-with-real-databases-using-testcontainers-a-guide-for-devs-testers-ecebb2e7b188",
  },

  // {
  //   title: "Building with LLMs in Production",
  //   date: "Jan 15, 2025",
  //   readTime: "8 min read",
  //   intro:
  //     "Lessons learned from deploying large language models at scale: latency, cost, and reliability trade-offs. Here’s what worked (and what didn’t) when we shipped our first LLM-powered feature.",
  //   href: "https://medium.com/@taanyasingh2001/enhancing-devsecops-with-ci-cd-using-github-actions-snyk-sentry-and-vercel-e19ec262f67f",
  // },
  // {
  //   title: "From Research to Product",
  //   date: "Dec 3, 2024",
  //   readTime: "6 min read",
  //   intro:
  //     "How we turned a research prototype into a shipped feature. This post covers evaluation pipelines, user feedback loops, and the decisions that made the difference.",
  //   href: "https://medium.com/@yourusername/from-research-to-product-xxxxx",
  // },

];

const OWORK_ITEMS = [
  {
    icon: "🩰",
    heading: "Dance Instructor",
    roles: [
      {
        description: "Contemporary, Freestyle, Jazz"
      }
    ],
    details:
      "I taught kids across different age groups, choreographed performances, and managed structured practice sessions. This experience strengthened my patience, creativity, and leadership."
  },
  {
    icon: "📐",
    heading: "Math Olympiad Coach",
    roles: [
      {
        description: "SASMO, AMO & International STEM Olympiads"
      }
    ],
    details:
      "Mentored and trained students in logical reasoning, pattern recognition, and competitive exam strategy. Helped multiple students secure international rankings and developed intuitive problem-solving frameworks."
  },
  {
    icon: "🧘‍♀️",
    heading: "Certified International Yoga Instructor",
    roles: [
      {
        description:
          "fun stuff!"
      }
    ],
    details:
      "Completed international yoga certification and taught structured yoga sessions focusing on breathwork, balance, and strength. This experience keeps me grounded and helps with mindfulness and discipline."
  },
];

// focusing on problem-solving techniques, pattern recognition & exam strategy. Also developed the rare ability to make teenagers voluntarily enjoy math; arguably my most impressive achievement.
// const OOO_ITEMS = [
//   { title: "Dancing", description: "Sci-fi, non-fiction, and the occasional thriller. Always stacking the next book." },
//   { title: "Yoga - maybe even Aerial Yoga", description: "Trails and peaks whenever the weather allows. Prefer long day hikes over overnight." },
//   { title: "Music", description: "Playing guitar and exploring new genres. From classical to electronic." },
//   { title: "Photography", description: "Street and landscape. Analog and digital. Always chasing the right light." },
// ];

const OOO_ITEMS = [
  { title: "Dance", icon: "🩰" },
  { title: "Yoga", icon: "🧘‍♀️" },
  { title: "Skateboarding", icon: " 🛹" },
  { title: "Netflix & Movies", icon: "🎬" },
  { title: "Video Editing", icon: "🎞️" },
  { title: "All Things Sporty", icon: "⭐" },
  { title: "Badminton", icon: "🏸" },
  { title: "Running (Marathon Prep)", icon: "🏃‍♀️" },
  // { title: "Football", icon: "⚽" },
  // { title: "Basketball", icon: "🏀" },
  // { title: "Tennis", icon: "🎾" },
  { title: "Travel", icon: "✈️" },
  // { title: "Learning New Things", icon: "🧠" },
  { title: "Reading Books", icon: "📚" },
  { title: "Photography", icon: "📸" },
];

export default function HomePage() {
  const [gameOpen, setGameOpen] = useState(false);
  const [showInternships, setShowInternships] = useState(false);

  useEffect(() => {
    if (!gameOpen) return;
    const prevBody = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
    };
  }, [gameOpen]);

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#0D0D0F] text-[#F5F5F7] overflow-x-hidden pb-24 sm:pb-28 md:pb-32 safe-bottom">
      {/* Central column: responsive padding, max-width 1024px, section gap scales by breakpoint */}
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
        {/* About */}
        <section id="about" className="pt-14 sm:pt-20 md:pt-24 pb-14 sm:pb-20 md:pb-[88px]">
          <AboutSection socialLinks={SOCIAL_LINKS} />
        </section>

        {/* Work Experience */}
        <section id="work" className="pb-14 sm:pb-20 md:pb-[88px]">
          <SectionCard>
            <SectionHeading title="Work Experience" />
            <div className="flex flex-col gap-5">
              {/* Always show main work (SAP Labs) */}
              {WORK_ITEMS.map((item) => (
                <WorkCard key={item.companyName} {...item} />
              ))}

              {/* Expandable Internships */}
              {showInternships && (
                <div className="flex flex-col gap-5 mt-4">
                  {INTERNSHIP_ITEMS.map((item) => (
                    <WorkCard key={item.companyName} {...item} />
                  ))}
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={() => setShowInternships(!showInternships)}
                className="mt-4 px-6 py-2 rounded-xl text-sm font-semibold
                          bg-[#1A1A1E] border border-[#C78BFF]/60
                          text-[#C78BFF] shadow-[0_0_15px_rgba(199,139,255,0.35)]
                          hover:shadow-[0_0_25px_rgba(199,139,255,0.55)]
                          transition"
              >
                {showInternships ? "Show Less" : "More Experience"}
              </button>
            </div>
          </SectionCard>
        </section>

        {/* Skills */}
        <section id="skills" className="pb-14 sm:pb-20 md:pb-[88px]">
          <SectionCard>
            <SectionHeading title="Skills" />
            <div className="flex flex-wrap gap-3 justify-center">
              {SKILLS.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </SectionCard>
        </section>

        {/* Latest Blog Posts */}
        <section id="blogs" className="pb-14 sm:pb-20 md:pb-[88px]">
          <SectionCard>
            <SectionHeading title="Latest Blog Posts" />
            <div className="grid sm:grid-cols-2 gap-6">
              {BLOG_ITEMS.map((post) => (
                <BlogCard key={post.title} {...post} />
              ))}
            </div>
          </SectionCard>
        </section>

        {/* Work Experience Outside Tech */}
        <section id="work-outside" className="pb-14 sm:pb-20 md:pb-[88px]">
          <SectionCard>
            <SectionHeading title="Experience Beyond Tech" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {OWORK_ITEMS.map((item) => (
                <OWorkCard key={item.heading} {...item} />
              ))}
            </div>
          </SectionCard>
        </section>


        {/* When I'm OOO */}
        <section id="ooo" className="pb-20 sm:pb-24 md:pb-28">
          <SectionCard>
            <SectionHeading title="When I'm OOO" />
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-11 gap-3">
              {OOO_ITEMS.map((item) => (
                <OOOCard key={item.title} title={item.title} icon={item.icon} />
              ))}
            </div>
            <p className="text-sm sm:text-base text-[#CFCFCF]/80 leading-relaxed mt-6 text-center max-w-[700px] mx-auto">
              Outside of work, I stay active, creative and curious, whether I’m moving, making, exploring, 
              or learning something new. These things keep me grounded, balanced, and inspired.
            </p>
          </SectionCard>
        </section>
        
        <footer className="w-full text-left py-10 text-xs tracking-[0.18em] text-[#CFCFCF]/60">
          © Tanya Singh 2026
        </footer>

      </div>

      <Navbar />

      {/* Optional Game Drawer (right-side tab → slide-out panel) */}
      {!gameOpen && (
        <button
          type="button"
          onClick={() => setGameOpen(true)}
          className="
            fixed right-0 top-1/2 -translate-y-1/2 z-[60]
            h-40 w-10 sm:w-12
            rounded-l-2xl
            bg-[#131316]/95 backdrop-blur-xl
            border border-r-0 border-[#2A2A2D]
            shadow-[0_0_25px_rgba(199,139,255,0.10)]
            hover:shadow-[0_0_30px_rgba(199,139,255,0.16)]
            transition-shadow
            flex items-center justify-center
          "
          aria-label="Open game"
        >
          <span
            className="
              text-[11px] sm:text-xs font-semibold tracking-[0.22em]
              text-[#C78BFF]
              [writing-mode:vertical-rl]
              rotate-180
              select-none
            "
          >
            PLAY GAME
          </span>
        </button>
      )}

      <div
        className={`
          fixed inset-0 z-[70]
          ${gameOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
        aria-hidden={!gameOpen}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/55
            transition-opacity duration-300
            ${gameOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setGameOpen(false)}
        />

        {/* Panel */}
        <aside
          className={`
            absolute right-0 top-0 h-full w-full max-w-[680px]
            bg-[#131316]
            border-l border-[#2A2A2D]
            shadow-[-10px_0_40px_rgba(199,139,255,0.10)]
            transition-transform duration-300 ease-out
            ${gameOpen ? "translate-x-0" : "translate-x-full"}
            flex flex-col
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 sm:px-6 py-4 border-b border-[#2A2A2D] flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-[#C78BFF]">
                Help the overstimulated
              </p>
              <h3 className="text-sm sm:text-base font-semibold text-[#F5F5F7] mt-1">
                Catch the Falling Balls!
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setGameOpen(false)}
              className="
                ml-3 w-10 h-10 rounded-xl
                bg-[#1A1A1E] border border-[#2A2A2D]
                text-[#CFCFCF]
                hover:text-[#C78BFF] hover:border-[#C78BFF]/40
                transition-colors
                flex items-center justify-center
              "
              aria-label="Close game panel"
            >
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-6 flex-1 min-h-0">
            <div
              className="
                h-full min-h-[420px]
                rounded-3xl
                shadow-[0_0_25px_rgba(199,139,255,0.08)]
              "
            >
              {gameOpen && <GameIntro />}
            </div>
            {/* <p className="mt-4 text-xs sm:text-sm text-[#CFCFCF]/90 leading-relaxed">
              Move with your mouse (or touch), or use Arrow keys / A-D. Catch 10 balls to complete.
            </p> */}
          </div>
          
        </aside>
      </div>
    </div>
  );
}

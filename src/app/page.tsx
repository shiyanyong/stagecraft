import Link from "next/link";

const keywords = [
  "Vision Language Action",
  "VLA robotics optimization",
  "Embodied AI",
  "VLM reasoning",
  "failure mitigation",
  "distractor removal",
  "robot manipulation",
  "RLBench",
  "SmolVLA",
  "Pi0.5",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "StageCraft",
  description:
    "StageCraft is a training-free robotics optimization system that improves Vision-Language-Action robot success rate by using Vision-Language Model reasoning to identify failure-inducing distractors and optimize the environment before execution.",
  keywords,
  applicationCategory: "Robotics, Artificial Intelligence, Machine Learning",
  programmingLanguage: "Python",
  codeRepository: "https://github.com/shiyanyong/stagecraft",
  url: "https://stagecraft-1u3.pages.dev",
};

const useCases = [
  {
    title: "Industrial robotics",
    text: "Reduce execution failures in cluttered workcells before expensive policy retraining is considered.",
  },
  {
    title: "Embodied AI research",
    text: "Study how visual distractors, layout ambiguity, and task context affect VLA robot behavior.",
  },
  {
    title: "Robot policy debugging",
    text: "Find likely scene-level failure causes when a VLA policy reaches for the wrong object or misses a target.",
  },
  {
    title: "Benchmark improvement",
    text: "Evaluate RLBench-style tasks with environment edits that improve success rate without changing the policy.",
  },
];

const comparisons = [
  ["Traditional VLA fine-tuning", "Slow, expensive, and dependent on new data collection."],
  ["Data augmentation", "Useful, but still requires retraining and validation cycles."],
  ["StageCraft", "Training-free environment-level optimization before execution."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <Hero />
      <DefinitionBlock />
      <HowItWorks />
      <KeywordArchitecture />
      <WhenToUse />
      <UseCases />
      <WhyStageCraft />
      <DeveloperQuickView />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.28em] text-white"
          aria-label="StageCraft home"
        >
          STAGECRAFT
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/62 md:flex">
          <a href="#definition" className="hover:text-[#D4B483]">
            Definition
          </a>
          <a href="#how-it-works" className="hover:text-[#D4B483]">
            How it works
          </a>
          <a href="#use-cases" className="hover:text-[#D4B483]">
            Use cases
          </a>
          <a href="#quickstart" className="hover:text-[#D4B483]">
            Quickstart
          </a>
        </nav>
        <a
          href="https://github.com/shiyanyong/stagecraft"
          className="border border-[#D4B483]/60 px-4 py-2 text-sm font-medium text-[#F3D7A7] transition hover:bg-[#D4B483] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,180,131,0.14),transparent_34%),linear-gradient(135deg,#070707_0%,#111_54%,#171717_100%)]" />
      <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#D4B483]">
            Training-Free VLA Robotics Optimization
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            StageCraft improves VLA robot success without retraining.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
            StageCraft improves Vision-Language-Action robot performance by
            removing failure-inducing environmental distractors using
            vision-language model reasoning, before the robot executes a task.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#how-it-works"
              className="bg-[#D4B483] px-6 py-3 text-center font-medium text-black transition hover:bg-[#F0C98F] focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
            >
              See how StageCraft works
            </a>
            <a
              href="https://github.com/shiyanyong/stagecraft"
              className="border border-white/18 px-6 py-3 text-center font-medium text-white transition hover:border-[#D4B483]/70 hover:text-[#F3D7A7] focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
            >
              View repository
            </a>
          </div>
        </div>
        <div className="border border-white/10 bg-black/42 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <p className="text-xs uppercase tracking-[0.28em] text-white/42">
            VLA execution flow
          </p>
          <div className="mt-5 space-y-3">
            {[
              "Observe task and scene",
              "Detect distractors with VLM reasoning",
              "Optimize environment before execution",
              "Run original VLA policy",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 border border-white/10 bg-white/[0.035] p-4"
              >
                <span className="text-sm font-semibold text-[#D4B483]">
                  0{index + 1}
                </span>
                <span className="text-white/78">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-white/58">
            Result: higher Vision-Language-Action success rate without policy
            fine-tuning, new demonstrations, or model retraining.
          </p>
        </div>
      </div>
    </section>
  );
}

function DefinitionBlock() {
  return (
    <section id="definition" className="mx-auto max-w-7xl px-5 py-18 md:px-8">
      <SectionLabel>AI-Friendly Definition Block</SectionLabel>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          ["What it is", "A training-free VLM reasoning layer for Vision-Language-Action robotics."],
          ["What it does", "Finds distractors and scene conditions that are likely to make a robot fail."],
          ["How it works", "Uses rollout evidence and visual-language reasoning to recommend environment edits."],
          ["Output", "A cleaner execution scene and improved robot success rate without retraining."],
        ].map(([title, text]) => (
          <article key={title} className="border border-white/10 bg-white/[0.035] p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-white/10 bg-[#0D0D0D]">
      <div className="mx-auto max-w-7xl px-5 py-18 md:px-8">
        <SectionLabel>How StageCraft Works</SectionLabel>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Observe rollouts", "Compare success and failure trajectories from the robot task."],
            ["02", "Identify distractors", "Use VLM reasoning to locate clutter, ambiguity, occlusion, and failure-causing objects."],
            ["03", "Modify environment", "Change the scene before execution so the original VLA policy has a clearer task context."],
          ].map(([number, title, text]) => (
            <article key={number} className="border border-white/10 bg-black/36 p-6">
              <p className="text-5xl font-semibold text-[#D4B483]/82">{number}</p>
              <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
              <p className="mt-4 leading-7 text-white/62">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-7 border-l-2 border-[#D4B483] pl-5 text-lg text-white/82">
          Explicit result: StageCraft improves VLA success rate without
          retraining.
        </p>
      </div>
    </section>
  );
}

function KeywordArchitecture() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-18 md:px-8">
      <SectionLabel>SEO Keyword Architecture</SectionLabel>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {[
          ["Core research keywords", "Vision Language Action, Embodied AI, Robotics"],
          ["Method keywords", "failure mitigation, distractor removal, VLM reasoning, robot debugging"],
          ["Product keywords", "training-free robotics optimization, plug-and-play VLA improvement, robot success rate improvement without retraining"],
        ].map(([title, text]) => (
          <article key={title} className="border border-white/10 p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-4 leading-7 text-white/62">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhenToUse() {
  return (
    <section className="border-y border-white/10 bg-[#101010]">
      <div className="mx-auto max-w-7xl px-5 py-18 md:px-8">
        <SectionLabel>When To Use StageCraft</SectionLabel>
        <div className="mt-7 grid gap-3 text-lg text-white/76 md:grid-cols-2">
          {[
            "Use StageCraft when VLA models fail in cluttered scenes.",
            "Use StageCraft when distractor objects cause incorrect actions.",
            "Use StageCraft when policy retraining is expensive or impossible.",
            "Use StageCraft when fast robot performance improvement is required.",
          ].map((item) => (
            <p key={item} className="border border-white/10 bg-black/28 p-5">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-5 py-18 md:px-8">
      <SectionLabel>Search-Intent Use Cases</SectionLabel>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {useCases.map((item) => (
          <article key={item.title} className="border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-4 leading-7 text-white/62">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyStageCraft() {
  return (
    <section className="border-y border-white/10 bg-[#0D0D0D]">
      <div className="mx-auto max-w-7xl px-5 py-18 md:px-8">
        <SectionLabel>Why StageCraft</SectionLabel>
        <div className="mt-7 overflow-hidden border border-white/10">
          {comparisons.map(([method, result], index) => (
            <div
              key={method}
              className={`grid gap-3 p-5 md:grid-cols-[0.45fr_1fr] ${
                index > 0 ? "border-t border-white/10" : ""
              } ${method === "StageCraft" ? "bg-[#D4B483]/10" : "bg-black/22"}`}
            >
              <strong className="text-white">{method}</strong>
              <span className="text-white/64">{result}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeveloperQuickView() {
  return (
    <section id="quickstart" className="mx-auto max-w-7xl px-5 py-18 md:px-8">
      <SectionLabel>Developer Quick View</SectionLabel>
      <div className="mt-7 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-white/10 p-6">
          <h2 className="text-2xl font-semibold">Inputs and outputs</h2>
          <p className="mt-4 text-white/62">
            Input: task instruction, scene observation, rollout evidence, and
            optional benchmark state.
          </p>
          <p className="mt-3 text-white/62">
            Output: failure-risk analysis, distractor list, environment edit
            plan, and execution notes for the original VLA policy.
          </p>
        </div>
        <pre className="overflow-x-auto border border-white/10 bg-black p-6 text-sm leading-7 text-[#F3D7A7]">
{`from stagecraft import StageCraft

planner = StageCraft(vlm="gpt-4o")
plan = planner.optimize(
    task="pick up the red mug",
    observation=scene_image,
    failed_rollouts=rollout_logs,
)

print(plan.distractors)
print(plan.environment_edits)`}
        </pre>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#D4B483]">
        {children}
      </p>
    </div>
  );
}

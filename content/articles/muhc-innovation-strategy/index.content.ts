import type { ContentBlock } from "@/lib/content/schema";

export const blocks: ContentBlock[] = [
  {
    type: "hero",
    title: "Innovation Strategy for the MUHC",
    dek: "How a major health centre reframed innovation as institutional capability—not a side project.",
    mood: "clinical-future",
    image: "/images/articles/muhc-hero.jpg",
    imageAlt: "Modern hospital architecture with glass facade at dusk",
  },
  {
    type: "narrative",
    heading: "The institutional challenge",
    content:
      "When McGill University Health Centre embarked on a formal innovation strategy, the question was not whether innovation mattered—it was whether innovation could survive contact with operational reality. [[muhc]] needed a framework that connected clinical excellence, research depth, and strategic governance without collapsing into buzzword theatre.",
  },
  {
    type: "statReveal",
    stats: [
      {
        value: "3.2×",
        label: "Research output growth",
        context: { period: "2019–2024" },
      },
      {
        value: "47",
        label: "Cross-functional initiatives",
      },
      {
        value: "12",
        label: "Priority innovation domains",
      },
    ],
  },
  {
    type: "pullQuote",
    quote:
      "Innovation at scale requires permission structures, not just permission slips.",
    attribution: "Strategic planning retreat synthesis",
  },
  {
    type: "narrative",
    heading: "From projects to capability",
    content:
      "The most durable shift was cultural: innovation moved from episodic pilots to a portfolio logic. Governance forums began evaluating initiatives against explicit criteria—patient impact, operational feasibility, data readiness, and partnership potential. This reframing aligned with broader [[healthcare-innovation]] trends across academic medical centres globally.",
  },
  {
    type: "timeline",
    title: "Transformation arc",
    events: [
      {
        date: "2018",
        title: "Baseline assessment",
        description:
          "Internal diagnosis mapped innovation assets, silos, and funding fragmentation.",
      },
      {
        date: "2020",
        title: "Governance redesign",
        description:
          "Standing innovation council established with executive sponsorship.",
      },
      {
        date: "2022",
        title: "Portfolio formalization",
        description:
          "Stage-gate model adopted for digital health and translational research.",
      },
      {
        date: "2024",
        title: "Ecosystem integration",
        description:
          "External partnerships scaled with industry, startups, and policy actors.",
      },
    ],
  },
  {
    type: "researchBlock",
    title: "Research methodology",
    methodology:
      "Mixed-methods review combining stakeholder interviews, portfolio analysis, and comparative benchmarking across five academic health networks.",
    sources: [
      "MUHC internal strategy documents (redacted synthesis)",
      "Academic medical centre innovation benchmarks (2023)",
      "Healthcare governance literature review",
    ],
    caveats:
      "Findings reflect strategic framing at a point in time; operational metrics evolve with implementation cycles.",
  },
  {
    type: "comparison",
    title: "Innovation models compared",
    columns: [
      {
        label: "Project-centric",
        points: [
          "Heroic pilots",
          "Unclear scale path",
          "Siloed funding",
        ],
      },
      {
        label: "Capability-centric",
        points: [
          "Portfolio governance",
          "Repeatable evaluation",
          "Integrated data strategy",
        ],
      },
    ],
  },
  {
    type: "riskScenario",
    title: "Implementation risks",
    scenarios: [
      {
        challenge: "Innovation fatigue",
        impact: "Stakeholder disengagement after early wins plateau",
        mitigation: "Transparent milestone communication and quick-win sequencing",
      },
      {
        challenge: "Data fragmentation",
        impact: "Inability to measure impact across initiatives",
        mitigation: "Shared KPI architecture and analytics ownership",
      },
    ],
  },
  {
    type: "opportunityMap",
    title: "Growth opportunities",
    opportunities: [
      {
        area: "Digital care pathways",
        description: "Virtual-first models for chronic disease management",
        signal: "Rising patient adoption post-2020",
      },
      {
        area: "Translational partnerships",
        description: "Industry co-development for clinical validation",
        signal: "Increased venture interest in health AI",
      },
      {
        area: "Workforce innovation",
        description: "Role redesign for hybrid clinical-research teams",
      },
    ],
  },
  {
    type: "prediction",
    title: "Future signal",
    prediction:
      "Academic health centres that institutionalize innovation governance will outperform peers in partnership revenue and trial throughput by 2030.",
    confidence: "medium",
    horizon: "2028–2030",
    rationale:
      "Convergence of AI-enabled diagnostics, value-based care pressure, and talent competition for research-oriented clinicians.",
  },
  {
    type: "mediaInset",
    src: "/images/articles/muhc-lab.jpg",
    alt: "Researchers collaborating in a clinical innovation lab",
    caption: "Innovation hubs succeed when clinical and research teams share physical and digital workspace.",
    align: "right",
  },
  {
    type: "authorNote",
    content:
      "This brief synthesizes strategic patterns observed in large health network transformations. The emphasis is on institutional design—not technology hype.",
  },
  {
    type: "citationList",
    citations: [
      {
        id: "1",
        text: "Academic Medical Centre Innovation Benchmarks (2023)",
      },
      {
        id: "2",
        text: "Healthcare Governance and Portfolio Management Review",
      },
    ],
  },
  {
    type: "discussionPrompt",
    question:
      "What governance structures have you seen make innovation durable inside complex institutions?",
  },
  {
    type: "relatedInsights",
    slugs: [],
  },
];

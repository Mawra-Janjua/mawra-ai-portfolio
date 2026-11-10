// Single source of truth for all portfolio content.
// Only facts supplied by Mawra are listed here — do not add invented
// clients, metrics, testimonials or results.

export const profile = {
  name: "Mawra Akbar Janjua",
  firstName: "Mawra",
  role: "Junior AI Software Engineer",
  location: "Lahore, Pakistan",
  intro:
    "I build practical AI and software solutions — from computer vision and NLP projects to mobile apps, REST APIs and Firebase integrations.",
  links: {
    linkedin: "https://www.linkedin.com/in/mawra-janjua/",
    github: "https://github.com/Mawra-Janjua",
  },
  // Optional public email. Leave empty to keep it off the site.
  email: "",
};

export const education = {
  degree: "BS Information Technology",
  school: "University of Education, Lahore",
  cgpa: "3.63 / 4.00",
};

export const skillGroups = [
  { title: "Languages", items: ["Python", "JavaScript", "SQL"] },
  {
    title: "Machine Learning & AI",
    items: ["TensorFlow", "TensorFlow Lite", "MediaPipe", "Scikit-learn", "LSTM", "NLP", "Computer Vision"],
  },
  { title: "Data", items: ["Pandas", "NumPy"] },
  { title: "Web & Tools", items: ["React", "REST APIs", "Firebase", "Git", "GitHub"] },
] as const;

export const aiTools = ["ChatGPT", "Claude", "Claude Code"] as const;

export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  points: string[];
  current?: boolean;
};

export const experience: TimelineItem[] = [
  {
    period: "Recent · about 2 months",
    title: "AI-Assisted Workflows (Hands-on Practice)",
    place: "Self-directed",
    current: true,
    points: [
      "Practical work using ChatGPT, Claude and Claude Code for AI-assisted workflows.",
      "Applying these tools to real-world tasks while building automation projects.",
    ],
  },
  {
    period: "June 2023 – August 2025",
    title: "Freelance Software & AI Developer",
    place: "Remote",
    points: [
      "Developed AI-powered and mobile software.",
      "Built Firebase integrations and REST APIs.",
      "Handled testing and technical documentation.",
    ],
  },
];

export type Project = {
  title: string;
  label: string;
  description: string;
  tags: string[];
  highlight?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Pakistani Sign Language Recognition System",
    label: "Final Year Project",
    description:
      "A computer vision system that recognises Pakistani Sign Language gestures, aimed at making communication more accessible.",
    tags: ["Computer Vision", "Deep Learning", "Python"],
    highlight: "3rd Position — university competition",
  },
  {
    title: "AI Resume Screening System",
    label: "NLP Project",
    description:
      "Uses natural language processing to match candidates to job requirements and rank them by relevance.",
    tags: ["NLP", "Candidate Matching", "Ranking", "Python"],
  },
  {
    title: "Student Performance Prediction System",
    label: "Machine Learning Project",
    description:
      "A predictive machine learning model that estimates student performance from academic data.",
    tags: ["Python", "Scikit-learn", "Predictive ML"],
  },
];

export type AutomationProject = {
  slug: string;
  title: string;
  description: string;
  // "built": code complete and automated tests pass; live run with real credentials not yet shown.
  // "completed": additionally verified end-to-end with real services (and screenshots added).
  status: "in-progress" | "built" | "completed";
  // Workflow steps shown as animated nodes.
  steps: string[];
  // Public GitHub repository (published 2026-11-10).
  repo: string;
};

// Mark a project "completed" only once it has been verified end-to-end with real services.
export const automationProjects: AutomationProject[] = [
  {
    slug: "ai-email-automation",
    title: "AI Email Automation Agent",
    description: "Classifies inbound email with Claude, drafts replies, and sends through Gmail only after human approval.",
    status: "built",
    steps: ["Inbox", "Classify", "Draft", "Approve"],
    repo: `${profile.links.github}/ai-email-automation-agent`,
  },
  {
    slug: "ai-lead-generation",
    title: "AI Lead Generation Agent",
    description: "Validates, de-duplicates and enriches leads, scores them against an ICP, and drafts outreach.",
    status: "built",
    steps: ["Validate", "Enrich", "Score", "Export"],
    repo: `${profile.links.github}/ai-lead-generation-agent`,
  },
  {
    slug: "ai-invoice-processing",
    title: "AI Invoice Processing System",
    description: "Extracts invoice data from PDFs, checks the arithmetic and flags issues for manual review.",
    status: "built",
    steps: ["Upload", "Extract", "Validate", "Review"],
    repo: `${profile.links.github}/ai-invoice-processing-system`,
  },
  {
    slug: "ai-meeting-assistant",
    title: "AI Meeting Assistant",
    description: "Turns transcripts into summaries, decisions and action items, each verified against the transcript.",
    status: "built",
    steps: ["Transcript", "Summarise", "Verify", "Follow up"],
    repo: `${profile.links.github}/ai-meeting-assistant`,
  },
];

export const certifications = [
  { title: "Applied Data Science Specialization", issuer: "IBM" },
  { title: "Data Analysis with Python", issuer: "IBM" },
  { title: "Data Visualization with Python", issuer: "IBM" },
  { title: "Foundations of UX Design", issuer: "Google" },
  { title: "Python Development", issuer: "Punjab Government — KFP" },
  { title: "NSCT 2026 — 70.1 percentile", issuer: "HEC" },
] as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#automation", label: "Automation" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
] as const;

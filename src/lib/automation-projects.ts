// Content for the four AI automation project pages.
// Facts here describe code that exists in the project repositories. Test counts
// are the real results of `npm test` in each repository. Update `screenshots`
// only with real captures. All four repositories were published on 2026-11-10.

export type ProjectSlug = "ai-email-automation" | "ai-lead-generation" | "ai-invoice-processing" | "ai-meeting-assistant";

export type FlowStep = { title: string; detail: string };

export type AutomationProjectDetail = {
  slug: ProjectSlug;
  title: string;
  tagline: string;
  repo: string;
  repoPublished: boolean;
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; detail: string }[];
  stack: string[];
  flow: FlowStep[];
  /** Components shown in the architecture diagram, left to right. */
  architecture: { inputs: string[]; services: string[]; review: string; outputs: string[] };
  safeguards: string[];
  integrations: { name: string; required: boolean; note: string }[];
  setup: { label: string; command?: string; note?: string }[];
  testing: { total: number; command: string; areas: string[] };
  n8nWorkflows: { file: string; detail: string }[];
  screenshots: { src: string; alt: string; caption: string }[];
};

const GITHUB = "https://github.com/Mawra-Janjua";

export const automationDetails: AutomationProjectDetail[] = [
  {
    slug: "ai-email-automation",
    title: "AI Email Automation Agent",
    tagline: "Classifies inbound email with Claude, drafts replies, and sends nothing until a person approves it.",
    repo: `${GITHUB}/ai-email-automation-agent`,
    repoPublished: true,
    overview:
      "A Node.js + TypeScript service that receives email from Gmail or any webhook, classifies it as spam, sales, support, urgent or other, drafts a context-aware reply, and holds every draft in a review queue. Approved replies are sent through the Gmail API in the original thread, and every step is logged.",
    problem:
      "Shared inboxes mix urgent incidents, sales leads, support requests and spam. Triage is slow, and fully automatic replies are risky: a wrong price or promise sent to a customer is hard to take back.",
    solution:
      "Claude handles the reading and first draft; a human keeps the final say. Drafts only use facts from the email and a configured business context, and anything unknown becomes a [CONFIRM: …] placeholder that blocks sending until it is resolved.",
    features: [
      { title: "Gmail + webhook intake", detail: "Gmail API sync, an n8n Gmail trigger, or POST /api/emails from any source. Idempotent on the Gmail message id." },
      { title: "Structured classification", detail: "Category, priority, confidence, summary and reasoning returned as schema-validated JSON." },
      { title: "Grounded reply drafts", detail: "Unknown facts become [CONFIRM: …] placeholders listed as open questions." },
      { title: "Human approval", detail: "Built-in review queue to edit, approve or reject. Approval is the only path to sending." },
      { title: "Threaded Gmail sending", detail: "RFC 2822 replies with In-Reply-To/References, protected against header injection." },
      { title: "Activity log", detail: "received → classified → draft_created → approved → sent, stored in SQLite." },
    ],
    stack: ["TypeScript", "Node.js 24", "Claude API", "Gmail API", "n8n", "SQLite", "Zod", "Docker Compose"],
    flow: [
      { title: "Receive", detail: "Gmail sync, n8n Gmail trigger or webhook" },
      { title: "Validate", detail: "Zod schema, size limits, dedupe" },
      { title: "Classify", detail: "Claude → category, priority, confidence" },
      { title: "Draft", detail: "Claude reply from email + business context" },
      { title: "Review", detail: "Human edits, approves or rejects" },
      { title: "Send & log", detail: "Gmail API reply in thread, activity log" },
    ],
    architecture: {
      inputs: ["Gmail inbox (n8n trigger)", "Scheduled Gmail sync", "Webhook or REST API"],
      services: ["Claude API: classify and draft", "Gmail API: threaded send"],
      review: "Review queue: a person edits, approves or rejects every draft",
      outputs: ["Reply sent in the Gmail thread", "Activity log (SQLite)", "Urgent alert to the reviewer"],
    },
    safeguards: [
      "Email text is passed to Claude as data inside tags; the prompt forbids following instructions in it.",
      "Without a Claude key, emails are stored unprocessed and the API says so. No placeholder classification is produced.",
      "Gmail failures keep the draft in the queue with the error recorded, so it can be retried.",
    ],
    integrations: [
      { name: "Anthropic Claude API", required: true, note: "Classification and drafting" },
      { name: "Gmail API (OAuth)", required: false, note: "Inbox sync and sending; webhook intake works without it" },
      { name: "n8n", required: false, note: "Gmail trigger, scheduled sync, webhook and urgent alerts" },
    ],
    setup: [
      { label: "Install", command: "npm install" },
      { label: "Configure", command: "cp .env.example .env", note: "Set API_KEY and ANTHROPIC_API_KEY. Gmail variables are optional." },
      { label: "Gmail (optional)", command: "npm run gmail:auth", note: "One-time OAuth flow that prints GMAIL_REFRESH_TOKEN." },
      { label: "Run", command: "npm start", note: "Review queue at http://localhost:4101/" },
      { label: "Or with n8n", command: "docker compose up -d --build" },
    ],
    testing: {
      total: 68,
      command: "npm run check",
      areas: [
        "Classify → draft → approve flow, spam handling, idempotent ingest",
        "Approval blocked by placeholders; double approval; Gmail send failures",
        "HTTP integration: auth, validation, 404/405/415, rate limiting",
        "Real Anthropic SDK against a mock Messages API (request shape, refusals, truncation, auth errors)",
        "Gmail MIME parsing, RFC 2822 building, header-injection protection",
      ],
    },
    n8nWorkflows: [
      { file: "gmail-intake.workflow.json", detail: "Gmail Trigger → map fields → agent → alert reviewer if urgent" },
      { file: "scheduled-gmail-sync.workflow.json", detail: "Every 5 minutes → /api/gmail/sync → fail on errors" },
      { file: "webhook-intake.workflow.json", detail: "Header-authenticated webhook → agent → response, with retries and a JSON error reply" },
    ],
    screenshots: [],
  },
  {
    slug: "ai-lead-generation",
    title: "AI Lead Generation Agent",
    tagline: "Validates, de-duplicates, enriches and scores leads against your ideal customer profile, then drafts outreach.",
    repo: `${GITHUB}/ai-lead-generation-agent`,
    repoPublished: true,
    overview:
      "A lead qualification pipeline for contacts you already have permission to process. It normalises messy lead data, detects duplicates, enriches only from permitted sources (DNS MX records and the official Hunter.io API), scores each lead with Claude against an ICP file, and drafts short outreach emails for strong fits.",
    problem:
      "Lead lists arrive inconsistent and duplicated, qualification is subjective, and AI 'personalisation' often invents facts about prospects, which damages trust.",
    solution:
      "Deterministic code handles validation, normalisation and dedupe. Claude scores only the facts supplied and must cite the field behind every personalised detail. Details that cite a missing field are removed automatically.",
    features: [
      { title: "Validation & normalisation", detail: "Emails, domains from URLs, name casing, country aliases, free-mail detection, LinkedIn URL checks." },
      { title: "Duplicate detection", detail: "Exact email or company domain + person name, within a batch and against the database." },
      { title: "Permitted enrichment", detail: "DNS MX check and optional Hunter.io company + email verification. No scraping." },
      { title: "ICP scoring", detail: "Rule-based signals plus a Claude score (0–100), tier A–D, reasons, risks and missing data." },
      { title: "Outreach with provenance", detail: "Each personalised detail names its source field; unsupported ones are dropped." },
      { title: "CSV & Google Sheets", detail: "Formula-injection-safe CSV export and n8n Sheets workflows." },
    ],
    stack: ["TypeScript", "Node.js 24", "Claude API", "Hunter.io API", "DNS", "n8n", "Google Sheets", "SQLite", "Zod"],
    flow: [
      { title: "Intake", detail: "Sheets, webhook or API (up to 50 per batch)" },
      { title: "Normalise", detail: "Validate, clean, extract domains" },
      { title: "Dedupe", detail: "Email or domain + name" },
      { title: "Enrich", detail: "DNS MX · Hunter.io (throttled, retried)" },
      { title: "Score", detail: "ICP signals + Claude tier A–D" },
      { title: "Outreach & export", detail: "Draft for good fits · CSV / Sheets" },
    ],
    architecture: {
      inputs: ["n8n form or webhook", "Google Sheets rows", "REST API batch"],
      services: ["Claude API: ICP score and outreach", "Hunter.io: company and email", "DNS MX check"],
      review: "Outreach is drafted for a person to send; nothing is emailed automatically",
      outputs: ["Scored leads (SQLite)", "CSV export", "Google Sheets"],
    },
    safeguards: [
      "The lead's email address is never sent to the model; only an allow-listed set of fields is.",
      "Unknown data stays null (e.g. a DNS timeout is 'unknown', not 'invalid').",
      "Enriched data is stored separately with its source and never overwrites what you supplied.",
    ],
    integrations: [
      { name: "Anthropic Claude API", required: true, note: "Scoring and outreach drafts" },
      { name: "Hunter.io API", required: false, note: "Company enrichment and email verification" },
      { name: "n8n + Google Sheets", required: false, note: "Sheet-to-sheet qualification and webhook intake" },
    ],
    setup: [
      { label: "Install", command: "npm install" },
      { label: "Configure", command: "cp .env.example .env", note: "Set API_KEY, ANTHROPIC_API_KEY and SENDER_* details." },
      { label: "Define your ICP", command: "cp config/icp.example.json config/icp.json" },
      { label: "Run", command: "npm start", note: "API at http://localhost:4102" },
      { label: "Export", command: "curl -H \"x-api-key: $API_KEY\" localhost:4102/api/leads/export.csv -o leads.csv" },
    ],
    testing: {
      total: 66,
      command: "npm run check",
      areas: [
        "Normalisation rules and edge cases; ICP signals",
        "Dedupe within a batch and against stored leads",
        "Enrichment: MX true/false/unknown, Hunter mapping, 429 retry, 404 and 500 handling",
        "Batch processing with partial failures and retry; CSV formula-injection protection",
        "Real Anthropic SDK against a mock API: data minimisation, score clamping, provenance filter",
      ],
    },
    n8nWorkflows: [
      { file: "google-sheets-qualify.workflow.json", detail: "Unprocessed 'Leads In' rows → batches of 50 → agent → append created leads, write status back" },
      { file: "webhook-intake.workflow.json", detail: "Header-authenticated webhook → agent → summary response + append created leads to Sheets" },
      { file: "lead-form.workflow.json", detail: "n8n form → agent → score and tier shown on the completion page" },
    ],
    screenshots: [],
  },
  {
    slug: "ai-invoice-processing",
    title: "AI Invoice Processing System",
    tagline: "Extracts invoice data from PDFs with Claude, then checks the maths, dates and duplicates before anyone approves it.",
    repo: `${GITHUB}/ai-invoice-processing-system`,
    repoPublished: true,
    overview:
      "Upload a supplier invoice PDF. The text layer is extracted locally, Claude returns the fields in a strict schema, and deterministic code validates the arithmetic, dates, required fields and duplicates, and confirms key values actually appear in the document. Every invoice then goes through manual review before export to JSON or CSV.",
    problem:
      "Manual invoice entry is slow and error-prone, and AI extraction alone can misread or 'correct' numbers. Accounts payable needs results it can trust and audit.",
    solution:
      "Claude reads; code verifies. The model may not calculate or infer values, every field can be null, and the system recomputes totals, flags anything not found in the PDF text, and blocks approval until errors are fixed.",
    features: [
      { title: "PDF intake", detail: "Multipart or raw upload, type/size/page checks, encrypted and corrupt file detection, duplicate-file hashing." },
      { title: "Text + vision extraction", detail: "Local text-layer extraction; scanned PDFs are sent to Claude as a document." },
      { title: "Arithmetic checks", detail: "Line totals, subtotal, tax rate and grand total recomputed with rounding tolerance." },
      { title: "Anomaly flags", detail: "Missing fields, invalid dates, duplicate vendor + number, high value, unusual tax rates." },
      { title: "Grounding check", detail: "Invoice number, total and vendor must appear in the PDF text, which catches hallucinated values." },
      { title: "Confidence-based review", detail: "Low model confidence or unreadable fields send the invoice to a person, with the fields to check." },
      { title: "Manual review + export", detail: "Audited corrections, approve/reject with reasons, a recorded override for genuine exceptions, JSON and CSV export." },
    ],
    stack: ["TypeScript", "Node.js 24", "Claude API", "unpdf (pdf.js)", "n8n", "Gmail", "SQLite", "Zod"],
    flow: [
      { title: "Upload", detail: "Review UI, webhook or Gmail attachment" },
      { title: "Read PDF", detail: "Checks + text layer extraction" },
      { title: "Extract", detail: "Claude → strict invoice schema" },
      { title: "Validate", detail: "Maths, dates, duplicates, grounding" },
      { title: "Review", detail: "Correct, approve or reject (audited)" },
      { title: "Export", detail: "JSON · invoice CSV · line-item CSV" },
    ],
    architecture: {
      inputs: ["Gmail attachments (n8n)", "Upload webhook", "Review UI upload"],
      services: ["PDF text layer (unpdf)", "Claude API: structured extraction"],
      review: "Flagged or uncertain invoices wait for a person to correct, approve or reject",
      outputs: ["JSON", "Invoice and line-item CSV", "Daily CSV email to accounting"],
    },
    safeguards: [
      "Error flags block approval. Warnings require a written override reason.",
      "Reviewer corrections are re-validated and logged with old and new values.",
      "PDFs are not stored. Only a hash and the extracted text are kept for re-validation.",
    ],
    integrations: [
      { name: "Anthropic Claude API", required: true, note: "Field extraction (text and scanned PDFs)" },
      { name: "n8n + Gmail", required: false, note: "Attachment intake, reviewer alerts, daily CSV to accounting" },
    ],
    setup: [
      { label: "Install", command: "npm install" },
      { label: "Configure", command: "cp .env.example .env", note: "Set API_KEY and ANTHROPIC_API_KEY." },
      { label: "Run", command: "npm start", note: "Review UI at http://localhost:4103/" },
      { label: "Try a sample", command: "curl -X POST localhost:4103/api/invoices -H \"x-api-key: $API_KEY\" -F file=@test/fixtures/invoice-math-error.pdf" },
      { label: "Live accuracy check", command: "npm run eval:live", note: "Runs real Claude on the sample PDFs and compares with ground truth." },
    ],
    testing: {
      total: 60,
      command: "npm run check",
      areas: [
        "Real PDF text extraction from generated fixtures; scanned, corrupt and oversized files",
        "Every arithmetic, date, required-field, anomaly and grounding rule",
        "Review workflow: blocking errors, overrides, audited corrections, duplicates, retry",
        "HTTP multipart and raw uploads, filename sanitising, CSV/JSON exports",
        "Real Anthropic SDK against a mock API, including the scanned-PDF document block",
      ],
    },
    n8nWorkflows: [
      { file: "gmail-invoice-intake.workflow.json", detail: "Gmail PDF attachments → API → email the AP reviewer if flagged" },
      { file: "upload-webhook.workflow.json", detail: "Multipart webhook → API → response" },
      { file: "daily-approved-export.workflow.json", detail: "Daily CSV of newly approved invoices emailed to accounting (incremental, no resends)" },
    ],
    screenshots: [],
  },
  {
    slug: "ai-meeting-assistant",
    title: "AI Meeting Assistant",
    tagline: "Turns transcripts into summaries, decisions and action items, each traced back to the line that supports it.",
    repo: `${GITHUB}/ai-meeting-assistant`,
    repoPublished: true,
    overview:
      "Paste or upload a transcript (text, WebVTT or SRT), or transcribe audio with optional speech-to-text. Claude produces a summary, decisions, action items and open questions, and must cite a transcript line for each one. Code then verifies every citation, owner and deadline before notes are exported and a follow-up email draft is written.",
    problem:
      "Meeting summaries are useful only if they are accurate. AI notes often state decisions nobody made or assign tasks to the wrong person, and those mistakes spread in the follow-up email.",
    solution:
      "Every decision and action item carries a line number and a verbatim quote. If the quote isn't in the transcript, the item is removed. If nobody was clearly assigned, the owner stays empty. The follow-up email sees only verified items.",
    features: [
      { title: "Transcript parsing", detail: "Speaker labels, WebVTT voice tags, SRT captions and timestamps, as numbered lines." },
      { title: "Claude notes", detail: "Summary, key points, decisions, action items and open questions as structured JSON." },
      { title: "Evidence verification", detail: "Cited quotes must exist; wrong line numbers are corrected; duplicates are merged." },
      { title: "Owner & deadline rules", detail: "Kept only when explicitly assigned, volunteered, or said in the transcript. Spoken deadlines become calendar dates from the meeting date." },
      { title: "Follow-up drafts", detail: "Written from verified items only. n8n saves them as Gmail drafts, never auto-sent." },
      { title: "Export + optional STT", detail: "Markdown and JSON export; audio recordings are transcribed with Deepgram and summarised in one call when configured." },
    ],
    stack: ["TypeScript", "Node.js 24", "Claude API", "Deepgram (optional)", "n8n", "Google Drive", "Gmail", "SQLite"],
    flow: [
      { title: "Input", detail: "Transcript, file upload or audio (optional STT)" },
      { title: "Parse", detail: "Speakers, timestamps, numbered lines" },
      { title: "Summarise", detail: "Claude notes with evidence citations" },
      { title: "Verify", detail: "Quotes, owners and deadlines checked" },
      { title: "Follow-up", detail: "Email draft from verified items only" },
      { title: "Export", detail: "Markdown · JSON · Gmail draft" },
    ],
    architecture: {
      inputs: ["Transcript text, VTT or SRT", "Google Drive folder (n8n)", "Audio recording"],
      services: ["Claude API: notes and follow-up", "Deepgram: speech-to-text (optional)"],
      review: "Evidence check drops any item its quote does not support; the follow-up stays a draft",
      outputs: ["Markdown notes", "Structured JSON", "Gmail draft follow-up"],
    },
    safeguards: [
      "Unsupported decisions and tasks are removed and listed with the reason.",
      "Speaking near a task is not ownership. Owners must be named or must commit ('I'll…').",
      "Deadlines are kept only when the words appear near the cited line.",
    ],
    integrations: [
      { name: "Anthropic Claude API", required: true, note: "Notes and follow-up drafts" },
      { name: "Deepgram API", required: false, note: "Optional audio transcription with speaker diarization" },
      { name: "n8n + Google Drive + Gmail", required: false, note: "Transcript folder intake and Gmail drafts" },
    ],
    setup: [
      { label: "Install", command: "npm install" },
      { label: "Configure", command: "cp .env.example .env", note: "Set API_KEY and ANTHROPIC_API_KEY. DEEPGRAM_API_KEY is optional." },
      { label: "Run", command: "npm start", note: "API at http://localhost:4104" },
      { label: "Summarise a file", command: "curl -X POST \"localhost:4104/api/meetings?title=Sync\" -H \"x-api-key: $API_KEY\" -H \"content-type: text/plain\" --data-binary @test/fixtures/product-sync.txt" },
    ],
    testing: {
      total: 63,
      command: "npm run check",
      areas: [
        "Text, WebVTT and SRT parsing; speaker detection that ignores sentences with colons",
        "Verification against a scripted model output with a hallucinated decision, task, owner and deadline",
        "Ownership rules: commitments and named assignments vs. merely speaking nearby",
        "Follow-up drafted only from verified items; Markdown export",
        "Real Anthropic SDK and Deepgram client tests; HTTP validation and errors",
      ],
    },
    n8nWorkflows: [
      { file: "transcript-webhook.workflow.json", detail: "Webhook → notes → response + Gmail draft of the follow-up" },
      { file: "google-drive-transcripts.workflow.json", detail: "New Drive transcript → notes → Gmail draft" },
    ],
    screenshots: [],
  },
];

export const getAutomationDetail = (slug: string) => automationDetails.find((p) => p.slug === slug);

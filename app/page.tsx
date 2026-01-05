"use client";
import { useState } from "react";

/* ================== UNITS BY GRADE ================== */
const unitsByGrade: Record<string, string[]> = {
  "10": [
    "Unit 1: Family Life",
    "Unit 2: Humans and the Environment",
    "Unit 3: Music",
    "Unit 4: For a Better Community",
    "Unit 5: Inventions",
    "Unit 6: Gender Equality",
    "Unit 7: Viet Nam and International Organisations",
    "Unit 8: New Ways to Learn",
    "Unit 9: Protecting the Environment",
    "Unit 10: Ecotourism",
    "Review Units (1–4)",
  ],
  "11": [
    "Unit 1: A Long and Healthy Life",
    "Unit 2: The Generation Gap",
    "Unit 3: Cities of the Future",
    "Review 1",
    "Unit 4: ASEAN and Viet Nam",
    "Unit 5: Global Warming",
    "Review 2",
    "Unit 6: Preserving Our Heritage",
    "Unit 7: Education Options for School-Leavers",
    "Unit 8: Becoming Independent",
    "Review 3",
    "Unit 9: Social Issues",
    "Unit 10: The Ecosystem",
    "Review 4",
  ],
  "12": [
    "Unit 1: Life Stories We Admire",
    "Unit 2: A Multicultural World",
    "Unit 3: Green Living",
    "Review 1",
    "Unit 4: Urbanisation",
    "Unit 5: The World of Work",
    "Review 2",
    "Unit 6: Artificial Intelligence",
    "Unit 7: The World of Mass Media",
    "Unit 8: Wildlife Conservation",
    "Review 3",
    "Unit 9: Career Paths",
    "Unit 10: Lifelong Learning",
    "Review 4",
  ],
};

type Skill =
  | "Vocabulary"
  | "Grammar"
  | "Getting Started"
  | "Reading"
  | "Speaking"
  | "Listening"
  | "Writing"
  | "Communication & Culture / CLIL"
  | "Looking Back + Project";

/* ================== SKILL LOGIC ================== */
const skillLogic: Record<Skill, string> = {
  Vocabulary: "Create a VOCABULARY WORKSHEET with presentation and practice.",
  Grammar: "Create a GRAMMAR PRACTICE WORKSHEET from form to use.",
  "Getting Started": "Create a lead-in and activation activity.",
  Reading: "Create a READING COMPREHENSION WORKSHEET.",
  Speaking: "Create a SPEAKING PRACTICE WORKSHEET.",
  Listening: "Create a LISTENING COMPREHENSION WORKSHEET.",
  Writing: "Create a WRITING TASK WORKSHEET.",
  "Communication & Culture / CLIL":
    "Create an integrated culture or CLIL worksheet.",
  "Looking Back + Project":
    "Create a review and project-based worksheet.",
};

/* ================== PROMPT BOX ================== */
function PromptBox({ text }: { text: string }) {
  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        background: "#f9fafb",
        padding: "10px 14px",
        margin: "8px 0 14px",
        fontSize: 14,
        lineHeight: 1.6,
        borderRadius: 6,
      }}
    >
      {text}
    </div>
  );
}

/* ================== PROGRESS BAR ================== */
function ProgressBar({ step }: { step: number }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ fontSize: 14, marginBottom: 6 }}>
        Learning Progress: Step {step} / 3
      </div>
      <div
        style={{
          height: 8,
          background: "#e5e7eb",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(step / 3) * 100}%`,
            background: "#2563eb",
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}

export default function Page() {
  const [grade, setGrade] = useState("10");
  const [unit, setUnit] = useState("");
  const [skill, setSkill] = useState<Skill>("Vocabulary");
  const [copied, setCopied] = useState(false);

  const step = unit ? 3 : grade ? 2 : 1;

  const generatePrompt = async () => {
    if (!unit) {
      alert("Please select a unit.");
      return;
    }

    const prompt = `
GRADE: ${grade}
UNIT: ${unit}
SKILL: ${skill}

TASK:
${skillLogic[skill]}
`.trim();

    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 30 }}>
        <h1>Mr. Cảnh’s AI Teaching Assistant</h1>
        <p>English Learning Materials | Grades 10–12</p>
      </header>

      <ProgressBar step={step} />

      {/* STEP 1 */}
      <label>STEP 1 — Choose Grade</label>
      <PromptBox text="Select the student grade level. This defines curriculum scope and difficulty." />
      <select
        value={grade}
        onChange={(e) => {
          setGrade(e.target.value);
          setUnit("");
        }}
        style={{ width: "100%", padding: 10 }}
      >
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
      </select>

      {/* STEP 2 */}
      <label style={{ marginTop: 20, display: "block" }}>
        STEP 2 — Choose Unit
      </label>
      <PromptBox text="Choose the textbook unit. Content will strictly follow this unit." />
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      >
        <option value="">-- Select a unit --</option>
        {unitsByGrade[grade].map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      {/* STEP 3 */}
      <label style={{ marginTop: 20, display: "block" }}>
        STEP 3 — Choose Skill Focus
      </label>
      <PromptBox text="Select the main skill or lesson section to generate focused materials." />
      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value as Skill)}
        style={{ width: "100%", padding: 10 }}
      >
        {(Object.keys(skillLogic) as Skill[]).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        onClick={generatePrompt}
        style={{
          marginTop: 30,
          width: "100%",
          padding: 14,
          fontSize: 16,
          background: copied ? "#16a34a" : "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
      >
        {copied ? "✔ Prompt Copied" : "Generate Lesson Prompt"}
      </button>
    </main>
  );
}

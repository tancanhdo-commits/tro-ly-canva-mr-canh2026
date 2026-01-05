"use client";
import { useState } from "react";

/* ================== UNITS BY GRADE (GLOBAL SUCCESS 10–12) ================== */
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

/* ================== SKILL LOGIC (MOVED OUTSIDE) ================== */
const skillLogic: Record<Skill, string> = {
  Vocabulary: `
Create a VOCABULARY WORKSHEET with academic depth.
Include presentation, controlled practice, contextualised use.
Assessment focus: accuracy, meaning, exam-oriented usage.
`,
  Grammar: `
Create a GRAMMAR PRACTICE WORKSHEET.
Include form–use–meaning explanation, comparison if needed,
controlled → guided → contextualised practice.
Assessment focus: accuracy and application.
`,
  "Getting Started": `
Create an INTRODUCTORY ACTIVITY SHEET.
Include lead-in visuals, prediction tasks, short listening/reading,
and initial discussion to activate background knowledge.
`,
  Reading: `
Create a READING COMPREHENSION WORKSHEET.
Include pre-reading, skimming, scanning, inference,
and post-reading discussion.
Assessment focus: main ideas, details, strategies.
`,
  Speaking: `
Create a SPEAKING PRACTICE WORKSHEET.
Include preparation, guided interaction, freer speaking,
and optional support.
Assessment focus: fluency, pronunciation, coherence.
`,
  Listening: `
Create a LISTENING COMPREHENSION WORKSHEET.
Include pre-listening, gist/detail listening tasks,
and post-listening reflection.
`,
  Writing: `
Create a WRITING TASK WORKSHEET.
Include model text, language focus, guided writing,
independent task, and checklist.
Assessment focus: organisation, accuracy, task fulfilment.
`,
  "Communication & Culture / CLIL": `
Create an INTEGRATED CONTENT–LANGUAGE WORKSHEET.
Include cultural or CLIL content, comprehension,
comparison, and application task.
`,
  "Looking Back + Project": `
Create a REVIEW AND PROJECT WORKSHEET.
Include language & skills review, project steps,
and optional self/peer assessment.
`,
};

export default function Page() {
  const [grade, setGrade] = useState("10");
  const [unit, setUnit] = useState("");
  const [skill, setSkill] = useState<Skill>("Vocabulary");
  const [copied, setCopied] = useState(false);

  const generatePrompt = async () => {
    if (!unit) {
      alert("Please select a unit.");
      return;
    }

    const prompt = `
You are Mr. Cảnh’s AI Teaching Assistant, specializing in designing
high-quality, visual, and interactive English learning materials
for Vietnamese upper secondary students (Grades 10–12).

Aligned with the MOET Global Success curriculum (CTGDPT 2018),
competency-based teaching and assessment,
and THPTQG orientation.

GRADE: ${grade}
SUBJECT: English (Upper Secondary – Vietnam)
UNIT: ${unit}
SKILL FOCUS: ${skill}

TASK:
${skillLogic[skill]}

DESIGN & INTERACTION:
- Large fonts, clear hierarchy
- Canva-style cards
- Explanations before practice
- Interactive quizzes
  ✓ Correct → GREEN
  ✗ Incorrect → RED
- Friendly feedback

PEDAGOGICAL ALIGNMENT:
Communicative, linguistic, strategic, and intercultural competence.

TEACHER INFO:
Name: CANH IT
Contact: 0988 809 539
School: Ba Trang Primary & Secondary Boarding School
Address: Đặng Thùy Trâm Commune, Quang Ngai Province
`.trim();

    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", fontFamily: "Arial" }}>
      <header style={{ textAlign: "center", marginBottom: 40 }}>
        <h1>🎓 Mr. Cảnh’s AI Teaching Assistant</h1>
        <p>High-Quality English Learning Materials | Grades 10–12</p>
      </header>

      <label>STEP 1 — Choose Grade</label>
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

      <label style={{ marginTop: 16, display: "block" }}>
        STEP 2 — Choose Unit
      </label>
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

      <label style={{ marginTop: 16, display: "block" }}>
        STEP 3 — Choose Skill Focus
      </label>
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
          padding: 16,
          fontSize: 18,
          background: copied ? "#16a34a" : "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: 8,
        }}
      >
        {copied
          ? "✔ LESSON GENERATED & COPIED"
          : "🎯 GENERATE MY LESSON MATERIAL"}
      </button>
    </main>
  );
}


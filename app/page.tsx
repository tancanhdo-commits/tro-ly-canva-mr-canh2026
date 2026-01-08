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
  Grammar: "Create a GRAMMAR PRACTICE WORKSHEET with form–use–meaning.",
  "Getting Started": "Create an INTRODUCTORY ACTIVITY SHEET.",
  Reading: "Create a READING COMPREHENSION WORKSHEET.",
  Speaking: "Create a SPEAKING PRACTICE WORKSHEET.",
  Listening: "Create a LISTENING COMPREHENSION WORKSHEET.",
  Writing: "Create a WRITING TASK WORKSHEET.",
  "Communication & Culture / CLIL": "Create a CLIL worksheet.",
  "Looking Back + Project": "Create a REVIEW AND PROJECT worksheet.",
};

/* ================== PAGE ================== */
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
You are Mr. Cảnh’s AI Teaching Assistant.

GRADE: ${grade}
SUBJECT: English (Vietnam Upper Secondary)
UNIT: ${unit}
SKILL FOCUS: ${skill}

TASK:
${skillLogic[skill]}

Design visually rich, student-friendly materials aligned with MOET Global Success.
`.trim();

    await navigator.clipboard.writeText(prompt);
    setCopied(true);

    // ✅ CLEAR TEACHER INSTRUCTION
    alert(
      "✅ Prompt copied!\n\n" +
        "Next steps in Canva:\n" +
        "1️⃣ Click the AI Code input box\n" +
        "2️⃣ Press Ctrl + V (Cmd + V on Mac)\n" +
        "3️⃣ Click Generate"
    );

    // ✅ OPEN CANVA IN NEW TAB
    window.open("https://www.canva.com/ai/code", "_blank");
  };

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>
        🎓 Mr. Cảnh’s Canva AI Teaching Assistant
      </h1>

      <label><strong>Grade</strong></label>
      <select
        value={grade}
        onChange={(e) => {
          setGrade(e.target.value);
          setUnit("");
        }}
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      >
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
      </select>

      <label><strong>Unit</strong></label>
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      >
        <option value="">-- Select a unit --</option>
        {unitsByGrade[grade].map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      <label><strong>Skill Focus</strong></label>
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
          fontSize: 16,
          background: copied ? "#16a34a" : "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
      >
        {copied ? "✔ PROMPT COPIED" : "GENERATE LESSON MATERIAL"}
      </button>
    </main>
  );
}

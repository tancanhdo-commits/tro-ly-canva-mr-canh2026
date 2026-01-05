"use client";
import { useState } from "react";

/* ================== UNIT DATA (GLOBAL SUCCESS 10–12) ================== */
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

const skills = [
  "Vocabulary",
  "Grammar",
  "Getting Started",
  "Reading",
  "Listening",
  "Speaking",
  "Writing",
  "Communication & Culture / CLIL",
  "Looking Back + Project",
];

export default function Page() {
  const [grade, setGrade] = useState<string | null>(null);
  const [unit, setUnit] = useState<string | null>(null);
  const [skill, setSkill] = useState<string | null>(null);

  const canGenerate = grade && unit && skill;

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      {/* ================= HERO ================= */}
      <section className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Design Professional English Learning Materials in One Click
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Aligned with MOET Global Success Curriculum – Interactive • Visual • Exam-Oriented
        </p>
        <div className="mt-6 inline-block rounded-xl bg-blue-50 px-6 py-3 text-blue-800 font-medium">
          👉 Click the options below to customize your lesson. No typing required.
        </div>
      </section>

      {/* ================= IDENTITY ================= */}
      <section className="max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow mb-10">
        <h2 className="text-2xl font-bold mb-3">👨🏫 Assistant Identity</h2>
        <p className="text-slate-700 leading-relaxed">
          You are <strong>Mr. Cảnh’s AI Teaching Assistant</strong>, specializing in
          high-quality, visual, interactive English learning materials for
          Vietnamese upper secondary students (Grades 10–12), strictly aligned with
          the <strong>MOET Global Success Curriculum (CTGDPT 2018)</strong>.
        </p>
        <ul className="mt-4 grid md:grid-cols-2 gap-2 text-slate-700">
          <li>✔ Competency-based teaching & assessment</li>
          <li>✔ Academic rigor for school tests & THPTQG</li>
          <li>✔ Higher-order thinking skills</li>
          <li>✔ No placeholders – No superficial tasks</li>
        </ul>
      </section>

      {/* ================= STEP 1: GRADE ================= */}
      <section className="max-w-5xl mx-auto mb-10">
        <h3 className="text-xl font-bold mb-4">🧭 STEP 1 — Choose Grade</h3>
        <div className="flex gap-4">
          {["10", "11", "12"].map((g) => (
            <button
              key={g}
              onClick={() => {
                setGrade(g);
                setUnit(null);
                setSkill(null);
              }}
              className={`px-6 py-3 rounded-xl font-semibold border
                ${
                  grade === g
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-50"
                }`}
            >
              Grade {g}
            </button>
          ))}
        </div>
      </section>

      {/* ================= STEP 2: UNIT ================= */}
      {grade && (
        <section className="max-w-5xl mx-auto mb-10">
          <h3 className="text-xl font-bold mb-4">📘 STEP 2 — Choose Unit</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {unitsByGrade[grade].map((u) => (
              <div
                key={u}
                onClick={() => setUnit(u)}
                className={`cursor-pointer rounded-xl border p-4 shadow-sm transition
                  ${
                    unit === u
                      ? "border-blue-600 bg-blue-50"
                      : "bg-white hover:border-blue-300"
                  }`}
              >
                <p className="font-medium text-slate-800">{u}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= STEP 3: SKILL ================= */}
      {unit && (
        <section className="max-w-5xl mx-auto mb-10">
          <h3 className="text-xl font-bold mb-4">🎯 STEP 3 — Skill Focus</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((s) => (
              <button
                key={s}
                onClick={() => setSkill(s)}
                className={`rounded-xl px-4 py-3 text-left border font-medium
                  ${
                    skill === s
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-blue-50"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="max-w-5xl mx-auto text-center">
        <button
          disabled={!canGenerate}
          className={`w-full md:w-auto px-10 py-4 text-xl font-bold rounded-2xl transition
            ${
              canGenerate
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
        >
          🎯 GENERATE MY LESSON MATERIAL
        </button>

        {canGenerate && (
          <p className="mt-4 text-slate-600">
            Grade {grade} • {unit} • {skill}
          </p>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="max-w-5xl mx-auto mt-14 text-sm text-slate-500 text-center">
        Teacher: <strong>CANH IT</strong> • 0988 809 539 <br />
        Ba Trang Primary & Secondary Boarding School – Quảng Ngãi
      </footer>
    </main>
  );
}

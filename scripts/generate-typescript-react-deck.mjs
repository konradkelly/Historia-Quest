import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.author = "Historia Quest";
pptx.company = "Web Development Course";
pptx.subject = "TypeScript with React";
pptx.title = "TypeScript with React - Historia Quest";
pptx.layout = "LAYOUT_WIDE";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};

const colors = {
  bg: "0B1020",
  bgAlt: "121933",
  title: "F4F7FF",
  body: "DCE4FF",
  accent: "53D2DC",
  warn: "FFC857",
  ok: "54E38E",
  codeBg: "0A0F1F",
};

function addBackground(slide, alt = false) {
  slide.background = { color: alt ? colors.bgAlt : colors.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.28,
    fill: { color: colors.accent, transparency: 20 },
    line: { color: colors.accent, transparency: 100 },
  });
}

function addTitle(slide, text, subtitle) {
  slide.addText(text, {
    x: 0.6,
    y: 0.45,
    w: 12.1,
    h: 0.7,
    fontSize: 34,
    bold: true,
    color: colors.title,
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6,
      y: 1.2,
      w: 12.1,
      h: 0.45,
      fontSize: 15,
      color: colors.body,
    });
  }
}

function addBullets(slide, lines, x = 0.8, y = 1.9, w = 12, h = 4.8) {
  const runs = lines.map((line) => ({ text: line, options: { bullet: { indent: 18 } } }));
  slide.addText(runs, {
    x,
    y,
    w,
    h,
    fontSize: 22,
    color: colors.body,
    breakLine: true,
    paraSpaceAfterPt: 14,
    hanging: 4,
  });
}

function addCode(slide, code, x = 0.7, y = 2.0, w = 12.0, h = 4.8) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: colors.codeBg },
    line: { color: "2A3A6A", pt: 1 },
  });
  slide.addText(code, {
    x: x + 0.25,
    y: y + 0.2,
    w: w - 0.5,
    h: h - 0.35,
    fontFace: "Cascadia Code",
    fontSize: 14,
    color: "CFE0FF",
    breakLine: true,
  });
}

function addFooter(slide, text = "Examples from the Historia Quest React app") {
  slide.addText(text, {
    x: 0.6,
    y: 7.15,
    w: 12,
    h: 0.25,
    fontSize: 10,
    color: "95A7D8",
    align: "right",
  });
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "TypeScript with React", "Learning TypeScript from a real app: Historia Quest");
  addBullets(slide, [
    "Goal: understand TypeScript basics by reading code you already know",
    "Audience: React + JavaScript developers who are new to TypeScript",
    "Approach: concept, app example, and why it helps",
    "Outcome: you can write typed props, state, events, and helpers",
  ], 0.8, 2.0, 12, 3.6);
  slide.addText("Class Deck", {
    x: 0.8,
    y: 6.1,
    w: 3.5,
    h: 0.6,
    fontSize: 30,
    bold: true,
    color: colors.accent,
  });
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Why TypeScript in React?", "Same React patterns, better feedback from your editor");
  addBullets(slide, [
    "Catches mistakes before runtime (wrong prop names, wrong value types)",
    "Autocompletes data fields from interfaces",
    "Makes refactoring safer in larger components",
    "Documents your component API without extra docs",
  ]);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "Type 1: Union Types", "Limit a value to specific allowed strings");
  addCode(
    slide,
    "export type Category = \"Scientist\" | \"Leader\" | \"Artist\" | \"Philosopher\";\n\n"
      + "type FilterValue = Category | \"All\";"
  );
  addBullets(slide, [
    "From src/types.ts and src/App.tsx",
    "Only known categories are valid",
    "Prevents typo bugs like \"Scienstist\" in filters",
  ], 0.8, 6.05, 12, 1.0);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Type 2: Interfaces for Data Shapes", "Describe what every object must contain");
  addCode(
    slide,
    "export interface HistoricalFigure {\n"
      + "  id: number;\n"
      + "  name: string;\n"
      + "  category: Category;\n"
      + "  birthYear: number;\n"
      + "  deathYear: number | null;\n"
      + "  nationality: string;\n"
      + "  knownFor: string;\n"
      + "  emoji: string;\n"
      + "}"
  );
  addBullets(slide, [
    "deathYear can be number or null (a union)",
    "TypeScript enforces this shape in data.ts",
  ], 0.8, 6.0, 12, 1.2);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "Typed Arrays and Compile-Time Checks", "Your data file is validated against the interface");
  addCode(
    slide,
    "import type { HistoricalFigure } from \"./types\";\n\n"
      + "export const figures: HistoricalFigure[] = [\n"
      + "  { id: 1, name: \"Marie Curie\", category: \"Scientist\", ... },\n"
      + "  { id: 2, name: \"Isaac Newton\", category: \"Scientist\", ... },\n"
      + "];"
  );
  addBullets(slide, [
    "If one object misses a required field, build fails",
    "If category is not in Category union, build fails",
    "Great for preventing bad seed data",
  ], 0.8, 5.85, 12, 1.4);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Typed React State", "Use generic type parameters with useState");
  addCode(
    slide,
    "const [activeCategory, setActiveCategory] = useState<FilterValue>(\"All\");\n"
      + "const [selectedId, setSelectedId] = useState<number | null>(null);\n"
      + "const [searchQuery, setSearchQuery] = useState<string>(\"\");"
  );
  addBullets(slide, [
    "selectedId is either a number or null",
    "setSelectedId(\"hello\") becomes a type error",
    "State type makes downstream logic safer",
  ], 0.8, 5.9, 12, 1.3);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "Typed Event Handlers", "Know exactly what event target you have");
  addCode(
    slide,
    "const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {\n"
      + "  setSearchQuery(e.target.value);\n"
      + "};"
  );
  addBullets(slide, [
    "From src/App.tsx",
    "Type tells TS this handler comes from an input element",
    "Prevents invalid property access on e.target",
  ], 0.8, 5.9, 12, 1.4);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Typed Props in Components", "Components become self-documenting APIs");
  addCode(
    slide,
    "interface FilterBarProps {\n"
      + "  active: FilterValue;\n"
      + "  onChange: (filter: FilterValue) => void;\n"
      + "}\n\n"
      + "export const FilterBar = ({ active, onChange }: FilterBarProps) => { ... };"
  );
  addBullets(slide, [
    "Caller must pass exact prop names and value types",
    "onChange can only receive valid filter values",
  ], 0.8, 5.95, 12, 1.2);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "Component Props: ProfileCard Example", "Function signatures also enforce callback types");
  addCode(
    slide,
    "interface ProfileCardProps {\n"
      + "  figure: HistoricalFigure;\n"
      + "  isSelected: boolean;\n"
      + "  onClick: (id: number) => void;\n"
      + "}\n\n"
      + "onKeyDown={(e) => e.key === \"Enter\" && onClick(figure.id)}"
  );
  addBullets(slide, [
    "onClick always receives a number id",
    "Keyboard event e is inferred as React keyboard event",
  ], 0.8, 5.9, 12, 1.25);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Generics: Reusable Type-Safe Helpers", "One function works for arrays of any type");
  addCode(
    slide,
    "const shuffle = <T,>(items: T[]): T[] => {\n"
      + "  const cloned = [...items];\n"
      + "  // Fisher-Yates shuffle\n"
      + "  return cloned;\n"
      + "};"
  );
  addBullets(slide, [
    "From src/components/quiz/quizUtils.ts",
    "T can be string, number, HistoricalFigure, etc.",
    "Input and output stay the same item type",
  ], 0.8, 5.9, 12, 1.35);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "Optional Properties and Unions", "Model values that may not exist yet");
  addCode(
    slide,
    "export interface QuizFeedback {\n"
      + "  status: \"correct\" | \"wrong\";\n"
      + "  message: string;\n"
      + "  emoji?: string;\n"
      + "}\n\n"
      + "{feedback.emoji ? `${feedback.emoji} ` : \"\"}"
  );
  addBullets(slide, [
    "emoji? means optional",
    "UI safely checks before rendering optional value",
  ], 0.8, 5.95, 12, 1.2);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Inference vs Explicit Types", "Let TS infer when obvious, annotate when needed");
  addBullets(slide, [
    "Inference example: const selected = figures.find(...) ?? null",
    "Explicit type helps readability: const filtered: HistoricalFigure[] = ...",
    "Rule of thumb: annotate public APIs and complex state",
    "Avoid over-typing every local variable",
  ], 0.8, 2.1, 12, 3.0);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 5.1,
    w: 12,
    h: 1.4,
    fill: { color: "11203F" },
    line: { color: "2A3A6A", pt: 1 },
  });
  slide.addText("TypeScript is strongest when it represents your domain model and component boundaries.", {
    x: 1.1,
    y: 5.45,
    w: 11.4,
    h: 0.8,
    fontSize: 20,
    bold: true,
    color: colors.accent,
    align: "center",
  });
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "JS to TS Migration Pattern", "How this app gradually adds types");
  addBullets(slide, [
    "1) Define domain types first (Category, HistoricalFigure)",
    "2) Type your data source (figures: HistoricalFigure[])",
    "3) Type component props and callbacks",
    "4) Type useState where null or unions are involved",
    "5) Type event handlers and utility return values",
  ], 0.8, 2.0, 12, 3.6);
  slide.addText("Small steps, immediate value", {
    x: 0.8,
    y: 6.1,
    w: 5.0,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: colors.ok,
  });
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Common Beginner Errors (And Fixes)", "Real mistakes from JavaScript to TypeScript transition");
  addBullets(slide, [
    "Error: assigning invalid category string -> Fix: use Category union values only",
    "Error: forgetting null checks -> Fix: use guard clauses or optional chaining",
    "Error: missing required prop -> Fix: satisfy the interface contract",
    "Error: using any too early -> Fix: model domain with interfaces first",
  ], 0.8, 2.0, 12, 3.8);
  slide.addText("Tip: keep strict TypeScript settings on", {
    x: 0.8,
    y: 6.15,
    w: 6.5,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: colors.warn,
  });
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide);
  addTitle(slide, "Class Exercise", "Apply TypeScript improvements to this app");
  addBullets(slide, [
    "Add a new Category and update all related unions/components",
    "Create a reusable helper: getLifespan(figure: HistoricalFigure): number | null",
    "Add a new optional field to HistoricalFigure and render it safely",
    "Refactor one component and rely on type errors to guide fixes",
  ], 0.8, 2.0, 12, 3.8);
  addFooter(slide);
}

{
  const slide = pptx.addSlide();
  addBackground(slide, true);
  addTitle(slide, "Wrap-Up", "What to remember");
  addBullets(slide, [
    "TypeScript does not replace React knowledge; it strengthens it",
    "Start with types for data models, then props, then state/events",
    "Use unions and interfaces to encode real app rules",
    "Trust compiler feedback as part of your development loop",
  ], 0.8, 2.0, 12, 3.4);
  slide.addText("Next: convert one JavaScript component to TypeScript this week", {
    x: 0.8,
    y: 5.8,
    w: 11,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: colors.accent,
  });
  addFooter(slide, "Deck generated from your app source files");
}

await pptx.writeFile({ fileName: "TypeScript-with-React-Historia-Quest.pptx" });
console.log("Created TypeScript-with-React-Historia-Quest.pptx");

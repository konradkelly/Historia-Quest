import { useState } from "react";
import { FilterBar } from "./components/FilterBar";
import { ProfileCard } from "./components/ProfileCard";
import { QuizPanel } from "./components/quiz/QuizPanel";
import { TrophyModal } from "./components/quiz/TrophyModal";
import { figures } from "./data";
import type { Category, HistoricalFigure } from "./types";
import { buildQuestion, pickWrongEmoji } from "./components/quiz/quizUtils";
import type { QuizFeedback, QuizQuestion } from "./components/quiz/quizTypes";
import "./App.css";

// Union type for the active filter (a Category or the "All" wildcard)
type FilterValue = Category | "All";

// Helper: turn a numeric year into a display string
const formatYear = (year: number): string =>
  year < 0 ? `${Math.abs(year)} BC` : String(year);

function App() {
  // Typed state: only a Category string or "All" is accepted
  const [activeCategory, setActiveCategory] = useState<FilterValue>("All");

  // Typed state: the selected card's id, or null if nothing is selected
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Typed state: the search query string
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [question, setQuestion] = useState<QuizQuestion>(() => buildQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<QuizFeedback | null>(null);
  const [showTrophyModal, setShowTrophyModal] = useState<boolean>(false);

  // Typed event handler — React.ChangeEvent tells TS this came from an <input>
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Derive filtered list from state — TypeScript knows this is HistoricalFigure[]
  const filtered: HistoricalFigure[] = figures
    .filter((f) => activeCategory === "All" || f.category === activeCategory)
    .filter(
      (f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.knownFor.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const selected = figures.find((f) => f.id === selectedId) ?? null;

  const handleCardClick = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) {
      return;
    }

    if (selectedAnswer === question.correctAnswer) {
      setQuizFeedback({
        status: "correct",
        message: "Correct! You unlocked the golden trophy!",
      });
      setShowTrophyModal(true);
      return;
    }

    setQuizFeedback({
      status: "wrong",
      message: `Not quite. The correct answer is ${question.correctAnswer}.`,
      emoji: pickWrongEmoji(),
    });
  };

  const handleNextQuestion = () => {
    setQuestion(buildQuestion());
    setSelectedAnswer(null);
    setQuizFeedback(null);
    setShowTrophyModal(false);
  };

  return (
    <div className="app">
      <header>
        <h1>Historia Quest</h1>
        <p className="subtitle">Profiles of History's Greatest Minds</p>
      </header>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or contribution…"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <FilterBar active={activeCategory} onChange={setActiveCategory} />

      <QuizPanel
        question={question}
        selectedAnswer={selectedAnswer}
        feedback={quizFeedback}
        onSelectAnswer={setSelectedAnswer}
        onCheckAnswer={handleCheckAnswer}
        onNextQuestion={handleNextQuestion}
      />

      <div className="profile-grid">
        {filtered.length > 0 ? (
          filtered.map((figure) => (
            <ProfileCard
              key={figure.id}
              figure={figure}
              isSelected={selectedId === figure.id}
              onClick={handleCardClick}
            />
          ))
        ) : (
          <p className="no-results">No figures match your search.</p>
        )}
      </div>

      {selected && (
        <div className={`detail-panel cat-${selected.category.toLowerCase()}`}>
          <span className="detail-emoji">{selected.emoji}</span>
          <div className="detail-content">
            <div className="detail-header">
              <h2>{selected.name}</h2>
              <span
                className={`category-badge cat-${selected.category.toLowerCase()}`}
              >
                {selected.category}
              </span>
            </div>
            <p>
              <strong>Nationality:</strong> {selected.nationality}
            </p>
            <p>
              <strong>Years:</strong> {formatYear(selected.birthYear)} –{" "}
              {selected.deathYear !== null
                ? formatYear(selected.deathYear)
                : "Present"}
            </p>
            <p>
              <strong>Known for:</strong> {selected.knownFor}
            </p>
          </div>
          <button className="close-btn" onClick={() => setSelectedId(null)}>
            ✕
          </button>
        </div>
      )}

      {showTrophyModal && <TrophyModal onClose={() => setShowTrophyModal(false)} />}
    </div>
  );
}

export default App;


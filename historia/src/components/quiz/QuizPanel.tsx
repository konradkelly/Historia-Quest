import type { QuizFeedback, QuizQuestion } from "./quizTypes";

interface QuizPanelProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  feedback: QuizFeedback | null;
  onSelectAnswer: (answer: string) => void;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
}

export const QuizPanel = ({
  question,
  selectedAnswer,
  feedback,
  onSelectAnswer,
  onCheckAnswer,
  onNextQuestion,
}: QuizPanelProps) => {
  return (
    <section className="quiz-panel">
      <div className="quiz-header">
        <h2>History Quiz</h2>
        <p>Pick the correct historical figure.</p>
      </div>

      <p className="quiz-question">{question.prompt}</p>

      <div className="quiz-options">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className={`quiz-option ${selectedAnswer === option ? "selected" : ""}`}
            onClick={() => onSelectAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="quiz-actions">
        <button
          type="button"
          className="quiz-cta"
          onClick={onCheckAnswer}
          disabled={!selectedAnswer}
        >
          Check Answer
        </button>
        <button type="button" className="quiz-next" onClick={onNextQuestion}>
          Next Question
        </button>
      </div>

      {feedback && (
        <p className={`quiz-feedback ${feedback.status}`}>
          {feedback.emoji ? `${feedback.emoji} ` : ""}
          {feedback.message}
        </p>
      )}
    </section>
  );
};

import { figures } from "../../data";
import type { QuizQuestion } from "./quizTypes";

const shuffle = <T,>(items: T[]): T[] => {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};

export const pickWrongEmoji = (): string => {
  const wrongEmojis = ["🔥", "😲"] as const;
  return wrongEmojis[Math.floor(Math.random() * wrongEmojis.length)];
};

export const buildQuestion = (): QuizQuestion => {
  const target = figures[Math.floor(Math.random() * figures.length)];
  const distractors = shuffle(
    figures
      .filter((figure) => figure.id !== target.id)
      .map((figure) => figure.name)
  ).slice(0, 3);

  const options = shuffle([target.name, ...distractors]);

  return {
    prompt: `Who is known for: "${target.knownFor}"?`,
    options,
    correctAnswer: target.name,
  };
};

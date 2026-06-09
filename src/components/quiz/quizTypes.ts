export interface QuizQuestion {
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizFeedback {
  status: "correct" | "wrong";
  message: string;
  emoji?: string;
}

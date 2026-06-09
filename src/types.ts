// 1. Union type — only these four strings are valid as a category
export type Category = "Scientist" | "Leader" | "Artist" | "Philosopher";

// 2. Interface — describes the shape of every figure object
export interface HistoricalFigure {
  id: number;
  name: string;
  category: Category;       // must be one of the four category strings above
  birthYear: number;        // negative = BC  (e.g. -100 = 100 BC)
  deathYear: number | null; // null if still living
  nationality: string;
  knownFor: string;
  emoji: string;
}

import type { HistoricalFigure } from "../types";

// Typed props — TypeScript enforces every caller passes exactly these fields
interface ProfileCardProps {
  figure: HistoricalFigure;
  isSelected: boolean;
  onClick: (id: number) => void;
}

// Helper: turn a numeric year into a display string (negative = BC)
const formatYear = (year: number): string =>
  year < 0 ? `${Math.abs(year)} BC` : String(year);

export const ProfileCard = ({ figure, isSelected, onClick }: ProfileCardProps) => {
  const years =
    figure.deathYear !== null
      ? `${formatYear(figure.birthYear)} – ${formatYear(figure.deathYear)}`
      : `b. ${formatYear(figure.birthYear)}`;

  return (
    <div
      className={[
        "profile-card",
        `cat-${figure.category.toLowerCase()}`,
        isSelected ? "selected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onClick(figure.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(figure.id)}
    >
      <span className="card-emoji">{figure.emoji}</span>
      <h2>{figure.name}</h2>
      <span className={`category-badge cat-${figure.category.toLowerCase()}`}>
        {figure.category}
      </span>
      <p className="card-years">{years}</p>
      <p className="card-nationality">{figure.nationality}</p>
    </div>
  );
};

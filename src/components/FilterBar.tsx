import type { Category } from "../types";

// Union type used as the filter value: any Category OR the special "All" string
type FilterValue = Category | "All";

// Typed props — the shape this component requires
interface FilterBarProps {
  active: FilterValue;
  onChange: (filter: FilterValue) => void;
}

const FILTERS: FilterValue[] = [
  "All",
  "Scientist",
  "Leader",
  "Artist",
  "Philosopher",
];

export const FilterBar = ({ active, onChange }: FilterBarProps) => {
  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={[
            "filter-btn",
            active === f ? "active" : "",
            f !== "All" ? `cat-${f.toLowerCase()}` : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

import { useState, useMemo } from "react";
import { recipes } from "./data/recipes";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("All");

  const allTags = useMemo(
    () => ["All", ...new Set(recipes.flatMap((r) => r.tags))],
    []
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? recipes
        : recipes.filter((r) => r.tags.includes(filter)),
    [filter]
  );

  const selectedRecipe =
    selectedId !== null ? recipes.find((r) => r.id === selectedId) : null;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="header">
        <h1>Bulk Meal Recipes</h1>
        <p>High protein · No red meat · Meal prep ready</p>
      </div>

      <div className="filters">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`filter-btn ${filter === tag ? "active" : ""}`}
            onClick={() => setFilter(tag)}
          >
            {tag}
            {tag === "All" && (
              <span className="count-badge">{recipes.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onSelect={() => setSelectedId(r.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="empty">No recipes match this filter yet.</div>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

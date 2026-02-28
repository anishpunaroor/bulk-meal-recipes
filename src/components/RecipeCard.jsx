import { TAG_COLORS } from "../data/recipes";

const CARD_STATS = (r) => [
  { val: r.servings, label: "Servings" },
  { val: r.protein, label: "Protein" },
  { val: r.calories, label: "Calories" },
  { val: r.prepTime, label: "Prep" },
];

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div className="card" onClick={onSelect}>
      <div className="card-header" style={{ background: recipe.bg }}>
        <span className="card-emoji">{recipe.emoji}</span>
        <div className="card-title">{recipe.title}</div>
        <div className="card-source">{recipe.source}</div>
        <div className="card-desc">{recipe.description}</div>
      </div>
      <div className="card-tags">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="tag"
            style={{
              background: (TAG_COLORS[tag] || "#6b7280") + "18",
              color: TAG_COLORS[tag] || "#6b7280",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="card-stats">
        {CARD_STATS(recipe).map(({ val, label }) => (
          <div key={label} className="stat">
            <div className="stat-val">{val}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";

const MODAL_STATS = (r) => [
  { val: r.servings, label: "Servings" },
  { val: r.protein, label: "Protein/serving" },
  { val: r.calories + " cal", label: "Calories" },
  { val: r.cookTime, label: "Cook Time" },
];

export default function RecipeModal({ recipe, onClose }) {
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx) => {
    setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-label={recipe.title}>
        <div className="modal-header">
          <div>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{recipe.emoji}</div>
            <div className="modal-title">{recipe.title}</div>
            <div className="modal-source">
              From{" "}
              <a href={recipe.url} target="_blank" rel="noreferrer">
                {recipe.source} ↗
              </a>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-stats">
          {MODAL_STATS(recipe).map(({ val, label }) => (
            <div key={label} className="modal-stat">
              <div
                className="modal-stat-val"
                style={{ color: recipe.color }}
              >
                {val}
              </div>
              <div className="modal-stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="modal-body">
          <div>
            <div className="section-title">Ingredients</div>
            {recipe.ingredients.map((ing, i) => {
              const checked = checkedIngredients[i];
              return (
                <div
                  key={i}
                  className={`ingredient-item ${checked ? "checked" : ""}`}
                  onClick={() => toggleIngredient(i)}
                >
                  <div className={`checkbox ${checked ? "checked" : ""}`}>
                    {checked && (
                      <span
                        style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <span>{ing}</span>
                </div>
              );
            })}
          </div>

          <div>
            <div className="section-title">Steps</div>
            {recipe.steps.map((step, i) => {
              const checked = checkedSteps[i];
              return (
                <div
                  key={i}
                  className={`step-item ${checked ? "checked" : ""}`}
                  onClick={() => toggleStep(i)}
                >
                  <div className="step-num">{i + 1}</div>
                  <div className="step-text">{step}</div>
                </div>
              );
            })}
          </div>

          {recipe.notes && (
            <div className="notes-box">
              <div
                className="section-title"
                style={{ borderColor: "#e8c875" }}
              >
                Notes
              </div>
              <p>{recipe.notes}</p>
            </div>
          )}

          <div className="storage-box">
            <div className="storage-item">
              <div className="storage-label">Fridge</div>
              <div className="storage-val">{recipe.fridge}</div>
            </div>
            <div className="storage-item">
              <div className="storage-label">Freezer</div>
              <div className="storage-val">{recipe.freezer}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

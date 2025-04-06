import { GameConfig } from "../types";

const cardThemes = [
  { value: "animals", label: "Animals", preview: "🦁" },
  { value: "space", label: "Space", preview: "🚀" },
  { value: "fruits", label: "Fruits", preview: "🍓" },
  { value: "flags", label: "Flags", preview: "🏁" },
];

const cardCounts = [12, 16, 20, 24, 30];

type CardSelectionSectionProps = {
  handleThemeKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  handleThemeChange: (direction: "prev" | "next") => void;
  currentTheme: { value: string; label: string; preview: string };
  handleSelectTheme: (index: number) => void;
  cardThemeIndex: number;
  cardCount: number;
  updateConfig: (updates: Partial<GameConfig>) => void;
};

const CardSelectionSection: React.FC<CardSelectionSectionProps> = ({
  handleThemeKeyDown,
  handleThemeChange,
  currentTheme,
  handleSelectTheme,
  cardThemeIndex,
  cardCount,
  updateConfig,
}) => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Card Settings</h2>

      <div className="flex flex-col gap-4 max-w-sm">
        <div>
          <label className="block mb-1">Card Theme</label>
          <div
            role="listbox"
            tabIndex={0}
            aria-label="Card theme selector"
            onKeyDown={handleThemeKeyDown}
            className="flex items-center gap-3 p-2 border border-gray-300 rounded focus:outline-none"
          >
            <button
              type="button"
              onClick={() => handleThemeChange("prev")}
              aria-label="Previous theme"
              className="px-2 py-1 border rounded hover:bg-gray-100"
            >
              ←
            </button>

            <div
              role="option"
              aria-selected="true"
              className="flex flex-col items-center justify-center w-24 h-24 border border-gray-300 rounded"
            >
              <div className="text-4xl">{currentTheme.preview}</div>
              <div className="text-sm mt-1">{currentTheme.label}</div>
            </div>

            <button
              type="button"
              onClick={() => handleThemeChange("next")}
              aria-label="Next theme"
              className="px-2 py-1 border rounded hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-3">
          {cardThemes.map((theme, index) => (
            <button
              key={theme.value}
              onClick={() => handleSelectTheme(index)}
              className={`px-3 py-1 border rounded ${
                index === cardThemeIndex
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              aria-label={`Select ${theme.label}`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-1">
          <span>Number of Cards</span>
          <select
            value={cardCount}
            onChange={(e) =>
              updateConfig({ cardCount: Number(e.target.value) })
            }
            className="p-1 border border-gray-300 rounded"
          >
            {cardCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
};

export { CardSelectionSection };

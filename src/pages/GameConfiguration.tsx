import { useLocalStorage } from "react-use";

import { To, useNavigate } from "react-router-dom";
import { PlayerSelectionSection } from "../components/PlayerSelectionSection";
import { GameConfig, PlayerType } from "../types";
import { CardSelectionSection } from "../components/CardSelectionSection";

const cardThemes = [
  { value: "animals", label: "Animals", preview: "🦁" },
  { value: "space", label: "Space", preview: "🚀" },
  { value: "fruits", label: "Fruits", preview: "🍓" },
  { value: "flags", label: "Flags", preview: "🏁" },
];

const defaultConfig: GameConfig = {
  players: ["human", "bot-easy"],
  cardThemeIndex: 0,
  cardCount: 16,
};

function GameConfiguration() {
  const navigate = useNavigate();
  const [config, setConfig] = useLocalStorage<GameConfig>(
    "game-config",
    defaultConfig,
  );

  if (!config) return null;

  const { players, cardThemeIndex, cardCount } = config;
  const currentTheme = cardThemes[cardThemeIndex];

  const updateConfig = (updates: Partial<GameConfig>) =>
    setConfig({ ...config, ...updates });

  const handlePlayerChange = (index: number, value: PlayerType) => {
    const updated = [...players];
    updated[index] = value;
    updateConfig({ players: updated });
  };

  const handleRemovePlayer = (index: number) => {
    updateConfig({ players: players.filter((_, i) => i !== index) });
  };

  const handleAddPlayer = () => {
    if (players.length < 4) {
      updateConfig({ players: [...players, "human"] });
    }
  };

  const handleThemeChange = (direction: "prev" | "next") => {
    updateConfig({
      cardThemeIndex:
        direction === "prev"
          ? (cardThemeIndex - 1 + cardThemes.length) % cardThemes.length
          : (cardThemeIndex + 1) % cardThemes.length,
    });
  };

  const handleSelectTheme = (index: number) => {
    updateConfig({ cardThemeIndex: index });
  };

  const handleThemeKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      handleThemeChange("prev");
    } else if (e.key === "ArrowRight") {
      handleThemeChange("next");
    }
  };

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const isStartDisabled =
    players.length < 1 || !cardThemes[cardThemeIndex] || !cardCount;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <PlayerSelectionSection
        players={players}
        onChange={handlePlayerChange}
        onRemove={handleRemovePlayer}
        onAdd={handleAddPlayer}
      />

      <CardSelectionSection
        handleThemeKeyDown={handleThemeKeyDown}
        handleThemeChange={handleThemeChange}
        currentTheme={currentTheme}
        handleSelectTheme={handleSelectTheme}
        cardThemeIndex={cardThemeIndex}
        cardCount={cardCount}
        updateConfig={updateConfig}
      />

      <section>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => handleNavigation("/game")}
            disabled={isStartDisabled}
            className={`px-6 py-3 text-white font-semibold rounded ${
              isStartDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Start Game
          </button>
        </div>
      </section>
    </div>
  );
}

export { GameConfiguration };

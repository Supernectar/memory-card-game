import React from "react";

type PlayerType = "human" | "bot-easy" | "bot-medium" | "bot-hard";

const botOptions = [
  { value: "bot-easy", label: "Bot – Easy" },
  { value: "bot-medium", label: "Bot – Medium" },
  { value: "bot-hard", label: "Bot – Hard" },
];

type Props = {
  players: PlayerType[];
  onChange: (index: number, value: PlayerType) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
};

const PlayerSelectionSection: React.FC<Props> = ({
  players,
  onChange,
  onRemove,
  onAdd,
}) => (
  <section>
    <h2 className="text-lg font-semibold mb-3">Players</h2>
    <div className="space-y-3">
      {players.map((type, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-2 border border-gray-300 rounded"
        >
          <label htmlFor={`player-${i}`} className="w-24">
            Player {i + 1}
          </label>

          <select
            id={`player-${i}`}
            value={type}
            onChange={(e) => onChange(i, e.target.value as PlayerType)}
            className="flex-1 p-1 border border-gray-300 rounded"
          >
            <option value="human">Human</option>
            {botOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {i > 0 && (
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label={`Remove Player ${i + 1}`}
              className="text-sm px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>

    <div className="mt-4">
      <button
        type="button"
        onClick={onAdd}
        disabled={players.length >= 4}
        className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        ➕ Add Player
      </button>
    </div>
  </section>
);

export { PlayerSelectionSection };

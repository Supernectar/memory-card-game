import { Player } from "../../types";
import { PlayerCard } from "../PlayerCard/PlayerCard";

interface PlayerListProps {
  players: Player[];
}

function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="flex justify-around mb-4 gap-10">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          image={player.image}
          name={player.name}
          remainingTime={player.remainingTime}
          moves={player.moves}
          pairsCaught={player.pairsCaught}
          isActive={player.isActive}
        />
      ))}
    </div>
  );
}

export { PlayerList };

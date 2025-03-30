type PlayerCardProps = {
  image: string;
  name: string;
  remainingTime: string;
  moves: number;
  pairsCaught: number;
  isActive: boolean;
};

function PlayerCard({
  image,
  name,
  remainingTime,
  moves,
  pairsCaught,
  isActive,
}: PlayerCardProps) {
  return (
    <div
      className={`p-4 flex items-center space-x-4 rounded-2xl border shadow-md transition-all duration-300 ${isActive ? "bg-gray-800 text-white border-indigo-700" : "bg-gray-900 text-gray-700 border-y-gray-500"}`}
    >
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-2xl border-white shadow-sm"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="text-sm">
          <p className="opacity-90">Remaining Time: {remainingTime}</p>
          <p className="opacity-90">Moves: {moves}</p>
          <p className="opacity-90">Pairs Caught: {pairsCaught}</p>
        </div>
      </div>
    </div>
  );
}

export { PlayerCard };

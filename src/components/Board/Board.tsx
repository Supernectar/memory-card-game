import { useRef, useState, useEffect } from "react";
import { GameOverDialog } from "../GameOverDialog/GameOverDialog";
import { Card } from "../Card/Card";
import { PlayerList } from "../PlayerList/PlayerList";
import { Player } from "../../types";
type CardInfo = { index: number; value: number };

type BoardProps = {
  rows?: number;
  cols?: number;
};

function Board({ rows = 4, cols = 8 }: BoardProps) {
  const gridcellRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardInfo[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cardValues = useRef<number[]>(generateCardValues(rows * cols));
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Player 1",
      image: "/profileImages/player1.png",
      remainingTime: "10:00",
      remainingTimeInSeconds: 600,
      moves: 0,
      pairsCaught: 0,
      isActive: true,
    },
    {
      id: 2,
      name: "Player 2",
      image: "/profileImages/player1.png",
      remainingTime: "10:00",
      remainingTimeInSeconds: 600,
      moves: 0,
      pairsCaught: 0,
      isActive: false,
    },
    {
      id: 3,
      name: "Player 3",
      image: "/profileImages/player1.png",
      remainingTime: "10:00",
      remainingTimeInSeconds: 600,
      moves: 0,
      pairsCaught: 0,
      isActive: false,
    },
    {
      id: 4,
      name: "Player 4",
      image: "/profileImages/player1.png",
      remainingTime: "10:00",
      remainingTimeInSeconds: 600,
      moves: 0,
      pairsCaught: 0,
      isActive: false,
    },
  ]);

  function generateCardValues(size: number): number[] {
    const values = Array.from({ length: size / 2 }, (_, i) => i + 1);
    return [...values, ...values].sort(() => Math.random() - 0.5);
  }

  const restartGame = () => {
    setFlippedCards([]);
    setMatchedCards(new Set());
    setStartTime(null);
    setGameOver(false);
    setIsDialogOpen(false);
    cardValues.current = generateCardValues(rows * cols);
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        moves: 0,
        pairsCaught: 0,
        remainingTimeInSeconds: 600,
        remainingTime: "10:00",
      })),
    );
  };

  useEffect(() => {
    if (matchedCards.size === rows * cols) {
      setGameOver(true);
      setIsDialogOpen(true);
    }
  }, [matchedCards, rows, cols]);

  useEffect(() => {
    if (startTime === null || gameOver) return;

    const intervalId = setInterval(() => {
      setPlayers((prevPlayers) => {
        return prevPlayers.map((player) => {
          if (player.isActive && player.remainingTimeInSeconds > 0) {
            const updatedPlayer = {
              ...player,
              remainingTimeInSeconds: player.remainingTimeInSeconds - 1,
              remainingTime: formatTime(player.remainingTimeInSeconds - 1),
            };
            return updatedPlayer;
          }
          return player;
        });
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, gameOver]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleCardRotate = (index: number): void => {
    if (flippedCards.length === 2 || matchedCards.has(index)) return;

    if (startTime === null) {
      setStartTime(Date.now());
    }

    const newFlippedCards = [
      ...flippedCards,
      { index, value: cardValues.current[index] },
    ];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setPlayers((prevPlayers) => {
        const updatedPlayers = prevPlayers.map((player) => {
          if (player.isActive) {
            return { ...player, moves: player.moves + 1 };
          }
          return player;
        });
        return updatedPlayers;
      });

      const [first, second] = newFlippedCards;
      setTimeout(() => {
        if (first.value === second.value) {
          setPlayers((prevPlayers) => {
            const updatedPlayers = prevPlayers.map((player) => {
              if (player.isActive) {
                return { ...player, pairsCaught: player.pairsCaught + 1 };
              }
              return player;
            });
            return updatedPlayers;
          });

          setMatchedCards(
            (prev) => new Set([...prev, first.index, second.index]),
          );
        }

        setFlippedCards([]);
      }, 1000);
    }
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(value, max));

  const calculateIndex = (row: number, col: number) => {
    row = clamp(row, 0, rows - 1);
    col = clamp(col, 0, cols - 1);
    return row * cols + col;
  };

  const getNewIndexByKey = (
    key: string,
    currentIndex: number,
    ctrlKey: boolean,
  ) => {
    const currentRow = Math.floor(currentIndex / cols);
    const currentCol = currentIndex % cols;

    if (ctrlKey) {
      if (key === "Home") return calculateIndex(0, 0);
      if (key === "End") return calculateIndex(rows - 1, cols - 1);
    }

    const moveMap: Record<string, [number, number]> = {
      ArrowRight: [0, 1],
      ArrowLeft: [0, -1],
      ArrowDown: [1, 0],
      ArrowUp: [-1, 0],
      PageDown: [4, 0],
      PageUp: [-4, 0],
      Home: [0, -currentCol],
      End: [0, cols - 1 - currentCol],
    };

    const [rowOffset, colOffset] = moveMap[key] || [0, 0];
    return calculateIndex(currentRow + rowOffset, currentCol + colOffset);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    const currentIndex = gridcellRefs.current.findIndex(
      (cell) => cell === document.activeElement,
    );
    if (currentIndex === -1) return;

    const newIndex = getNewIndexByKey(e.key, currentIndex, e.ctrlKey);

    if (newIndex >= 0 && newIndex < gridcellRefs.current.length) {
      gridcellRefs.current[newIndex]?.focus();
    }
  };

  return (
    <>
      <PlayerList players={players} />
      <table
        className="w-full table-auto border-collapse border border-gray-300"
        role="grid"
        onKeyDown={handleKeyDown}
      >
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(cols)].map((_, colIndex) => {
                const gridcellIndex = rowIndex * cols + colIndex;
                return (
                  <td
                    key={colIndex}
                    role="gridcell"
                    tabIndex={0}
                    className="border border-indigo-500/50 px-4 py-2 text-center"
                    ref={(el) => {
                      gridcellRefs.current[gridcellIndex] = el;
                    }}
                  >
                    {!matchedCards.has(gridcellIndex) && (
                      <Card
                        value={cardValues.current[gridcellIndex]}
                        isFlipped={flippedCards.some(
                          (card) => card.index === gridcellIndex,
                        )}
                        onRotate={() => handleCardRotate(gridcellIndex)}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <GameOverDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        moves={players[0].moves}
        startTime={startTime}
        onRestart={restartGame}
      />
    </>
  );
}

export { Board };

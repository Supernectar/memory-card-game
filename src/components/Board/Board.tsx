import { useRef, useState } from "react";
import { Card } from "../Card/Card";

type CardInfo = { index: number; value: number };

type BoardProps = {
  rows?: number;
  cols?: number;
};

function Board({ rows = 4, cols = 8 }: BoardProps) {
  const gridcellRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardInfo[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set());
  const cardValues = useRef<number[]>(generateCardValues(rows * cols));

  function generateCardValues(size: number): number[] {
    const values = Array.from({ length: size / 2 }, (_, i) => i + 1);
    return [...values, ...values].sort(() => Math.random() - 0.5);
  }

  const handleCardRotate = (index: number): void => {
    if (flippedCards.length === 2 || matchedCards.has(index)) return;

    const newFlippedCards = [
      ...flippedCards,
      { index, value: cardValues.current[index] },
    ];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      setTimeout(() => {
        if (first.value === second.value) {
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
      PageDown: [4, 0], // Move focus down by 4 rows
      PageUp: [-4, 0], // Move focus up by 4 rows
      Home: [0, -currentCol], // Move to first cell in the row
      End: [0, cols - 1 - currentCol], // Move to last cell in the row
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
  );
}

export { Board };

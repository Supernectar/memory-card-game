import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type GameOverDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  moves: number;
  startTime: number | null;
};

const GameOverDialog = ({
  isOpen,
  onClose,
  onRestart,
  moves,
  startTime,
}: GameOverDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <DialogPanel className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <DialogTitle className="text-xl font-bold">Game Over</DialogTitle>
        <p className="mt-2">You Win!</p>
        <p className="mt-2">Moves: {moves}</p>
        {startTime && (
          <p className="mt-2">
            Time: {((Date.now() - startTime) / 1000).toFixed(2)} seconds
          </p>
        )}

        <button
          onClick={onRestart}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-full"
        >
          Restart Game
        </button>
      </DialogPanel>
    </Dialog>
  );
};

export { GameOverDialog };

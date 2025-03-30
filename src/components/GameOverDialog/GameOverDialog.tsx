import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type GameOverDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  moves: number;
  startTime: number | null;
};

const GameOverDialog = ({
  isOpen,
  onClose,
  moves,
  startTime,
}: GameOverDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <DialogPanel className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <DialogTitle className="text-xl font-bold">Game Over</DialogTitle>
        <p className="mt-2">You Win!</p>
        <p className="mt-2">Moves: {moves}</p>
        {startTime && (
          <p className="mt-2">
            Time: {((Date.now() - startTime) / 1000).toFixed(2)} seconds
          </p>
        )}
      </DialogPanel>
    </Dialog>
  );
};

export { GameOverDialog };

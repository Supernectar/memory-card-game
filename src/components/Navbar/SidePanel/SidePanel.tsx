import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Button } from "../../ui/Button/Button";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function SidePanel({ isOpen, onClose }: SidePanelProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-linear duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 flex">
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="relative w-64 bg-white shadow-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Navigation</h2>
                <Button
                  icon={<XMarkIcon className="h-6 w-6" />}
                  onClick={onClose}
                ></Button>
              </div>

              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/instructions"
                      onClick={onClose}
                      className="text-blue-600 hover:underline"
                    >
                      Instructions
                    </Link>
                  </li>
                </ul>
              </nav>

              <hr className="my-4" />

              <div className="mt-2">
                <Link
                  to="/"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition"
                >
                  <PlayIcon className="h-5 w-5" />
                  Play
                </Link>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

export { SidePanel };

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SidePanel } from "./SidePanel/SidePanel";
import { Button } from "../ui/Button/Button";
import { To, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <Button
          icon={<Bars3Icon className="h-6 w-6" />}
          onClick={() => handleNavigation("/")}
        >
          Go to main menu
        </Button>
        <h1 className="text-xl font-semibold">My App</h1>
      </header>

      <SidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export { Navbar };

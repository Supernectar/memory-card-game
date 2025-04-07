import { Button } from "../components/ui/Button/Button";
import { To, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => handleNavigation("/game-configuration")}>
        Play
      </Button>
      <Button onClick={() => handleNavigation("/how-to-play")}>
        How to play
      </Button>
      <Button onClick={() => handleNavigation("/collection")}>
        Collection
      </Button>
      <Button onClick={() => handleNavigation("/settings")}>Settings</Button>
    </div>
  );
}

export { Home };

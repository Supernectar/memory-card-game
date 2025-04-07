import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { HowToPlay } from "./pages/HowToPlay";
import "./App.css";
import { Game } from "./pages/Game";
import { GameConfiguration } from "./pages/GameConfiguration";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game-configuration" element={<GameConfiguration />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

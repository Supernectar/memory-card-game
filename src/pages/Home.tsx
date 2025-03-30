import { Board } from "../components/Board/Board";

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Home Page</h1>
      <Board />
    </div>
  );
}

export { Home };

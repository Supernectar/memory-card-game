export type Player = {
  id: number;
  name: string;
  image: string;
  remainingTime: string;
  remainingTimeInSeconds: number;
  moves: number;
  pairsCaught: number;
  isActive: boolean;
};

export type PlayerType = "human" | "bot-easy" | "bot-medium" | "bot-hard";

export type GameConfig = {
  players: PlayerType[];
  cardThemeIndex: number;
  cardCount: number;
};

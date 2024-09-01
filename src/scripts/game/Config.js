import { Game } from "./Game";

export const Config = {
    loader: [
        { key: "player", data: "path/to/player.png" },
        { key: "obstacle", data: "path/to/obstacle.png" },
        { key: "background", data: "path/to/background.png" }
    ],
    startScene: Game,
    scenes: {
        "Game": Game
    }
};

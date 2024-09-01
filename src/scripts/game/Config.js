import { Game } from "./Game";

export const Config = {
    loader: [
        { key: "player", data: "/sprites/player.png" },
        { key: "obstacle", data: "/sprites/obstacle.png" },
        { key: "background", data: "/sprites/background.png" }
    ],
    startScene: Game,
    scenes: {
        "Game": Game
    }
};

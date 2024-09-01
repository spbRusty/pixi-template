import * as PIXI from "pixi.js";
import { Scene } from "../system/Scene";
import { App } from "../system/App";

export class Game extends Scene {
    constructor() {
        super();
        this.score = 0;
        this.speed = 5;
        this.obstacles = [];
    }

    create() {
        this.createBackground();
        this.createPlayer();
        this.createObstacles();
        this.createScoreText();
        this.addEventListeners();
    }

    createBackground() {
        this.bg = App.sprite("background");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }

    createPlayer() {
        this.player = App.sprite("player");
        this.player.anchor.set(0.5);
        this.player.x = window.innerWidth / 2;
        this.player.y = window.innerHeight - 100;
        this.container.addChild(this.player);
    }

    createObstacles() {
        for (let i = 0; i < 3; i++) {
            const obstacle = App.sprite("obstacle");
            obstacle.anchor.set(0.5);
            obstacle.x = Math.random() * window.innerWidth;
            obstacle.y = -100 - i * 200;
            this.obstacles.push(obstacle);
            this.container.addChild(obstacle);
        }
    }

    createScoreText() {
        this.scoreText = new PIXI.Text(`Score: ${this.score}`, {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0xFFFFFF
        });
        this.scoreText.x = 10;
        this.scoreText.y = 10;
        this.container.addChild(this.scoreText);
    }

    addEventListeners() {
        this.container.on("pointerdown", this.onTap.bind(this));
    }

    onTap(event) {
        const tapPosition = event.data.global;
        if (tapPosition.x < window.innerWidth / 2) {
            this.player.x -= 50;
        } else {
            this.player.x += 50;
        }
        this.player.x = Math.max(0, Math.min(this.player.x, window.innerWidth));
    }

    update(dt) {
        this.moveObstacles(dt);
        this.checkCollisions();
        this.updateScore();
    }

    moveObstacles(dt) {
        for (const obstacle of this.obstacles) {
            obstacle.y += this.speed * dt;
            if (obstacle.y > window.innerHeight + 50) {
                obstacle.y = -100;
                obstacle.x = Math.random() * window.innerWidth;
                this.score++;
            }
        }
    }

    checkCollisions() {
        for (const obstacle of this.obstacles) {
            if (this.collision(this.player, obstacle)) {
                this.gameOver();
            }
        }
    }

    collision(a, b) {
        const aBox = a.getBounds();
        const bBox = b.getBounds();
        return aBox.x + aBox.width > bBox.x &&
               aBox.x < bBox.x + bBox.width &&
               aBox.y + aBox.height > bBox.y &&
               aBox.y < bBox.y + bBox.height;
    }

    updateScore() {
        this.scoreText.text = `Score: ${this.score}`;
    }

    gameOver() {
        this.speed = 0;
        const gameOverText = new PIXI.Text("Game Over", {
            fontFamily: "Arial",
            fontSize: 48,
            fill: 0xFF0000
        });
        gameOverText.anchor.set(0.5);
        gameOverText.x = window.innerWidth / 2;
        gameOverText.y = window.innerHeight / 2;
        this.container.addChild(gameOverText);
    }
}

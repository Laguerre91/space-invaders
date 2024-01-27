class Game {
    constructor() {
        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-end');

        this.player = new Player(
            this.gameScreen,
            "./img/spaceship.png"
        );

        this.screen = {
            height: 600,
            width: 600,
            score: 0,
            lives: 3,
            gameIsOver: false
        }


        this.bullets = [];
        this.invaders = [];

        this.intervalId;
        this.gameLoopFrequency = Math.round(1000 / 60);
        this.directionX = 0;

    }

    start() {

        this.mouseX = 50

        this.gameScreen.style.height = `${this.screen.height}px`;
        this.gameScreen.style.width = `${this.screen.width}px`;

        this.startScreen.style.display = "none";

        this.gameScreen.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)

        window.addEventListener("mousemove", this.handleMouseMove.bind(this))
    }

    gameLoop() {

        console.log("in the game loop");

        this.update();

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }

    update() {
        this.player.move(this.mouseX);
    }

    setMouseX(mouseX) {
        this.mouseX = mouseX
    }

    endGame() {

    }
}
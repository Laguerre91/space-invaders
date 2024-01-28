class Game {
    constructor() {
        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-end');

        this.player = new Player(
            this.gameScreen,
            "./img/spaceship.png",
        );

        this.invader = [
            new Invader(this.gameScreen, "./img/invader.png", 50, 100, 3),
            new Invader(this.gameScreen, "./img/invader.png", 50, 235, 3),
            new Invader(this.gameScreen, "./img/invader.png", 50, 370, 3),
            new Invader(this.gameScreen, "./img/invader.png", 50, 505, 3),
            new Invader(this.gameScreen, "./img/invader.png", 50, 640, 3)
        ];

        this.direction = 1;

        this.screen = {
            height: 600,
            width: 800,
            score: 0,
            lives: 3,
            gameIsOver: false
        }


        this.bullets = [];

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

        this.invader.forEach(invader => invader.moveInvader());
    }


    setMouseX(mouseX) {
        this.mouseX = mouseX
    }

    endGame() {

    }
}
class Game {

    constructor() {

        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-end');

        this.player = new Player(
            this.gameScreen,
            "./img/spaceship.png",
        );

        this.invaders = [
            new Invader(this.gameScreen, "./img/invader.png", 50, 100,),
            new Invader(this.gameScreen, "./img/invader.png", 50, 235,),
            new Invader(this.gameScreen, "./img/invader.png", 50, 370,),
            new Invader(this.gameScreen, "./img/invader.png", 50, 505,),
            new Invader(this.gameScreen, "./img/invader.png", 50, 640,)
        ];

        this.screen = {
            height: 600,
            width: 800,
            score: 0,
            lives: 3,
        }

        this.gameIsOver = false

        this.bullets = [];

        this.gameIntervalId
        this.gameLoopFrequency = Math.round(1000 / 60);
    }

    start() {

        this.setGameDimensions()
        this.setGameVisibility()
        this.startGameLoop()

        window.addEventListener("mousemove", this.handleMouseMove.bind(this))
    }

    setGameDimensions() {
        this.gameScreen.style.height = `${this.screen.height}px`;
        this.gameScreen.style.width = `${this.screen.width}px`;
    }

    setGameVisibility() {
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
    }

    startGameLoop() {
        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrequency)
    }

    gameLoop() {

        this.updateAll()

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
            this.endGame()
        }
    }

    updateAll() {
        this.player.move();

        this.invaders.forEach(invader => invader.move());

        this.bullets.forEach(bullet => {
            bullet.move();
            this.invaders.forEach(invader => {
                if (invader.didCollide(bullet)) {



                }
            });
        });
    }

    endGame() {

    }

    handleMouseMove(event) {
        if (this.player) {
            const mouseX = event.clientX;
            this.player.move(mouseX);
        }
    }
}


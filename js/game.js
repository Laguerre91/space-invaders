class Game {

    constructor() {

        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-end');

        this.player = new Player(
            this.gameScreen,
            "./img/spaceship.png",
        );

        this.invaders = []
        this.army = []
        this.bullets = []

        this.gameSize = {
            height: 600,
            width: 1000,
        }

        this.gameStats = {
            score: 0,
            lives: 3,
            isOver: false
        }

        this.gameIntervalId
        this.gameLoopFrequency = Math.round(1000 / 60);
    }

    start() {
        this.setGameDimensions()
        this.setGameVisibility()
        this.setEventListeners()
        this.createInvaders(invadersData)
        this.startGameLoop()
    }

    setEventListeners() {
        window.addEventListener("mousemove", this.handleMouseMove.bind(this))
        window.addEventListener("click", this.handleMouseClick(this));
    }

    setGameDimensions() {
        this.gameScreen.style.height = `${this.gameSize.height}px`
        this.gameScreen.style.width = `${this.gameSize.width}px`
    }

    setGameVisibility() {
        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"
        this.endScreen.style.display = "block"
    }

    startGameLoop() {
        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrequency)
    }

    gameLoop() {
        this.updateAll()
        this.checkBottomReach()
        this.checkWallReach()
        this.checkBulletCollision()
    }

    checkBottomReach() {

        const invadersReachedBottom = this.invaders.some(invader => invader.reachedBottom())

        if (invadersReachedBottom) {

            this.endGame()
        }
    }

    checkWallReach() {
        const invadersHitWall = this.invaders.some(invader => invader.hitWall());

        if (invadersHitWall) {
            this.invaders.forEach(invader => invader.changeDirection());
        }
    }

    createInvaders(invadersData) {
        invadersData.forEach(data => {
            const invader = new Invader(
                this.gameScreen,
                "./img/invader.png",
                data.top,
                data.left
            );
            this.invaders.push(invader);
        });
    }

    handleMouseMove(event) {
        if (this.player) {
            const mouseX = event.clientX;
            this.player.move(mouseX);
        }
    }

    handleMouseClick(event) {
        // if (this.player) {
        //     Game.player.shoot(event.clientX)
        // }
    }

    updateAll() {
        this.player.move();
        this.invaders.forEach(invader => invader.move());
        this.bullets.forEach(bullet => bullet.move())
    }

    endGame() {
        this.gameStats.isOver = true
        clearInterval(this.gameIntervalId)
    }

}





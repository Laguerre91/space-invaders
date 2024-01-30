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
        window.addEventListener("click", this.handleMouseClick.bind(this));
    }

    setGameDimensions() {
        this.gameScreen.style.height = `${this.gameSize.height}px`
        this.gameScreen.style.width = `${this.gameSize.width}px`
    }

    setGameVisibility() {
        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"
        this.endScreen.style.display = "none"
    }

    startGameLoop() {
        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrequency)
    }

    gameLoop() {
        this.updateAll()
        this.checkBottomReach()
        this.checkWallReach()
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

        if (this.player) {
            const mouseX = event.clientX
            this.shoot(mouseX)
        }
    }

    shoot() {
        this.createBullet()
    }

    createBullet() {
        const bullet = new Bullet(this.gameScreen, event.clientX - this.player.dimensions.width, this.player.position.top)
        this.bullets.push(bullet)
    }

    updateAll() {
        this.player.move();
        this.invaders.forEach(invader => invader.move())

        this.bullets.forEach(bullet => {
            bullet.move()
            this.checkInvaderCollisions(bullet)
        })

    }

    checkInvaderCollisions(bullet) {
        for (let i = this.invaders.length - 1; i >= 0; i--) {
            const invader = this.invaders[i];

            if (this.checkCollision(invader, bullet)) {
                this.gameStats.score += 10;
                console.log("10 points");

                this.invaders.splice(i, 1);
                this.bullets.remove()

                break;
            }
        }
    }

    // remove() {

    // }

    checkCollision(invader, bullet) {
        return (
            bullet.position.top < invader.position.top + invader.dimensions.height &&
            bullet.position.top + bullet.dimensions.height > invader.position.top &&
            bullet.position.left < invader.position.left + invader.dimensions.width &&
            bullet.position.left + bullet.dimensions.width > invader.position.left
        )
    }

    endGame() {
        this.gameStats.isOver = true
        this.gameScreen.style.display = "none"
        this.endScreen.style.display = "block"

        clearInterval(this.gameIntervalId)

    }

}





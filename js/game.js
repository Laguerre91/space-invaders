class Game {

    constructor() {

        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-end');
        this.scoreScreen = document.querySelector('#score');
        this.timeScreen = document.querySelector('#time');
        this.livesScreen = document.querySelector('#lives');
        this.endTitleScreen = document.querySelector('#game-end-title');
        this.totalScores = document.querySelector('#total-scores')


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
            timeRemaining: 30,
            score: 0,
            lives: 3,
            isOver: false
        }

        this.gameIntervalId
        this.gameLoopFrequency = Math.round(1000 / 60);
        this.topVelCounter = 0
        this.leftVelCounter = 0

        console.log(this.leftVelCounter)

    }

    start() {
        this.setGameDimensions()
        this.setGameVisibility()
        this.setEventListeners()
        this.startCountdown()
        this.createInvaders(invadersData)
        this.startGameLoop()
    }

    setEventListeners() {
        this.gameScreen.addEventListener("mousemove", this.handleMouseMove.bind(this))
        this.gameScreen.addEventListener("click", this.handleMouseClick.bind(this));
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
        this.updateStats()
    }

    updateStats() {

        this.scoreScreen.innerHTML = this.gameStats.score

    }

    startCountdown() {
        const countdownTimer = new CountdownTimer(
            this.gameStats.timeRemaining,
            (remainingTime) => {
                const minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0");
                const seconds = (remainingTime % 60).toString().padStart(2, "0");
                this.timeScreen.innerHTML = `${minutes}:${seconds}`;
            },
            () => {
                this.endView()
            }
        );
    }

    checkBottomReach() {

        const invadersReachedBottom = this.invaders.some(invader => invader.reachedBottom())

        if (invadersReachedBottom) {

            this.endView()
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
                data.left,
                data.topVel,
                data.leftVel,
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

    createBullet() {

        const bullet = new Bullet(this.gameScreen, this.player.position.left + (this.player.dimensions.width / 2), this.player.position.top)

        this.bullets.push(bullet)
    }


    shoot() {
        this.createBullet()
    }

    updateAll() {
        this.invaders.forEach(invader => invader.move())

        this.bullets.forEach(bullet => {
            bullet.move()
            this.checkInvaderCollisions(bullet)
        })

    }


    checkInvaderCollisions(bullet) {

        for (let i = this.invaders.length - 1; i >= 0; i--) {

            let invader = this.invaders[i];

            if (this.checkCollision(invader, bullet)) {

                this.gameStats.score += 10;

                this.invaders.splice(i, 1)

                this.removeBullet(bullet)
                this.removeInvader(invader)

            }

            if (this.invaders.length === 2) {
                this.createMoreEnemies(newInvadersData)
            }
        }
    }

    updateVelocity(newInvadersData) {

        for (let i = 0; i < newInvadersData.length; i++) {

            newInvadersData.topVel += this.topVelCounter;
            newInvadersData.leftVel += this.leftVelCounter;
            console.log("updateVelocity works");

        }


    }

    removeInvader(invader) {
        this.gameScreen.removeChild(invader.element)
        const invaderIndex = this.invaders.indexOf(invader)
        if (invaderIndex !== -1) {
            this.invaders.splice(invaderIndex, 1);
        }

    }

    createMoreEnemies() {
        newInvadersData.forEach(data => {
            const invader = new Invader(
                this.gameScreen,
                "./img/invader.png",
                data.top,
                data.left,
                data.topVel,
                data.leftVel,
            )
            this.updateVelocity(newInvadersData)
            this.invaders.push(invader)
        })

        this.gameStats.timeRemaining += 10
    }

    removeBullet(bullet) {
        bullet.remove()
        const bulletIndex = this.bullets.indexOf(bullet);
        if (bulletIndex !== -1) {
            this.bullets.splice(bulletIndex, 1);
        }
    }

    checkCollision(invader, bullet) {
        return (
            bullet.position.top < invader.position.top + invader.dimensions.height &&
            bullet.position.top + bullet.dimensions.height > invader.position.top &&
            bullet.position.left < invader.position.left + invader.dimensions.width &&
            bullet.position.left + bullet.dimensions.width > invader.position.left
        )
    }

    endView() {
        this.gameStats.isOver = true
        this.gameScreen.style.display = "none"
        this.endScreen.style.display = "flex"

        this.endTitleScreen.innerHTML = "GAME OVER... TRY AGAIN!"
        this.totalScores.innerHTML = `You scored ${this.gameStats.score} points!`
        this.totalScores.style.fontSize = '2em'

        clearInterval(this.gameIntervalId)

    }

}
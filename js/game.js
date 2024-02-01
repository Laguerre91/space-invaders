class Game {

    constructor() {

        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.endScreen = document.querySelector('#game-end');
        this.scoreScreen = document.querySelector('#score');
        this.timeScreen = document.querySelector('#time');
        this.livesScreen = document.querySelector('#lives');
        this.endTitleScreen = document.querySelector('#game-end-title');
        this.totalScores = document.querySelector('#total-scores');

        this.backgroundMusic = document.querySelector('#background-music')
        this.audioVolume = 0.2
        this.backgroundMusic.volume = this.audioVolume

        this.audioAlright = document.querySelector('#alright');
        this.audioNice = document.querySelector('#nice');
        this.audioSuperNice = document.querySelector('#super-nice');
        this.audioGrrr = document.querySelector('#grrr');

        this.audioVolumeVoices = 0.5;

        this.audioAlright.volume = this.audioVolumeVoices;
        this.audioNice.volume = this.audioVolumeVoices;
        this.audioSuperNice.volume = this.audioVolumeVoices;
        this.audioGrrr.volume = this.audioVolumeVoices;


        this.frameIndex = 0

        this.player = new Player(
            this.gameScreen,
            "./img/popino.png",
        );

        this.invaders = []
        this.bullets = []
        this.bombs = []

        this.gameSize = {
            height: 600,
            width: 1000,
        }

        this.gameStats = {
            timeRemaining: 20,
            score: 0,
            lives: 3,
            isOver: false
        }

        this.gameIntervalId
        this.gameLoopFrequency = Math.round(1000 / 60);
        this.topVelCounter = 0
        this.leftVelCounter = 0
    }

    start() {
        this.playAlright()
        this.setGameDimensions()
        this.setGameVisibility()
        this.setEventListeners()
        this.updateTimer()
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
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
    }

    updateTimer() {

        this.timeScreen.innerHTML = this.gameStats.timeRemaining--

        if (this.gameStats.timeRemaining < 0) {
            this.endView()
        }
    }

    gameLoop() {
        this.updateAll()
        this.checkBottomReach()
        this.checkWallReach()
        this.checkBombCollision()
        this.updateScore()
        this.updateLives()
        this.frameIndex++
        if (this.frameIndex % 60 === 0) this.updateTimer()
    }

    updateScore() {
        this.scoreScreen.innerHTML = this.gameStats.score
    }

    updateLives() {
        this.checkBombCollision()
        this.livesScreen.innerHTML = this.gameStats.lives
    }

    playAlright() {
        this.audioAlright.play();
    }

    playNice() {
        this.audioNice.play();
    }

    playGrrr() {
        this.audioGrrr.play();
    }

    playSuperNice() {
        this.audioSuperNice.play();
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
                data.imgSource,
                data.top,
                data.left,
                data.topVel,
                data.leftVel,
            )
            this.invaders.push(invader)
        })
    }

    handleMouseMove(event) {
        if (this.player) {
            const mouseX = event.clientX
            this.player.move(mouseX)
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

            if (this.gameStats.score > 0 && this.gameStats.score % 100 === 0 && this.gameStats.score < 400) {
                this.playNice()
            }

            if (this.gameStats.score % 100 === 0 && this.gameStats.score >= 500) {
                this.playSuperNice()
            }

            if (this.invaders.length === 2) {
                this.gameStats.timeRemaining += 5
                this.createMoreEnemies(newInvadersData)
                this.updateVelocity(newInvadersData)
            }

        }
    }

    updateVelocity(newInvadersData) {

        newInvadersData.forEach((invaderData) => {
            invaderData.topVel += 0.1;
            invaderData.leftVel += 0.5;
        })

    }

    removeInvader(invader) {
        this.gameScreen.removeChild(invader.element)
        const invaderIndex = this.invaders.indexOf(invader)
        if (invaderIndex !== -1) {
            this.invaders.splice(invaderIndex, 1);
        }

    }

    removeBomb(bomb) {
        this.gameScreen.removeChild(bomb.element)
        const bombIndex = this.bombs.indexOf(bomb)
        if (bombReachedBottom()) {
            this.bombs.splice(bombIndex, 1);
        }

    }

    createMoreEnemies() {
        newInvadersData.forEach(data => {
            const invader = new Invader(
                this.gameScreen,
                data.imgSource,
                data.top,
                data.left,
                data.topVel,
                data.leftVel,
            )
            this.invaders.push(invader)
        })
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


    checkBombCollision() {

        for (let i = 0; i < this.bombs.length; i++) {
            const bomb = this.bombs[i];
            bomb.move();

            if (this.player.didCollide(bomb)) {

                this.playGrrr()

                bomb.element.remove();

                this.bombs.splice(i, 1);

                this.gameStats.lives--;

                i--;
            }
            else if (bomb.position.top > this.gameScreen.clientHeight - bomb.dimensions.height) {

                bomb.element.remove();
                this.bombs.splice(i, 1);
                i--;
            }
        }

        if (this.gameStats.lives === 1) {
            this.livesScreen.style.color = 'red'
        }

        if (this.gameStats.lives === 0) {
            this.endView();
        }

        if (Math.random() > 0.98 && this.bombs.length < 1) {
            this.bombs.push(new Bomb(this.gameScreen));
        }
    }


    endView() {
        this.gameStats.isOver = true
        this.gameScreen.style.display = "none"
        this.endScreen.style.display = "flex"

        this.endTitleScreen.innerHTML = "GAME OVER... TRY AGAIN!"
        this.totalScores.innerHTML = `You scored ${this.gameStats.score} points!`
        this.totalScores.style.fontSize = '2em'

        this.playGrrr()

        clearInterval(this.gameIntervalId)

    }

}
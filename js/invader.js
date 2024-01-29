class Invader {
    constructor(gameScreenValue, imgValue, topValue, leftValue) {

        this.gameScreen = gameScreenValue;

        this.position = {
            top: topValue,
            left: leftValue
        }

        this.dimensions = {
            width: 60,
            height: 50
        }

        this.invaderVel = {
            left: 1,
            top: 0.2
        }

        this.element = document.createElement('img');

        this.element.src = imgValue;
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.dimensions.width}px`
        this.element.style.height = `${this.dimensions.height}px`
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`

        this.gameScreen.appendChild(this.element)
    }

    move() {
        this.calculatePosition()
        this.updatePosition();
    }

    calculatePosition() {

        this.position.left += this.invaderVel.left
        this.position.top += this.invaderVel.top

        // if (this.invaders[0].position.left < 0 || this.invaders[0].position.left + this.dimensions.width > this.gameScreen.clientWidth) {
        //     this.invaderVel.left *= -1
        // }
        // if (this.invaders[this.invaders.length - 1].position.left < 0 || this.invaders[this.invaders.length - 1].position.left + this.dimensions.width > this.gameScreen.clientWidth) {
        //     this.invaderVel.left *= -1
        // }


        if (this.position.left < 0 || this.position.left + this.dimensions.width > this.gameScreen.clientWidth) {
            this.invaderVel.left *= -1
        }
    }

    updatePosition() {
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`
    }

    didCollide(bullet) {

    }
}
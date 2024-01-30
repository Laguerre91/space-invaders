class Invader {
    constructor(gameScreenValue, imgValue, topValue, leftValue) {

        this.gameScreen = gameScreenValue;

        this.position = {
            top: topValue,
            // bottom: topValue - this.dimensions.height,
            left: leftValue,
            // right: leftValue + this.dimensions.width
        }

        this.dimensions = {
            width: 60,
            height: 50
        }

        this.invaderVel = {
            left: 1,
            top: 0.1
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

    }

    hitWall() {
        return this.position.left < 0 || this.position.left + this.dimensions.width > this.gameScreen.clientWidth;
    }

    changeDirection() {
        this.invaderVel.left *= -1;
    }


    updatePosition() {
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`
    }

    reachedBottom() {
        const bottom = this.gameScreen.clientHeight - this.dimensions.height
        return this.position.top >= bottom
    }

}
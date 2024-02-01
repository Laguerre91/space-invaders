class Invader {
    constructor(gameScreenValue, imgValue, topValue, leftValue, topVel, leftVel) {

        this.gameScreen = gameScreenValue;

        this.position = {
            top: topValue,
            left: leftValue,
        }

        this.dimensions = {
            width: 70,
            height: 80
        }

        this.velocity = {
            topVel: topVel,
            leftVel: leftVel
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

        this.position.left += this.velocity.leftVel
        this.position.top += this.velocity.topVel

    }

    hitWall() {
        return this.position.left < 0 || this.position.left + this.dimensions.width > this.gameScreen.clientWidth;
    }

    changeDirection() {
        this.velocity.leftVel *= -1;
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
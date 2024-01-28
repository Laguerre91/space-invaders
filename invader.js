class Invader {
    constructor(gameScreenValue, imgValue, topValue, leftValue, difficultyValue) {

        this.gameScreen = gameScreenValue;
        this.top = topValue;
        this.left = leftValue;
        this.difficulty = difficultyValue

        this.dimensions = {
            width: 60,
            height: 50
        }


        this.element = document.createElement('img');

        this.element.src = imgValue;
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.dimensions.width}px`
        this.element.style.height = `${this.dimensions.height}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`

        this.gameScreen.appendChild(this.element)
    }

    moveInvader() {

        let moveDistance = 1.5;
        let moveY = this.top

        this.left += moveDistance;

        if (this.left < 0 || this.left + this.dimensions.width > this.gameScreen.clientWidth) {
            this.left = -1.5
            this.top = moveY + 70

        }

        this.updateInvaderPosition();

    }

    gravity() {
        this.top -= this.difficulty
        this.updateInvaderPosition()

    }


    shoot() {

    }


    updateInvaderPosition() {

        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }
}
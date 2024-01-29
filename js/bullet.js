class Bullet {
    constructor(gameScreenValue, imgSrcValue, startX, startY) {
        this.gameScreen = gameScreenValue;

        this.dimensions = {
            width: 5,
            height: 10,
        }

        this.position = {
            left: startX,
            top: startY,
        }

        this.element = document.createElement('img');

        this.element.src = imgSrcValue
        this.element.style.position = "absolute";
        this.element.style.width = `${this.dimensions.width}px`;
        this.element.style.height = `${this.dimensions.height}px`;
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;

        this.speed = 5;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.position.top -= 5
        this.element.style.top = `${this.position.top}px`
        if (this.position.top < 0) {
            this.remove()
        }
    }

    remove() {
        this.element.remove()
    }

    updatePosition() {

    }
}
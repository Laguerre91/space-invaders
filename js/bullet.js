class Bullet {
    constructor(gameScreenValue, startX, startY) {
        this.gameScreen = gameScreenValue;

        this.dimensions = {
            width: 40,
            height: 40,
        }

        this.position = {
            left: startX,
            top: startY,
        }

        this.element = document.createElement('div');
        this.element.style.position = "absolute";
        this.element.style.width = `${this.dimensions.width}px`;
        this.element.style.height = `${this.dimensions.height}px`;
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;
        this.element.style.background = "red";

        this.speed = 5;

        this.gameScreen.appendChild(this.element);
    }

    move() {

    }
}
class Bullet {
    constructor(gameScreenValue, startX, startY) {

        this.gameScreen = gameScreenValue;

        this.dimensions = {
            width: 5,
            height: 10,
        }

        this.position = {
            left: startX,
            top: startY
        }

        this.direction = {
            x: 0,
            y: -1,
        }

        this.element = document.createElement('div');

        this.element.style.position = "absolute";
        this.element.style.width = `${this.dimensions.width}px`;
        this.element.style.height = `${this.dimensions.height}px`;
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;
        this.element.style.backgroundColor = 'red'

        this.speed = 5;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.position.top -= this.speed
        this.element.style.top = `${this.position.top}px`

        if (this.position.top < 0) {
            this.remove()
        }
    }

    updatePosition() {
        this.element.style.top = `${this.position.top}px`
    }


    remove() {
        this.element.remove()
    }

    // calculatePosition(mouseX, mouseY) {
    //     const offsetX = this.dimensions.width / 2;
    //     const offsetY = this.dimensions.height / 2;

    //     const gameRect = this.gameScreen.getBoundingClientRect();

    //     this.position.left = mouseX - gameRect.left - offsetX;
    //     this.position.top = mouseY - gameRect.top - offsetY;

    //     if (this.position.left < 0) {
    //         this.position.left = 0;
    //     }

    //     if (this.position.left > this.gameScreen.offsetWidth - this.dimensions.width) {
    //         this.position.left = this.gameScreen.offsetWidth - this.dimensions.width;
    //     }

    //     if (this.position.top < 0) {
    //         this.position.top = 0;
    //     }
    // }

}
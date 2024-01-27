class Invader {
    constructor(gameScreenValue) {

        this.gameScreen = gameScreenValue;
        this.top = 0;
        this.left = 0;
        this.width = 60;
        this.heigth = 60;
        this.element = document.createElement('img');

        this.element.src = "image";
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.heigth = `${this.heigth}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`

        this.gameScreen.appendChild(this.element)
    }

    updatePosition() {

    }

    move() {

    }

    shoot() {

    }
}
class Player {
    constructor(gameScreenValue, imgSrcValue) {

        this.gameScreen = gameScreenValue;

        this.dimensions = {
            width: 100,
            height: 100,
            left: 250,
            top: 500,
        }

        this.element = document.createElement('img');

        this.element.src = imgSrcValue;
        this.element.style.position = "absolute";
        this.element.style.width = `${this.dimensions.width}px`;
        this.element.style.heigth = `${this.dimensions.height}px`;
        this.element.style.left = `${this.dimensions.left}px`;
        this.element.style.top = `${this.dimensions.top}px`;

        this.gameScreen.appendChild(this.element);

    }

    move(mouseX) {

        this.dimensions.left = mouseX - this.element.width / 2

        this.updatePosition()
    }

    shoot() {

    }

    didCollide(bullet) {

    }



    updatePosition() {
        console.log("Se mueveee")
        this.element.style.left = `${this.dimensions.left}px`
    }
}
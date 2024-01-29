class Player {
    constructor(gameScreenValue, imgSrcValue) {

        this.gameScreen = gameScreenValue;

        this.dimensions = {
            width: 100,
            height: 100,
        }

        this.position = {
            left: 250,
            top: 500,
        }

        this.element = document.createElement('img');

        this.element.src = imgSrcValue;
        this.element.style.position = "absolute";
        this.element.style.width = `${this.dimensions.width}px`;
        this.element.style.height = `${this.dimensions.height}px`;
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move(mouseX) {
        this.calculatePosition(mouseX)
        this.updatePosition()
    }

    calculatePosition(mouseX) {

        const offsetX = this.dimensions.width / 2;
        const gameRect = this.gameScreen.getBoundingClientRect();
        this.position.left = mouseX - gameRect.left - offsetX;
        if (this.position.left < 0) {
            this.position.left = 0;
        }
        if (this.position.left > this.gameScreen.offsetWidth - this.dimensions.width) {
            this.position.left = this.gameScreen.offsetWidth - this.dimensions.width;
        }

    }

    shoot() {

        const bullet = new Bullet(this.gameScreen, this.position.left + this.dimensions.width / 2, this.position.top);
        this.gameScreen.appendChild(bullet.element);
        game.bullets.push(bullet);

    }


    updatePosition() {

        this.element.style.left = `${this.position.left}px`

    }
}
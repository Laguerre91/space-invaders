class Bomb {
    constructor(gameScreen) {
        this.gameScreen = gameScreen

        this.position = {
            top: 0,
            left: Math.floor(Math.random() * 900)
        }

        this.dimensions = {
            width: 100,
            height: 100
        }

        this.element = document.createElement("img")

        this.element.src = "./img/bomb.png"
        this.element.style.position = "absolute"
        this.element.style.width = `${this.dimensions.height}px`
        this.element.style.height = `${this.dimensions.height}px`
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`

        this.gameScreen.appendChild(this.element)
    }

    updatePosition() {
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`
    }

    move() {

        this.position.top += 2

        this.updatePosition()
    }
}
window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game;

    startButton.onclick = () => {
        startGame();
    }

    restartButton.onclick = () => {
        restartGame();
    }

    function startGame() {
        console.log("start game");
        game = new Game();

        game.start();

        window.addEventListener("mousemove", handleMouseMove)
    }

    function restartGame() {
        location.reload();
    }

    function handleMouseMove(event) {
        if (game) {
            const mouseX = event.clientX
            game.setMouseX(mouseX)
        }
    }


    window.addEventListener("mousemove", handleMouseMove)
}
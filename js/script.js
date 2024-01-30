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
        game = new Game();
        game.start();

    }

    function restartGame() {
        location.reload();
    }

}
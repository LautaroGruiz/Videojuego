const canvas = document.querySelector("#game");
const game = canvas.getContext("2d"); // Eje X & Y.

let canvasSize;
let elementsSize;

const setCanvasSize = () => {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10 - 1;

  startGame();
};

/*Funcion para inicializar el codigo que se debe ejecutar al principio de nuestro programa.*/
const startGame = () => {
  game.clearRect(0, 0, canvasSize, canvasSize); // Limpiar el lienzo antes de redibujar

  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[1];
  const mapRows = map.trim().split("\n");
  const mapRowsCol = mapRows.map((row) => row.trim().split(""));

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(
        emojis[mapRowsCol[row - 1][col - 1]],
        elementsSize * col + 15,
        elementsSize * row
      );
    }
  }
};

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

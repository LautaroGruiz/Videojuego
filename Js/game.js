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

  const map = maps[2]; // Hacemos referencia a nuestro arreglo maps que contiene los distintos niveles.
  /*
  Filas del mapa.
  Limpiamos espacios con TRIM.
  Con SPLIT(\n) creamos un nuevo array en donde se crea un elemento diferente cuando se encuntra un salto de linea
  */
  const mapRows = map.trim().split("\n");
  /*
  Creamos un array(.map) a partir de otro array(mapRows)
  Existe una lista de Filas, donde cada fila tendra como elemento otra Lista.
  En esta ultima lista, cada elemento hace referencia a las columnas
  */
  const mapRowsCol = mapRows.map((row) => row.trim().split(""));

  mapRowsCol.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1.3);
      const posY = elementsSize * (rowI + 0.95);
      game.fillText(emoji, posX, posY);
    });
  });
};

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d"); // Eje X & Y.
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize;
let elementsSize;
let playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

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

  const map = maps[0]; // Hacemos referencia a nuestro arreglo maps que contiene los distintos niveles.
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

  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowsCol.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1.3);
      const posY = elementsSize * (rowI + 0.95);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col === "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      }
      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
};

const movePlayer = () => {
  const giftCollistionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3); // Usamos toFixed para evitar conflictos con exactitud en numeros decimales
  const giftCollistionY =
    playerPosition.Y.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollistion = giftCollistionX && giftCollistionY;
  if (giftCollistion) {
    console.log("Subiste de nivel");
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
};

const moveByKeys = (e) => {
  if (e.key == "ArrowUp") moveUp();
  else if (e.key == "ArrowLeft") moveLeft();
  else if (e.key == "ArrowRight") moveRight();
  else if (e.key == "ArrowDown") moveDown();
};

const moveUp = () => {
  if (Math.floor(playerPosition.y) > elementsSize) {
    playerPosition.y = playerPosition.y - elementsSize;
    startGame();
  }
};
const moveLeft = () => {
  if (playerPosition.x < elementsSize * 2) {
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
};
const moveRight = () => {
  if (Math.ceil(playerPosition.x) < 10 * elementsSize) {
    playerPosition.x = playerPosition.x + elementsSize;
    startGame();
  }
};
const moveDown = () => {
  if (playerPosition.y > elementsSize * 9) {
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
};

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKeys);

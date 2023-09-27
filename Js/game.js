const canvas = document.querySelector("#game");
const game = canvas.getContext("2d"); // Eje X & Y.
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResultado = document.querySelector("#resultado");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timeStart;
let timePLayer;
let timeInterval;

let playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPositions = [];

const setCanvasSize = () => {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvasSize = Number(canvasSize.toFixed(0));

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10 - 1;

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
};

/*Funcion para inicializar el codigo que se debe ejecutar al principio de nuestro programa.*/
const startGame = () => {
  game.clearRect(0, 0, canvasSize, canvasSize); // Limpiar el lienzo antes de redibujar

  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level]; // Hacemos referencia a nuestro arreglo maps que contiene los distintos niveles.

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }
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

  showLives();

  enemyPositions = []; // Cada vez que nos movemos limpiamos nuestros arreglos.

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
      } else if (col == "X") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
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
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollistion = giftCollistionX && giftCollistionY;

  if (giftCollistion) {
    levelWin();
  }

  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
};

const levelWin = () => {
  console.log("win");
  level++;
  startGame();
};

const levelFail = () => {
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
};

const gameWin = () => {
  clearInterval(timeInterval);
  const recordTime = localStorage.getItem("Record Time");
  const playerTime = Date.now() - timeStart;

  if (recordTime === null) {
    localStorage.setItem("Record Time", playerTime);
    pResultado.innerHTML = "¿Primera vez?";
  } else {
    if (playerTime < recordTime) {
      localStorage.setItem("Record Time", playerTime);
      pResultado.innerHTML = "SUPERASTE EL RECORD";
    } else {
      pResultado.innerHTML = "INTENTALO OTRA VEZ";
    }
  }
  
  // Reinicia al primer nivel después de 2 segundos
  setTimeout(() => {
    level = 0;
    lives = 3;
    timeStart = undefined;
    startGame();
  }, 1000); // Espera 2 segundos antes de reiniciar
};


const showLives = () => {
  const heartArray = Array(lives).fill(emojis["HEART"]);
  spanLives.innerHTML = "";
  heartArray.forEach((heart) => {
    spanLives.append(heart);
  });
};

const showTime = () => {
  const elapsedTime = Date.now() - timeStart;
  const seconds = Math.floor((elapsedTime / 1000) % 60); // Calcula los segundos
  const minutes = Math.floor((elapsedTime / 1000 / 60) % 60); // Calcula los minutos

  // Formatea los segundos y minutos como cadenas con ceros a la izquierda si es necesario
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Muestra el tiempo en el formato MM:SS en un elemento con el id "spanTime"
  spanTime.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
};

const showRecord = () => {
  const recordTimeMillis = localStorage.getItem("Record Time");
  
  if (recordTimeMillis !== null) {
    const seconds = Math.floor((recordTimeMillis / 1000) % 60); // Calcula los segundos
    const minutes = Math.floor((recordTimeMillis / 1000 / 60) % 60); // Calcula los minutos

    // Formatea los segundos y minutos como cadenas con ceros a la izquierda si es necesario
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Muestra el tiempo en el formato MM:SS en un elemento con el id "spanRecord"
    spanRecord.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  } else {
    spanRecord.innerHTML = "N/A"; // Si no hay un récord, muestra "N/A" (No disponible)
  }
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

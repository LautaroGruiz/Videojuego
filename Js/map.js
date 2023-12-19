/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
 */

const emojis = {
  "-": " ",
  O: "🚪",
  X: "💣",
  I: "🎁",
  PLAYER: "💀",
  BOMB_COLLISION: "🔥",
  GAME_OVER: "👎",
  WIN: "🏆",
  HEART: "❤",
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
  `);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
`);
maps.push(`
  XI----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
  `);
maps.push(`
  XOXXXXXXXX
  X-X------X
  X---XXXX-X
  XXX-X----X
  XX--X-XXXX
  XIXXX-XXXX
  X--XX---XX
  XX-XXXX-XX
  XX------XX
  XXXXXXXXXX
`);

maps.push(`
XXXXXXXXXX
X---X---XX
X-X-X-X--X
X-X-X-XX-X
X-X-X--X-X
XOX-XX-X--
XXX--X-XX-
XXXX-X-X--
XXXX---X-X
XXXXXXXX-I
`);

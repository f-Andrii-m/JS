const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
const targetEl = document.getElementById("target");
const levelNameEl = document.getElementById("levelName");
const messageEl = document.getElementById("message");
const newGameBtn = document.getElementById("newGameBtn");
const restartBtn = document.getElementById("restartBtn");

const state = {
  puzzles: [],
  currentIndex: -1,
  initialBoard: [],
  board: [],
  moves: 0,
  seconds: 0,
  timerId: null,
  solved: false,
};

function cloneBoard(board) {
  return board.map((row) => row.slice());
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateStats() {
  movesEl.textContent = String(state.moves);
  timeEl.textContent = formatTime(state.seconds);
  const puzzle = state.puzzles[state.currentIndex];
  targetEl.textContent = puzzle ? String(puzzle.target) : "—";
  levelNameEl.textContent = puzzle ? puzzle.name : "—";
}

function setMessage(text) {
  messageEl.textContent = text;
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  stopTimer();
  state.timerId = setInterval(() => {
    state.seconds += 1;
    timeEl.textContent = formatTime(state.seconds);
  }, 1000);
}

function isSolved() {
  return state.board.every((row) => row.every((cell) => cell === 0));
}

function toggle(r, c) {
  if (r < 0 || r > 4 || c < 0 || c > 4) return;
  state.board[r][c] = state.board[r][c] ? 0 : 1;
}

function makeMove(row, col) {
  if (state.solved) return;

  toggle(row, col);
  toggle(row - 1, col);
  toggle(row + 1, col);
  toggle(row, col - 1);
  toggle(row, col + 1);

  state.moves += 1;
  updateStats();
  renderBoard();

  if (isSolved()) {
    state.solved = true;
    stopTimer();
    const puzzle = state.puzzles[state.currentIndex];
    const targetNote = state.moves === puzzle.target
      ? "Ви розв’язали поле мінімальною кількістю ходів."
      : "Поле розв’язано, але не мінімальною кількістю ходів.";
    setMessage(`Перемога! ${targetNote} Ходи: ${state.moves}, мінімум для цього поля: ${puzzle.target}.`);
  } else {
    setMessage("");
  }
}

function renderBoard() {
  boardEl.innerHTML = "";

  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      const cell = document.createElement("button");
      const on = state.board[row][col] === 1;

      cell.type = "button";
      cell.className = `cell ${on ? "on" : "off"}`;
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      cell.setAttribute(
        "aria-label",
        `Клітинка ${row + 1}, ${col + 1}, ${on ? "увімкнена" : "вимкнена"}`
      );

      cell.addEventListener("click", () => makeMove(row, col));
      boardEl.appendChild(cell);
    }
  }
}

function startGame(index) {
  const puzzle = state.puzzles[index];
  if (!puzzle) return;

  state.currentIndex = index;
  state.initialBoard = cloneBoard(puzzle.board);
  state.board = cloneBoard(puzzle.board);
  state.moves = 0;
  state.seconds = 0;
  state.solved = false;

  updateStats();
  setMessage(`Почато нове поле: ${puzzle.name}.`);
  renderBoard();
  startTimer();
}

function restartGame() {
  if (state.currentIndex < 0) return;
  state.board = cloneBoard(state.initialBoard);
  state.moves = 0;
  state.seconds = 0;
  state.solved = false;

  updateStats();
  setMessage("Поле перезапущено.");
  renderBoard();
  startTimer();
}

function newGame() {
  if (state.puzzles.length === 0) return;

  let nextIndex = 0;
  if (state.puzzles.length === 1) {
    nextIndex = 0;
  } else {
    do {
      nextIndex = Math.floor(Math.random() * state.puzzles.length);
    } while (nextIndex === state.currentIndex);
  }

  startGame(nextIndex);
}

newGameBtn.addEventListener("click", newGame);
restartBtn.addEventListener("click", restartGame);

async function init() {
  try {
    const response = await fetch("./data/games.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    state.puzzles = data.games || data;

    if (!Array.isArray(state.puzzles) || state.puzzles.length === 0) {
      throw new Error("JSON does not contain puzzles");
    }

    const randomIndex = Math.floor(Math.random() * state.puzzles.length);
    startGame(randomIndex);
  } catch (error) {
    console.error(error);
    setMessage("Не вдалося завантажити дані гри. Перевір шлях до data/games.json.");
  }
}

init();

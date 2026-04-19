let score = 0;
let time = 0;
let timer = null;
let gameActive = false;

const startBtn = document.getElementById("startBtn");
const difficulty = document.getElementById("difficulty");
const color = document.getElementById("color");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const box = document.getElementById("box");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

startBtn.addEventListener("click", () => {
  if (!difficulty.value || !color.value) return;

  startGame();
});

function startGame() {
  menu.classList.add("hidden");
  game.classList.remove("hidden");

  score = 0;
  scoreEl.textContent = score;

  gameActive = true;

  box.style.background = color.value;

  setDifficulty();

  moveBox();
  startTimer();
}

function setDifficulty() {
  if (difficulty.value === "easy") {
    time = 4;
    box.style.width = "70px";
    box.style.height = "70px";
  } else if (difficulty.value === "medium") {
    time = 2;
    box.style.width = "50px";
    box.style.height = "50px";
  } else {
    time = 1;
    box.style.width = "40px";
    box.style.height = "40px";
  }

  timeEl.textContent = time;
}

function moveBox() {
  const gameRect = game.getBoundingClientRect();

  const maxX = game.clientWidth - box.offsetWidth;
  const maxY = game.clientHeight - box.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

box.addEventListener("click", () => {
  if (!gameActive) return;

  score++;
  scoreEl.textContent = score;

  clearInterval(timer);

  setDifficulty();
  moveBox();
  startTimer();
});

function startTimer() {
  timeEl.textContent = time;

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive = false;
  alert("Гру завершено! Очки: " + score);
}

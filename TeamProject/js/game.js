let score = 0;
let time = 60;
let level = "medium";
let bestScore = localStorage.getItem("bestScore") || 0;
let spawnInterval;
let timerInterval;

function startGame() {

  app.innerHTML = `
    <h2 class="text-center">🎮 Catch the Gadgets</h2>

    <p class="text-center">
      Збирайте корисні гаджети та уникайте небезпечних предметів!
    </p>

    <div class="text-center mb-3">

      <label class="me-2">Рівень складності:</label>

      <select id="difficulty" class="form-select w-auto d-inline">
        <option value="easy">Easy</option>
        <option value="medium" selected>Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button id="startBtn"
  class="btn btn-success ms-2"
  onclick="beginGame()">
        ▶ Start
      </button>

    </div>

    <div class="text-center mb-2">
      ⏱ Час: <span id="time">60</span> |
      🎯 Очки: <span id="score">0</span> |
      🏆 Рекорд: ${bestScore}
    </div>

    <div id="gameArea" style="
      height: 50vh;
min-height: 300px;
      border: 2px solid #ccc;
      position: relative;
      overflow: hidden;
      background: #f8f9fa;
      border-radius: 10px;
    "></div>

    <div class="text-center mt-3">
      <button class="btn btn-primary"
        onclick="restartGame()">
        🔄 Restart
      </button>
    </div>
  `;
}

function beginGame() {
  clearInterval(timerInterval);
clearInterval(spawnInterval);

  level = document.getElementById("difficulty").value;

document.getElementById("startBtn").disabled = true;
document.getElementById("difficulty").disabled = true;

  resetGame();
  startTimers();
  spawnItems();
}

function resetGame() {

  score = 0;
  time = 60;

  document.getElementById("score").innerText = score;
  document.getElementById("time").innerText = time;
}

function startTimers() {

  timerInterval = setInterval(() => {

    time--;
    document.getElementById("time").innerText = time;

    if (time <= 0) {
      endGame();
    }

  }, 1000);
}

function spawnItems() {

  const area = document.getElementById("gameArea");

  // корисні гаджети
  const goodItems = [
    { icon: "📱", points: 1 },
    { icon: "🎧", points: 2 },
    { icon: "🖥️", points: 3 },
    { icon: "⌨️", points: 2 }
  ];

  // небезпечні предмети
  const badItems = [
    { icon: "💣", points: -3 },
    { icon: "❌", points: -2 }
  ];

  let spawnRate = 700;

  if (level === "easy") {
    spawnRate = 900;
  }

  if (level === "medium") {
    spawnRate = 700;
  }

  if (level === "hard") {
    spawnRate = 500;
  }

  spawnInterval = setInterval(() => {

    const item = document.createElement("div");

    let badChance = 0;

if (level === "easy") {
  badChance = 0;
}

if (level === "medium") {
  badChance = 0.2;
}

if (level === "hard") {
  badChance = 0.35;
}

const isBad = Math.random() < badChance;

    // випадковий вибір предмета
    const currentItem = isBad
      ? badItems[Math.floor(Math.random() * badItems.length)]
      : goodItems[Math.floor(Math.random() * goodItems.length)];

    item.innerText = currentItem.icon;

    item.style.position = "absolute";
    item.style.left = Math.random() * 90 + "%";
    item.style.top = "0px";
    item.style.cursor = "pointer";
    item.style.fontSize = "30px";

    area.appendChild(item);

    let fallSpeed;

    if (level === "easy") {
      fallSpeed = 2;
    }

    if (level === "medium") {
      fallSpeed = 3;
    }

    if (level === "hard") {
      fallSpeed = 4;
    }

    let fall = setInterval(() => {

      item.style.top =
        item.offsetTop + fallSpeed + "px";

      if (item.offsetTop > 320) {

       
       if (!isBad && level === "hard") {
  score = Math.max(0, score - 1);

}

        updateScore();

        item.remove();
        clearInterval(fall);
      }

    }, 30);

    item.onclick = () => {

      score += currentItem.points;

      // очки не можуть бути меншими за 0
      if (score < 0) {
        score = 0;
      }

      updateScore();

      item.remove();
      clearInterval(fall);
    };

  }, spawnRate);
}


function updateScore() {
  document.getElementById("score").innerText = score;
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(spawnInterval);

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
  }

  app.innerHTML = `
    <h2 class="text-center">⏰ Гру завершено</h2>
    <p class="text-center">Ваш результат: ${score}</p>
    <p class="text-center">🏆 Рекорд: ${bestScore}</p>

    <div class="text-center">
      <button class="btn btn-success" onclick="startGame()">Грати знову</button>
    </div>
  `;
}

function restartGame() {
  clearInterval(timerInterval);
  clearInterval(spawnInterval);
  startGame();
}
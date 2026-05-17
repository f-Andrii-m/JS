window.addEventListener("hashchange", router);

function router() {

  const hash = location.hash;

  const sort = document.getElementById("sortSelect");
  const search = document.getElementById("searchForm");

  // каталог
  if (hash === "#catalog") {

    sort.style.display = "";
    search.style.display = "";

    loadCatalog();

  }

  // гра
  else if (hash === "#game") {

    sort.style.display = "none";
    search.style.display = "none";

    startGame();

  }

  // головна
  else {

    sort.style.display = "none";
    search.style.display = "none";

    showHome();
  }

  // автоматично закривати mobile menu
  const nav = document.getElementById("nav");

  if (nav.classList.contains("show")) {
    nav.classList.remove("show");
  }
}

function showHome() {

  const savedName = localStorage.getItem("username");

  if (savedName) {

    app.innerHTML = `
      <div class="text-center mt-5">
        <h1>З поверненням, ${savedName} 👋</h1>

        <p class="mt-3">
          Переглядай нові гаджети та грай у Gadget Catch Game 🎮
        </p>

        <button class="btn btn-outline-danger mt-3"
          onclick="changeUser()">
          Змінити ім’я
        </button>
      </div>
    `;

  } else {

    app.innerHTML = `
      <div class="text-center mt-5">

        <h1>Ласкаво просимо до GadgetHub 👋</h1>

        <p class="mb-4">
          Введіть ваше ім’я для персоналізації сайту
        </p>

        <input
          id="name"
          placeholder="Ваше ім'я"
          class="form-control w-50 mx-auto"
        >

        <button onclick="saveUser()"
          class="btn btn-primary mt-3">
          Продовжити
        </button>

      </div>
    `;
  }
}

function saveUser() {

  const name = document.getElementById("name").value;

  if (name.trim() === "") {
    alert("Введіть ім’я");
    return;
  }

  localStorage.setItem("username", name);

  showHome();
}

function changeUser() {

  localStorage.removeItem("username");

  showHome();
}



router();
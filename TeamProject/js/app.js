const app = document.getElementById("app");
let catalogData = [];

function loadCatalog() {

  fetch("data/data.json")
    .then(res => res.json())
    .then(data => {

      catalogData = data;

      renderCatalog(data);
    });
}

function renderCatalog(data) {
  let html = `<h1 class="text-center mb-4">Каталог гаджетів</h1>`;

  data.categories.forEach(cat => {
    html += `<h2>${cat.name}</h2><div class="row">`;

    cat.items.forEach(item => {
      html += renderCard(item);
    });

    html += "</div>";
  });

  app.innerHTML = html;
}


function searchItems() {

  const query =
    document.getElementById("searchInput")
      .value
      .toLowerCase();

  const filteredData = {
    categories: []
  };

  catalogData.categories.forEach(cat => {

    const filteredItems = cat.items.filter(item => {

      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });

    if (filteredItems.length > 0) {

      filteredData.categories.push({
        name: cat.name,
        items: filteredItems
      });
    }
  });

  renderCatalog(filteredData);
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

// при завантаженні
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

function sortItems() {
  const value = document.getElementById("sortSelect").value;

  // якщо "без сортування"
  if (value === "default") {
    currentView = "catalog";
    loadCatalog();
    return;
  }

  // обрані товари
  if (value === "favorites") {
    showFavorites();
    return;
  }

  fetch("data/data.json")
    .then(res => res.json())
    .then(data => {

      let items = [];

      data.categories.forEach(cat => {
        items = items.concat(cat.items);
      });

      if (value === "priceAsc") {
        items.sort((a, b) =>
          parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
        );
      }

      if (value === "priceDesc") {
        items.sort((a, b) =>
          parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
        );
      }

      currentView = "flat";
      renderFlat(items);
    });
}

function renderFlat(items) {
  let html = `<div class="row">`;

  items.forEach(item => {
    html += renderCard(item);
  });

  html += `</div>`;
  app.innerHTML = html;
}

function shortText(text, length = 40) {
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
}

function toggleText(btn) {
  const cardBody = btn.parentElement;

  const short = cardBody.querySelector(".short-text");
  const full = cardBody.querySelector(".full-text");

  if (full.classList.contains("d-none")) {
    full.classList.remove("d-none");
    short.classList.add("d-none");
    btn.innerText = "Згорнути";
  } else {
    full.classList.add("d-none");
    short.classList.remove("d-none");
    btn.innerText = "Розгорнути";
  }
}

function renderCard(item) {
  return `
    <div class="col-md-4 d-flex">
      <div class="card mb-3 w-100">

        <img src="${item.image}" class="card-img-top">

        <div class="card-body">

          <h5>${item.name}</h5>

          <p class="short-text">
            ${shortText(item.description)}
          </p>

          <p class="full-text d-none">
            ${item.description}
          </p>

          <button class="btn btn-link p-0" onclick="toggleText(this)">
            Розгорнути
          </button>

          <strong class="mt-2">${item.price}</strong>

          <button class="btn btn-outline-danger mt-2"
  onclick="toggleFavorite('${item.name}')">

  ${favorites.includes(item.name)
    ? "💔 Видалити з обраних"
    : "❤️ Додати в обране"}

</button>

        </div>
      </div>
    </div>
  `;
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(name) {

  if (favorites.includes(name)) {
    favorites = favorites.filter(item => item !== name);
  } else {
    favorites.push(name);
  }

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  if (
    document.getElementById("sortSelect").value === "favorites"
  ) {
    showFavorites();
  } else {
    loadCatalog();
  }
}

function showFavorites() {
  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  fetch("data/data.json")
    .then(res => res.json())
    .then(data => {

      let items = [];

      data.categories.forEach(cat => {
        items = items.concat(cat.items);
      });

      const filtered = items.filter(item =>
        favorites.includes(item.name)
      );

      if (filtered.length === 0) {
        app.innerHTML = `<h3 class="text-center">Немає обраних товарів ❤️</h3>`;
        return;
      }

      renderFlat(filtered);
    });
}
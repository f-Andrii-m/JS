
const app = document.getElementById('app');
const categoryLinks = document.getElementById('categoryLinks');
const homeLink = document.getElementById('homeLink');
const catalogLink = document.getElementById('catalogLink');
const specialsLink = document.getElementById('specialsLink');

let categoriesCache = [];

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Помилка завантаження ${path}: ${response.status}`);
  }
  return await response.json();
}

function renderHome() {
  app.innerHTML = `
    <h2>Головна сторінка</h2>
    <p class="notes">Оберіть категорію нижче. Дані підтягуються з JSON-файлів через Ajax (fetch) без перезавантаження сторінки.</p>
    <div id="homeCatalog"></div>
  `;
  const homeCatalog = document.getElementById('homeCatalog');
  homeCatalog.innerHTML = categoriesCache.map(cat => `
    <p><a href="#" class="cat-link" data-shortname="${escapeHtml(cat.shortname)}">${escapeHtml(cat.name)}</a></p>
  `).join('');
  homeCatalog.querySelectorAll('.cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      loadCategory(link.dataset.shortname);
    });
  });
}

function renderCatalogList() {
  app.innerHTML = `
    <h2>Каталог категорій</h2>
    <p class="notes">Натисни на назву категорії, щоб завантажити її вміст.</p>
    <div id="catalogList"></div>
  `;
  const catalogList = document.getElementById('catalogList');
  catalogList.innerHTML = categoriesCache.map(cat => `
    <p><a href="#" class="cat-link" data-shortname="${escapeHtml(cat.shortname)}">${escapeHtml(cat.name)}</a></p>
  `).join('');
  catalogList.querySelectorAll('.cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      loadCategory(link.dataset.shortname);
    });
  });
}

function renderCategoryView(payload, randomMode = false) {
  const category = payload.category;
  const items = payload.items || [];
  app.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>${escapeHtml(category.title || category.name)}</h2>
        <p class="notes">${escapeHtml(category.notes || '')}</p>
        ${randomMode ? '<p class="muted">Показано випадково вибрану категорію.</p>' : ''}
      </div>
      <button class="back-btn" id="backToCatalog">Повернутись до каталогу</button>
    </div>
    <div class="grid">
      ${items.map(item => `
        <article class="card">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
          <div class="card-body">
            <h3>${escapeHtml(item.name)}</h3>
            <p class="muted">${escapeHtml(item.description)}</p>
            <div class="price">${escapeHtml(item.price)}</div>
          </div>
        </article>
      `).join('')}
    </div>
  `;
  document.getElementById('backToCatalog').addEventListener('click', (e) => {
    e.preventDefault();
    renderCatalogList();
  });
}

async function loadCategory(shortname, randomMode = false) {
  try {
    const payload = await fetchJson(`data/${shortname}.json`);
    renderCategoryView(payload, randomMode);
  } catch (error) {
    app.innerHTML = `<p>Не вдалося завантажити категорію. ${escapeHtml(error.message)}</p>`;
  }
}

async function initCatalog() {
  try {
    const data = await fetchJson('data/categories.json');
    categoriesCache = data.categories || [];

    categoryLinks.innerHTML = categoriesCache.map(cat => `
      <a href="#" class="cat-link" data-shortname="${escapeHtml(cat.shortname)}">${escapeHtml(cat.name)}</a>
    `).join('');

    categoryLinks.querySelectorAll('.cat-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        loadCategory(link.dataset.shortname);
      });
    });

    specialsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const randomIndex = Math.floor(Math.random() * categoriesCache.length);
      const randomShortname = categoriesCache[randomIndex].shortname;
      loadCategory(randomShortname, true);
    });

    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      renderHome();
    });

    catalogLink.addEventListener('click', (e) => {
      e.preventDefault();
      renderCatalogList();
    });

    renderHome();
  } catch (error) {
    app.innerHTML = `<p>Не вдалося завантажити список категорій. ${escapeHtml(error.message)}</p>`;
  }
}

initCatalog();

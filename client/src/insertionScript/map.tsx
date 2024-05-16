// Создаем элемент div для карты
const mapDiv = document.createElement('div');
mapDiv.id = 'map';
mapDiv.style.width = '600px';
mapDiv.style.height = '400px';
document.body.appendChild(mapDiv);

// Добавляем элемент link для загрузки CSS Leaflet через CDN
const leafletCSS = document.createElement('link');
leafletCSS.rel = 'stylesheet';
leafletCSS.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
document.head.appendChild(leafletCSS);

// Добавляем элемент script для загрузки Leaflet JavaScript через CDN
const leafletScript = document.createElement('script');
leafletScript.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
leafletScript.onload = initializeMap;
document.head.appendChild(leafletScript);

function initializeMap() {
    // Подключаем библиотеку Leaflet
    const L = window.L;

    // Создаем карту с центром в городе Москва
    const map = L.map('map').setView([55.7558, 37.6176], 13);

    // Добавляем слой с тайлами OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Добавляем маркер на карте
    const marker = L.marker([55.7558, 37.6176]).addTo(map);

    // Добавляем всплывающее окно к маркеру
    marker.bindPopup("<b>Привет, Москва!</b>").openPopup();
}

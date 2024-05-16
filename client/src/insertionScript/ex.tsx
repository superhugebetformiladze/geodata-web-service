// Получаем параметры из URL скрипта
const scriptUrl = new URL(document.currentScript.src);
const params = new URLSearchParams(scriptUrl.search);
const id = params.get('id');

// Теперь переменная id содержит значение параметра id из URL скрипта

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
    const map = L.map('map').setView([54.3605384753845, 48.353883881059815], 11);

    // Добавляем слой с тайлами OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    fetch('http://localhost:8000/api/get_geo_object_script/' + id)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Добавляем объекты GeoJSON на карту
        L.geoJSON(data).addTo(map);
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });

    const attributionControl = document.querySelector('.leaflet-control-attribution');
    if (attributionControl) {
        attributionControl.style.display = 'none';
    }
}

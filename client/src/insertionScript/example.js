// Получаем параметры из URL скрипта
const scriptUrl = new URL(document.currentScript.src);
const params = new URLSearchParams(scriptUrl.search);
const id = params.get('id');
let width = params.get('width');
let height = params.get('height');
let zoom = params.get('zoom');
let center = params.get('center');


if (!width) {
    width = '600px';
}
if (!height) {
    height = '400px';
}
if (!zoom) {
    zoom = 10;
}

// Создаем элемент div для карты и устанавливаем ширину и высоту из параметров URL
const mapDiv = document.createElement('div');
mapDiv.id = 'map';
mapDiv.style.width = width; // Используем значение width из URL или значение по умолчанию
mapDiv.style.height = height; // Используем значение height из URL или значение по умолчанию
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

    let mapCenter = center ? center.split(',').map(Number) : [54.35135425936058, 48.38624596595764];

    const map = L.map('map').setView(mapCenter, parseInt(zoom));

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
        const geoJsonLayer = L.geoJSON(data).addTo(map);

        // Устанавливаем центр карты по средней координате всех объектов GeoJSON, если центр не передан в URL
        if (!center) {
            const coordinates = [];
            data.features.forEach(feature => {
                const coords = feature.geometry.coordinates;
                coords.forEach(coordSet => {
                    coordSet.forEach(coord => {
                        coordinates.push(coord);
                    });
                });
            });

            const avgLat = coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length;
            const avgLng = coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length;

            map.setView([avgLat, avgLng], parseInt(zoom));
        }
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });

    const attributionControl = document.querySelector('.leaflet-control-attribution');
    if (attributionControl) {
        attributionControl.style.display = 'none';
    }
}
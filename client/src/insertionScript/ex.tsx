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

    // Создаем данные GeoJSON
    const geoData = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                48.353883881059815,
                                54.3605384753845
                            ],
                            [
                                48.37928971702041,
                                54.32450466662607
                            ],
                            [
                                48.30993865129015,
                                54.34592857149444
                            ]
                        ]
                    ]
                },
                "properties": {}
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                48.3817897141925,
                                54.36404699238329
                            ],
                            [
                                48.39154816302009,
                                54.34537317526755
                            ],
                            [
                                48.36867680774138,
                                54.34572894503321
                            ],
                            [
                                48.360748065451546,
                                54.38289005938979
                            ]
                        ]
                    ]
                },
                "properties": {}
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                48.311311939720454,
                                54.37154250623618
                            ],
                            [
                                48.27560644053259,
                                54.347730073265154
                            ],
                            [
                                48.229601278117435,
                                54.3621392449242
                            ]
                        ]
                    ]
                },
                "properties": {}
            }
        ]
    };


    // Добавляем объекты GeoJSON на карту
    L.geoJSON(geoData).addTo(map);

    const attributionControl = document.querySelector('.leaflet-control-attribution');
    if (attributionControl) {
        attributionControl.style.display = 'none';
    }
}

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const Draw = () => {
    const [center, setCenter] = useState({ lat: 54.35135425936058, lng: 48.38624596595764 });
    const [mapLayers, setMapLayers] = useState([]);
    const [geoJSON, setGeoJSON] = useState(null);
    const mapRef = useRef();
    const drawnItemsRef = useRef();

    const ZOOM_LEVEL = 12;
    const mapStyle = {
        width: '100%',
        height: '80vh',
    };

    const _onCreate = (e) => {
        console.log(e);
        const { layerType, layer } = e;
        if (layerType === "polygon") {
            const { _leaflet_id } = layer;
            setMapLayers((layers) => [
                ...layers,
                { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
            ]);
        }
    };

    const _onEdited = (e) => {
        console.log(e);
        const {
            layers: { _layers },
        } = e;

        Object.values(_layers).map(({ _leaflet_id, editing }) => {
            setMapLayers((layers) =>
                layers.map((l) =>
                    l.id === _leaflet_id
                        ? { ...l, latlngs: { ...editing.latlngs[0] } }
                        : l
                )
            );
        });
    };

    const _onDeleted = (e) => {
        console.log(e);
        const {
            layers: { _layers },
        } = e;

        Object.values(_layers).map(({ _leaflet_id }) => {
            setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
        });
    };

    const saveGeoJSON = () => {
        const geojson = {
            type: 'FeatureCollection',
            features: mapLayers.map(layer => ({
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [layer.latlngs.map(coord => [coord.lng, coord.lat])]
                },
                properties: {
                    // Здесь могут быть дополнительные свойства вашего объекта
                }
            }))
        };

        const blob = new Blob([JSON.stringify(geojson)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mapData.geojson';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = JSON.parse(event.target.result);
            console.log(data); // Проверим, что данные правильно загружены

            setGeoJSON(data);

            // При загрузке объектов из файла GeoJSON добавляем их в слой
            drawnItemsRef.current.clearLayers(); // Очищаем слой перед добавлением новых объектов
            L.geoJSON(data, {
                onEachFeature: (feature, layer) => {
                    drawnItemsRef.current.addLayer(layer); // Добавляем каждый объект в слой
                }
            });
        };

        reader.readAsText(file);
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={mapStyle} attributionControl={false}>
                        <FeatureGroup ref={drawnItemsRef}>
                            <EditControl
                                position="topright"
                                onCreated={_onCreate}
                                onEdited={_onEdited}
                                onDeleted={_onDeleted}
                                draw={{
                                    polyline: true,
                                    polygon: true,
                                    rectangle: true,
                                    circle: true,
                                    marker: true,
                                    circlemarker: true,
                                }}
                            />
                        </FeatureGroup>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/>copyright&quot;>OpenStreetMap</a> contributors"
                        />

                        {geoJSON && (
                            <GeoJSON
                                data={geoJSON}
                            />
                        )}
                    </MapContainer>

                    <button onClick={saveGeoJSON}>Сохранить</button>
                    <input type="file" onChange={handleFileChange} />

                    {/* Вывод информации о слоях */}
                    <div>
                        <h2>Информация о слоях:</h2>
                        <ul>
                            {mapLayers.map(layer => (
                                <li key={layer.id}>
                                    Слой ID: {layer.id}
                                    <ul>
                                        {layer.latlngs.map((latlng, index) => (
                                            <li key={index}>Объект {index + 1}: (Широта: {latlng.lat}, Долгота: {latlng.lng})</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Draw;

import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const Example = () => {
    const [center, setCenter] = useState({ lat: 54.35135425936058, lng: 48.38624596595764 });
    const [drawnItems, setDrawnItems] = useState([]);

    const ZOOM_LEVEL = 12;
    const mapStyle = {
        width: '100%',
        height: '80vh',
    };

    const _onCreate = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'polygon' || layerType === 'marker') {
            const coordinates = layer.getLatLng ? layer.getLatLng() : layer.getLatLngs();
            setDrawnItems(prevItems => [...prevItems, { type: layerType, coordinates }]);
        }
    };

    const _onEdited = (e) => {
        console.log(e);
    };

    const _onDeleted = (e) => {
        console.log(e);
    };

    const printDrawnItems = () => {
        console.log(drawnItems);
    };

    const downloadGeoJSON = () => {
        const geoJSONData = {
            type: "FeatureCollection",
            features: drawnItems.map(item => {
                let geometry;
                if (item.type === 'polygon') {
                    geometry = {
                        type: "Polygon",
                        coordinates: [item.coordinates.map(coord => [coord.lat, coord.lng])]
                    };
                } else if (item.type === 'marker') {
                    geometry = {
                        type: "Point",
                        coordinates: [item.coordinates.lat, item.coordinates.lng]
                    };
                }
                return {
                    type: "Feature",
                    geometry,
                    properties: {}
                };
            })
        };

        const jsonData = JSON.stringify(geoJSONData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "drawn_items.geojson");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <MapContainer center={center} zoom={ZOOM_LEVEL} style={mapStyle} attributionControl={false}>
                        <FeatureGroup>
                            <EditControl
                                position="topright"
                                onCreated={_onCreate}
                                onEdited={_onEdited}
                                onDeleted={_onDeleted}
                                draw={{
                                    polyline: false,
                                    polygon: true,
                                    rectangle: false,
                                    circle: false,
                                    marker: true,
                                    circlemarker: false,
                                }}
                            />
                        </FeatureGroup>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/>copyright&quot;>OpenStreetMap</a> contributors"
                        />
                    </MapContainer>
                </div>
            </div>
            <button onClick={printDrawnItems}>Print Drawn Items</button>
            <button onClick={downloadGeoJSON}>Download GeoJSON</button>
        </>
    );
};

export default Example;

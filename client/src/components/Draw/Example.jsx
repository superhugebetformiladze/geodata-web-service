import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const ProjectMap = ({ geoObjectDB }) => {
    const center = { lat: 54.35135425936058, lng: 48.38624596595764 };
    const [mapLayers, setMapLayers] = useState([]);
    const mapRef = useRef();
    const drawnItemsRef = useRef();

    const ZOOM_LEVEL = 12;
    const mapStyle = {
        width: '100%',
        height: '60vh',
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
        const { layers: { _layers } } = e;
        Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
            setMapLayers((layers) =>
                layers.map((l) =>
                    l.id === _leaflet_id
                        ? { ...l, latlngs: editing.latlngs[0] }
                        : l
                )
            );
        });
    };

    const _onDeleted = (e) => {
        console.log(e);
        const { layers: { _layers } } = e;
        Object.values(_layers).forEach(({ _leaflet_id }) => {
            setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
        });
    };

    useEffect(() => {
        console.log("hook active");
        if (geoObjectDB && geoObjectDB.object_data && Array.isArray(geoObjectDB.object_data.features)) {
            const objectData = geoObjectDB.object_data;
            console.log("geoObjectDB", geoObjectDB);
            console.log("objectData", objectData);
            const newLayers = objectData.features.map((feature, index) => ({
                id: `db_${index}`, // Присваивание уникального id
                latlngs: feature.geometry.coordinates[0].map(coord => ({
                    lat: coord[1],
                    lng: coord[0]
                }))
            }));
            console.log("newLayers", newLayers);
            setMapLayers((layers) => [...layers, ...newLayers]);

            // Add polygons to the map
            newLayers.forEach(layer => {
                const polygon = L.polygon(layer.latlngs);
                drawnItemsRef.current.addLayer(polygon);
            });
        }
    }, [geoObjectDB]);

    return (
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
                                polyline: false,
                                polygon: true,
                                rectangle: false,
                                circle: false,
                                marker: false,
                                circlemarker: false,
                            }}
                        />
                    </FeatureGroup>

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />

                </MapContainer>
            </div>
        </div>
    );
};

export default ProjectMap;

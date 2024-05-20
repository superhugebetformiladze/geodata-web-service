import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const ProjectMap = ({ onGeoJsonData, geoObjectDB }) => {
    const center = { lat: 54.35135425936058, lng: 48.38624596595764 };
    const [mapLayers, setMapLayers] = useState([]);
    const drawnItemsRef = useRef(L.featureGroup());

    const ZOOM_LEVEL = 12;
    const mapStyle = {
        width: '100%',
        height: '60vh',
    };

    const _onCreate = (e) => {
        const { layerType, layer } = e;
        const { _leaflet_id } = layer;
        let newLayer = {};

        switch (layerType) {
            case "polygon":
            case "rectangle":
                newLayer = {
                    id: _leaflet_id,
                    type: layerType,
                    latlngs: layer.getLatLngs()[0],
                };
                break;
            case "polyline":
                newLayer = {
                    id: _leaflet_id,
                    type: layerType,
                    latlngs: layer.getLatLngs(),
                };
                break;
            case "marker":
                newLayer = {
                    id: _leaflet_id,
                    type: layerType,
                    latlng: layer.getLatLng(),
                };
                break;
            case "circle":
            case "circlemarker":
                newLayer = {
                    id: _leaflet_id,
                    type: layerType,
                    latlng: layer.getLatLng(),
                    radius: layer.getRadius(),
                };
                break;
            default:
                break;
        }

        setMapLayers((layers) => [...layers, newLayer]);
    };

    const _onEdited = (e) => {
        const { layers: { _layers } } = e;
        const updatedLayers = Object.values(_layers).map(({ _leaflet_id, editing, getLatLngs, getLatLng, getRadius }) => {
            let updatedLayer = {};

            switch (editing.layerType) {
                case "polygon":
                case "rectangle":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlngs: getLatLngs()[0],
                    };
                    break;
                case "polyline":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlngs: getLatLngs(),
                    };
                    break;
                case "marker":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlng: getLatLng(),
                    };
                    break;
                case "circle":
                case "circlemarker":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlng: getLatLng(),
                        radius: getRadius(),
                    };
                    break;
                default:
                    break;
            }

            return updatedLayer;
        });

        setMapLayers((layers) =>
            layers.map((layer) =>
                updatedLayers.find((l) => l.id === layer.id) || layer
            )
        );
    };

    const _onDeleted = (e) => {
        const { layers: { _layers } } = e;
        const deletedIds = Object.values(_layers).map(({ _leaflet_id }) => _leaflet_id);
        setMapLayers((layers) => layers.filter((layer) => !deletedIds.includes(layer.id)));
    };

    const updateGeoJsonData = () => {
        if (drawnItemsRef.current) {
            const geojson = drawnItemsRef.current.toGeoJSON();
            onGeoJsonData(geojson);
        }
    };

    useEffect(() => {
        if (geoObjectDB && geoObjectDB.object_data && Array.isArray(geoObjectDB.object_data.features)) {
            const objectData = geoObjectDB.object_data;
            const newLayers = objectData.features.map((feature, index) => {
                const { geometry, properties } = feature;
                const { type, coordinates } = geometry;

                let newLayer = {};

                switch (type) {
                    case "Polygon":
                        newLayer = {
                            id: `db_${index}`,
                            type: "polygon",
                            latlngs: coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] })),
                        };
                        break;
                    case "LineString":
                        newLayer = {
                            id: `db_${index}`,
                            type: "polyline",
                            latlngs: coordinates.map(coord => ({ lat: coord[1], lng: coord[0] })),
                        };
                        break;
                    case "Point":
                        newLayer = {
                            id: `db_${index}`,
                            type: properties.radius ? "circle" : "marker",
                            latlng: { lat: coordinates[1], lng: coordinates[0] },
                            radius: properties.radius,
                        };
                        break;
                    default:
                        break;
                }

                return newLayer;
            });

            newLayers.forEach(layer => {
                let leafletLayer;
                switch (layer.type) {
                    case "polygon":
                        leafletLayer = L.polygon(layer.latlngs);
                        break;
                    case "polyline":
                        leafletLayer = L.polyline(layer.latlngs);
                        break;
                    case "marker":
                        leafletLayer = L.marker(layer.latlng);
                        break;
                    case "circle":
                        leafletLayer = L.circle(layer.latlng, { radius: layer.radius });
                        break;
                    case "rectangle":
                        leafletLayer = L.rectangle(layer.latlngs);
                        break;
                    case "circlemarker":
                        leafletLayer = L.circleMarker(layer.latlng, { radius: layer.radius });
                        break;
                    default:
                        break;
                }

                if (leafletLayer) {
                    drawnItemsRef.current.addLayer(leafletLayer);
                }
            });

            setMapLayers(newLayers);
        }
    }, [geoObjectDB]);

    useEffect(() => {
        updateGeoJsonData();
    }, [mapLayers]);

    return (
        <div className="row">
            <div className="col">
                <MapContainer center={center} zoom={ZOOM_LEVEL} style={mapStyle} attributionControl={false}>
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
                                circle: false,
                                marker: true,
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
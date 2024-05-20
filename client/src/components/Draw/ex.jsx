import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const ProjectMap = ({ onGeoJsonData, geoObjectDB }) => {
    const center = { lat: 54.35135425936058, lng: 48.38624596595764 };
    const [mapLayers, setMapLayers] = useState([]);
    const [currentLayer, setCurrentLayer] = useState(null);
    const [popupText, setPopupText] = useState("");
    const drawnItemsRef = useRef(L.featureGroup());

    const ZOOM_LEVEL = 12;
    const mapStyle = {
        width: '100%',
        height: '60vh',
    };

    const handleSavePopup = () => {
        if (currentLayer) {
            const updatedLayers = mapLayers.map(layer =>
                layer.id === currentLayer._leaflet_id ? { ...layer, popup: popupText } : layer
            );
            setMapLayers(updatedLayers);
            currentLayer.setPopupContent(createPopupContents(currentLayer)).openPopup();
            setPopupText("");
            setCurrentLayer(null);
        }
    };

    const createPopupContents = (layer) => {
        const layerData = mapLayers.find(l => l.id === layer._leaflet_id);
        const text = layerData ? layerData.popup : "Default text";
        const container = L.DomUtil.create("div");

        const span = L.DomUtil.create("span", "popup-span", container);
        span.textContent = text;

        const editButton = L.DomUtil.create("button", "", container);
        editButton.innerHTML = "Edit";
        L.DomEvent.on(editButton, "click", () => {
            const newText = prompt("Enter new text for the popup", text);
            if (newText !== null) {
                span.textContent = newText;
                setPopupText(newText);
                setCurrentLayer(layer);
                handleSavePopup();
            }
        });

        const deleteButton = L.DomUtil.create("button", "", container);
        deleteButton.innerHTML = "Delete";
        L.DomEvent.on(deleteButton, "click", () => {
            drawnItemsRef.current.removeLayer(layer);
            const updatedLayers = mapLayers.filter(l => l.id !== layer._leaflet_id);
            setMapLayers(updatedLayers);
        });

        return container;
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
                    popup: "Default text" // Add default popup
                };
                break;
            case "polyline":
                newLayer = {
                    id: _leaflet_id,
                    type: layerType,
                    latlngs: layer.getLatLngs(),
                    popup: "Default text" // Add default popup
                };
                break;
            case "marker":
                newLayer = {
                    id: _leaflet_id,
                    type: layerType,
                    latlng: layer.getLatLng(),
                    popup: "Default text" // Add default popup
                };
                break;
            case "circle":
            case "circlemarker":
                newLayer = {
                    id: _leaflet_id,
                    type: layerType,
                    latlng: layer.getLatLng(),
                    radius: layer.getRadius(),
                    popup: "Default text" // Add default popup
                };
                break;
            default:
                break;
        }

        setMapLayers((layers) => [...layers, newLayer]);
        layer.bindPopup(createPopupContents(layer)).openPopup();
    };

    const _onEdited = (e) => {
        const { layers: { _layers } } = e;
        const updatedLayers = Object.values(_layers).map(({ _leaflet_id, editing, getLatLngs, getLatLng, getRadius, getPopup }) => {
            let updatedLayer = {};

            switch (editing.layerType) {
                case "polygon":
                case "rectangle":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlngs: getLatLngs()[0],
                        popup: getPopup().getContent() // Get popup content
                    };
                    break;
                case "polyline":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlngs: getLatLngs(),
                        popup: getPopup().getContent() // Get popup content
                    };
                    break;
                case "marker":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlng: getLatLng(),
                        popup: getPopup().getContent() // Get popup content
                    };
                    break;
                case "circle":
                case "circlemarker":
                    updatedLayer = {
                        id: _leaflet_id,
                        type: editing.layerType,
                        latlng: getLatLng(),
                        radius: getRadius(),
                        popup: getPopup().getContent() // Get popup content
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
        const geojson = {
            type: 'FeatureCollection',
            features: mapLayers.map(layer => {
                const { id, type, latlngs, latlng, radius, popup } = layer;

                let geometry;
                switch (type) {
                    case "polygon":
                        geometry = {
                            type: "Polygon",
                            coordinates: [latlngs.map(coord => [coord.lng, coord.lat])]
                        };
                        break;
                    case "polyline":
                        geometry = {
                            type: "LineString",
                            coordinates: [latlngs.map(coord => [coord.lng, coord.lat])]
                        };
                        break;
                    case "marker":
                        geometry = {
                            type: "Point",
                            coordinates: [latlng.lng, latlng.lat]
                        };
                        break;
                    case "circle":
                    case "circlemarker":
                        geometry = {
                            type: "Point",
                            coordinates: [latlng.lng, latlng.lat]
                        };
                        break;
                    default:
                        geometry = null;
                }

                return {
                    type: "Feature",
                    geometry,
                    properties: {
                        id,
                        type,
                        radius: radius || null,
                        popup
                    }
                };
            })
        };

        onGeoJsonData(geojson);
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
                            popup: properties.popup || "Default text" // Load popup content
                        };
                        break;
                    case "LineString":
                        newLayer = {
                            id: `db_${index}`,
                            type: "polyline",
                            latlngs: coordinates.map(coord => ({ lat: coord[1], lng: coord[0] })),
                            popup: properties.popup || "Default text" // Load popup content
                        };
                        break;
                    case "Point":
                        newLayer = {
                            id: `db_${index}`,
                            type: properties.radius ? (properties.subType === "CircleMarker" ? "circlemarker" : "circle") : "marker",
                            latlng: { lat: coordinates[1], lng: coordinates[0] },
                            radius: properties.radius,
                            popup: properties.popup || "Default text" // Load popup content
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
                        leafletLayer.bindPopup(createPopupContents(leafletLayer)).openPopup();
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
                                    circle: true,
                                    marker: true,
                                    circlemarker: true,
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
    
                       

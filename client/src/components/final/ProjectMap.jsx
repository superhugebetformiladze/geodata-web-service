import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { handleCreate, handleEdit, handleDelete } from './mapHandlers';
import { initializeLayers, updateGeoJsonData, createPopupContents } from './mapUtils';

const ProjectMap = ({ onGeoJsonData, geoObjectDB }) => {
    const center = { lat: 54.35135425936058, lng: 48.38624596595764 };
    const [mapLayers, setMapLayers] = useState([]);
    const drawnItemsRef = useRef(L.featureGroup());

    const ZOOM_LEVEL = 12;
    const mapStyle = {
        width: '100%',
        height: '60vh',
    };

    useEffect(() => {
        if (geoObjectDB && geoObjectDB.object_data && Array.isArray(geoObjectDB.object_data.features)) {
            const newLayers = initializeLayers(geoObjectDB.object_data);
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
                    leafletLayer.on('click', () => {
                        if (!leafletLayer.getPopup()) {
                            leafletLayer.bindPopup(createPopupContents(leafletLayer, setMapLayers, mapLayers)).openPopup();
                        } else {
                            leafletLayer.openPopup();
                        }
                    });
                    drawnItemsRef.current.addLayer(leafletLayer);
                }
            });
            setMapLayers(newLayers);
        }
    }, [geoObjectDB]);

    useEffect(() => {
        updateGeoJsonData(drawnItemsRef, onGeoJsonData);
    }, [mapLayers, onGeoJsonData]);

    return (
        <div className="row">
            <div className="col">
                <MapContainer center={center} zoom={ZOOM_LEVEL} style={mapStyle} attributionControl={false}>
                    <FeatureGroup ref={drawnItemsRef}>
                        <EditControl
                            position="topright"
                            onCreated={(e) => handleCreate(e, setMapLayers, mapLayers)}
                            onEdited={(e) => handleEdit(e, setMapLayers, mapLayers)}
                            onDeleted={(e) => handleDelete(e, setMapLayers)}
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
                        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    />
                </MapContainer>
            </div>
        </div>
    );
};

export default ProjectMap;

import { createPopupContents } from './mapUtils';
import L from "leaflet";

export const handleCreate = (e, setMapLayers, mapLayers) => {
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
                popup: "Полигон" // Add default popup
            };
            break;
        case "polyline":
            newLayer = {
                id: _leaflet_id,
                type: layerType,
                latlngs: layer.getLatLngs(),
                popup: "Линия" // Add default popup
            };
            break;
        case "marker":
            newLayer = {
                id: _leaflet_id,
                type: layerType,
                latlng: layer.getLatLng(),
                popup: "Маркер" // Add default popup
            };
            break;
        case "circle":
        case "circlemarker":
            newLayer = {
                id: _leaflet_id,
                type: layerType,
                latlng: layer.getLatLng(),
                radius: layer.getRadius(),
                popup: "Окружность" // Add default popup
            };
            break;
        default:
            break;
    }

    setMapLayers((layers) => [...layers, newLayer]);
    layer.on('click', () => {
        if (!layer.getPopup()) {
            layer.bindPopup(createPopupContents(layer, setMapLayers, mapLayers)).openPopup();
        } else {
            layer.openPopup();
        }
    });
};

export const handleEdit = (e, setMapLayers, mapLayers) => {
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

export const handleDelete = (e, setMapLayers) => {
    const { layers: { _layers } } = e;
    const deletedIds = Object.values(_layers).map(({ _leaflet_id }) => _leaflet_id);
    setMapLayers((layers) => layers.filter((layer) => !deletedIds.includes(layer.id)));
};

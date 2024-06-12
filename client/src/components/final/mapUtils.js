import L from "leaflet";

export const initializeLayers = (objectData) => {
    return objectData.features.map((feature, index) => {
        const { geometry, properties } = feature;
        const { type, coordinates } = geometry;

        let newLayer = {};

        switch (type) {
            case "Polygon":
                newLayer = {
                    id: `db_${index}`,
                    type: "polygon",
                    latlngs: coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] })),
                    popup: properties.popup || "Полигон"
                };
                break;
            case "LineString":
                newLayer = {
                    id: `db_${index}`,
                    type: "polyline",
                    latlngs: coordinates.map(coord => ({ lat: coord[1], lng: coord[0] })),
                    popup: properties.popup || "Линия"
                };
                break;
            case "Point":
                newLayer = {
                    id: `db_${index}`,
                    type: properties.radius ? "circle" : "marker",
                    latlng: { lat: coordinates[1], lng: coordinates[0] },
                    radius: properties.radius,
                    popup: properties.popup || "Маркер"
                };
                break;
            default:
                break;
        }

        return newLayer;
    });
};

export const updateGeoJsonData = (drawnItemsRef, onGeoJsonData) => {
    if (drawnItemsRef.current) {
        const geojson = drawnItemsRef.current.toGeoJSON();
        onGeoJsonData(geojson);
    }
};

export const createPopupContents = (layer, setMapLayers, mapLayers) => {
    const layerData = mapLayers.find(l => l.id === layer._leaflet_id);
    const text = layerData ? layerData.popup : "Default text";
    const container = L.DomUtil.create("div", "p-4 bg-white rounded-lg shadow-lg");

    const span = L.DomUtil.create("span", "popup-span block mb-2", container);
    span.textContent = text;

    const editButton = L.DomUtil.create("button", "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2", container);
    editButton.innerHTML = "Edit";
    L.DomEvent.on(editButton, "click", () => {
        const newText = prompt("Enter new text for the popup", text);
        if (newText !== null) {
            span.textContent = newText;
            const updatedLayers = mapLayers.map(layer =>
                layer.id === layer._leaflet_id ? { ...layer, popup: newText } : layer
            );
            setMapLayers(updatedLayers);
            layer.setPopupContent(createPopupContents(layer, setMapLayers, mapLayers)).openPopup();
        }
    });

    const deleteButton = L.DomUtil.create("button", "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded", container);
    deleteButton.innerHTML = "Delete";
    L.DomEvent.on(deleteButton, "click", () => {
        const updatedLayers = mapLayers.filter(l => l.id !== layer._leaflet_id);
        setMapLayers(updatedLayers);
        layer.unbindPopup();
    });

    return container;
};
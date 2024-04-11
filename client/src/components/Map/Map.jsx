import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';


const Map = ({ center, zoom }) => {

    const mapStyle = {
        width: '100%',
        height: '80vh',
    };

    return (
        <MapContainer id="mapId" center={center} zoom={zoom} style={mapStyle} attributionControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/>copyright&quot;>OpenStreetMap</a> contributors"
            />
        </MapContainer>
    );
};

export default Map;

import React from 'react';
import Map from '@components/Map/Map'



const defaultLatLng = [48.84647395701655, 2.2737407684326176];
const zoom = 13;

const MapPage = () => {

    return (
        <Map center={defaultLatLng} zoom={zoom} />
    )
}

export default MapPage;

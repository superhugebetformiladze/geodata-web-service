import React, { useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";

const ObjectsMap = () => {
    const center = { lat: 54.35135425936058, lng: 48.38624596595764 };
    const mapRef = useRef();

    const ZOOM_LEVEL = 12;
    const mapStyle = {
        width: '100%',
        height: '60vh',
    };

    // Создание переменной с данными GeoJSON
    const geoData = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                48.353883881059815,
                                54.3605384753845
                            ],
                            [
                                48.37928971702041,
                                54.32450466662607
                            ],
                            [
                                48.30993865129015,
                                54.34592857149444
                            ]
                        ]
                    ]
                },
                "properties": {}
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                48.3817897141925,
                                54.36404699238329
                            ],
                            [
                                48.39154816302009,
                                54.34537317526755
                            ],
                            [
                                48.36867680774138,
                                54.34572894503321
                            ],
                            [
                                48.360748065451546,
                                54.38289005938979
                            ]
                        ]
                    ]
                },
                "properties": {}
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                48.311311939720454,
                                54.37154250623618
                            ],
                            [
                                48.27560644053259,
                                54.347730073265154
                            ],
                            [
                                48.229601278117435,
                                54.3621392449242
                            ]
                        ]
                    ]
                },
                "properties": {}
            }
        ]
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={mapStyle} attributionControl={false}>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/>copyright&quot;>OpenStreetMap</a> contributors"
                        />

                        {/* Отображение объектов из geoData */}
                        <GeoJSON data={geoData} />

                    </MapContainer>
                </div>
            </div>
        </>
    );
};

export default ObjectsMap;

import React, { Component } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

class DrawingComponent extends Component {
    
    _onCreate = (e) => {
        const { layers } = e;
        layers.eachLayer((layer) => {
            // Handle each drawn layer here
            console.log('Layer created:', layer);
        });
    };

    _onEdit = (e) => {
        const { layers } = e;
        layers.eachLayer((layer) => {
            // Handle edited layers here
            console.log('Layer edited:', layer);
        });
    };

    _onDelete = (e) => {
        const { layers } = e;
        layers.eachLayer((layer) => {
            // Handle deleted layers here
            console.log('Layer deleted:', layer);
        });
    };

    render() {
        return (
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={this._onCreate}
                        onEdited={this._onEdit}
                        onDelete={this._onDelete}
                        draw={{
                            rectangle: false,
                            polyline: true,
                            circle: true,
                            circlemarker: false,
                            polygon: true,
                            marker: true,
                        }}
                    />
                </FeatureGroup>
            </MapContainer>
        );
    }
}

export default DrawingComponent;

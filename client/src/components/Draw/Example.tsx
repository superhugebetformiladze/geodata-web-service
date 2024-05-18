import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { FeatureGroup, GeoJSON } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L, { LeafletEvent } from 'leaflet';
import { GeoJsonObject } from 'geojson';

interface GeoObject {
  id: number;
  object_data: GeoJsonObject | string;
}

interface Props {
  geoObjectDB?: GeoObject;
  onGeoJsonData: (geoJsonData: GeoJsonObject) => void;
}

const ProjectMap: React.FC<Props> = ({ geoObjectDB, onGeoJsonData }) => {
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  useEffect(() => {
    if (geoObjectDB && featureGroupRef.current) {
      let geoJsonData: GeoJsonObject;
      if (typeof geoObjectDB.object_data === 'string') {
        geoJsonData = JSON.parse(geoObjectDB.object_data);
      } else {
        geoJsonData = geoObjectDB.object_data;
      }
      const layer = L.geoJSON(geoJsonData);
      featureGroupRef.current.clearLayers();
      featureGroupRef.current.addLayer(layer);
    }
  }, [geoObjectDB]);

  const handleCreated = (e: LeafletEvent) => {
    if (featureGroupRef.current) {
      const geoJsonData = featureGroupRef.current.toGeoJSON() as GeoJsonObject;
      onGeoJsonData(geoJsonData);
    }
  };

  const handleEdited = (e: LeafletEvent) => {
    if (featureGroupRef.current) {
      const geoJsonData = featureGroupRef.current.toGeoJSON() as GeoJsonObject;
      onGeoJsonData(geoJsonData);
    }
  };

  const handleDeleted = (e: LeafletEvent) => {
    if (featureGroupRef.current) {
      const geoJsonData = featureGroupRef.current.toGeoJSON() as GeoJsonObject;
      onGeoJsonData(geoJsonData);
    }
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          onEdited={handleEdited}
          onDeleted={handleDeleted}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            polyline: true,
            marker: true,
          }}
        />
        {geoObjectDB && (
          typeof geoObjectDB.object_data === 'string' ?
            <GeoJSON data={JSON.parse(geoObjectDB.object_data)} /> :
            <GeoJSON data={geoObjectDB.object_data} />
        )}
      </FeatureGroup>
    </MapContainer>
  );
};

export default ProjectMap;

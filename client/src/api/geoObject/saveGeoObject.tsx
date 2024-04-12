import axios, { AxiosResponse } from 'axios';
import baseURL from '../config/config';


const api = axios.create({
  baseURL: baseURL,
});

export const saveGeoJSON  = async (geoJSONData: any) => {
    try {
        const response = await api.post('/save_geojson/', geoJSONData);
        console.log(response.data);
        alert('GeoJSON data saved successfully!');
      } catch (error) {
        console.error('Error saving GeoJSON:', error);
        alert('Failed to save GeoJSON data. Please try again.');
      }
};

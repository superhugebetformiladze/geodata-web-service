import axios, { AxiosResponse } from 'axios';
import baseURL from '../config/config';


const api = axios.create({
  baseURL: baseURL,
});

export const saveGeoJSON  = async (geoJSONData: any) => {
    try {
        const response = await api.post('/save_geojson/', geoJSONData);
        console.log(response.data);
      } catch (error) {
        console.error('Error saving GeoJSON:', error);
        alert('Ошибка сохранения');
      }
};

import axios from 'axios';


export const saveGeoJSON  = async (geoJSONData: any) => {
    try {
        const response = await axios.post('save_geojson/', geoJSONData);
        console.log(response.data);
      } catch (error) {
        console.error('Error saving GeoJSON:', error);
        alert('Ошибка сохранения');
      }
};

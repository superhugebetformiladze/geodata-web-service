import axios from 'axios';


export const saveGeoObject = async (geoObjectId: number, geoObjectData: any) => {
  try {
    const requestData = {
      id: geoObjectId,
      geo_data: geoObjectData
    };
    console.log("данные в запросе: ", requestData)
    const response = await axios.put('save_geojson', requestData);
    console.log(response.data);
  } catch (error) {
    console.error('Error saving GeoObject:', error);
  }
};

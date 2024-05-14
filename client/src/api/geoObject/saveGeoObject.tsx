import axios from 'axios';


export const saveGeoObject = async (geoObjectId: number, geoObjectData: any) => {
  try {
    const requestData = {
      id: geoObjectId,
      geo_data: geoObjectData
    };
    await axios.put('save_geo_object', requestData);
  } catch (error) {
    console.error('Error saving GeoObject:', error);
  }
};

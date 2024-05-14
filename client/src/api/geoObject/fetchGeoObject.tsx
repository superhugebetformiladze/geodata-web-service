import axios, { AxiosResponse } from 'axios';
import { IGeoObject } from '@models/GeoObjectModel';


export const fetchGeoObject = async (geoObjectId: number) : Promise<{ data: IGeoObject; status: number }> => {
  try {
    const response: AxiosResponse<IGeoObject> = await axios.get(`/get_geo_object/${geoObjectId}`);
    return { data: response.data, status: response.request.status };
  } catch (error) {
    console.error('Error fetching geodata: ', error);
    throw error;
  }
};
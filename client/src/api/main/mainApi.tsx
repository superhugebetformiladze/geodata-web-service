import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const searchPlaces = async (query: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search-places/?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

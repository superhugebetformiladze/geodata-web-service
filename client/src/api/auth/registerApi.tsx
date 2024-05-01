import axios, { AxiosResponse } from 'axios';
import baseURL from '../config/config';


const api = axios.create({
  baseURL: baseURL,
});

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post('/register/', userData);
    console.log(response.data);
    if (response.status === 201) {
      console.log('Registration successful');
    } else {
      console.error('Registration failed');
    }
  } catch (error) {
    console.error('Error registering:', error);
  }
};
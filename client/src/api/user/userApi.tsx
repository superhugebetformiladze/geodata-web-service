import axios from 'axios';
import { IUser } from '@models/UserModel';


export const fetchUser = async (): Promise<IUser> => {
  try {
    const response = await axios.get('user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
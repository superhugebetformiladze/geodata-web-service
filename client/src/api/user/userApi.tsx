import axios from 'axios';
import { IUser } from '@models/UserModel';


export const fetchUser = async (): Promise<{ data: IUser; status: number }> => {
  try {
    console.log("я тутутутутут")
    const response = await axios.get('user');
    console.log("user data axios: ", response)
    return { data: response.data, status: response.request.status };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
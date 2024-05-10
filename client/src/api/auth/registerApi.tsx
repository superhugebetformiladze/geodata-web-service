import axios from 'axios';


export const registerUser = async (userData: any) => {
  try {
    await axios.post('register', userData);
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
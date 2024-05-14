import axios from 'axios';


export const loginUser = async (userData: any) => {
    try {
        const response = await axios.post('login', userData, {withCredentials: true});

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`;
    } catch (error) {
        console.error('Error login:', error);
        throw error;
    }
};
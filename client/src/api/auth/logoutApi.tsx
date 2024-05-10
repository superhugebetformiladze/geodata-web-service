import axios from 'axios';


export const logoutUser = async () => {
    try {
        await axios.post('logout', {}, {withCredentials: true});
    } catch (error) {
        console.error('Error logout:', error);
        throw error;
    }
};
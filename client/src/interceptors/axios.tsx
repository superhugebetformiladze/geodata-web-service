import axios from "axios";
import baseURL from "@api/config/config"

axios.defaults.baseURL = baseURL;

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 403 && !refresh) {
        refresh = true;

        const response = await axios.post('refresh', {}, {withCredentials: true});

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`;

            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});
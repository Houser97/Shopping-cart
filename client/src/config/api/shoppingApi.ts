import axios from 'axios';

const shoppingApi = axios.create({
    baseURL: 'http://localhost:3002/api'
});

shoppingApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = '';
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default shoppingApi;
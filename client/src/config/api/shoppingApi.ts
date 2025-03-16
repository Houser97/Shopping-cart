import axios from 'axios';
const url = 'http://localhost:3001/api'
//const url = 'https://shopping-cart-a2.onrender.com/api'
const shoppingApi = axios.create({
    baseURL: url
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
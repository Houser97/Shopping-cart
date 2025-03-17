import axios from 'axios';
export const url = 'http://localhost:3010/api'
//const url = 'https://shopping-cart-a2.onrender.com/api'
const shoppingApi = axios.create({
    baseURL: url,
    withCredentials: true,
});

shoppingApi.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default shoppingApi;
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4', // ou a URL da API que você está usando
});

export default api;

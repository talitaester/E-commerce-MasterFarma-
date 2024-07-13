// utils/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Verificar a porta da api la no server pra nao ficar igual
  withCredentials: true,
});

export default api;

//api/axios/public.js
import axios from 'axios';



const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false ,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default publicInstance;

//axios/authInstance.js
import axios from 'axios';



const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true ,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default authInstance;
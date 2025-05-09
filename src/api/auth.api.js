// api/auth/auth.api.js



// export const authApi = {
//   login: (credentials) => authInstance.post('/auth/login', credentials),
//   refresh: () => authInstance.post('/auth/refresh'),
//   getUser: () => authInstance.get('/user'),
//   logout: () => authInstance.post('/auth/logout'),
// };

// import authInstance from './axios/authInstance';
// import privateInstance from '../axios/private';
import authInstance from './axios/authInstance';
import privateInstance from './axios/privateInstance';
import publicInstance from './axios/publicInstance';

export const register = newUser => publicInstance.post('/user/signup', newUser);
export const signin = credentials =>
  authInstance.post('/user/signin', credentials);
export const logout = () => privateInstance.post('/user/logout');

// export const refreshToken = () => authInstance.post('user/refresh');
export const refreshToken = () => {
  console.log('Sending refresh token request...');
  return authInstance.post('user/refresh')}
 ;

export const getUserInfo = () => privateInstance.get('/user/user-info');

//Например: /user/profile, /orders, /settings

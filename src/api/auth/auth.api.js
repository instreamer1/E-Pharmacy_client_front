// api/auth/auth.api.js

import authInstance from '../axios/auth';
import privateInstance from '../axios/private';
import publicInstance from '../axios/public';

export const register = newUser => publicInstance.post('/user/signup', newUser);
export const signin = credentials =>
  authInstance.post('/user/signin', credentials);
export const logout = () => authInstance.post('/user/logout');

export const refreshToken = () => authInstance.post('user/refresh');

export const getUserInfo = () => privateInstance.get('/user/user-info');

//Например: /user/profile, /orders, /settings

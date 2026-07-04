import api from './axios';

export const registerRequest = (data) => api.post('/auth/register', data);
export const loginRequest = (data) => api.post('/auth/login', data);
export const getProfileRequest = () => api.get('/auth/profile');
export const forgotPasswordRequest = (data) => api.post('/auth/forgot-password', data);
export const resetPasswordRequest = (token, data) =>
  api.post(`/auth/reset-password/${token}`, data);

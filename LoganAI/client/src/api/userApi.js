import api from './axios';

export const updateProfileRequest = (formData) =>
  api.put('/user/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

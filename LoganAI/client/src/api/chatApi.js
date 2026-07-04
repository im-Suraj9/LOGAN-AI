import api from './axios';

export const sendMessageRequest = (data) => api.post('/chat', data);
export const getChatHistoryRequest = () => api.get('/chat/history');
export const getChatByIdRequest = (id) => api.get(`/chat/${id}`);
export const renameChatRequest = (id, title) => api.put(`/chat/${id}`, { title });
export const deleteChatRequest = (id) => api.delete(`/chat/${id}`);
export const regenerateResponseRequest = (id) => api.post(`/chat/${id}/regenerate`);

export const API_CONFIG = {
  baseUrl: 'http://localhost:8000/api/user',
  endpoints: {
    create: '/create',
    getAll: '/getAllUsers',
    update: (id: string) => `${API_CONFIG.baseUrl}/update/${id}`,
    delete: (id: string) => `${API_CONFIG.baseUrl}/delete/${id}`
  }
};
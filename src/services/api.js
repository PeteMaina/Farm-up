import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor to add JWT token if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global error handler
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            // Logic to redirect or notify could go here if using a global state
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (email, password) => {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        const response = await api.post('/login/access-token', formData);
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
    },
    signup: async (userData) => {
        const response = await api.post('/users/signup', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('access_token');
    },
    getCurrentUser: async () => {
        const response = await api.get('/users/me');
        return response.data;
    }
};

export const dashboardService = {
    getSummary: async () => {
        const response = await api.get('/dashboard/summary');
        return response.data;
    },
    getCrops: async () => {
        const response = await api.get('/dashboard/crops');
        return response.data;
    },
    getSoil: async () => {
        const response = await api.get('/dashboard/soil');
        return response.data;
    }
};

export const extendedService = {
    getPestControl: async () => {
        const response = await api.get('/extended/pest-control');
        return response.data;
    },
    getEquipment: async () => {
        const response = await api.get('/extended/equipment');
        return response.data;
    },
    getFinancials: async () => {
        const response = await api.get('/extended/financials');
        return response.data;
    }
};

export default api;

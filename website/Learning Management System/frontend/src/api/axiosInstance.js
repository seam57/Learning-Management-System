import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://${window.location.hostname}:8000/api/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Protiti request-er shathe token pathanor jonno
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Django SimpleJWT default-e 'Bearer' prefix expect kore
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Token expire hoye gele logout korar jonno (Optional but good)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Jodi token invalid hoy, user-ke login page-e pathiye dibe
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44453',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance; 
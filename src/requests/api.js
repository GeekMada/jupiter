import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/'
  // baseURL: 'http://api.jupiter-data.fr'
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Récupérez le token d'authentification à partir de votre source (par exemple le sessionStorage)
    if (!config.url.includes('/auth')) {
      // Vérifiez si le token est disponible et non vide
      const authToken = sessionStorage.getItem('authToken');
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
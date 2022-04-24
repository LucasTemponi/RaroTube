import axios from 'axios';

const axiosapiInstance = axios.create();

axiosapiInstance.defaults.baseURL = 'https://3.221.159.196:3320';

axiosapiInstance.interceptors.request.use(
  async (config: any) => {
    config.url = `${axiosapiInstance.defaults.baseURL}${config.url}`;

    const authorization = localStorage.getItem('access_token');
    if (authorization) {
      config.headers['Authorization'] = `bearer ${authorization}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default axiosapiInstance;

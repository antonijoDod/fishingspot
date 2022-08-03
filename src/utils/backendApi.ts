import axios from "axios";

export const StrapiApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER,
  });


StrapiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  if(token) {
    config.headers!['Authorization'] = 'Bearer ' + token.jwt
  }
  return config
})
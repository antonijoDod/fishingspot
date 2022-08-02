import axios from "axios";

export const StrapiApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SERVER,
  });


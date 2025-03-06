
import Axios from "axios";

export const wingWiseApi = Axios.create({
    // baseURL: 'http://localhost:5001/api'
    baseURL: 'https://rsinnovates.com/api',
});

// Api Request Interceptor
wingWiseApi.interceptors.request.use(async (config) => {
    const authToken = typeof window !== 'undefined' && localStorage.getItem('token')
    // add auth fields if exists in cookies
  
    // config.headers.Platform = 'WEB';
    // config.headers.token = JAVA_API_TOKEN;
  // console.log("authToken")
  // console.log(authToken)
    if (authToken) {
      config.headers.Authorization = authToken;
    }
  
    return config;
  });
  
  // Api Response Interceptor
  wingWiseApi.interceptors.response.use(
    (response) => response,
    (error) => {
      // If server response unauthorized
      if (error?.response?.status === 401) {
        // global.store.dispatch({ type: 'auth/showLogin' });
      }
  
      return Promise.reject(error);
    },
  );
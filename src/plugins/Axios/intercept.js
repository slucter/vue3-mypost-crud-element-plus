function getConfigAxios(axios) {
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        console.log(error);
        return error;
      }
    );
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        let isNetworkError = error?.message ?? null
        if (isNetworkError === 'Network Error') {
          alert('Network Error')
          return
        }
        throw error;
      }
    );
  
    return axios;
  }
  
  export default getConfigAxios;
  
import axios from 'axios'

const baseApiReq = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  
})
baseApiReq.interceptors.request.use(function(config) {
  // console.log("Req Sent ");
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  // console.log("CONFIG : ",config.headers);
  return config;
})

baseApiReq.interceptors.response.use(
  async (response) => { 
    // const serverCallUrl = new URL(response.config.url)
    // console.log("SERVER CALL URL : ", serverCallUrl);
    // console.log("RESPONSE ", response)
    return response },
  async (error) => {
    const originalRequest = error.config
    // const serverCallUrl = new URL(originalRequest.url)
    // console.log("SERVER CALL URL : ", serverCallUrl);
    const status = error.response.status

    if (
      (status === 401 || status === 403) &&
      !originalRequest._retry
      ) {
      let token = await `Bearer ${localStorage.getItem("accessToken")}`
      originalRequest._retry = true
      originalRequest.headers.Authorization = `Bearer ${token}`
      return axios(originalRequest)
    }

    return Promise.reject(error)
  })
export default baseApiReq;
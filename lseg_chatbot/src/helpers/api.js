import axios from "axios";

//Base URL
let API = axios.create({
  baseURL: "http://localhost:4001/api",
  responseType: "json",
});

//Request Interceptor
API.interceptors.request.use((request) => {
  console.log("Full Request URL:", request.baseURL + request.url);
  request.data = {
    ...request.data,
    requestHeader: {},
  };
  request.headers = {
    ...request.headers,
  };
  return request;
});
// Response Interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("error", error);
    // Any status codes outside the range of 2xx trigger this function
    if (error.response) {
      // The request was made and the server responded with a status code outside 2xx
      console.error("Response error:", error.response.data);
      if (error.response.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        console.log("Unauthorized, redirecting to login...");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error); // Forward the error to be handled by catch blocks in your components
  }
);

export default API;

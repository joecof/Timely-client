import axios from 'axios';

/**
 * Define the base axios URL. 
 */
axios.defaults.baseURL = process.env.REACT_APP_DEV_BASE_URL;
// axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL;

/**
 * Contains the data of the response body 
 * @param {any} response 
 */
const resBody = (response) => response.data;

/**
 * Defines HTTP functions for CRUD functionality. 
 */
const requests = {
  get: (url) => axios.get(url).then(resBody),
  post: (url, body) => axios.post(url, body).then(resBody),
  put: (url, body) => axios.put(url, body).then(resBody),
  del: (url) => axios.delete(url).then(resBody) 
}

/**
 * Prototype to get employee information. Not Currently used. 
 */
const employeeInfo = {
  getCurrentUser: (id) => requests.get(`/employees/${id}`), 
}

/**
 * API request for current login.  
 */
const authorization = {
  login: (data) => requests.post('/login', data)
}

export default {
  employeeInfo,
  authorization
}
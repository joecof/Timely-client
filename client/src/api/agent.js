import axios from 'axios';

/**
 * Define the base axios URL. 
 */
axios.defaults.baseURL = "http://localhost:8080/timely/api/";

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

const employeeInfo = {
  getCurrentUser: () => requests.get('/employees/1'), 
}

const authorization = {
  login: (data) => requests.post('/login', data)
}


export default {
  employeeInfo,
  authorization
}
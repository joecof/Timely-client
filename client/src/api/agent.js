import axios from 'axios';

/**
 * Define the base axios URL. 
 */

/**
 * Checks the environment variable at npm start or npm build. Depending on that variable it will use 
 * a different base url. 
 */
// process.env.REACT_APP_ENV == "development" ? 
//   axios.defaults.baseURL = process.env.REACT_APP_DEV_BASE_URL : axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL;

  axios.defaults.baseURL = "http://localhost:8080/timely/api/"
/**
 * Contains the data of the response body 
 * @param {any} response 
 */
const resBody = (response) => response.data;

const token = localStorage.getItem("token");

/**
 * Defines HTTP functions for CRUD functionality. 
 */
const requests = {
  get: (url) => axios.get(url, {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }).then(resBody),
  post: (url, body) => axios.post(url, body, {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }).then(resBody),
  put: (url, body) => axios.put(url, body, {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }).then(resBody),
  del: (url) => axios.delete(url, {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }).then(resBody) 
}

/**
 * Prototype to get employee information. Not Currently used. 
 */
const employeeInfo = {
  getCurrentUser: (id) => requests.get(`/employees/${id}`), 
}

const projects = {
  getProjectsForUser: (id) => requests.get(`/projects/emp/${id}`),
  createProject: (data) => requests.post(`/projects/createProject`, data),
  getById: (id) => requests.get(`/projects/${id}`)
}

/**
 * Getting logged in user timesheets
 */
const timesheets = {
  getTimesheetByEmp: (id) => requests.get(`/emps/${id}/timesheets`)
}

/**
 * API request for current login.  
 */
const authorization = {
  login: (data) => requests.post('/tokens', data)
}

export default {
  employeeInfo,
  authorization,
  projects,
  timesheets
}
import axios from 'axios';

/**
 * Checks the environment variable at npm start or npm build. Depending on that variable it will use 
 * a different base url. 
 */
if(!process.env.REACT_APP_NODE_ENV) {
  axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL
}

axios.defaults.baseURL = process.env.REACT_APP_DEV_BASE_URL

/**
 * Contains the data of the response body 
 * @param {any} response 
 */
const resBody = (response) => response.data;

/**
 * Returns an object that sets headers for HTTP requests. 
 * @param {string} token 
 */
const headers = (token) => {
  return { headers: {
    'Authorization': 'Bearer ' + token,
  }}
}

/**
 * Defines HTTP functions for CRUD functionality. 
 */
const requests = {
  get: (url, token) => axios.get(url, headers(token)).then(resBody),
  post: (url, token, body) => axios.post(url, body, headers(token)).then(resBody),
  put: (url, token, body) => axios.put(url, body, headers(token)).then(resBody),
  del: (url, token) => axios.delete(url, headers(token)).then(resBody),
  authenticate: (url, body) => axios.post(url, body).then(resBody), 
}

const employeeInfo = {
  getEmployeeById: (id, token) => requests.get(`/emps/${id}`, token), 
  getAllEmployees: (token) => requests.get(`/emps`, token),
  createEmployee: (token, body) => requests.post(`/emps/`, token, body),
  updateEmployee: (id, token, body) => requests.put(`/emps/${id}`, token, body),
  getCurrentUser: (id, token) => requests.get(`/emps/${id}`, token), 
  getEmployeesBySupervisor: (id, token) => requests.get(`/emps/supervisor/${id}`, token)
}

const projects = {
  getAllProjects: (token) => requests.get(`/projects`, token),
  getProjectsForUser: (id, token) => requests.get(`/projects/emp/${id}`, token),
  createProject: (data, token) => requests.post(`/projects/createProject`, token, data),
  assignToProject: (project, token) => requests.post(`/projects/assignToProject/`, token, project),
  getDetailsById: (id, token) => requests.get(`/projects/projectDetails/${id}`, token),
  getById: (id, token) => requests.get(`/projects/${id}`, token)
}

const timesheetsInfo = {
  getAllTimesheetsByEmp: (empId, token) => requests.get(`/emps/${empId}/timesheets/`, token),
  getTimesheetById: (empId, token, tsId) => requests.get(`/emps/${empId}/timesheets/${tsId}`, token),
  createCurrentWeekTimesheet: (empId, token, data)=> requests.post(`emps/${empId}/timesheets/`, token, data),
}

const authorization = {
  login: (data) => requests.authenticate('/tokens', data)
}

export default {
  employeeInfo,
  authorization,
  projects,
  timesheetsInfo
}
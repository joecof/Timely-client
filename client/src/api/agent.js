import axios from 'axios';

/**
 * Checks the environment variable at npm start or npm build. Depending on that variable it will use 
 * a different base url. 
 */

axios.defaults.baseURL = process.env.REACT_APP_DEV_BASE_URL

if(process.env.REACT_APP_NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL
} 

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
  getProjectsForSupervisor: (id, token) => requests.get(`projects/supervisor/${id}`, token),
  createProject: (data, token) => requests.post(`/projects/createProject`, token, data),
  updateProject: (project, token) => requests.put(`/projects/updateProject`, token, project),
  getDetailsById: (id, token) => requests.get(`/projects/projectDetails/${id}`, token),
  getById: (id, token) => requests.get(`/projects/${id}`, token)
}

const timesheetsInfo = {
  getAllTimesheetsByEmp: (empId, token) => requests.get(`/emps/${empId}/timesheets/`, token),
  getAllCloseTimesheetsByEmp: (empId, token) => requests.get(`/emps/${empId}/close_timesheets`, token),
  getTimesheetById: (empId, token, tsId) => requests.get(`/emps/${empId}/timesheets/${tsId}`, token),
  createCurrentWeekTimesheet: (empId, token, data)=> requests.post(`emps/${empId}/timesheets/`, token, data),
  getTimesheetsByEmps: (emps, token)=> requests.get(`/timesheets/getForEmps/${emps}`, token),
  updateTimesheetById: (empId, token, tsId, data) => requests.put(`/emps/${empId}/timesheets/${tsId}`, token, data)
}

const workpackages = {
  createWorkpackage: (data, token) => requests.post(`/workpackages/createWP`, token, data),
  updateWorkpackage: (data, token) => requests.put(`/workpackages`, token, data),
  getAllWorkpackageFromRE: (empId,token) => requests.get(`/workpackages/RE/${empId}`,token),
}

const workpackagePlan = {
  createNewPlan: (data, token) => requests.post(`/workpackageplans`, token, data)
}

const yearlyRate = {
  getYearlyRate: (token) => requests.get(`/yearlyRate`, token)
}

const authorization = {
  login: (data) => requests.authenticate('/tokens', data)
}

export default {
  employeeInfo,
  authorization,
  projects,
  timesheetsInfo,
  yearlyRate,
  workpackages,
  workpackagePlan
}
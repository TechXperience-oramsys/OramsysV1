// import API_LOCAL from './api-local';
// import API_PROD from './api-prod';
const hostname = window.location.hostname;
const port = window.location.port;
let isLocalApi = +port >= 5000;

// export const API = API_PROD
// export const API = hostname === 'localhost' ? API_LOCAL : API_PROD
// export const API = API_LOCAL.host

export let API;
// if(window.location.origin.includes('oramsysdev.com')) {
<<<<<<< HEAD
API = 'https://backend.oramsysdev.com/'

=======
API = 'https://backend.oramsysdev.com/' 
>>>>>>> c362c709e5ee84d696c2af58b24c8d2866246e59
// API = "http://localhost:5003/";
// }
// else {
//     API = 'http://localhost:5003/'
// }

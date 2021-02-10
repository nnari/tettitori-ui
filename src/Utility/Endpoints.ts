const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
const LOGIN_URL = API_URL + "/login";
const JOB_URL = API_URL + "/job";
const DEGREE_URL = API_URL + "/degree";
const ORIENTATION_URL = API_URL + "/orientation";

export { API_URL, LOGIN_URL, JOB_URL, DEGREE_URL, ORIENTATION_URL };

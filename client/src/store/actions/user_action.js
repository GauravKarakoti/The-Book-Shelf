import axios from "axios";
import { USER_AUTH, USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../types";
axios.defaults.withCredentials = true;
/*================ User ================*/
export function registerUser(userData) {
    const request = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, userData)
        .then(response => response.data);
    return {
        type: USER_REGISTER,
        payload: request
    }
}
export function loginUser({email, password}) {
    const request = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {email, password})
        .then(response => response.data);
    return {
        type: USER_LOGIN,
        payload: request
    }
}
export function auth() {
    const request = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/auth`)
        .then(response => response.data);
    return {
        type: USER_AUTH,
        payload: request
    }
}
export function logoutUser() {
    const request = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/logout`)
        .then(response => {
            return null
        });
    return {
        type: USER_LOGOUT,
        payload: request
    }
}
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (login, password, role) => {
    const {data} = await $host.post('user/registration', {login, password, role})
    return jwt_decode(data.token)
}


export const loginAPI = async (login, password) => {
    const {data} = await $host.post('user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}


export const check = async () => {
    const {data} = await $authHost.get('user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}


export const getUserInfo = async () => {
    const {data} = await $authHost.get('user/info')
    return data
}

export const updateUserInfo = async (name, email, phone_number, birthday) => {
    const {data} = await $authHost.post('user/info', {name, email, phone_number, birthday})
    return data
}
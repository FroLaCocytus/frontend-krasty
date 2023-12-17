import {$authHost} from "./index";

export const createOrder = async (description, login) => {
    const requestData = {description: description, login: login};
    const {data} = await $authHost.post('order/create', requestData)
    return data
}
  
export const getOrderInfo = async (login) => {
    const requestData = {login: login};
    const {data} = await $authHost.post('order/info', requestData)
    return data
}

export const getOrders = async (role) => {
    const requestData = {role: role};
    const {data} = await $authHost.post('order/all', requestData)
    return data
}


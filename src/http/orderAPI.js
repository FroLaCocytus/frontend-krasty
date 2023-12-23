import {$authHost} from "./index";

// export const createOrder = async (description, login) => {
//     const requestData = {description: description, login: login};
//     const {data} = await $authHost.post('order/create', requestData)
//     return data
// }

export const getOneOrder = async () => {
    const {data} = await $authHost.get('order/one')
    return data
}
  
// export const getOrderInfo = async (login) => {
//     const requestData = {login: login};
//     const {data} = await $authHost.post('order/info', requestData)
//     return data
// }

export const getCreatedOrders = async (page) => {
    const queryParams = {
        page: 0,
        size: 10
      };
    
      if (page === 0){
        queryParams.page=page
      } else {
        queryParams.page=page-1
      }

    const {data} = await $authHost.get('order/created', { params: queryParams })
    return data
}

export const updateOrder = async (id, status) => {
  const requestData = {id: id, status: status};
  const response = await $authHost.put('order/update', requestData)
  return response.status
}


export const getOrders = async () => {
    const {data} = await $authHost.get('order/all')
    return data
}


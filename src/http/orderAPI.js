import { $authHost } from "./index";


export const getOneOrder = async () => {
  const { data } = await $authHost.get('order/one')
  return data
}

export const getOrderCourier = async () => {
  const { data } = await $authHost.get('order/courier')
  return data
}


export const getOrders = async (page, status, size) => {
  try {
    const queryParams = {
      page: 0,
      size: size,
      status: status
    };

    if (page === 0) {
      queryParams.page = page
    } else {
      queryParams.page = page - 1
    }

    const { data } = await $authHost.get('order/all', { params: queryParams })
    return data
  } catch (error) {
    console.log(error.response.data)
  }

}

export const updateOrder = async (id, status) => {
  try {
    const requestData = { id: id, status: status };
    const response = await $authHost.put('order/update', requestData)
    return response.status
  } catch (error) {
    console.log(error.response.data)
  }
}



import {$authHost} from "./index";


export const createMerchandise = async (title, count) => {

    const requestData = {title: title, count: count};
    const {data} = await $authHost.post('merchandise/create', requestData)
    return data
}

export const updateMerchandise = async (id, title, count) => {
  const requestData = {id: id, title: title, count: count};
  const {data} = await $authHost.put('merchandise/update', requestData)
  return data
}

export const deleteMerchandise = async (id) => {
  const queryParams = {
    id: id
  };
  const response = await $authHost.delete('merchandise/delete', { params: queryParams });
  return response.status
}

// export const getOne = async (id) => {
//   const requestData = {id: id};
//   const {data} = await $authHost.post('merchandise/one', requestData)
//   return data
// }

export const getAllMerchandise = async (page) => {
  if (page === 0){
    const {data} = await $authHost.get(`merchandise/all?page=${page}&size=${10}`)
    return data
  } else {
    const {data} = await $authHost.get(`merchandise/all?page=${page-1}&size=${10}`)
    return data
  }
}

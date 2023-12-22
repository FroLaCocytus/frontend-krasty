import {$authHost} from "./index";


export const createBasketProduct = async (listProduct) => {

    const requestData = {listProduct: listProduct};
    const {data} = await $authHost.post('basket/add', requestData)
    return data
}

export const getBasket = async () => {

    const {data} = await $authHost.get('basket/get')
    return data
}
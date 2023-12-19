import {$authHost} from "./index";


export const createBasketProduct = async (listProduct) => {

    const requestData = {listProduct: listProduct};
    const {data} = await $authHost.post('basket/add', requestData)
    return data
}


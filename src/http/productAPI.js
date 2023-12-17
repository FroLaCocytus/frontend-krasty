import {$host} from "./index";

export const fetchProducts = async () => {
    const {data} = await $host.get('product')
    return data
}



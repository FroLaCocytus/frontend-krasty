import {makeAutoObservable} from "mobx";


export default class MerchandiseStore {
    constructor() {
        this._merchandises = []
        makeAutoObservable(this)
    }

    setMerchandises(merchandises) {
        // const sortedArray = merchandises.sort((a, b) => b.id - a.id);
        this._merchandises = merchandises
    }

    get merchandises() {
        return this._merchandises
    }

}
import {makeAutoObservable} from "mobx";


export default class MerchandiseStore {
    constructor() {
        this._merchandises = []
        makeAutoObservable(this)
    }

    setMerchandises(merchandises) {
        this._merchandises = merchandises
    }

    get merchandises() {
        return this._merchandises
    }

}
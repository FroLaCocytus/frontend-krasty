import {makeAutoObservable} from "mobx";


export default class DocumentStore {
    constructor() {
        this._documents = []
        makeAutoObservable(this)
    }

    setDocuments(documents) {
        this._documents = documents
    }

    get documents() {
        return this._documents
    }

}
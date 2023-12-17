import {makeAutoObservable} from "mobx";


export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._login = {};
        this._role = {};
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setLogin(login) {
        this._login = login
    }

    setRole(role) {
        this._role = role
    }

    get isAuth(){
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get login(){
        return this._login
    }

    get role() {
        return this._role
    }
}
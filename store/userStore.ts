import { makeAutoObservable } from 'mobx';
import { User } from '../types/auth';
import _ from 'lodash';


class UserStore {

    users: User[] = [];
    #admin: User = {
        displayName: 'Me',
        address: 'ADDRESS',
        publicKey: 'key'
    }
    constructor() {
        makeAutoObservable(this)
    }

    get admin() { return this.#admin }

    get(address: string): User | undefined {
        return _.find(this.users, ['address', address])
    }

    push(user: User) {
        this.users.push(user);
    }
}

export default new UserStore();
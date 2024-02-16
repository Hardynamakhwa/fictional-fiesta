import { computed, observable, action } from 'mobx';
import { User } from '../types/auth';
import _ from 'lodash';


class UserStore {

    @observable users: User[] = [
        { displayName: "Mark Murazik", address: "address1", publicKey: "key" },
        { displayName: "Mrs. Perry Welch", address: "address2", publicKey: "key" }
    ];
    #admin: User = {
        displayName: 'Me',
        address: 'ADDRESS',
        publicKey: 'key'
    }
    constructor() {
    }

    #init(){
        this
    }

    @computed get admin() { return this.#admin }

    @action get(address: string): User | undefined {
        return _.find(this.users, ['address', address])
    }

    @action push(user: User) {
        this.users.push(user);
    }
}

export default new UserStore();
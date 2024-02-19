import { computed, observable, action, reaction } from 'mobx';
import { User } from '../types/auth';
import { Message } from '../types/chat';
import { makeObservable } from 'mobx';
import _ from 'lodash'
import { randomUUID } from 'expo-crypto';
import dayjs from 'dayjs';


class Store {
    users: User[] = []
    messages: Message[] = []

    #admin: User = {
        address: 'address',
        displayName: 'me',
        publicKey: 'key'
    }

    constructor() {
        makeObservable(this, {
            users: observable,
            admin: computed,
            messages: observable,
            getUser: action,
            addUser: action,
            deleteUser: action,
            pushMessage: action,
            deleteMessage: action,
        });

        reaction(() => this.users, (users) => {
            console.log(users);

        })

        reaction(() => this.messages, (messages) => {
            console.log(messages);

        })
    }
    get admin() { return this.#admin };

    getUser(address: string) {
        return _.find(this.users, ['address', address])
    }

    addUser(user: User) {
        this.users = _.union(this.users, [user]);
    }

    deleteUser(user: User) {
        this.users = _.without(this.users, user);
    }

    pushMessage(sender: User, receiver: User, text: string) {
        this.messages = _.concat(this.messages, { id: randomUUID(), sender, receiver, text, timestamp: dayjs().toISOString() })
    }

    deleteMessage(message: Message) {
        this.messages = _.without(this.messages, message)
    }
}

export default new Store();
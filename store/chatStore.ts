import { User } from "../types/auth"
import { Message } from "../types/chat"
import { action, observable } from 'mobx'
import * as crypto from 'expo-crypto';
import userStore from "./userStore";
import _ from "lodash";

class MessagesStore {

    @observable messages: Message[] = []

    constructor() {

    }

    @action push(receiver: User, text: string) {
        const message: Message = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            sender: userStore.admin,
            receiver,
            text
        }
        this.messages.push(message)
    }

    @action pop(id:string) {
        this.messages.splice(0, _.size(this.messages), ...(_.filter(this.messages, (message)=> message.id !== id)));
    }
}

export default new MessagesStore()

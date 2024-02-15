import { User } from "../types/auth"
import { Message } from "../types/chat"
import { action, observable } from 'mobx'
import * as crypto from 'expo-crypto';
import userStore from "./userStore";

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
}

export default new MessagesStore()
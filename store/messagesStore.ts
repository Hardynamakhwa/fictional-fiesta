import { Message } from "../types/chat"
import { makeAutoObservable } from 'mobx'

class MessagesStore {

    messages: Message[] = []

    constructor() {
        makeAutoObservable(this)
    }

    push(message: Message) {
        this.messages.push(message)
    }
}

export default new MessagesStore()
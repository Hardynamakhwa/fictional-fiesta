import { User } from "./auth";

type Message = {
    id: string;
    timestamp: string;
    sender: User;
    receiver: User;
    text: string;
}

export { Message }
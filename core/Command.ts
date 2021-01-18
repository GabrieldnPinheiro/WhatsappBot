import { Client, Message } from "whatsapp-web.js";

interface Command {

    name: string;
    args: string[];
    client: Client;
    msg: Message;
    invoke(): boolean;

}

export default Command;
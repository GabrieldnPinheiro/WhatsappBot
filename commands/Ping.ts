import { Client, Message } from 'whatsapp-web.js';
import Command from '../core/Command';

class Ping implements Command  {

    name = "ping";
    args = [""];
    client: Client;
    msg: Message;

    constructor(args: string[], client: Client, msg: Message) {
        this.args = args;
        this.client = client;
        this.msg = msg;
    }
    
    invoke() {
        try {
            this.msg.reply("pong", this.msg.to);
            return true;
        } catch (error) {
            return false;
        }
        
        
    }

}

export default Ping;
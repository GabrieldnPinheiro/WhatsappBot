import { Client } from 'whatsapp-web.js';

//commands import
import Ping from '../commands/Ping';
import Command from './Command';
import CommandArray from './commandArray';

class Listener {
    
    client: Client;
    prefix: string;

    constructor(client: Client) {
        this.prefix = "!";
        this.client = client;
        this.initCommands();

    }

    initCommands() {
        
        this.client.on('message_create', async msg => {
            if(msg.body.startsWith(this.prefix)) {
                //nome do comando invocado e seus argumentos
                const args = msg.body.replace(this.prefix, '').toLowerCase().trim().split(' ');
                //array de comandos
                CommandArray.commands = [
                    new Ping(args, this.client, msg
                        )];


                for(let i = 0; i <= CommandArray.commands.length; i++) {

                    if(CommandArray.commands[i].name === args[0]) {


                        //chamando comando
                        const exec = CommandArray.commands[i].invoke();
                        //pegando chat do comando
                        let chat = await msg.getChat();
                        let autor = (await msg.getContact()).number;
                        //log do comando
                        console.log("[EXEC] "+CommandArray.commands[i].name+" por "+autor+" em "+chat.name);
                        //caso ocorra um erro
                        if(exec === false) {
                            msg.reply("ocorreu um erro.");
                            break;
                        }
                        break;
                    }

                }

            }
        });
    }

}

export default Listener;
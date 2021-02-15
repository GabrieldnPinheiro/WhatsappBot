import { Client, Message } from 'whatsapp-web.js'
import BrunoHenrique from '../commands/BrunoHenrique';
import ButtonMeme from '../commands/ButtonMeme';
import CepInfo from '../commands/CepInfo';
import Clima from '../commands/Clima';
import Hentai from '../commands/Hentai';

//commands import
import Ping from '../commands/Ping';
import Siteshot from '../commands/Siteshot';
import Sticker from '../commands/Sticker';
import CommandArray from './commandArray';
import * as settings from '../settings/settings.json';
import ResendMedia from '../commands/ResendMedia';
import HentaiGif from '../commands/HentaiGif';

class Listener {
    
    client: Client;
    prefix: string;

    constructor(client: Client) {
        this.prefix = settings.prefix;
        this.client = client;
        this.initCommands();

    }

    initCommands() {
        
        
        this.client.on("message", async msg => {
            this.initListener(msg);
        });

        this.client.on("message_create", async msg => {
            if((await msg.getContact()).number === settings.proprietarioNum) {
                this.initListener(msg);
            }
        });

        this.client.on('message_revoke_everyone', async (after, before) => {
            
                before.reply(`MENSAGEM DELETADA: "${before.body}"\nAUTOR: @${(await before.getContact()).number}\n EM: ${(await before.getChat()).name}`, after.to);
            
    });

    }
        
    async initListener(msg: Message) {
        if(msg.body.startsWith(this.prefix)) {
            //nome do comando invocado e seus argumentos
            const args = msg.body.replace(this.prefix, '').toLowerCase().trim().split(' ');
            //array de comandos
            CommandArray.commands = [
                new Ping(args, this.client, msg),
                new CepInfo(args, this.client, msg),
                new BrunoHenrique(args, this.client, msg),
                new Clima(args, this.client, msg),
                new Siteshot(args, this.client, msg),
                new Sticker(args, this.client, msg),
                new ButtonMeme(args, this.client, msg),
                new Hentai(args, this.client, msg),
                new ResendMedia(args, this.client, msg),
                new HentaiGif(args, this.client, msg)];


            for(let i = 0; i < CommandArray.commands.length; i++) {

                //se o nome do comando do índice atual corresponder ao comando requisitado
                if(CommandArray.commands[i].name === args[0]) {


                    //chamando comando
                    const exec = CommandArray.commands[i].invoke();
                    //pegando chat do comando
                    let chat = await msg.getChat();
                    //log do comando
                    console.log("[EXEC] "+CommandArray.commands[i].name+" em "+chat.name);
                    //caso ocorra um erro
                    if(exec === false) {
                        console.log("Retorno do comando: false");
                        break;
                    }
                    break;
                }

            }

        }
    }

}

export default Listener;
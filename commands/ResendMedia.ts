import { Message, Client, MessageMedia } from 'whatsapp-web.js'
import Command from '../core/Command';
import * as settings from '../settings/settings.json';

class ResendMedia implements Command  {

    name = "resendmedia"; // nome do comando
    args = [""]; // argumentos passados
    client: Client; // Cliente do bot
    msg: Message; // mensagem que será tratada
    description = "Reenvia um arquivo de mídia";
    example = `${settings.prefix}${this.name} < deve conter alguma mensagem de mídia marcada`;
    

    //construtor
    constructor (args: string[], client: Client, msg: Message) {
        this.args = args;
        this.client = client;
        this.msg = msg;
    }
    
    //método invoke(responsável pela chamada principal do comando)
    invoke() {
        try {

            if (!this.msg.hasQuotedMsg) {
                this.msg.reply("Marque uma mensagem que contenha uma mídia.", this.msg.to);
                return true;
            }

            (async () => {
                let mediamessage: MessageMedia;
                 await (await this.msg.getQuotedMessage()).downloadMedia().then((media) => {
                     mediamessage = media;
                 });
                await this.msg.reply(mediamessage, this.msg.from, {caption: "Aqui está"});
                return true;

            })().catch((err) => {
                return false;
            });

        } catch (error) { // caso um erro ocorra o comando retornará "false"
            return false;
        }
        
        
    }
    usage () {
        return this.description+'\n'+this.example;
    }

}

export default ResendMedia; // exportando

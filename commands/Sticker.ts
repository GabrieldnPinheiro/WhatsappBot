import { Client, Message, MessageMedia } from "whatsapp-web.js";
import Command from "../core/Command";
import * as settings from '../settings/settings.json';


class Sticker implements Command {
    
    name = "sticker";
    args = [""];
    client: Client;
    msg: Message;
    description = "Cria figurinha a partir da mensagem marcada";
    example = `Ex: ${settings.prefix}${this.name} < deve conter mensagem de mídia marcada`;

    // Construtor
    constructor (args: string[], client: Client, msg: Message) {
        this.args = args;
        this.client = client;
        this.msg = msg;
    }


    invoke () {

        if (!this.msg.hasQuotedMsg) {
            this.msg.reply("marque a foto que quer converter em sticker.", this.msg.to);
            return true;
        }



        (async () => {

            if(!(await this.msg.getQuotedMessage()).hasMedia) {
                await this.msg.reply("Essa mensagem não tem arquivos de imagem.", this.msg.from);
                return true;
            }

            const media = await (await this.msg.getQuotedMessage()).downloadMedia();
            await this.msg.reply(media, this.msg.from, {sendMediaAsSticker: true});
            
          })();
        return true;
    }

    usage () {
        return this.description+'\n'+this.example;
    }
}

export default Sticker;
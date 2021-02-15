import { Message, Client } from 'whatsapp-web.js'

//Essa interface deve ser usada em todos os comandos.
interface Command {
    
    name: string;  // Nome do comando
    args: string[];// argumentos
    client: Client;// Cliente do bot
    msg: Message;  // Mensagem em que o comando foi chamado 
    invoke(): boolean; // Método que será executado e retornará {true: o comando foi executado sem erros, false: um erro ocorreu}
    description: string;
    example: string;
    usage(): string;
}

export default  Command; // exportando
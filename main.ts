//imports
const fs = require('fs');
import  { Client } from 'whatsapp-web.js';
import Listener from './core/messageListener';
import * as settings from './settings/settings.json';

//pegando arquivo em que será armazenado os dados da sessão
const SESSION_FILE_PATH = './session.json';
let sessionCfg;
//caso o arquivo já exista ele será usado para não ficar precisando scannear o QR Code
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}
const client = new Client({ 
    puppeteer: { 
        headless: false,
        executablePath: settings.chromePath },
        session: sessionCfg, 
        ffmpegPath: settings.ffmpegPath}); // criando instância do cliente

client.initialize(); // Iniciando cliente

client.on('qr', (qr) => {
    // Retorna o QR code
    console.log('QR RECEIVED', qr);
});

// Quando autenticado a sessão será salva
client.on('authenticated', (session) => {
    console.log('BOT AUTENTICADO.');
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err: Error) {
        if (err) {
            console.error(err);
        }
    });
});

// isso é executado sempre que o bot inicia por completo
client.on('ready', async () => {
    console.log('CLIENT PRONTO');
    new Listener(client); // Inicia Listener de mensagens
});

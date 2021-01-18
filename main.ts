const fs = require('fs');
import  { Client } from 'whatsapp-web.js';
import Listener from './core/messageListener';

const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });

client.initialize();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', (session) => {
    console.log('BOT AUTENTICADO.');
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err: Error) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('CLIENT PRONTO');
    new Listener(client);
});
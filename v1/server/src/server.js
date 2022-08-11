import express from "express";
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { db, collection } from "./models/index.js";

const app = express(); 

app.use(express.json());

db.wabot.start();

collection.message.create({request: "Halo", response: "Halo Juga", isActive: true});

const client = new Client();

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
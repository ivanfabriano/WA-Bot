import express from "express";
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { createServer } from "http";
import { Server } from "socket.io";
import { db, collection } from "./models/index.js";
import dotenv from "dotenv";

const app = express();
const server = createServer(app);
app.use(express.json());

dotenv.config();

db.wabot.start();

// collection.message.create({
//   request: "Halo",
//   response: "Halo Juga",
//   isActive: true,
// });

const client = new Client();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
});

client.initialize();

server.listen(process.env.PORT, () =>
  console.log(`Server port ${process.env.PORT} running`)
);

io.on("connection", (socket) => {
  console.log("user baru terkoneksi");
  socket.emit("message", "Connecting...");
//   socket.on("roomsatu", (data) => {
//     io.emit("message", data.post);
//   });
  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    // socket.emit('qrcode', qr);
    // qrcode.generate(qr, { small: true });

    qrcode.toDataURL(qr, (err, url) => {
        socket.emit('qrcode', url);
        // socket.emit("message", "QR code received");
    })
    // res.status(200).json({ message: "success", data: qr });
  });
  //   socket.on("roomsatu", (data) => {
  //     io.emit("message", data.post);
  //   });
});

// app.get('/api/v1/qrcode/', (req, res) => {
//     try{
//         client.on('qr', (qr) => {
//             console.log('QR RECEIVED', qr);
//             qrcode.generate(qr, {small: true});
//             res.status(200).json({message: 'success', data: qr});
//         });
//     }catch(err){
//         res.status(400).json({message: "error"})
//     }
// })

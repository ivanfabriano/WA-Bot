import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { io } from "socket.io-client";
import React, { useState } from "react";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

const Home: NextPage = () => {
  const [message, setMessage] = useState<string>('');
  const [qr, setQr] = useState<any>('');
  // socket.on("message", (data: any) => {
  //   setMessage(data);
  // });
  socket.on("qrcode", (data: any) => {
    setQr(data);
    console.log(data);
    
  });
  

  return (
    <div className={styles.container}>
      Hello world
      {/* <h1>{message}</h1> */}
      <img src={qr} alt="" />
    </div>
  )
}

export default Home

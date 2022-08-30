import http from "http";
import { Server } from "socket.io";
import express, { json } from "express";

const app = express();

app.set("view engine" , "pug");
app.set("views" , __dirname + "/views");
app.use("/public" , express.static(__dirname + "/public"));
app.get("/",(_, res) => res.render("home")); 
app.get("/*" , (_, res) => res.redirect("/")); // 다른 url로 이동힐시 / 로 이동

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection" , (socket) => {
    socket.emit("enter_room", (roomName, done) => {
        console.log(roomName);
        setTimeout(()=>{
            done("hello from the backend");
        }, 15000);

    });
});

//const wss = new WebSocketServer({ server });
// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon"; // 소캣시작될떄 익명이름설정
//     console.log("서버에  연결되었습니다 ⚡");

//     socket.on("close",()=> console.log("브라우저와 연결이끊어졌습니다. 🔨")); // 브라우저 창받을떄

//     socket.on("message", (msg) => {   // 메세지오면 메세지 보내기
//         const message = JSON.parse(msg);   // javaScrips object 를 string 으로 바꿔준다.

//         switch(message.type){
//             case  "new_message":   // 메세지타입이 올떄
//                 sockets.forEach((aSocket) =>  aSocket.send(`${socket.nickname}: ${message.payload}`));    // 참가한 모든브라우저 에게 메세지보내기
//             case "nickname" :       // 이름타입이 올때
//                 socket["nickname"] = message.payload;
//         }

//     });

// })

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

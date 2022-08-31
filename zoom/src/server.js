import http from "http";
import { Server } from "socket.io";
import express from "express";
import { nextTick } from "process";

const app = express();

app.set("view engine" , "pug");
app.set("views" , __dirname + "/views");
app.use("/public" , express.static(__dirname + "/public"));
app.get("/",(_, res) => res.render("home")); 
app.get("/*" , (_, res) => res.redirect("/")); // 다른 url로 이동힐시 / 로 이동

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection" , (socket) => {
    socket["nickname"] = "Anon"; 
    socket.onAny((event) => {   // socket 모든이벤트 출력
        console.log(`Socket Event : ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {   // done = 프론트 함수(ex showRoom)
        socket.join(roomName);    // roomName 방에 참가
        done(); // 프론트 함수 실행
        socket.to(roomName).emit("welcome" , socket.nickname);    // 참여한 방에 Welcome 실행
    });
    socket.on("disconnecting" , () =>{  // 연결이 끊어지면 그 방에 bye 실행
        socket.rooms.forEach((room) => socket.to(room).emit("bye" , socket.nickname)); 
    })
    socket.on("new_message" , (msg, room , done) => {
        socket.to(room).emit("new_message" , `${socket.nickname} : ${msg}`);  // 새로운 메세지를 다른사람도 볼 수 있게   백엔드에서도 new_message 실행
        done();
    })
    socket.on("nickname" , nickname => (socket["nickname"] = nickname)) //nickname 을 소캣에 저장
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

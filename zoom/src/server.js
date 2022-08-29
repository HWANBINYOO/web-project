import http from "http";
import { WebSocketServer } from 'ws';
import express from "express";

const app = express();

app.set("view engine" , "pug");
app.set("views" , __dirname + "/views");
app.use("/public" , express.static(__dirname + "/public"));
app.get("/",(_, res) => res.render("home")); 
app.get("/*" , (_, res) => res.redirect("/")); // 다른 url로 이동힐시 / 로 이동


const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("서버에  연결되었습니다 ⚡");

    socket.on("close",()=> console.log("브라우저와 연결이끊어졌습니다. 🔨")); // 브라우저 창받을떄

    socket.on("message", (message) => {   // 메세지오면 메세지 보내기
        sockets.forEach((aSocket) =>  aSocket.send(message.toString()))    // 참가한 모든브라우저 에게 메세지보내기
    });

})


server.listen(3000, handleListen);
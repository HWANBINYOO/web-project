import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();

app.set("view engine" , "pug");
app.set("views" , __dirname + "/views");
app.use("/public" , express.static(__dirname + "/public"));
app.get("/",(_, res) => res.render("home")); 
app.get("/*" , (_, res) => res.redirect("/")); // 다른 url로 이동힐시 / 로 이동

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

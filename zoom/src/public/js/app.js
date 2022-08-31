const socket = io();  // io = 자동적으로 back-end socket.io 와 연결해주는 함수

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;  //메세지input 창 숨기기

let roomName; 

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event){ // 방이름 입력하면 실행하는 함수
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room" , input.value , showRoom); 
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
const socket = io();  // io = 자동적으로 back-end socket.io 와 연결해주는 함수

const welcome = document.getElementById("welcome"); // room box
const form = welcome.querySelector("form");
const room = document.getElementById("room"); // message box

room.hidden = true;  //메세지input 창 숨기기

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message" , input.value , roomName , () => {  
        addMessage(`You: ${value}`);
    }); 
    input.value = "";
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname" , input.value);
}


function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg") // message box 안 form
    const nameForm = room.querySelector("#name") // message box 안 form
    msgForm.addEventListener("submit" , handleMessageSubmit);
    nameForm.addEventListener("submit" , handleNicknameSubmit);
}

function handleRoomSubmit(event){ // 방이름 입력하면 실행하는 함수
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room" , input.value , showRoom); // dome = showRoom
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {    // Welcome
    addMessage(`${user} arrved!`);
})

socket.on("bye", (left) => {    // Welcome
    addMessage(`${left} left ㅠㅠ!`);
})

socket.on("new_message" , addMessage);  // addMessage ==  (msg) => addMessage(msg)

socket.on("room_change" , console.log); // soncole.log = (msg) => console.log(msg))

socket.on("room_change" , (rooms) => {  // roomEvent
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    if(rooms.length === 0){
        return;
    }
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});
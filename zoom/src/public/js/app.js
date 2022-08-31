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
    const input = room.querySelector("input");
    const value = input.value;
    socket.emit("new_message" , input.value , roomName , () => {  
        addMessage(`You: ${value}`);
    }); 
    input.value = "";
}


function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const form = room.querySelector("form") // message box 안 form
    form.addEventListener("submit" , handleMessageSubmit);
}

function handleRoomSubmit(event){ // 방이름 입력하면 실행하는 함수
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room" , input.value , showRoom); // dome = showRoom
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {    // Welcome
    addMessage("someone joined!");
})

socket.on("bye", () => {    // Welcome
    addMessage("someone left ㅠㅠ!");
})

socket.on("new_message" , addMessage);  // addMessage ==  (msg) => {addMessage(msg)}
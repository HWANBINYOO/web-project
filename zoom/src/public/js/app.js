const messageul = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () =>{
    console.log("서버에 연결되었습니다 ⚡");
});

socket.addEventListener("message", (message) =>{
    console.log("New message: ", message.data);
});

socket.addEventListener("close",()=>{
    console.log("서버와 연결이끊어졌습니다. 🔨");
});

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value); 
    input.value = "";
}

messageForm.addEventListener("submit" , handleSubmit);
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () =>{
    console.log("서버에 연결되었습니다 ⚡");
});

socket.addEventListener("message", (message) =>{
    console.log("New message: ", message.data);
});

socket.addEventListener("close",()=>{
    console.log("서버와 연결이끊어졌습니다. 🔨");
})

setTimeout(() => {  //5초후에 메세지 보내기
    socket.send("hello from the brower!")
}, 5000);   
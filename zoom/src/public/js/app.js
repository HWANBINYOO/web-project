const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){ 
      const msg = {type,payload}
      return JSON.stringify(msg);  // javaScrips object 를 string 으로 바꿔준다.
}


socket.addEventListener("open", () =>{
    console.log("서버에 연결되었습니다 ⚡");
});

socket.addEventListener("message", (message) =>{
    const li = document.createElement('li');
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close",()=>{
    console.log("서버와 연결이끊어졌습니다. 🔨");
});

/** 닉네임 submit시 발생하는 함수 */
function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname" , input.value));
    input.value = "";
    
}

/** 메세지 submit시 발생하는 함수 */
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value)); 
    input.value = "";
}



nickForm.addEventListener("submit" , handleNickSubmit); 
messageForm.addEventListener("submit" , handleSubmit);
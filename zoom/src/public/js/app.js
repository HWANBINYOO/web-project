const socket = io(); // io = 자동적으로 back-end socket.io 와 연결해주는 함수

const welcome = document.getElementById("#welcome")
const form = welcome.querySelector("form");

function backendDone(){
    console.log("backend done");
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit(
        "enter_room",
        input.value,
        backendDone
    );
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
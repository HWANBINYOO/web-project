const socket = io();  // io = 자동적으로 back-end socket.io 와 연결해주는 함수

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia(){
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true,
        });
        myFace.srcObject = myStream;
    } catch(e) {
        console.log(e);
    }
}

getMedia(); 

function handleMutiClick(){
    if(!muted){
        muteBtn.innerText = "Unmute"
        muted = true;
    } else{
        muteBtn.innerText = "Mute"
        muted = false;
    }
}

function handleCameraClick(){
    if(cameraOff){
        cameraOff.innerText = "Turn Camera Off"
        cameraOff = false;
    } else{
        cameraOff.innerText = "Turn Camera On"
        cameraOff = true;
    }
}

muteBtn.addEventListener("click" , handleMutiClick);
cameraBtn.addEventListener("click" , handleCameraClick);

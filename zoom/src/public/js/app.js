const socket = io();  // io = 자동적으로 back-end socket.io 와 연결해주는 함수

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras(){
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            camerasSelect.appendChild(option);
        });
        console.log(cameras);
    } catch (e) {
        console.log(e);
    }
}  

async function getMedia(){
    try {
        myStream = await navigator.mediaDevices.getUserMedia({  // 카메라,오디오 가져온다
                audio:true,
                video:true,
        });
        myFace.srcObject = myStream;
        getCameras();
    } catch(e) {
        console.log(e);
    }
}

getMedia(); 

function handleMutiClick(){
    myStream
        .getAudioTracks()
        .forEach(track => {track.enabled = !track.enabled });
    if(!muted){
        muteBtn.innerText = "Unmute"
        muted = true;
    } else{
        muteBtn.innerText = "Mute"
        muted = false;
    }
}

function handleCameraClick() {
    myStream
        .getVideoTracks()
        .forEach(track => {track.enabled = !track.enabled });
    if (cameraOff) {
      cameraBtn.innerText = "Turn Camera Off";
      cameraOff = false;
    } else {
      cameraBtn.innerText = "Turn Camera On";
      cameraOff = true;
    }
}

muteBtn.addEventListener("click" , handleMutiClick);
cameraBtn.addEventListener("click" , handleCameraClick);

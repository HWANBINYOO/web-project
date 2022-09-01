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
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if(currentCamera.label === camera.label){
                option.selected = true; 
            }
            camerasSelect.appendChild(option);
        });
    } catch (e) {
        console.log(e);
    }
}  

async function getMedia(deviceId){
    const initialConstrains = {     // deviedId 가 없을떄 , cameras 를 만들기 전
        audio:true , 
        video:{facingMode:"user"},
    };
    const caneraCibstraubts = {
        audio:true,
        video:{deviceId: { exact: deviceId }} 
    };
    try {
        myStream = await navigator.mediaDevices.getUserMedia(    // 카메라,오디오 가져온다.
            deviceId? caneraCibstraubts : initialConstrains
        ); 
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

async function handleCameraChange(){
    await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click" , handleMutiClick);
cameraBtn.addEventListener("click" , handleCameraClick);
camerasSelect.addEventListener("input" , handleCameraChange);

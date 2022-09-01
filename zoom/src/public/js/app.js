const socket = io();  // io = 자동적으로 back-end socket.io 와 연결해주는 함수

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hiiden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

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

// 처음창

welcome = document.getElementById("welcome");  
welcomeForm = welcome.querySelector("form");

async  function startMedia(){
    welcome.hidden = true;
    call.hidden = false;
    await getMedia();
    makeConnection();
};

function handleWelcomeSubmit(event) {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    socket.emit("join_room" , input.value , startMedia);    //서버로 보내기 
    roomName = input.value;
    input.value = "";
};

welcomeForm.addEventListener("submit" , handleWelcomeSubmit);

// Socket Code

socket.on("welcome" , async () => {
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer");
    socket.on("offer" , offer , roomName);
}); 

socket.on("offer" , offer => {
    myPeerConnection.setRemoteDescription(offer);
});

// RTC Code 

function makeConnection(){
    myPeerConnection = new RTCPeerConnection();
    myStream
        .getTracks()
        .forEach((track) => 
    myPeerConnection.addTrack(track , myStream));
};
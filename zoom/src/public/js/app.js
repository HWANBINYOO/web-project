const socket = io();  // io = 자동적으로 back-end socket.io 와 연결해주는 함수

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hiiden = true;

let myStream;   // stream = 비디오와 오디오가 결합된것
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras(){
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();      // 모든 장치 다 가져오기
        const cameras = devices.filter(device => device.kind === "videoinput"); //  카메라 다 가져오기 
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach(camera => {                             //option 에 카메라 속성을 넣은뒤 추가
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

async function getMedia(deviceId){  // 카메라,오디오 실행시켜주는 함수
    const initialConstrains = {     // deviedId 가 없을떄 , cameras 를 만들기 전
        audio:true , 
        video:{facingMode:"user"},
    };
    const caneraCibstraubts = {     // deviedId 가 있을떄
        audio:true,
        video:{deviceId: { exact: deviceId }} 
    };
    try {
        myStream = await navigator.mediaDevices.getUserMedia(    // 카메라,오디오 가져온다.
            deviceId? caneraCibstraubts : initialConstrains // deviceId 가 있으면 맞는 디바이스 검색 아니면  전체호출
        ); 
        myFace.srcObject = myStream;
        await getCameras();
    } catch(e) {
        console.log(e);
    }
}

function handleMuteClick(){
    myStream
        .getAudioTracks()   // 오디오 트랙 가져오기
        .forEach(track => (track.enabled = !track.enabled ));
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    } else{
        muteBtn.innerText = "Mute";
        muted = false;
    }
}

function handleCameraClick() {
    myStream
        .getVideoTracks()   // 비디오 트랙 가져오기
        .forEach(track => (track.enabled = !track.enabled ));
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
    if(myPeerConnection){      
        const videoTrack = myStream.getVideoTracks()[0]
        const videoSender = myPeerConnection
        .getSender()                            // sender = 우리 peer로 보내진 media stream track을 컨드롤하게 해준다
        .find(sender => sender.track.kind === "video");
        videoSender.replaceTrack(videoTrack);    // video track을 받으면 내가 새장치로 업데이트 된 video track을 받도록 해준다.
    }
}

muteBtn.addEventListener("click" , handleMuteClick);
cameraBtn.addEventListener("click" , handleCameraClick);
camerasSelect.addEventListener("input" , handleCameraChange);   // 카메라 option value 값 변경했을때

// 처음창

welcome = document.getElementById("welcome");
welcomeForm = welcome.querySelector("form");

async  function initCall(){     // 방이름input 없애고 채팅실행해주는 함수
    welcome.hidden = true;
    call.hidden = false;
    await getMedia();  
    makeConnection();
};  

async function handleWelcomeSubmit(event) { // 방이름input submit 할떄  실행하는 함수
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    await initCall();
    socket.emit("join_room" , input.value);    //서버로 보내기 
    roomName = input.value;
    input.value = "";
};

welcomeForm.addEventListener("submit" , handleWelcomeSubmit);

// Socket Code

socket.on("welcome" , async () => {
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer");
    socket.emit("offer" , offer , roomName);
}); 
socket.on("offer" , async(offer) => {
    console.log("received the offer");
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer" , answer , roomName);
    console.log("sent the answer");
});

socket.on("answer" , answer => {
    console.log("received the answer");
    myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice" , ice => {
    console.log("received candidate");
    myPeerConnection.addIceCandidate(ice);
});


// RTC Code 

function makeConnection(){
    myPeerConnection = new RTCPeerConnection({      // 가짜 STUN 서버 만들기 (STUN 서버? = 컴퓨터가 공용IP주소를 찾게 해주는것)
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                    "stun:stun4.l.google.com:19302",
                ],
            },
        ],
    });
    myPeerConnection.addEventListener("icecandidate" , handleIce);  //Ice Candidate = 브라우저가 서로 소통할 수 있게 해주는 방법
    myPeerConnection.addEventListener("addstream" , handleAddStream);
    myStream
        .getTracks()
        .forEach((track) => myPeerConnection.addTrack(track , myStream));
};

function handleIce(data){
    console.log("sent candidate");
    socket.emit("ice" , data.candidate , roomName); 
};

function handleAddStream(data){
    const peersStream = document.getElementById("peerFace");    // 2번쨰 카메라
    peersStream.srcObject = data.stream;
};
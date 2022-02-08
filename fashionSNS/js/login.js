// const loginform = document.querySelector('.loginform');
let LOGINING = false;
const idValue = document.querySelector('.idBox input');
const pwValue = document.querySelector('.pwBox input');

const CORONA = document.querySelector("#Corona");
const NOUSER = document.querySelector("#nouser");
const NOLOGIN = document.querySelector("#nologin");



function mainpage(event){
    event.preventDefault();
    if(idValue.value === '1234' && pwValue.value === '1234'){
        idValue.value = '';
        pwValue.value = '';
       
        console.log(idValue.value);

        location.href="/main1-2after.html";
    }
    else{
        idValue.value = '';
        pwValue.value = '';
        console.log(idValue.value);
        alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
 
}

// function logindone(){
    
//     if(!LOGINING){
//         console.log(LOGINING);
//         CORONA.style.display = "none";
//         NOUSER.style.display = "block";
//         NOLOGIN.style.display = "block";
//     }
//     else{
//         console.log(LOGINING);
//         CORONA.style.display = "";
//         NOUSER.style.display = "none";
//         NOLOGIN.style.display = "none";
//     }
// } 


// function init(){
//     logindone();
// }
// init();
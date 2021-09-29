const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_TY = "showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.vlaue;
    painrGreeing(currentValue);
    saveName(currentValue);
}


function askForName(){
    form.classList.add(SHOWING_TY);
    form.addEventListener("submit", handleSubmit);
}

function painrGreeing(text){
    form.classList.remove(SHOWING_TY);
    greeting.classList.add(SHOWING_TY);
    greeting.innerText = `Hi ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        painrGreeing(currentUser);
    }
}
loadName();
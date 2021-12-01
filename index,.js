const form = document.querySelector('form');

const pw = document.querySelector('#pw input');
const id = document.querySelector('#id input');

function loginsubmit(event){
    event.preventDefault();
    let idvalue = id.value;
    let pwvalue = pw.value;
    console.log("id:"+ idvalue);
    console.log("pw:"+ pwvalue);

    id.value = "";
    pw.value = "";
}

// const loginBox = document.querySelector(".loginBox");
// function focusidpw(){
//     loginBox.sytle.backgroundColor = "white";
//     // loginBox.sytle.border = "5px solid white";
// }

// function bluridpw(){
//     loginBox.sytle.backgroundColor = "black";
//     loginBox.sytle.border = "1px solid black";

// }


// id.addEventListener("focus",focusidpw);
// id.addEventListener("blur",bluridpw);
// pw.addEventListener("focus",focusidpw);
// pw.addEventListener("blur",bluridpw);

form.addEventListener("submit",loginsubmit);
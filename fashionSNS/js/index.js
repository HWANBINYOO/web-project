const star = document.querySelectorAll(".fa-star");

function starclick(i){
    console.log(i);
    if(i === 0){
        star[0].classList.toggle('yellowColor');
    }
    else if(i === 1){
        star[1].classList.toggle('yellowColor');
    }
}

const page1click = document.querySelector('.wrap1');






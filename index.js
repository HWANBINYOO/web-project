let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = $('.header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    let st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header').removeClass('nav-down').addClass('nav-up');
        $('.todaywarp').addClass('fifi');
       
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.header').removeClass('nav-up').addClass('nav-down');
            $('.todaywarp').removeClass('fifi');
        }
    }
    
    lastScrollTop = st;
}
// 다크모드
const moon = document.querySelector(".fa-moon");
const fontt = document.querySelectorAll('h1');
const ccc = document.querySelectorAll('.ccc');
const h2 = document.querySelectorAll('h2');
const h3 = document.querySelectorAll('h3');
const h4 = document.querySelectorAll('h4');
const header = document.querySelector('.headerwrap');
const headermenu = document.querySelectorAll('a');
const headerlogo = document.querySelectorAll('i');
const todaypop = document.querySelector('.todaywarp');
const condate = document.querySelector('.con3date');
const todaytitlelogo = document.querySelectorAll('.fa-calendar');

console.log(fontt);
console.log(h2);
console.log(h3);
console.log(h4);
console.log(headerlogo);

console.log(headermenu);
function changeSunMoon(){

    if(moon === document.querySelector(".fa-moon")){
        document.body.style.backgroundColor = "black";
        moon.classList.replace('fa-moon','fa-sun');
        
        for(let i=0; i<2;i++){
            todaytitlelogo[i].style.color = "white";
        }
        condate.style.color = "white";
        todaypop.style.backgroundColor = " black";
        header.style.backgroundColor = "black";
        for(let i=0; i<5;i++){
            headermenu[i].style.color="white";
        }
        for(let i=0; i<4;i++){
            headerlogo[i].style.color="white";
        }

        for(let i=0; i<4;i++){
            h2[i].style.color="white";
        }

        for(let i=0; i<h3.length;i++){
            h3[i].style.color="white";
        }
        for(let i=0; i<h4.length;i++){
            h4[i].style.color="white";
        }

       for(let i = 0; i<ccc.length;i++){
           ccc[i].style.backgroundColor="rgb(30, 30, 30)";
       }

        for(let i=0; i<fontt.length; i++){
            fontt[i].style.color = "white";
        }

    }else
    {
        moon.classList.replace('fa-sun','fa-moon');
        document.body.style.backgroundColor = "white";

        for(let i=0; i<2;i++){
            todaytitlelogo[i].style.color = "black";
        }
        condate.style.color = "black";
        todaypop.style.backgroundColor = " white";
        header.style.backgroundColor = "white";
        for(let i=0; i<5;i++){
            headermenu[i].style.color="black";
        }
        for(let i=0; i<4;i++){
            headerlogo[i].style.color="black";
        }

        for(let i=0; i<4;i++){
            h2[i].style.color="black";
        }
        for(let i=0; i<h3.length;i++){
            h3[i].style.color="black";
        }
        for(let i=0; i<h4.length;i++){
            h4[i].style.color="black";
        }

        for(let i = 0; i<ccc.length;i++){
            ccc[i].style.backgroundColor="white";
        }

        for(let i=0; i<fontt.length; i++){
            fontt[0].style.color = "black";
        }
        
    }

}

const globe  = document.querySelector('.fa-globe-europe');
function changeearth(){
    if(globe === document.querySelector(".fa-globe-europe")){
        globe.classList.replace('fa-globe-europe','fa-circle-notch');
    }else
    {
        globe.classList.replace('fa-circle-notch','fa-globe-europe');
        
    }
}

// 검색창

const searchBox = document.querySelector(".searchBox");
const searchBoxclass = document.querySelector('.fa-search');
// const searBoxtinput = document.querySelector(".hidee");
// const searBoxti = document.querySelector(".fa-search");

const searchBoxBox = document.querySelector(".searchBoxBox");
function searchBoxBoxx(){
    if(searchBoxBox.style.visibility === "hidden"){
     
     
        searchBoxclass.classList.replace('fa-search','fa-times');
       

        for(let i=1; i<3;i++){
            headerlogo[i].style.display="none";
        }

        for(let i=1; i<5;i++){
            headermenu[i].style.visibility="hidden";
        }
        searchBoxBox.style.visibility = "visible";

        
        document.body.classList.add('xindex');
        searchBoxBox.classList.remove('gogogo');
        searchBoxBox.classList.add('nonono');

        
        setTimeout(function() {
            searchBox.style.visibility ="visible";
            
        }, 200);
        
        searchBox.classList.replace('noupup','upup');


    }
    else{
        searchBoxBox.style.visibility = "hidden";
        searchBoxclass.classList.replace('fa-times','fa-search');

        for(let i=1; i<3;i++){
            headerlogo[i].style.display="";
        }
        for(let i=1; i<5;i++){
            headermenu[i].style.visibility="visible";
        }



        document.body.classList.remove('xindex');
        searchBoxBox.classList.add('gogogo');
        searchBoxBox.classList.remove('nonono');

        searchBox.classList.replace('upup','noupup');
        searchBox.style.visibility ="hidden";

        // document.body.style.backgroundColor = 'rgb(221, 221, 221)';

            
            

       
    }

}


// function searchBoxn(){
//     if(searchBox.style.visibility !== "hidden"){
        
//         searchBox.style.visibility = "hidden";
//         searchBox.classList.add('endend');
//         searchBox.classList.remove('startstart');
          
//         searBoxtinput.style.visibility = "hidden";
//         searBoxti.style.visibility = "hidden";

//     }else{
//         searchBox.style.visibility = "visible";
//         searchBox.classList.add('startstart');
//         searchBox.classList.remove('endend');

        
//         setTimeout(function() {
//             searBoxtinput.style.visibility = "visible";
//             searBoxti.style.visibility = "visible";
//         }, 300);
      
//     }

// }
const todaydate = document.querySelector('.todaydate');
function getTime(){

    let today = new Date();
    let month = today.getMonth();
    let date = today.getDate();

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = week[today.getDay()];
// const todaytitle = document.querySelector('.todaytitle');
todaydate.innerHTML = `오늘의 카카오 <br>${month+1}월${date}일 ${dayOfWeek}요일입니다.`;
}



// function mousee0(){

//     for(let i=0; i<4;i++){
//         if(i === 1 ){
//             headermenu[i].style.color="black";   
//         }
//         else{
//             headermenu[i].style.color="gray";
//         }
//     }
// }


//     for(let i=0; i<4;i++){
//         headermenu[i].addEventListener('mouseover',mousee0());
//     }

// function mousee0(i){

//     for(let j=0; j<4;j++){
//         if(i === j ){
//             headermenu[j].style.color="black";   
//         }
//         else{
//             headermenu[j].style.color="gray";
//         }
//     }
// }
// 메뉴 설정
const popup = document.querySelector('.popupmenu');
function popupchang(){
    if(popup.style.visibility === "hidden"){
        

        popup.style.visibility = "visible";
    }
    else{
        popup.style.visibility = "hidden";
    }
}

// 검색창 포커스

let value = document.querySelector('#value');

value.addEventListener('blur',function(event){
    // alert('blur');
    searchBox.style.boxShadow = "1px 1px 2px";
    searchBox.style.borderColor = "black";

});
value.addEventListener('focus',function(event){
    // alert('foucus');
    searchBox.style.boxShadow = "1px 1px 7px ";
    searchBox.style.borderColor = "yellow";
});





// 검색창필퍼 지금안됨
function filter(){
    const value = document.querySelector("#value").value.toUpperCase();
    const contends = document.querySelectorAll(".contends");
    
    for(let i=0;i<contends.length;i++){

        let contitle = document.querySelectorAll("contitle");
        if(contitle[i].innerHTML.toUpperCase().indexOf(value) > -1){
            contends[i].style.display="block";
        } else{
            contends[i].style.display="none";
        }
    }
}


function init(){
   

    // headermenu[1].addEventListener('mouseover',mousee1());
    // headermenu[2].addEventListener('mouseover',mousee2());
    // headermenu[3].addEventListener('mouseover',mousee3());
    getTime();
}
init();
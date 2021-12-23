// 스크롤 이벤트
const topBtn = document.querySelector(".fa-arrow-alt-circle-up");
let CLICK = false;
let nowScroll = 0;
window.addEventListener('scroll',function(){
    nowScroll = document.documentElement.scrollTop;
    console.log(nowScroll);
    if(nowScroll !== 0 && CLICK === false){
        topBtn.style.visibility = "visible";

    }
    else{
        CLICK = false;
        topBtn.style.visibility = "hidden";
    }

});
let timeOut;
function scrollToTop() {    
    CLICK = true;
    if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
        topBtn.style.visibility = "hidden";
        window.scrollBy(0,-60);
        timeOut=setTimeout('scrollToTop()',10);
    }
    else {
        // CLICK = false;
        clearTimeout(timeOut);
    }
}

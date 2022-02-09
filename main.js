const container = document.querySelector('.image-container');
const startButton = document.querySelector('.gaimstart');
const gameText = document.querySelector('.game-clear');
const playTime = document.querySelector('.play-time');

const tileCount = 16;
let tiles = []; //list 배열 생성

const dragged = {
    el : null,
    class:null,
    index:null,
}

let isPlaying = false; //게임 플레이
let timeInterval = null;
let time =0;
//fuctions
function checkStatus(){
    const currentList = [...container.children]; //li 복사
    const unMatckedList = currentList.filter((child,index) => 
    Number(child.getAttribute("data-index")) !== index);          
    // console.log(unMatckedList);
    if(unMatckedList.length === 0){
        gameText.style.display = "block";   
        isPlaying = false;
        clearInterval(timeInterval);//시간 정지
    }
}

function setGame(){     //게임시작
    isPlaying = true;
    time = 0;
    container.innerHTML = "";
    gameText.style.display = "none";

    timeInterval = setInterval(() => {//플레이시간
        playTime.innerText = time;
        time++;
    }, 1000);


    tiles = createImageTiles(); //생성된 배열 삽입
    tiles.forEach(tile => container.appendChild(tile)); //베열을 컨테이너의 집어넣음
    setTimeout(() => {
        container.innerHTML = "";   //li값 초기화
        shuffle(tiles).forEach(tile => container.appendChild(tile));  //1.5초 후에 섞은 배열을 넣음                        `

    }, 1500);
}

function createImageTiles(){ //li 생성
    tempArray = [];
    Array(tileCount).fill().forEach((_,i) => {  //i = Arrayindex
        const li = document.createElement('li');
        li.setAttribute('data-index',i);    //li data-index 에 i넣음
        li.setAttribute('draggable','true');    //드레그 잘되게하기
        li.classList.add(`list${i}`);

        tempArray.push(li);  
    });
    return tempArray;
}


function shuffle(array){//섞기
    let index = array.length -1;
    while(index > 0){
        const randonIndex = Math.floor(Math.random()*(index+1)); //무작위로 랜덤 인덱스번호 생성
        [array[index],array[randonIndex]] = [array[randonIndex], array[index]]  //배열의 인텍스번호를가진 li 와 랜덤인덱스의 번호인 li 과 서로 바꿈 
        index--;
        // console.log(array[index],array[randonIndex]);
    }
    return array;
}




//이벤트

container.addEventListener('dragstart', e => {
    if(!isPlaying) {return}; 
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    console.log(dragged.class);
    dragged.index = [...obj.parentNode.children].indexOf(obj);
    

});
container.addEventListener('dragover', e => {
    e.preventDefault();//이벤트 발생안하게하기
});
container.addEventListener('drop', e => {
    if(!isPlaying) {return};
    const obj = e.target;

    if(obj.className !== dragged.class){    //드래그한 퍼즐과 놓은위체에있는 퍼즐이 서로 다르다면
        let originPlace;
        let isLast = false;

        if(dragged.el.nextSibling){
            originPlace = dragged.el.nextSibling;
        } else{
            originPlace = dragged.el.previousSibling;
            isLast = true;
        }
        
      const  droppedIndex = [...obj.parentNode.children].indexOf(obj);
      dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);
      isLast ? originPlace.after(obj) : originPlace.before(obj);
    }

    checkStatus();
});

startButton.addEventListener('click', () => {
    setGame();
});
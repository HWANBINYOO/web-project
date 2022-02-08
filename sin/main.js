const container = document.querySelector('.image-container');
const startButton = document.querySelector('.gaimstart');
const gameText = document.querySelector('.game-clear');
const playTime = document.querySelector('.play-time');

const tileCount = 16;

let tiles = [];
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
    const currentList = [...container.children];
    const unMatckedList = currentList.filter((child,index) => 
    Number(child.getAttribute("data-index")) !== index);
    console.log(unMatckedList);
    if(unMatckedList.length === 0){
        gameText.style.display = "block";   
        isPlaying = false;
        clearInterval(timeInterval);//시간 정지
    }
}

function setGame(){
    isPlaying = true;
    time = 0;
    container.innerHTML = "";
    gameText.style.display = "none";

    timeInterval = setInterval(() => {
        playTime.innerText = time;
        time++;
    }, 1000);


    tiles = createImageTiles();
    tiles.forEach(tile => container.appendChild(tile));
    setTimeout(() => {
        container.innerHTML = "";
        shuffle(tiles).forEach(tile => container.appendChild(tile));
        
    }, 1500);
}

function createImageTiles(){
    tempArray = [];
    Array(tileCount).fill().forEach((_,i) => {
        const li = document.createElement('li');
        li.setAttribute('data-index',i);
        li.setAttribute('draggable','true');
        li.classList.add(`list${i}`);

        tempArray.push(li);
    });
    return tempArray;
}


function shuffle(array){
    let index = array.length -1;
    while(index > 0){
        const randonIndex = Math.floor(Math.random()*(index+1));
        [array[index],array[randonIndex]] = [array[randonIndex], array[index]]
        index--;
    }
    return array;
}




//이벤트

container.addEventListener('dragstart', e => {
    if(!isPlaying) {return};
    const obj = e.target;
    dragged.el = obj; 
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj);
    console.log(dragged.index);

});
container.addEventListener('dragover', e => {
    e.preventDefault();
});
container.addEventListener('drop', e => {
    if(!isPlaying) {return};
    const obj = e.target;

    if(obj.className !== dragged.class){
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
      isLast ? originPlace.after(obj) : originPlace.before(obj)
    }

    checkStatus();
});

startButton.addEventListener('click', () => {
    setGame();
});
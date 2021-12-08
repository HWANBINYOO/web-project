let score = 0;
let time;
const GAME_TIME = 20;
let isPlaying = false;
let countTime;
let words = [];
const Wordinput = document.querySelector('.word-input');
const Worddiplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
    buttonChange('게임로딩중...');
    getWords();     
    Wordinput.addEventListener('input',checkMatch);
}


function run(){
    if(isPlaying){return;}
    time = GAME_TIME;
    isPlaying = true;   
    Wordinput.focus();
    
    scoreDisplay.innerText = 0;
    countTime = setInterval(countDown,1000);
    GameEndCheck = setInterval(checkStatus,50);
    buttonChange('게임중');
}

function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange('게임시작')
        clearInterval(GameEndCheck)
    }
}

//단어불러오기
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    response.data.forEach((word) => {
        if(word.length < 10){
            words.push(word);
        }
    });
    buttonChange('게임시작');
    // words = response.data;
})
  .catch(function (error) {
    // handle error
    console.log(error);
  })
    // words = ['Sintay','Banana','Apple','Cherry'];
    buttonChange('게임시작')
}


//단어 일치 체크
function checkMatch (){
    if(Wordinput.value.toLowerCase() === Worddiplay.innerText.toLowerCase()){
        Wordinput.value = "";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        // time = GAME_TIME;
        const randomNom = Math.floor(Math.random()*words.length);
        Worddiplay.innerText = words[randomNom];
    }
}

function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){clearInterval(countTime);}
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}



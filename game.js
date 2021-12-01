const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;

let img2 = new Image();
img2.src ='dino2.png';

let dino ={
    x:10,
    y:200,
    width:50,
    height:50,
    draw(){
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img2,this.x,this.y  ,this.width,this.height);
        console.log(this.x,this.y);

      
    }
}
// dino.draw();

let img1 = new Image();
img1.src ='sin.png';

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle='red';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1,this.x,this.y  ,this.width,this.height);
    }
}
let timer = 0;
let cactus_many = [];
let juemptimemer = 0;
let juemping = false;
let juempinging = false;
let animation;
let spaceclick = 0;
let slide = false;

function faim(){
    animation = requestAnimationFrame(faim);    //프레임마다 실행
    timer++;

    // img2.src = 'dinorun2.png';
    if(juempinging === false){

        setTimeout(() => {
            img2.src ='dinorun.png';
        }, 2000);
        
        setTimeout(() => {
            img2.src ='dinorun2.png';
        },2000);
    }
    
    // console.log(timer);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    context.fillStyle = "black";
    context.font = ' 40px 굴림';
    context.fillText("점수:"+timer,800,100);
    
    // dino.x++;
    if(timer % Math.floor(Math.random()*990) === 0){
        let cactus = new Cactus();
        cactus_many.push(cactus);

        // console.log(cactus);
    }
    
    cactus_many.forEach((a, i, o)=>{
        // x좌표가 0미만이면 제거
        if(a.x < 0){
            o.splice(i,1)
            // console.log(a.x);
        }
        crash(dino,a);
        
        // a.x-=5 ;
        a.draw();
    })

        if(spaceclick == 1){
            if(juemping == true){
                juempinging = true;
                dino.y-=5;
                juemptimemer++;
            }
        }
        
        if(juemping == false){
            if(dino.y < 200){
                dino.y+=5;
            }
            else if(dino.y <= 200){
                spaceclick = 0;
                juempinging = false;
            }
            
        }
        if(juemptimemer > 20){
            juemping = false;
            juemptimemer = 0;
        }

        if(slide == true){
            img2.src ='dinodown.png';
            slide = false;
        }
      

    dino.draw();
        
}

faim();
//충돌 확인
function crash(dino, cactus){
    let xgap = cactus.x - (dino.x + dino.width);
    let ygap = cactus.y - (dino.y + dino.height);
    if(xgap < 0 && ygap < 0){ 
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation)
        // context.fillText("-" + timer + "-",800,100);
        context.fillText("-" + timer + "-",465,160);
    }
}

document.addEventListener('keydown',function(e){
    // consol.log(dino.x);
    // console.log(e.code);
    if(e.code === 'Space' || e.code === 'ArrowUp'){
        spaceclick += 1;

        if(dino.y >= 200 && spaceclick == 1){
            juemping = true; 
            console.log(juemping);
            console.log(spaceclick);
        }
        else{
            juemping = false;
        }
    }
    else if(e.code === 'ArrowDown'){
        slide = true;
    }
})
document.addEventListener('keyup',function(e){
    // img2.src ='dino2.png';
})

let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
 const moveSound=new Audio('move.mp3');

let speed=5;
let score=0;
let score1=document.getElementById('score');
score1.innerHTML="Score:"+score;

let HighScore=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];
food={x:8,y:5}

function main(ctime){
    
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    //console.log(ctime);
}

function isCollapse(snakeArr){
    //touch urself
    for(let index=1;index<snakeArr.length;index++){
        if(snakeArr[index].x===snakeArr[0].x && snakeArr[index].y===snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x>=18||snakeArr[0].x<=0 || snakeArr[0].y>=18||snakeArr[0].y<=0){
        return true;}
}

function gameEngine(){
    //updating snake array
    if(isCollapse(snakeArr)){
        gameOverSound.play();
        
        inputDir={x:0,y:0};
        alert("GameOver.Press any key");
        console.log('start')
        snakeArr = [{x: 13, y: 15}];
        score=0;
        score1.innerHTML="Score:"+score;
    }
    //Eaten food?
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        score1.innerHTML="Score:"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}

    }

    //Move snake
    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    


    //render snake
    board=document.getElementById('board')
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    }
    )
    //display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//highscore
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);

    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};//game start
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("up");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("up")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        
        default:
            break;
    }
});
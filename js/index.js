// Constants ----------------------------------------------------------------

let inputDir = {x: 0, y: 0};
const foodSound = new Audio('eat.mp3');
const gameOverSound = new Audio('end.mp3');
const moveSound = new Audio('move.mp3');
const bgSound = new Audio('loop_thru.mp3');

let lastPaintTime = 0;
let speed = 1;
let score = 0;
let snakeArr = [
    {x: 5, y: 8}
];

let food = {x: 13, y: 14};
let play = false;

let num = 0;

// Game Functions ----------------------------------------------------------------
function main(ctime){     //currentTime
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)<(150/speed)){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr){
    // If you bump into yourself.
    for (let index = 1; index < snakeArr.length; index++) {
        if(snakeArr[0].x===snakeArr[index].x && snakeArr[0].y===snakeArr[index].y){
            return true;
        }   
    }
    if(snakeArr[0].x<=0 || snakeArr[0].x >20 || snakeArr[0].y<=0 || snakeArr[0].y >20){
        return true;
    }   
    return false;
    // If you bump into boundary.
}

function gameEngine(){  
    
    // 1) Update the snake 

    // Snake Collides!
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgSound.pause();
        play = false;
        alert("Game Over! Press any key to restart!");
        inputDir = {x: 0, y: 0};
        snakeArr = [{x: 5, y: 14}];
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
    }
    // If snake eats food, increment score, snakeArr and regenerate food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        food = {x: Math.round(2 + (16)*Math.random()), y: Math.round(2 + (16)*Math.random())}
        score ++;
        scoreBox.innerHTML = "Score : " + score;
        if(score>highScore){
            highScore = score;
            localStorage.setItem("highScore", highScore);
            hiScoreBox.innerHTML = "High Score : " + highScore;
        }
    }

    // Moving the Snake ***(DIFFICULT)***
    // Logic : Put i-th segment in the place of (i+1)-th segment and put head at (head + inputDir);
    for(let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};  // Making a new snakeArr element, to handle referencing errors.
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // 2) Display the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index) =>{   // for each element in snakeArr
        snakeElement = document.createElement('div');  // create a div element
        snakeElement.style.gridRowStart = e.y;   // position the row(vectical)
        snakeElement.style.gridColumnStart = e.x;  // position the column(horizontal)
        if(index==0) snakeElement.classList.add('head'); //add the head characteristics to the first element
        else snakeElement.classList.add('snake'); //class added to ensure the CSS in it
        board.appendChild(snakeElement); // appended to board
    })



    
    // 3) Display the food

    foodElement = document.createElement('div');  // create a div element
    foodElement.style.gridRowStart = food.y;   // position the row(vectical)
    foodElement.style.gridColumnStart = food.x;  // position the column(horizontal)
    foodElement.classList.add('food'); //class added to ensure the CSS in it
    board.appendChild(foodElement); // appended to board
    
    
}


// Main Logic ----------------------------------------------------------------
let highScore = localStorage.getItem('highScore');
if(highScore===null){
    let temp = 0;
    localStorage.setItem('highScore', JSON.stringify(temp));
//     highScore = temp;
//     highScoreBox.innerHTML = "High Score :" + highScore;
}
hiScoreBox.innerHTML = "High Score : " + highScore;

// else{
// }
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    // if(e.key!=="ArrowUp" && e.key!=="ArrowDown" && e.key!=="ArrowLeft" && e.key!=="ArrowRight){}

        switch (e.key) {
        case "ArrowUp":
            if(!play){
                bgSound.play();
                play=true;
                inputDir = {x: 0, y: 0} //Start the game.
            }
            moveSound.play();
            if(num==2) return;
            else num =1;
            // console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown" :
            if(!play){
                bgSound.play();
                play=true;
                inputDir = {x: 0, y: 0} //Start the game.
            }
            moveSound.play();
            if(num==1) return;
            else num =2;
            // console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            if(!play){
                bgSound.play();
                play=true;
                inputDir = {x: 0, y: 0} //Start the game.
            }
            moveSound.play();
            if(num==4)return;
            else num = 3;
            // console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            if(!play){
                bgSound.play();
                play=true;
                inputDir = {x: 0, y: 0} //Start the game.
            }
            moveSound.play();
            if(num==3) return;
            else num = 4;
            // console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
                        
        default:
            // inputDir.x = inputDir.x;
            // inputDir.y = inputDir.y;
            break;
        }
    }
)
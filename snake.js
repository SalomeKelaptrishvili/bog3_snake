
//*********classebi unda gavasworooo ragac ar gamodis

// class Config{
//     constructor(){
//         this.board = document.getElementById("frame");
//         this.snakeBody = [{x: 10, y:11}];
//         this.appleinit = {x:15, y:2};
//     }
// }
// class Game extends Snake, Apple, Config {
//     game(){
//         move();
//     }
//     move(){
//         snakeVar.moveSnakeSquare();
//         snakeBoard.innerHTML="";
//         snakeVar.createSnakeSquare(this.board);
//         appleVar.createApple(this.board);
//     }
// }

// class Snake extends Config{
//     directionChange(){
//         prevDirectionChange = initialDirectionChange;
//         return initialDirectionChange;
//     }
//     moveSnakeSquare(){
//         for(let i = this.snakeBody.length - 1; i > 0; i--){
//             this.snakeBody[i] = this.snakeBody[i] - 1;
//         }
//         this.snakeBody[0].x += directionChange().x;
//         this.snakeBody[0].y += directionChange().y;
//     }
//     createSnakeSquare(){
//         this.snakeBody.forEach(function(square){
//             let snakeSquare = document.createElement('div');
//             snakeSquare.classList.add('snakeSquare');
//             this.board.appendChild(snakeSquare);
            
//             snakeSquare.style.gridRowStart = square.y;
//             snakeSquare.style.gridColumnStart = square.x;
//         })
//     }
// }
// class Apple extends Config{
//     createApple(){
//         let apple = document.createElement('div');
//         apple.classList.add('apple');
//         this.board.appendChild(apple);

//         apple.style.gridRowStart = this.appleinit.y;
//         apple.style.gridColumnStart = this.appleinit.x;
//     }
// }
// const appleVar = new Apple;
// const snakeVar = new Snake;
// const gameVar = new Game;
// setInterval(gameVar.game(),300);


const snakeBoard = document.getElementById("frame");
// let initialDirectionChange = {x: 0, y: 0};
// let prevDirectionChange = {x: 0, y: 0};

// function game(){
//     init();
//     move();
//     directionChange();
//     appleCheck();
//     die();
// }

// setInterval(game,200);
setInterval(()=>{
    game()
},200);



let gameOver = false;

function game(){
    // if(gameOver) {
    //     snakeBoard.innerHTML = "";
    //     alert("game over");
    //     return;
    // }
    moveSnakeSquare();
    snakeBoard.innerHTML = "";
    createSnakeSquare(snakeBoard);

    updateFood();
    createApple(snakeBoard);
    death();
}



let snakeBody = [{x: 3, y:15},
                {x: 4, y:15},
                {x: 5, y:15},
                {x: 6, y:15}
               ]; //initially snake has only 1 square
            //    {x: 11, y:11},
            //    {x: 12, y:11},
            //    {x: 13, y:11}
let initialDirectionChange = {x: 1, y: 0};
let prevDirectionChange = {x: 0, y: 0};

function directionChange(){
    prevDirectionChange = initialDirectionChange;
    return initialDirectionChange;
}
function moveSnakeSquare(){
    addSegments();
    let inputD = directionChange();
    for(let i = snakeBody.length - 2; i >= 0; i--){
        
        snakeBody[i + 1] = {...snakeBody[i]};
    }

    // snakeBody[0].x += directionChange().x;
    // snakeBody[0].y += directionChange().y;
    // snakeBody[0].x += 0;
    // snakeBody[0].y += 1;
    snakeBody[0].x += inputD.x;
    snakeBody[0].y += inputD.y;
}

function createSnakeSquare(snakeBoard){
    snakeBody.forEach(function(square){
        let snakeSquare = document.createElement('div');
        snakeSquare.classList.add('snakeSquare');
        snakeBoard.appendChild(snakeSquare);
        
        snakeSquare.style.gridRowStart = square.y;
        snakeSquare.style.gridColumnStart = square.x;
    })
}
let food = randomApple(); //{x:15, y:12};
let newSegments = 0;

function appleCheck(position){
    // snakeBody.forEach(function(square){
    //     if(square.x == position.x && square.y == position.y){
    //         eatApple(1);
    //     }
    // })
    // return snakeBody.some(square =>{
    //     return  (square.x == position.x && square.y == position.y);
    // })
    let res = false;
    snakeBody.forEach(function(square){
        if(square.x == position.x && square.y == position.y){
            res =  true;
        }
    })
    return res;
}

function eatApple(amount){
    newSegments += amount;
}

function updateFood(){
    // appleCheck(food);
    // food = {x: 4, y:4};
    if(appleCheck(food)){
        eatApple(3);
        food = randomApple(); //{x: 4, y:4};
    }
}

// let appleInitialPosition = {x:15, y:2};
function createApple(snakeBoard){
        let apple = document.createElement('div');
        apple.classList.add('apple');
        snakeBoard.appendChild(apple);

        apple.style.gridRowStart = food.y;
        apple.style.gridColumnStart = food.x;
}

// let appleRandomPosition = {x: 2, y: 8};
function randomApple(){
    let appleRandomPosition = {x: 0, y: 0};
   // while(appleCheck(appleRandomPosition)){
        appleRandomPosition.x = Math.floor(Math.random() * 20) + 1;
        appleRandomPosition.y = Math.floor(Math.random() * 20) + 1;
    //}
    return appleRandomPosition;
}

snakeInitDirection = 37;
// //keyboard listeners
document.addEventListener('keydown',function(event){
    //left arrow

    if(event.keyCode === 37 && prevDirectionChange.x === 0){
      initialDirectionChange = {x: -1, y: 0};
  }
   //up arrow
   if(event.keyCode === 38 && prevDirectionChange.y === 0){
      initialDirectionChange = {x: 0, y: -1};
  }
   //right arrow
   if(event.keyCode === 39 && prevDirectionChange.x === 0){
      initialDirectionChange = {x: +1, y: 0}; 
  }
   //down arrow
   if(event.keyCode === 40 && prevDirectionChange.y === 0){
      initialDirectionChange = {x: 0, y: +1};
  }
})







function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({... snakeBody[snakeBody.length - 1]});
    }
    newSegments = 0;
}
function death(){
    //check if snake bumps into itself
    for(let i = 1; i < snakeBody.length; i++){
        if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y) gameOver = true;
    }
    return gameOver;
}

// let snakeSquare = document.getElementById("snakeSquareId");
// let apple = document.getElementById("appleId");

//coordinate = {x: 4, y: 3};
// //returns x coordinate of the element
// function getX(elem){
//     let x = elem.offsetLeft;
//     return x;
// }
// //returns y coordinate of the element
// function getY(elem){
//     let y = elem.offsetTop;
//     return y;
// }

// // console.log(getX(snakeSquare),getY(snakeSquare));

// // funcion getPosition(elem){
// //     let x = elem.offsetLeft;
// //     let y = elem.offsetLeft;
// // }
// function move(){
//     document.getEventListener('keydown',function(e){
//         if(e.which === 37){
//            ...
//         }
//     })
// }


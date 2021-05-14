
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

setInterval(game,300);

function game(){
    move();
    createApple(snakeBoard);
}

function move(){
    moveSnakeSquare();
    snakeBoard.innerHTML="";
    createSnakeSquare(snakeBoard);
}

let snakeBody = [{x: 10, y:11}]; //initially snake has only 1 square
let initialDirectionChange = {x: 0, y: 0};
let prevDirectionChange = {x: 0, y: 0};

function directionChange(){
    prevDirectionChange = initialDirectionChange;
    return initialDirectionChange;
}
function moveSnakeSquare(){
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i] - 1;
    }
    snakeBody[0].x += directionChange().x;
    snakeBody[0].y += directionChange().y;
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

let appleInitialPosition = {x:15, y:2};

function createApple(snakeBoard){
        let apple = document.createElement('div');
        apple.classList.add('apple');
        snakeBoard.appendChild(apple);

        apple.style.gridRowStart = appleInitialPosition.y;
        apple.style.gridColumnStart = appleInitialPosition.x;
}

//keyboard listeners
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

function randomApple(){
    let appleRandomPosition;
    while(appleRandomPosition != null){
        appleRandomPosition.x = Math.floor(Math.random() * 20) + 1;
        appleRandomPosition.y = Math.floor(Math.random() * 20) + 1;
    }
    return appleRandomPosition;
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


const snakeBoard = document.getElementById("frame");

class Config{
    constructor(){
        this.left = 37;
        this.up = 38;
        this.right = 39;
        this.down = 40;
        this.score = 0; 
        // this.snakeBody = [{x: 1, y:15},
        //     {x: 2, y:15},
        //     {x: 3, y:15},
        //     {x: 4, y:15}
        //    ]; //aq pirikit unda mkondes, ese marjvena kvadrats gvian achens 
        this.initY = Math.floor(Math.random() * 20) + 1;

        this.snakeBody = [{x: 3, y: this.initY},
            {x: 2, y: this.initY},
            {x: 1, y: this.initY},
            {x: 0, y: this.initY}
           ];

        this.addSquares = 0;
        // this.snakeBody = Array.from(this.arr); 
    }
}


class Catalog extends Config{

    initDirection = {x: 1, y: 0}; //initially when game starts snake moves to right
    prevDirection = {x: 0, y: 0};

    checkBorders(){
        for(let i = 0; i < this.snakeBody.length; i++){
            if(this.snakeBody[i].x == 0) this.snakeBody[i].x = 20;
            if(this.snakeBody[i].x == 21) this.snakeBody[i].x = 0;
            if(this.snakeBody[i].y == 0) this.snakeBody[i].y = 20;
            if(this.snakeBody[i].y == 21) this.snakeBody[i].y = 0;
        }
    }
    
    // //keyboard listeners
    eventFunction(event){
        //left arrow
        if(event.keyCode === this.left && this.prevDirection.x === 0){
            this.initDirection = {x: -1, y: 0};
        }
        //up arrow
        if(event.keyCode === this.up && this.prevDirection.y === 0){
            this.initDirection = {x: 0, y: -1};
        }
        //right arrow
        if(event.keyCode === this.right && this.prevDirection.x === 0){
            this.initDirection = {x: 1, y: 0}; 
        }
        //down arrow
        if(event.keyCode === this.down && this.prevDirection.y === 0){
            this.initDirection = {x: 0, y: 1};
        }
    }

    //updates and moves snake 
    moveSnakeSquare(){
        // this.checkBorders();
        this.prevDirection = this.initDirection;
        //creates a copy of snakeBody array
        
        // for(let i = 0; i < this.addSquares; i++){
        //     // this.snakeBody.push(arr[arr.length - 1]);
        // }
        // this.addSquares = 0;

        //updates coordinates of every square(except first one)
        //only after that(otherwise, arr would have been changed already) it updates coordinates of the first element(head) of snakebody
        let arr = this.snakeBody; 
        for(let i = this.snakeBody.length - 1; i > 0; i--){
            this.snakeBody[i].x = arr[i - 1].x;
            this.snakeBody[i].y = arr[i - 1].y;
        }
        this.snakeBody[0].x += this.initDirection.x;
        this.snakeBody[0].y += this.initDirection.y;        
    }
    
    //draw snake
    createSnakeSquare(){
        this.snakeBody.forEach(function(square){
            let snakeSquare = document.createElement('div');
            snakeSquare.classList.add('snakeSquare');
            snakeBoard.appendChild(snakeSquare);
            
            snakeSquare.style.gridRowStart = square.y;
            snakeSquare.style.gridColumnStart = square.x;
        })
        console.log("createSnake");
    }
}

class Apple extends Catalog {
    apple = this.randomApple(); //{x:15, y:12};
    
    eatApple(){
        if(this.appleCheck(this.apple)){
            this.addSquares += 1; 

            //es unda gavasworo ar mushaobs, ar izrdeba zomashi snakeeeeeeeeeeee :((((((((((( 
            for(let i = 0; i < this.addSquares; i++){
                let snakeSquare = document.createElement('div');
                // snakeSquare.classList.add('snakeSquare');
                // snakeBoard.appendChild(snakeSquare);
                // snakeSquare.x = 
                // snakeSquare.y = 
                this.snakeBody.push(snakeSquare);
                snakeSquare.classList.add('snakeSquare');
                //snakeBoard.appendChild(snakeSquare);
            }
            this.addSquares = 0;

            this.apple = this.randomApple(); //{x: 4, y:4};

            this.score++;
            document.getElementById("score").innerHTML = "";
            document.getElementById("score").innerHTML = `SCORE: ${this.score}`;
        }
        console.log("eatApple");
    }

    // let appleInitialPosition = {x:15, y:2};

    //draws apple square
    createApple(){
            let appleSquare = document.createElement('div');
            appleSquare.classList.add('apple');
            snakeBoard.appendChild(appleSquare);

            appleSquare.style.gridRowStart = this.apple.y;
            appleSquare.style.gridColumnStart = this.apple.x;

            console.log("createApple");
    }
    
    //randomizes apple square coordinates
    randomApple(){
        let randomApple = {x: 0, y: 0};
        while(true){
            randomApple.x = Math.floor(Math.random() * 20) + 1;
            randomApple.y = Math.floor(Math.random() * 20) + 1;
            if(!this.appleCheck(randomApple)) break;
        }
        console.log("random");

        return randomApple;
    }

    //checks if apple coordinates matches snake coordinates
    appleCheck(item){
        let res = false;
        this.snakeBody.forEach(function(square){
            if(square.x == item.x && square.y == item.y) res =  true;
        })
        console.log("check");

        return res;
    }
}

class Game extends Apple{

    gameOver(){
        //checks if snake bumps into itself
        for(let i = 1; i < this.snakeBody.length; i++){
            if(this.snakeBody[0].x == this.snakeBody[i].x && this.snakeBody[0].y == this.snakeBody[i].y) {
                document.getElementById("gameover").innerHTML = "GAME OVER";

                // while(document.getElementById("frame").childElementCount()!= 0){
                //     document.getElementById("frame").removeChild();
                // }
                //////////////////es ar shlis, mainc grdzeldeba tamashii
                
                // this.game();
                // return;
            }
        }
    }
    game(){

        document.addEventListener('keydown',(e)=> this.eventFunction(e));

        this.moveSnakeSquare();
        snakeBoard.innerHTML = "";
        this.createSnakeSquare();
        this.checkBorders();

        this.eatApple();
        this.createApple();

        this.gameOver();
        
    }
}

let snakeGame = new Game();

setInterval(()=>{
    snakeGame.game()
},100);
// snakeGame.game();
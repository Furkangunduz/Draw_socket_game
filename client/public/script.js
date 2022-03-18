const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");

const sizeUpBtn   = document.getElementById("size-up");
const sizeSpan    = document.getElementById("size");
const sizeDownBtn = document.getElementById("size-down");
const colorBtn    = document.getElementById("color");
const clearBtn    = document.getElementById("clear")
const gameId      = document.getElementById("game-id");
const drawBtn     = document.getElementById("draw");
const timeLeft    = document.getElementById("time-left");
const startBtn    = document.getElementById("start")
const startScreen = document.getElementById("start-screen")


var size = 2;
var x ;
var y ;
var isPressed = false;
var isYourTurn = false;
var color = "#000";
var gameStarted = false;
var time =15; 

const socket = io(`https://kraldragon-server.herokuapp.com/`)


socket.on("draw-canvas",(data) => {
    draw(data.x,data.y,data.x2,data.y2);
    color = data.color;
})

socket.on("change-turn",(data) => {
    isYourTurn = data.isYourTurn;
})

socket.on("game-started",() => {
    startScreen.classList.add("hidden");
    gameStarted = true;
    timer();
    console.log("time started");
})

// socket.on("time",(data) => {
//     console.log(data.time)
//     if(data.time == 0) changeTurn();
//     timeLeft.innerText = `time left :${data.time}`;
// })


    
    

function timer(){
    setInterval(() => {
    if(time <= 0){
        time = 15;
        changeTurn();
    }else{
        time--;
        timeLeft.innerText = `time left :${time}`;
    }
  },1000)
}


canvas.addEventListener("mousedown",(e)=>{
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;

})


canvas.addEventListener("mouseup",()=>{
    isPressed = false;

    x = undefined;
    y = undefined;    
})

canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);



canvas.addEventListener("mousemove",(e)=>{
    if(isYourTurn){
        if(isPressed && (x !=undefined || y != undefined)){
            const x2 = e.offsetX;
            const y2 = e.offsetY;
            
            draw(x,y,x2,y2);
            x = x2;
            y = y2;
        }
        
    }
})




function draw(x,y,x2,y2){
    
        drawCircle(x2, y2);
        drawLine(x, y,x2, y2)

        if(isYourTurn){
            var data ={
                "x":x,
                "y":y,
                "x2":x2,
                "y2":y2,
                "color":color,
            }
            socket.emit("mouse-move",data)
        }

        x = x2;
        y = y2;

    }

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0,2*Math.PI)
    ctx.fillStyle = color;
    ctx.fill();
}


function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth =size*2
    ctx.stroke();
}

function changeTurn(){
    isYourTurn = !isYourTurn;
    socket.emit("change-turn",{"isYourTurn":!isYourTurn})
}



sizeUpBtn.addEventListener("click", ()=>{
    size++;
    if (size > 100) {
        size = 100;
    }
    const sizeText = size.toString().padStart(2,"0");
    sizeSpan.innerText = `${sizeText}`
})

sizeDownBtn.addEventListener("click", ()=>{
    size--;
    if (size < 2) {
        size = 2;
    }
    const sizeText = size.toString().padStart(2,"0");
    sizeSpan.innerText = `${sizeText}`
})


colorBtn.addEventListener("change",(e)=>{
    color = e.target.value;

})

clearBtn.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

})

drawBtn.addEventListener("click",() => {
    //changeTurn();
})

startBtn.addEventListener("click",() => {
    startScreen.classList.add("hidden");
    changeTurn(); 
    socket.emit("game-started")
    gameStarted = true;
    timer();
})






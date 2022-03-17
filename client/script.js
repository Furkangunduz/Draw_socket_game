import {io} from "socket.io-client";
const socket = io("http://localhost:3000")


const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");

// const canvas2 = document.getElementById("canvas2");
// const ctx2    = canvas2.getContext("2d");

const sizeUpBtn   = document.getElementById("size-up");
const sizeSpan    = document.getElementById("size");
const sizeDownBtn = document.getElementById("size-down");
const colorBtn    = document.getElementById("color");
const clearBtn    = document.getElementById("clear")
const saveBtn     = document.getElementById("save");
const loadBtn     = document.getElementById("load");


var size = 5;
var x ;
var y ;
var isPressed = false;
var color = "#000";
var SavedImg ;

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


canvas.addEventListener("mousemove",(e)=>{
    if(isPressed && (x !=undefined || y != undefined)){
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y,x2, y2)

        x = x2;
        y = y2;
        // ctx2.drawImage(canvas,0,0);
    }
})


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
    if (size < 5) {
        size = 5;
    }
    const sizeText = size.toString().padStart(2,"0");
    sizeSpan.innerText = `${sizeText}`
})


colorBtn.addEventListener("change",(e)=>{
    color = e.target.value;

})

clearBtn.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx2.clearRect(0, 0, canvas.width, canvas.height);

})

// saveBtn.addEventListener("click",() => {
    
// })

// loadBtn.addEventListener("click",()=>{
//     ctx2.clearRect(0, 0, canvas.width, canvas.height);
//     ctx2.drawImage(canvas,0,0);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// })
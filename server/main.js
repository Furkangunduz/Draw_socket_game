const io = require("socket.io")(3000,{
  cors:{
    origin:["http://localhost:8080"],
  },
});


io.on("connection", (socket) => {
  console.log(`new user : ${socket.id}`)

  socket.on("mouse-move",(data) => {
    socket.broadcast.emit("draw-canvas",data)
  })
  socket.on("change-turn",(data) => {
    socket.broadcast.emit("change-turn",data)
  })
  socket.on("game-started",() => {
    socket.broadcast.emit("game-started")
    timer();
  })
});

var time =3; 

function timer(){
  setInterval(() => {
    io.emit("time",{"time":time});
    if(time == 0) time =3;
    time--;
  },1250)
}



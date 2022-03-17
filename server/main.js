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


});






// socket.on("send-message",(message,room) => {
//   if(room=="")  
//     socket.broadcast.emit("receive-message",message);
//   else{
//     socket.to(room).emit("receive-message",message);
//   }
// })
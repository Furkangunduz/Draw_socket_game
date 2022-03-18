const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000
const server = app.listen(PORT)
const io = require("socket.io")(server,{ 
    cors: {    
      origin: "*",    
      methods: ["GET", "POST"]  
    }
  });

app.get("/",(req,res) => {
  res.send("hello")
})



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
  })
});



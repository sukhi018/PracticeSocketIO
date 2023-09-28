const {Server} = require('socket.io')
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST","PATCH"]
}})

io.on('connection',(socket)=>{
    console.log('User Connected',socket.id)

    socket.on('join_room',(data)=>{
        socket.join(data.room)
        io.to(data.room).emit('joined_room',data)

        console.log('joined room',data)
    })
    socket.on('message',(data)=>{
        console.log(data)
        socket.to(data.room).emit('recieve_message',data)
    })

})

server.listen(3001,()=>{
    console.log('It is listening to reqs')
})
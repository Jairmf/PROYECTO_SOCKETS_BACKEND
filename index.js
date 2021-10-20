'use strict'

const app = require('express')()
const serverHttp = require('http').Server(app)
const io = require('socket.io')(serverHttp, {
    cors: {
        origin: "http://localhost:4200",
        credentials: true,
        methods: ["GET", "POST"],
        allowEIO3: true // false by default
    }
})

const myMessages = []

io.on('connection', function(socket){
    console.log(socket.id)
    // console.log(myMessages)
    socket.on('send-message', function(data){
        console.log("data")
        console.log(data)
        myMessages.push(data)
        socket.emit('text-event', myMessages)
        socket.broadcast.emit('text-event', myMessages)
    })
})

serverHttp.listen(3000, () => {
    console.log('listening on port ', 3000)
})

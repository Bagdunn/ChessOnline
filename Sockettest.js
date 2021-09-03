const { RSA_PKCS1_OAEP_PADDING } = require('constants');
const express = require('express');
const { link } = require('fs');
const { connect } = require('net');
const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server)

server.listen(3000, () => {
    console.log(" Server running ");
});


app.use('/gaame.js', express.static(__dirname + '/gaame.js'));

app.use('/style.css', express.static(__dirname + '/style.css'));
 
app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');
});

linkk = "test";

app.get('*', function(request, respons){
    respons.sendFile(__dirname + '/test.html');
});

var P1,P2;
connections = [];
freeRooms = {
    Isfree : false,
    idofFree : ""
}

var white=0;

io.on('connection', (socket) => {

    console.log(socket.id + " connected");
    if (white == 0){
        socket.color = "white";
        white = 1;
    }
    else if (white == 1){
        socket.color = "black";
        white = 0;
    }

    socket.on('disconnect', (data)=>{
        connections.splice(connections.indexOf(socket),1);
    });

    socket.on('join room', () => {
        if (freeRooms.Isfree){
        socket.room = (freeRooms.idofFree);
        socket.join(freeRooms.idofFree);
        
        linkk = socket.id;

        io.to(socket.room).emit('new page', linkk);

        freeRooms.Isfree = false;
        }
        else {
        freeRooms.Isfree = true;
        freeRooms.idofFree = (socket.id);
        socket.room = socket.id;
        socket.join(socket.id);
        }
        
    });

    socket.on('come', (linq) => {
        socket.join(linq);
        socket.room=linq;
    });

    socket.on('setColor', () => {
        io.to(socket.id).emit('getColor', socket.color);
    });

    socket.on('game_over', () =>{
        io.to(socket.room).emit('over', )
    });

    socket.on('turn', (Tcolor, tablee) => {
        io.to(socket.room).emit('turned', Tcolor, tablee);
    });


});
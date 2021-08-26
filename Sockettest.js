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


app.use('/game.js', express.static(__dirname + '/game.js'));

app.use('/style.css', express.static(__dirname + '/style.css'));
 
app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');
});

linkk = "test";

app.get('*', function(request, respons){
    respons.sendFile(__dirname + '/test.html');
});

users = [];
connections = [];
freeRooms = {
    Isfree : false,
    NameofFree : "", 
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
    console.log("color is " + socket.color);

    socket.on('disconnect', (data)=>{
        connections.splice(connections.indexOf(socket),1);
        console.log("bye");
    });

    socket.on('join room', (Name) => {
        if (freeRooms.Isfree){
        socket.room = (freeRooms.idofFree);
        socket.join(freeRooms.idofFree);
        console.log(Name + " joined to " + socket.room + " sroom");
        
        linkk = socket.id + "ua";

        io.to(socket.room).emit('new page', linkk);

        freeRooms.Isfree = false;
        freeRooms.NameofFree = ("");
        }
        else {
        freeRooms.Isfree = true;
        freeRooms.NameofFree = (Name);
        freeRooms.idofFree = (socket.id);
        socket.room = socket.id;
        socket.join(socket.id);
        console.log(Name + " joined to  " + socket.room +" sroom");
        }
        
    });

    socket.on('come', (linq) => {
        socket.join(linq);
        socket.room=linq;
        console.log(linq);
    });

    socket.on('count', (x) => {
        io.to(socket.room).emit('counte', x);
        console.log(socket.room);
    });
    socket.on('setColor', () => {
        io.to(socket.id).emit('getColor', socket.color);
    });

    socket.on('turn', (tablee) => {
        io.to(socket.room).emit('turned', tablee);
        //console.log(tablee);
    });

    socket.on('disconnect', (data)=>{
        connections.splice(connections.indexOf(socket),1);
        console.log("bye");
    });

});
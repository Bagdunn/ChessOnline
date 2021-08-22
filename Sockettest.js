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
var P1=0,P2=0;

io.on('connection', (socket) => {
    console.log(socket.id + " connected");

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

    socket.on('con', (id) =>{
        if (P1 == 0 && id != null){
        P1 = id;
        socket.join(P1);
        socket.room = P1;
        console.log(P1 + " connect");
        }
        else if (P2 == 0 && id != null){
        P2 = id;
        socket.join(P1);
        socket.room = P1;
        console.log(P2 + " connect");
        P1 =0; P2=0;
        }
    })

    socket.on('disconnect', (data)=>{
        connections.splice(connections.indexOf(socket),1);
        console.log("bye");
    });

});
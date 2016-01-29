var express = require('express');

 var app = express();
 var http = require('http').Server(app);



var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var mongojs = require('mongojs');

var db = mongojs('chatCircle',['registration','messages']);
var user;

app.use(express.static(__dirname + '/public/www'));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/www/templates/login.html');
});

app.post('/register', function(req,res){
    user = req.body;
    db.registration.insert(req.body, function(err,docs){
        res.json(docs);
    });
})

app.get('/contacts',function(req,res){

    db.registration.find(function(err,docs){
        res.json(docs);
    })
});


    io.sockets.on('connection', function (socket) {
        socket.on('welcome', function (data) {
            console.log(data);
        })

       socket.on('chatmessage',function(data){
           socket.join(data.Room);
           console.log(data.Room);
           db.messages.insert(data);

           db.messages.find({"Room": data.Room},function(err,docs){
               console.log(docs);
               io.to(data.Room).emit('showmsg', docs);
           });

       })
        })



http.listen(3000, function(){
    console.log('listening on *:3000');
});


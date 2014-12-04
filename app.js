var http = require('http'),
	express = require('express'),
	app = express();

var server = http.Server(app);

// socket will listen to serverside!!!!
// sockets are eventlisteners/handlers for server side, so we need to say what server
var io = require('socket.io')(server);

////ROUTING///////////
app.get('/', function(request, response){
	// console.log(request);
	console.log(__dirname);
	directory = __dirname;
	// console.log(response);
	response.sendFile(directory +'/index.html');
	// response.end(JSON.stringify({name: "alex"}));
});


///////SOCKET IO///////////
// have to pass in socket to function
io.on('connection', function(socket){
	console.log('socket connected');

//name of the message, listen for stuff
	socket.on('message', function(m){
		console.log("message: " + m);
		// now send it back to the client side!!!!
		io.emit('chatroom', m);
	});
});

///////PORT////////////
server.listen(7000);

console.log("Server is running");
// var server = http.createServer(
// function(request, response){
//		response.end('my first server');
//	}
// );

// // server can be anything except 80 which is reserved for production
// server.listen(9090);

// console.log("Server is running!");
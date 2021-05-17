const WebSocket = require("ws");
const wsServer = new WebSocket.Server({ port: 8001 }, () => {
	console.log("server started");
});
wsServer.on("connection", function connection(websocket, request) {
	websocket.on("message", function message(data) {
		// console.log('--------------------websocket-------------------------------------------------------------',websocket);
		// console.log(
		// 	"--------------------request-----------------------------------------------------------------",
		// 	request.headers.origin,
		// 	request.socket.remoteAddress
		// );
		// console.log(data);
		// const msg = { event: "messages", data: data }
		wsServer.clients.forEach(function each(client) {
			//TODO if(connection != client){} что бы не отправлять самому себе 
			if (client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
		// websocket.send(data);
	});
	// websocket.on("message", (data) => {
	// 	// console.log('data received \n %o')
	// 	// socket.send('123');
	// });
});
wsServer.on("listening", () => {
	console.log("listening on 8001");
});

// const fs = require('fs');
// const http = require('http');
// const index = fs.readFileSync('./index.html','utf-8');
// // сделали инстанс сервера
// const server = http.createServer((req,res)=>{
//     res.writeHead(200);
//     res.end(index)
// });
// // повесили на 8000 порт
// server.listen(4444,()=>{console.log('server start')})

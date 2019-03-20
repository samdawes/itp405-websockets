let WebSocket = require('ws');

//web socket server
let wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     console.log('Received:', message);
//     //ws.send(message);
//     wss.clients.forEach((client) => {
//       client.send(message);
//     });
//   });
// });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

//

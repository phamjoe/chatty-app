// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');
const querystring = require('querystring');
const fetch = require('node-fetch');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let usersConnected = [];
const colours = ['red', 'green', 'blue', 'pink'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

getImageUrl = (entry) => {
  const imageExpression = /^.*(.jpg|.png|.gif)$/gi
  if (imageExpression.test(entry)) {
    let splitArray = entry.split(' ');
    if (splitArray.length > 1) {
      const url = splitArray.filter(value => imageExpression.test(value));
      return url;
    }
    //handles entry when only URL is passed
    return entry;
  }
  else {
    //if no URL is passed imageURL is blank
    return '';
  }
}

getContent = (entry) => {
  const imageExpression = /^.*(.jpg|.png|.gif)$/gi
  let splitArray = entry.split(' ');
  if (imageExpression.test(entry)) {

    if (splitArray.length > 1) {
      const msg = splitArray.filter(value => (!imageExpression.test(value)));
      return msg.join(' ');
    }
    else {
      return '';
    }
  }
  return entry;
}


wss.on('connection', (ws) => {
  console.log('Client connected');

  usersConnected.push(ws);
  const random = colours[Math.floor(Math.random() * colours.length)];
  let users = {
    type: "incomingUsers",
    numberOfUsers: usersConnected.length,
    colours: random
  }

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(users));
    }
  })

  ws.on('message', function (data) {
    let uid = JSON.parse(data);
    let matches = uid.content.match(/^\/giphy (.+)/)

    switch (uid.type) {
      case 'postMessage':
        uid.id = uuidv1();
        uid.type = "incomingMessage";
        uid.imageURL = getImageUrl(uid.content);
        uid.content = getContent(uid.content);
        uid.colours = random;
        break;

      case 'postNotification':
        uid.type = "incomingNotification";
        break;
    }

    if (matches) {
      const qs = querystring.stringify({
        api_key: "nD0C2J4V7IQlcurU11m1rRzwWGcw79FY",
        tag: matches[1]
      })
      fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
        .then(resp => resp.json())
        .then(json => {
          uid.content = `<div>
                               <img src="${json.data.images.original.url}" alt="${matches[1]}"/>
                               <div>${matches[0]}</div>
                            </div>`
          data = JSON.stringify(uid);
          wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(data);
            }

          });
        })

    } else {

      data = JSON.stringify(uid);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }

      });
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    usersConnected.pop();
    let users = {
      type: "incomingUsers",
      numberOfUsers: usersConnected.length
    }
    wss.clients.forEach(function each(client) {
      if (/*client !== ws && */client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(users));
      }
    })
  });
});


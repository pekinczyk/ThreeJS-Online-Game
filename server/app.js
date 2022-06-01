const { WebSocketServer } = require("ws");

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  const playerObject = initPlayerObject();
  ws.once("message", (data) => {
    console.log("first: %s", data);
    ws.on("message", (data) => {
      const event = JSON.parse(data.toString());
      console.log("received data:", event.type, event.key);

      handlePlayer(ws, playerObject, event);
    });
  });

  ws.send(JSON.stringify(playerObject));
});

const initPlayerObject = () => ({ x: 0, y: 0 });

const handlePlayer = (ws, playerObj, event) => {
  const returnObject = {};
  const { key } = event;
  if (key == "ArrowUp") {
    playerObj.y += 0.04;
    returnObject.y = playerObj.y;
  } else if (key == "ArrowDown") {
    playerObj.y -= 0.04;
    returnObject.y = playerObj.y;
  } else if (key == "ArrowLeft") {
    playerObj.x -= 0.04;
    returnObject.x = playerObj.x;
  } else if (key == "ArrowRight") {
    playerObj.x += 0.04;
    returnObject.x = playerObj.x + 0.04;
  }

  ws.send(JSON.stringify(returnObject));
};

console.log(`Server started on port ${PORT}...`);

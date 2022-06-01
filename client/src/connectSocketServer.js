export const connectToWebSocket = (url) =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const returnObject = {};
    let firstMessage = true;

    ws.onopen = () => {
      ws.send("NEW_USER");
    };
    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (firstMessage) {
        firstMessage = false;
        resolve({ socketClient: ws, returnObject });
      }

      Object.entries(message).forEach(([key, value]) => {
        console.log(key, value);
        returnObject[key] = value;
      });

      console.log(returnObject);
    };
    ws.onerror = (err) => {
      console.log("Socket Error", err);
      reject(new Error("WebSocket Client connection error!"));
    };
  });

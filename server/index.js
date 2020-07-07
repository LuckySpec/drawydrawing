var app = require("express")();
var http = require("http").createServer(app);
var cors = require("cors");
var io = require("socket.io")(http);

app.use(cors({ credentials: true }));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

http.listen(port, () => {
  console.log(`listening on ${port}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendImageData", (data) => {
    socket.broadcast.emit("update", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

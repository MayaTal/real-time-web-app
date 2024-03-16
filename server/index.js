const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http//localhost:3000",
  },
});

io.on("connection", (socket) => {});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
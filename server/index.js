const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const mentors = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("choose_codeBlock", (data) => {
    if (!mentors[data.title]) {
      mentors[data.title] = socket.id;
      socket.emit("mentor_status", true);
    } else {
      socket.emit("mentor_status", false);
    }
    socket.join(data);
    console.log(`User with ID: ${socket.id} choose: ${data}`);
  });

  socket.on("send_code", (data) => {
    socket.to(data.title).emit("receive_code", data.message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    Object.keys(mentors).forEach((key) => {
      if (mentors[key] === socket.id) {
        delete mentors[key];
      }
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

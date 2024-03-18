const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://web-coding-server-production.up.railway.app",
  },
});

const mentors = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("choose_codeBlock", (data) => {
    // Check if the mentor for the given code block title is not already assigned.
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
    console.log(`User with ID: ${socket.id} Disconnected`);
    Object.keys(mentors).forEach((key) => {
      if (mentors[key] === socket.id) {
        delete mentors[key];
      }
    });
  });
});
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log("SERVER RUNNING, port");
  console.log(port);
});

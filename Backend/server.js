const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",  // Allows requests from any frontend
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (msg) => {
        io.emit("message", msg); // Broadcasts message to all clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3001, () => {
    console.log("Server running on port 3001");
});

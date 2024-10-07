const express = require('express')
const app = express()
const http = require("http")

const socketio = require("socket.io")
const server = http.createServer(app)

const io = socketio(server)
const path = require('path');


app.set("view engine", "ejs") //setup ejs
app.use(express.static(path.join(__dirname, "public")));

//Create public so that we can use our static files like images, vanilla js, css.

io.on("connection", function (socket) {
    // Handle when a user sends their location
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle when a user disconnects
    socket.on("disconnect", function () {
        io.emit("User-disconnected", socket.id)
    });
});


app.get("/",function(req,res){
    res.render("index")
})

server.listen(3000)

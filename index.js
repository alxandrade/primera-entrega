const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { request } = require("http");
const cors = require("cors")
let path = require("path");
const http = require('http');
let Socket = require("./utils/sockets");

// Servidores
/* 1. HTTP SERVER */
const httpServer = http.createServer(app);

/* 2. Servidor WebSocket */
const socket = new Socket(httpServer);
socket.init();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./views"));

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let serverRoutes = require("./routes");
serverRoutes(app);
app.use(cors());

httpServer.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));

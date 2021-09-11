const express = require("express");
const mysql = require("mysql");
const http  = require("http");
const app = require("./app")
const port = 8080;





const server = http.createServer(app)

server.listen(port)
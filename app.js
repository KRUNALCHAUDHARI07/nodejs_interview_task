const express = require('express');
const app = express();
const mongoose = require("./config/db");
const userRouter = require("./router/router");
app.use(express.json());

app.use("/",userRouter)
app.listen(3000,() => console.log("server is running on 3000 port"));
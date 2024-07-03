require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
require("./db/db_connection");
const router = require("./Routes/router");

const port = 8001;

const app = express();
const cors = require('cors');
app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("server start")
// });


// middleware
app.use(express.json())
app.use(cors());

app.use(router);



app.listen(port,()=>{
    console.log("server starts at port no :" + port);
})
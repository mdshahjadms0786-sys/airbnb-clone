const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes-session");
const session = require("express-session");

app.use(session({secret: "mysupersecretstring", resave:false, saveUninitialized: true}));

app.get("/reqcoutn",(req, res)=>{
    res.send(`you sent a request x times`);
})

// app.get("/test", (req,res) =>{
//     res.send("test successful!");
// });

app.listen(3000,() =>{
    console.log("server is listening to 3000")
})
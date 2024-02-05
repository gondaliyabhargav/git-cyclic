const express = require("express");
const userRouter = require("./routes/user.routes.js");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use("/users",userRouter);

app.get("/",(req,res) =>{
    res.send("Hii");
})

//MongoDB Database connect
mongoose.connect("mongodb://localhost:27017/git_cyclic")
.then(()=>{
    app.listen(5000, ()=>{
        console.log("Server is running on port : 5000");
    });
})
.catch((error)=>{
    console.log("Failed to connect database", error);
})
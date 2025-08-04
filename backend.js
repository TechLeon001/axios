const express = require("express");

const app = express();

app.post("/api/users",async(req,res)=>{
    const user = await User.create(req.body);
    res.json(user);
})
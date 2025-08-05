const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/users",async(req,res)=>{
    const user = await User.create(req.body);
    res.json(user);
})
const { response } = require("express");
const jwt = require("jsonwebtoken");
const express = express("express");
const bcrypt = require("bcrypt");



const app = express();
app.post("/api/users/signup",async(req,res)=>{
    const {email,password} = req.body;

    const hash = await bcrypt.hash(password,10);
    const user = await User.create({email,password:hash});
    const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({token});
});

app.post("/api/Users/Login",async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user)return res.status(404).send("User not found")
        const isMatch = await bcrypt .compare(req.body.password,user.password);
    if(!isMatch) return res.status(401).send("invalid password");
const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({token});
});

// protecting routes using jwt middleware

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split("")[1];
    if(!token) return res.status(401).send("Token Required");
    
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error){
        res.status(403).send("invalid token")

    }
 }

 app.get("/api/profile",auth,(req,res)=>{
    res.send(`welcome user ${req.user.id}`)
 })
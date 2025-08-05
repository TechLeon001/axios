






// authorization middleware

const authorize = (roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.roles)){
            return res.status(403).send("Access Denied");

        }
        next();
    };

};

app.get("/api/admin-only",authorize,authorize(["admin"]),(res,send)=>{
    res.send("hello admin")
})
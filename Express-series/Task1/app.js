const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log("middleware checking....")
    next();
})

app.get("/welcome/:username" , (req , res) => {
    const name = req.params.username
    const role = req.query.role
    
    res.send(`Welcome ${name}, your role is ${role}`)
})

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});


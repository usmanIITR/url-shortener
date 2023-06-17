const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const app = express()

mongoose.connect("mongodb://localhost/urlShortener" , {
    useNewUrlParser: true , useUnifiedTopology: true,
});

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : false}));

app.get("/" , async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render("index" , {shortUrls : shortUrls});
});
app.get("/login" , async (req, res) => {
    res.render("login");
});
app.get("/signup" , async (req, res) => {
    res.render("signup");
});

app.post("/login" , async (req,res) =>{
    const user = await User.findOne({email : req.body.email});
    if(user == null) {
        return res.status(404).send("User Not Found");
    }
    try{
        if(await bcrypt.compare(req.body.password , user.password)){
            res.redirect('/');
        }
        else{
            res.send("Wrong Password");
        }
    }
    catch{
        res.status(500).send();
    }
})
app.post("/signup" , async (req,res) =>{
    // const user = 
    try{
        const hashedPassword = await bcrypt.hash(req.body.password , 10);
        const user = User.create({
            name: req.body.name , 
            email: req.body.email,
            password: hashedPassword,
            urls:[],
        });
        res.redirect("/");
    }
    catch{
        res.status(500).send()
    }
    
    // res.redirect('/');
})
app.get("/users" ,async (req, res)=>{
    const users = await User.find();
    res.json(users);
})
app.post("/shortUrls" , async (req,res) =>{
    await ShortUrl.create({full : req.body.fullUrl});
    res.redirect('/');
})
app.get("/:shortUrl" , async (req, res) =>{
    const shortUrl  = await ShortUrl.findOne({short : req.params.shortUrl});
    if(shortUrl == null) return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})
app.listen(process.env.PORT || 5000)

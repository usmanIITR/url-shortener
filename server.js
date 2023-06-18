require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const app = express();
mongoose.connect("mongodb://localhost/urlShortener" , {
    useNewUrlParser: true , useUnifiedTopology: true,
});

app.set("view engine" , "ejs");

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.get("/" ,authenticateToken, async (req, res) => {
    console.log("Authenticated!!!");
    try{
        const user = req.user;
        if(user == null) {
            return res.status(404).send("User Not Found");
        }
        const shortUrls = await ShortUrl.find({userId: user.userId});
        res.render("index" , {shortUrls : shortUrls});
    }
    catch(error){
        console.log("error while going to home page");
        console.log(error);
    }
});

app.get("/login", async (req, res) => {
    res.render("login");
});


app.get("/signup", async (req, res) => {
    res.render("signup");
});

app.post("/login" ,async (req,res) =>{
    const user = await User.findOne({email: req.body.email});
    if(user == null) {
        return res.status(404).send("User Not Found");
    }
    try{
        if(await bcrypt.compare(req.body.password , user.password)){
            const userObject = user.toObject();
            const accessToken = jwt.sign(userObject , process.env.ACCESS_TOKEN_SECRET);
            res.status(201).json({user : user, accessToken : accessToken});
            res.redirect('/');
        }
        else{
            res.status(400).json({message: "Invalid Credentials"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "something went wrong!"});
    }
})
function authenticateToken(req, res, next){
    console.log("HTTP Request -> " + req.method + " Url -> " + req.url);
    try{
        const accessToken = req.query.accessToken;
        console.log("In AuthMiddleware");
        console.log(accessToken);
        if(accessToken){
            const user = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
            console.log(user);
            req.user = user;
            next();
        }
        else{
            console.log("hererere");
            res.status(500).json({message: "Something went wrong"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

app.post("/signup" , async (req,res) =>{
    try{
        // console.log(req);
        // req.body.name = req.body.name.toString();
        // req.body.email = req.body.email.toString();
        // req.body.password = req.body.password.toString();
        // console.log("In SIGNUP");
        // console.log(req);
        // console.log(req.body.name , req.body.email , req.body.password);
        const alreadyExist = await User.findOne({email : req.body.email});
        if(alreadyExist) {
            return res.status(400).json({message : "Email Already Exists"});
        }
        const hashedPassword = await bcrypt.hash(req.body.password , 10);
        const user = await User.create({
            userId: uuidv4(),
            name: req.body.name , 
            email: req.body.email,
            password: hashedPassword,
            urls:[],
        });
        const userObject = user.toObject();
        const accessToken = jwt.sign(userObject , process.env.ACCESS_TOKEN_SECRET);
        console.log("In SignUp -> AccesToken is -> " + accessToken);
        if(accessToken){
            let url = "/?accessToken=";
            url = url + accessToken;
            return res.redirect(url);
        }
        else return res.status(500).json({message : "something went wrong!"});
    }
    catch (error){
        console.log(error);
        return res.status(500).json({message : "something went wrong!"});
    }
})

app.get("/users" ,async (req, res)=>{
    const users = await User.find();
    res.json(users);
}) // just to debug. xx

app.post("/shortUrls" , async (req,res) =>{
    try{
        const userId = (req.session.user).userId;
        // console.log(userId);
        const xx = await ShortUrl.create({userId : userId, full : req.body.fullUrl});
        // console.log(xx);
        res.redirect('/');
    }
    catch{
        res.send("Something went wrong!");
    }
})

app.get("/:shortUrl" , async (req, res) =>{
    // const userId = (req.session.user).userId;
    // const userId = req.user.userId;
    // const shortUrl  = await ShortUrl.findOne({userId: userId, short : req.params.shortUrl});
    const shortUrl  = await ShortUrl.findOne({short : req.params.shortUrl});
    // console.log(shortUrl);
    if(shortUrl == null) return res.sendStatus(404);
    shortUrl.clicks++;
    await shortUrl.save();
    // console.log(shortUrl.full);
    res.redirect(shortUrl.full);
})

app.listen(process.env.PORT)

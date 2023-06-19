require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const app = express();
let url =  "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@url-shortener-database.ghkjkus.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url , {
    useNewUrlParser: true , useUnifiedTopology: true,
});

app.set("view engine" , "ejs");

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());

app.get("/" , async (req, res) => {
    try{
        const accessToken = req.cookies.token;
        if(accessToken){
            const user = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
            if(user == null) {
                return res.status(404).send("User Not Found");
            }
            const shortUrls = await ShortUrl.find({userId: user.userId});
            const searchUrls = await User.findOne({ userId: user.userId }).populate('searchUrls');
            console.log("THE SEARCHURLS ARE BELOW");
            console.log(searchUrls.searchUrls);
            console.log("THE SEARCHURLS ARE ABOVE");
            res.render("index" , {shortUrls : shortUrls , searchUrls: searchUrls.searchUrls});
        }
        else{
            res.clearCookie("token");
            res.status(500).json({message: "Something went wrong"});
        }
    }
    catch(error){
        console.log(error);
        res.clearCookie("token");
        res.status(500).json({message: "Something went wrong"});
    }
});

app.get("/login", async (req, res) => {
    res.render("login");
});

app.get("/logout", async (req, res) => {
    res.clearCookie("token");
    console.log("Cookie Cleared -> Session Ends");
    res.redirect("/login");
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
            const accessToken = jwt.sign(userObject , process.env.ACCESS_TOKEN_SECRET, {expiresIn : "1h"});
            res.cookie("token", accessToken);
            res.redirect("/");
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

app.post("/signup" , async (req,res) =>{
    try{
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
            searchUrls:[],
        });
        const userObject = user.toObject();
        const accessToken = jwt.sign(userObject , process.env.ACCESS_TOKEN_SECRET, {expiresIn : "1h"});
        res.cookie("token", accessToken);
        console.log("In SignUp -> AccesToken is -> " + accessToken);
        if(accessToken){
            return res.redirect("/");
        }
        else return res.status(500).json({message : "something went wrong!"});
    }
    catch (error){
        console.log(error);
        return res.status(500).json({message : "something went wrong!"});
    }
})


app.post("/search" , async (req,res) =>{
    try{
        const accessToken = req.cookies.token;
        const user = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
        console.log(user);
        if(user == null) {
            res.clearCookie("token");
            return res.status(404).send("User Not Found");
        }
        const value = req.body.value;
        const regex = new RegExp(value, "i");
        const response = await ShortUrl.aggregate([
            {
                "$match": {
                  "$or": [
                    { "short": { "$regex": regex } },
                    { "full": { "$regex": regex } }
                  ]
                }
              }
        ]);
        const filtered = response.filter(obj => obj.userId == user.userId);
        const dbUser = await User.findOne({ userId: user.userId });
        dbUser.searchUrls = filtered;
        await dbUser.save();
        user.searchUrls = filtered;
        console.log(user);
        return res.redirect('/');
    }
    catch(error){
        res.clearCookie("token");
        console.log("ERROR in /SEARCH");
        console.log(error);
        return res.sendStatus(401);
    }
});

app.post("/shortUrls" , async (req,res) =>{
    try{
        const accessToken = req.cookies.token;
        if(accessToken){
            const user = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
            // console.log(user);
            if(user == null) {
                return res.status(404).send("User Not Found");
            }
            await ShortUrl.create({userId : user.userId, full : req.body.fullUrl});
            res.redirect('/');
        }
        else{
            res.clearCookie("token");
            res.status(500).json({message: "Something went wrong"});
        }
    }
    catch{
        res.send("Something went wrong!");
    }
})

app.get("/:shortUrl" , async (req, res) =>{
    const shortUrl  = await ShortUrl.findOne({short : req.params.shortUrl});
    if(shortUrl == null) return res.sendStatus(404);
    shortUrl.clicks++;
    await shortUrl.save();
    res.redirect(shortUrl.full);
})

app.listen(process.env.PORT)

//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose =require("passport-local-mongoose");


//const md5 = require("md5");
//const bcrypt = require("bcrypt");
//const saltRounds = 10;



const app = express();
app.use(express.static("public"));
app.set("view engine" , "ejs" );
mongoose.connect("mongodb://localhost:27017/userDB");

app.use(session({
    secret: "our little" , resave : false , saveUninitialized : false  }));
app.use(passport.initialize());
app.use(passport.session);
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function( req , res) {

    res.render("home");

});
app.get("/login" , function( req , res) {

    res.render("login");

});
app.get("/register" , function( req , res) {

    res.render("register");

});


const userScheme = new mongoose.Schema ({
    email: String , password : String
});

userScheme.plugin(passportLocalMongoose);


///userScheme.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ["password"]});


const user = new mongoose.model("User" , userScheme);
passport.use(user.createStrategy);
passport.serializeUser(user.serializeUser);
passport.deserializeUser(user.deserializeUser);

app.post("/register" , function ( req , res){

    
    
});

app.post("/login" , function (req, res) {

     
    
 




    
});





app.listen(3000 , function () {
    console.log("server is started");
    
});
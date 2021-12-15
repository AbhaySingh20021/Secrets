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
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate')


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
app.use(passport.session());
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

app.get("/auth/google/secrets" , passport.authenticate('google', { failureRedirect: '/login' }) , function (req , res) {
    res.render("secrets");
  });

app.get('/auth/google',
  passport.authenticate("google", { scope: ["profile"] }));


const userScheme = new mongoose.Schema ({
    email: String , password : String , googleId:String
});

userScheme.plugin(passportLocalMongoose);
userScheme.plugin(findOrCreate);


///userScheme.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ["password"]});


const user = new mongoose.model("User" , userScheme);
passport.use(user.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.post("/register" , function ( req , res){

    
    
});

app.post("/login" , function (req, res) {

     
    
 




    
});





app.listen(3000 , function () {
    console.log("server is started");
    
});
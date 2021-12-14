//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var encrypt = require('mongoose-encryption');
const md5 = require("md5");



const app = express();
app.use(express.static("public"));
app.set("view engine" , "ejs" );
mongoose.connect("mongodb://localhost:27017/userDB");
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

console.log( process.env.SECRET);


userScheme.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ["password"]});


const user = new mongoose.model("User" , userScheme);

app.post("/register" , function ( req , res){
    const newUser = new user ({
        email: req.body.username , password: req.body.password
    });

    newUser.save( function (err) {
        if(err){
            console.log(err);
        }
        else {
            res.render("secrets");
        }
        
    } );
    
    
});

app.post("/login" , function (req, res) {
 const   email= req.body.username; 
 const password = req.body.password;

 user.findOne({email : email} , function (err , result) {
     if(err){
         console.log(err);
     }
         else {
             if(result){
                 if(result.password === password){
                     res.render("secrets");
                     console.log("user found");
                 }
                 else {
                     alert("No user found");
                 }
             }
         }
     
     
 });




    
});





app.listen(3000 , function () {
    console.log("server is started");
    
});
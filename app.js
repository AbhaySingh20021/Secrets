//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var encrypt = require('mongoose-encryption');
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;



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


///userScheme.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ["password"]});


const user = new mongoose.model("User" , userScheme);

app.post("/register" , function ( req , res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new user ({
            email: req.body.username , password: hash
        });
        newUser.save( function (err) {
            if(err){
                console.log(err);
            }
            else {
                res.render("secrets");
            }
            
        } );
        // Store hash in your password DB.
    });

    
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
                bcrypt.compare(password, result.password, function(err, result1) {
                    console.log(result1);

                    if(result1 == true ){
                        res.render("secrets");
                        console.log("user found");
                    }
                    

                   
                    // result == true
                });
                     
                
             }
             else
             alert("No user found");
            
         }
     
     
 });




    
});





app.listen(3000 , function () {
    console.log("server is started");
    
});
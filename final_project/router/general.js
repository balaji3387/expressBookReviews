const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let {username,password}=req.body;
  let user=users.find((name)=>name.username===username);
  if(username===""|| password===""){
    res.status(200).json({message:"username and password not provided"});
  }
  else{
    if(user){
      res.status(200).json({message:"Already username exists"})
  
    }
    else{
      users.push({username,password});
      res.status(200).json({ message: "Customer Successfully registered, Now you can login" });
  }
  }
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve()
    },1000)})
  
    myPromise.then(() => {
      res.send(JSON.stringify({books},null, 4));
    })
   
});




// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
   let {isbn}=req.params;
   for (const [key, value] of Object.entries(books)) {
    if( key==isbn){
      let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        },2000)})
      
        myPromise.then(() => {
          res.send(value);
        })
    }
   }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let {author}=req.params;
  for (const [key, booksbyAuthor] of Object.entries(books)) {
    if( booksbyAuthor.author== author){
      let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        },2000)})
      
        myPromise.then(() => {
          res.send(JSON.stringify({booksbyAuthor},null, 4));
        })
    }
   }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let {title}=req.params;
  for (const [key, booksbytitle] of Object.entries(books)) {
    if( booksbytitle.title== title){
      let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        },2000)})
      
        myPromise.then(() => {
          res.send(JSON.stringify({booksbytitle},null, 4));
        })
    }
   }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let {isbn}=req.params;
  for (const [key, value] of Object.entries(books)) {
    if(key==isbn){
      res.send(value.reviews);
    }
   }
});

module.exports.general = public_users;
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {
    username:"balaji",
    password:"123"
  }
];

const isValid = (username)=>{ 
  let u=users.find((e)=>e.username===username);
  return u;
}

const authenticatedUser = (username,password)=>{ //returns boolean

  let u=users.find((e)=>e.username===username && e.password ===password);
  return u;
}

//only registered users can login
regd_users.post("/login", (req,res) => {

    const user = req.body;
    let ball= user.username;
    let a=authenticatedUser(user.username,user.password);
    if(a){
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });
    // Store access token in session
    req.session.authorization = {
        accessToken
    };

    req.session.username= {
      ball
  };
    return res.status(200).send("Customer successfully logged in");
  }
  else{
    return res.status(404).send("Invalid credientials");
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let {isbn}=req.params;
  let {review}=req.query;
  let c=req.session.username['ball'];
  for (const [key, value] of Object.entries(books)) {
    if( key==isbn){
      for (const [ke, valu] of Object.entries(value.reviews)) {
        if(ke!=""){
        if( ke==c){
          value.reviews[c]=review;
        }
        else{
          value.reviews[c]=review;
        }
       }
      }
      value.reviews[c]=review;
      
      return res.status(200).send(`The review for the book with ISBN ${isbn} has been added/updated`);
    }
   }

});

 //delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  let {isbn}=req.params;
  let c=req.session.username['ball'];
  for (const [key, value] of Object.entries(books)) {
    if( key==isbn){
      for (const [ke, valu] of Object.entries(value.reviews)) {
        if(ke==""){}
        else{
        if( ke==c){
          delete value.reviews[ke];
          return res.status(200).send(`The review for the  ISBN ${isbn} posted by the user test deleted`);
        }
        else{
          return res.status(200).send("no reviews posted by you to delete")
        }
      }
     
      }
   }}

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
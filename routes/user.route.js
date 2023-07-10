const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{

  try {
      const { name,
          email,
          password,
          address
          }=req.body 
          const check_user= await userModel.findOne({email})
          if(check_user)
          {
              res.status(400).send("user is already presend please directly login")
          }
      bcrypt.hash(password,4, async(err,hash)=>{
          const user= new userModel({name, email, password:hash, address})
          await user.save()
      })
      res.status(201).send("Registration successful")
  } catch (err) {
      res.status(400).send("Registration failed please try again!!")
  }
})



 


userRouter.post("/login", async(req,res)=>{
try {
  const {email, password}= req.body
  const check_user= await userModel.findOne({email})
  if(!check_user)
  {
      res.status(400).send("user is not present please regiter first!!")
  }
  bcrypt.compare(password, check_user.password, function(err,result){
      if(result)
      {
         const gen_token= jwt.sign({userID: check_user. _id}, "manshi", {expiresIn:"2hr"}) 
         res.status(201).send({msg:"Login successful", token: gen_token, user: check_user})
      }
  })
} catch (err) {
  res.status(400).send("Login failed please try again!!")
}
})





userRouter.patch("/user/:id/reset", async(req, res)=>{
try {
  const {id}= req.params
  const {currpass, newpass} = req.body
  const user= await userModel.findOne({_id: id})
  bcrypt.compare(currpass, user.password, async function(err, result){
      if(result)
      {
          const hash= bcrypt.hashSync(newpass, 4)
          const updatepass= await userModel.findByIdAndUpdate({_id:id},{password:hash})
          res.status(204).send("password updated successfully")
      }
      else
      {
          res.status(400).send("password has not updated, please try again!!")
      }
  })
} catch (err) {
  res.status(400).send("ERROR OCCURED")
}
})

module.exports = {
  userRouter,
};

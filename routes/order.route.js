const express = require("express");

const { orderModel } = require("../model/order.model");
//bujik
const orderRouter = express.Router();
orderRouter.post("/orders", async(req,res)=>{
  try {
      const {user, restaurant, items, totalprice, deliveryAddress}= req.body
      const order= new orderModel({user, restaurant, items, totalprice, deliveryAddress, status:"Placed"})
      await order.save()
      res.status(201).send("Your order has been placed successfully")
  } catch (err) {
      res.status(400).send("Order not placed please try again!!")
  }
})






orderRouter.get("/orders/:id", async(req,res)=>{
  const id= req.body
  const order= await orderModel.findOne({_id:id})
  if(order)
  {
      res.status(400).send("Order not present") 
  }
  res.status(200).send(order)
})





orderRouter.patch("/orders/:id", async(req, res)=>{
  const {status}= req.body
  const id= req.params.id
  const order= await orderModel.findOne({_id:id})
  order.status=status
  await order.save()
  res.status(204).send("status updated successfully")
})




module.exports = {
  orderRouter,
};

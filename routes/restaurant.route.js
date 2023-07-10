const express = require("express");
const { restaurantModel } = require("../model/restaurant.model");

const restRouter = express.Router();

restRouter.post("/restro", async(req,res)=>{
  const {name,address,menu} = req.body;
 
  const restro= new restaurantModel( {name,address,menu})
  await restro.save()
  res.send("Restaurant has been created")
})


//********************************************************************************* */


restRouter.get("/restaurants", async(req, res)=>{
  try {
      const restro= await restaurantModel.find()
      res.status(200).send(restro)
  } catch (err) {
      res.status(400).send("ERROR OCCURED")
  }
})


//********************************************************************************* */


restRouter.get("/restaurants/:id", async(req, res)=>{
  const {id}= req.params
  try {
      const restro = await restaurantModel.findById(id)
      if(!restro)
      {
          res.status(400).send("Restaurant not found")
      }
      res.status(200).send(restro)
  } catch (err) {
      res.status(400).send("ERROR OCCURED")
  }
})
// restaurantRoute.post("/restaurants",async(req,res)=>{
//   try {
//       const {name,address,menu} = req.body;
//       const restaurant = new RestaurantModel({name,address,menu});
//       await restaurant.save()
//       res.status(200).send({msg:"Restaurant Added Successfully.",restaurant});
//   } catch (error) {
//       res.status(400).send(error);
//   }
// })

// restaurantRoute.get("/restaurants",async(req,res)=>{
//   try {
//       const restaurant = await RestaurantModel.find();
//       res.status(200).send(restaurant);
//   } catch (error) {
//       res.status(400).send(error);
//   }
// });

// restaurantRoute.get("restaurants/:id",async(req,res)=>{
//   try {
//       const {id} = req.params;
//       const restaurant = await RestaurantModel.findById(id);
//       res.status(200).send(restaurant)
//   } catch (error) {
//       res.status(400).send(error);
//   }
// });

//******************************************************************************** */


restRouter.post("/restaurants/:id/menu", async(req,res)=>{
  const id = req.params.id
  const {name, description, price, image}= req.body
  const restro= await restaurantModel.findOne({_id:id})
  const newitem= {
      name,
      description,
      price,
      image
  }
  restro.menu.push(newitem)
  await restro.save()
  res.status(201).send("menu updated successfully")
})



//******************************************************************************* */

restRouter.delete("/restaurants/:id/menu/:mid", async(req, res)=>{
  const id= req.params.id
  const mid= req.params.mid
 try {
  const menu= await restaurantModel.findById(id)
  if(menu)
  {
      await restaurantModel.findByIdAndDelete(mid)
  }
  res.status(202).send("item deleted from menu successfully")
 } catch (err) {
  res.status(400).send("item not deleted")
 }
 
})




module.exports = {
  restRouter
};

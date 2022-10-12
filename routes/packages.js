const express = require("express");
const packageRouter = express.Router();
const Auth = require("../Auth/auth");
const Package = require("../models/packges");

// create new package

packageRouter.post("/packages", Auth, async (req, res) => {
  try {
    const package = await Package.create({ ownerId: req.user.id, ...req.body });
    res.status(201).send(package);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get package data
packageRouter.get("/packages", Auth, async (req, res) => {
  const packages = await Package.findAll({ where: { ownerId: req.user.id } });
  // console.log(packages)
  res.status(200).send(packages);
});

// update package

// packageRouter.patch("/packages/:id", Auth, async (req, res) => {
//   const keey = Object.keys(req.body);
//   const iid = req.params.id;
//   try {
//     const package = await Package.findOne({
//       where: { ownerId: req.user.id, IDs: iid },
//     });

// if(!package){ throw ('you are not authorized')}

//     // console.log(package);
//     keey.forEach((ele) => {
//       package[ele] = req.body[ele];
//     });

//     package.save();
//     res.send(package);
//   } catch (error) {
//     res.status(401).send(error)
//   }
// });

// remove package

// packageRouter.delete("/packages/:id", Auth, async (req, res) => {
//   const iid = req.params.id;

//   const package = await Package.findOne({
//     where: { ownerId: req.user.id, IDs: iid },
//   });
//   await package.destroy();
//   res.status(204).send();
// });

module.exports = packageRouter;

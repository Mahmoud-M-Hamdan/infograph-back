const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const Auth = require("../Auth/auth");

// create new user

router.post("/users", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = await User.create(req.body);
    await user.geneterateToken();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get user data
router.get("/users", Auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(401).send(error);
  }
});

// update user

router.patch("/users", Auth, async (req, res) => {
  const keey = Object.keys(req.body);

  try {
    keey.forEach((ele) => {
      req.user[ele] = req.body[ele];
    });
    if (req.user.changed("password")) {
      req.user.password = await bcrypt.hash(req.body.password, 8);
    }

    req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(401).send(error);
  }
});

// remove user

router.delete("/users", Auth, async (req, res) => {
  //   const iid = req.params.id;

  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    await user.destroy();
    res.send(user);
  } catch (error) {
    res.status(401).send(error);
  }
});

// login

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.verify(req.body.email, req.body.password);
    await user.geneterateToken();

    res.status(200).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
});

//logout

router.post("/users/logout", Auth, async (req, res) => {
  try {
    req.user.token = "";

    await req.user.save();
    res.send("logout sucsessfull");
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

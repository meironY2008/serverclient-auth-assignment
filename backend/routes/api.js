require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize/types");
const { User, Token } = require("../models");

let router = Router();

router.post("/login", async (req, res) => {
  const { email, password, ...restdeatils } = req.body;
  const ourUser = await User.findOne({ where: { email } });
  if (!ourUser) return res.status(403).send("email or password not match!");
  if (ourUser.password !== password)
    return res.status(403).send("email or password not match!");

  const user = { email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
  const newToken = await Token.create({ token: accessToken });
  if (!newToken) return res.status(400).send("login faild");
  return res.status(201).json({ ourUser, newToken });
});

router.post("/register", async (req, res) => {
  const { email, password, ...restdeatils } = req.body;
  const existUser = await User.findOne({ where: { email } });
  if (existUser) return res.status(403).send("already exist!");
  const newUser = await User.create({ email, password, ...restdeatils });
  if (!newUser) return res.status(400).send("register faild");

  const user = { email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
  const newToken = await Token.create({ token: accessToken });
  if (!newToken) return res.status(400).send("login faild");
  return res.status(201).json({ newUser, newToken });
});

router.delete("/logout", async (req, res) => {
  try {
    const deleteToken = await Token.destroy({ where: { token } });
    if (deleteToken) return res.status(204).send("delete token");
  } catch (err) {
    return res.status(400).send("delete faild");
  }
});

router.put("/update", authToken, async (req, res) => {
  try {
    const ourMail = req.user.email;
    const updateUser = await User.update({ where: { email: ourMail } });
    if (!updateUser) res.status(400).send("update faild!");
    return res.status(201).json(updateUser);
  } catch (err) {
    return res.status(400).send("update faild");
  }
});
const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

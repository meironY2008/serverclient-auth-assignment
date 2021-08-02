require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User, Token } = require("../models");

let router = Router();

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader ", authHeader, "body", req.body);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token ", token.access_token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "" + process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, "" + process.env.ACCESS_TOKEN, { expiresIn: "200m" });
};

router.post("/token", async (req, res) => {
  if (req.body.token == null) return res.sendStatus(401);
  const deleteToken = await Token.findOne({ where: { token: req.body.token } });
  if (!deleteToken) {
    return res.sendStatus(401);
  }
  jwt.verify(req.body.token, "" + process.env.REFRESF_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email });
    return res.json({ accessToken });
  });
});

router.post("/login", async (req, res) => {
  const { email, password, ...restdeatils } = req.body;
  const ourUser = await User.findOne({ where: { email } });
  console.log(ourUser);
  if (!ourUser) return res.status(403).send("email or password not match!");
  if (ourUser.password !== password)
    return res.status(403).send("email or password not match!");

  const user = { email };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, "" + process.env.REFRESF_TOKEN);
  const newToken = await Token.create({ token: refreshToken });
  if (!newToken) return res.status(400).send("login faild");
  return res
    .status(201)
    .json({ user: ourUser, accessToken, refresh_token: newToken });
});

router.post("/register", async (req, res) => {
  const { email, password, ...restdeatils } = req.body;
  const existUser = await User.findOne({ where: { email } });
  if (existUser) return res.status(403).send("already exist!");
  const newUser = await User.create({ email, password, ...restdeatils });
  if (!newUser) return res.status(400).send("register faild");

  const user = { email };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, "" + process.env.REFRESF_TOKEN);
  const newToken = await Token.create({ token: refreshToken });
  if (!newToken) return res.status(400).send("login faild");
  return res
    .status(201)
    .json({ user: newUser, accessToken, refresh_token: newToken });
});

router.delete("/logout", async (req, res) => {
  try {
    const deleteToken = await Token.destroy({
      where: { token: req.body.token },
    });
    if (deleteToken) return res.status(204).send("delete token");
  } catch (err) {
    return res.status(400).send("delete faild");
  }
});

router.put("/update", authToken, async (req, res) => {
  try {
    const ourMail = req.user.email;
    console.log(ourMail);
    const updateUser = await User.update(req.body, {
      where: { email: ourMail },
    });
    if (!updateUser) res.status(400).send("update faild!");
    const userUpdated = await User.findOne({ where: { email: req.body.email } });
    console.log(userUpdated);
    return res.status(201).json( {user:userUpdated} );
  } catch (err) {
    return res.status(400).send("update faild");
  }
});

module.exports = router;

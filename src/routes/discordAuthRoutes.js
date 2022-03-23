const axios = require("axios");
const url = require("url");
const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config();

var token = "";
var userResquest;

router.get("/redirect", async (req, res) => {
    const { code } = req.query;
    const formData = new url.URLSearchParams({
      client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
      client_secret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
    });
    if (code) {
      try {
        const response = await axios.post(
          "https://discord.com/api/v8/oauth2/token", 
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        token = response.data.access_token;
        res.redirect("/");
      } catch (error) {
        console.error(error);
        res.sendStatus(400);
      }
    }
  
    // res.send(200);
  });

router.get("/user", async (req, res) => {
      try {
          const responseUser = await axios.get('https://discord.com/api/v8/users/@me', 
          {
            headers: {
                Authorization: `Bearer ${token}`,
              },
          })
            res.send(responseUser.data)
            userResquest = responseUser.data
      } catch (error) {
          console.log(error)
            res.sendStatus(400)
      }
})

router.get("/user/avatar", async (req, res) => {
    try {
        const {avatar, id} = userResquest;
        let userAvatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
        res.redirect(userAvatar);
    } catch (error) {
        console.log(error); 
        res.sendStatus(400);
    }
})

module.exports = {router, userResquest};
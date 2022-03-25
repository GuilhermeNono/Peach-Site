const axios = require("axios");
const url = require("url");
const express = require("express");
const router = express.Router();
const app = express();
const path = require("path");
const session = require("express-session");
require("dotenv").config();

var codeUser = "";
var tokenUser = "";
var userResquest;


router.get("/redirect", async (req, res) => {
  const { code } = req.query;
  codeUser = code;
  const formData = new url.URLSearchParams({
    client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
    client_secret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI + "/api/auth/discord/redirect",
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
      const responseUser = await axios.get(
        "https://discord.com/api/v8/users/@me",
        {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        }
      );
      req.session.token = response.data.access_token;
      req.session.user = responseUser.data;
      // session.userid = response.data.access_token
      // tokenUser = response.data.access_token;
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  }
});

router.get("/user/logout", async (req, res) => {
  try {
    const formData = new url.URLSearchParams({
      client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
      client_secret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
      token: tokenUser,
    });
    const response = await axios.post(
      "https://discord.com/api/oauth2/token/revoke",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.clearCookie("_token");
    res.clearCookie("_user_data");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.get("/user/avatar", async (req, res) => {
  try {
    const { avatar, id } = userResquest;
    let userAvatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
    res.redirect(userAvatar);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = { router, userResquest };

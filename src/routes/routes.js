const express = require("express");
const router = express.Router();
const discordAuthRouter = require("./discordAuthRoutes");


//Discord OAuth2 routes
router.use("/api/auth/discord",discordAuthRouter.router)

//

module.exports = router;    
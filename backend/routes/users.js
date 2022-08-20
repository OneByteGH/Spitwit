const express = require('express');
const router = express.Router();
const sql = require('../helper/sql');
const logger = require("../helper/logger");
const {auth, Client} = require("twitter-api-sdk-fork");
const config = require("../config.json");
const twt = config.twitter;

const authClient = new auth.OAuth2User({
  client_id: twt.clientId,
  client_secret: twt.clientSecret,
  callback: "http://localhost:6969/users/register",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

const twtClient = new Client(authClient);

/* GET users listing. */
router.get('/register', async (req, res) => {
  const code = req.query.code;

  if(!code) return res.json({ success: false, error: 'No code provided' });

  try {
    const { token } = await authClient.requestAccessToken(code);
    const oauthData = {
      accessToken: token.access_token,
      expiresAt: token.expires_at ? new Date(token.expires_at).getTime() : new Date(Date.now() + 7_200_000),
      refreshToken: token.refresh_token
    }

    const { data: user } = await twtClient.users.findMyUser();
    const results = await sql.addUser({
      userId: user.id,
      name: user.name,
      email: null,
      twitterHandle: user.username,
      oAuthToken: oauthData.accessToken,
      expiresAt: oauthData.expiresAt,
      refreshToken: oauthData.refreshToken,
      creationDate: new Date().getTime(),
      updatedAt: new Date().getTime(),
      isActive: true,
      inActiveDate: null
    });
    res.status(200).json({ success: true, message: "User created successfully." }).end();

  } catch(e) {
    logger.error(e);
    return res.status(500).json({ success: false, error: "Some error occurred." }).end();
  }
});

module.exports = router;

const express = require('express');
const { auth, Client } = require('twitter-api-sdk-fork');
const config = require('../config');
const router = express.Router();
const twt = config.twitter;

const authClient = new auth.OAuth2User({
  client_id: twt.clientId,
  client_secret: twt.clientSecret,
  callback: "http://localhost:6969/users/register",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

/* GET home page. */
router.get('/', async (req, res) => {
  const code = req.query.code;
  const client = new Client(authClient);
  const accessToken = await client.requestAccessToken(code);
  res.json({accessToken});
});

router.get('/authUrlGen', async (req, res) => {
  res.status(200).send(
    authClient.generateAuthURL({
      code_challenge_method: 'plain',
      code_challenge: 'twitter_link',
      state: 'twitter_link'
    }));
});

module.exports = router;

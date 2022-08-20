const DiscordLogger = require('discord-logger');
const config = require('../config');
const options = {
    endpoint: config.discordWebhookUrl,
    botUsername: 'Logger',
    infoPrefix: ':information_source:',
    successPrefix: ':white_check_mark:',
    errorPrefix: ':sos:'
}

const logger = new DiscordLogger(options);

const error = logger.error;
const info = logger.info;
const success = logger.success;

module.exports = { error, info, success };

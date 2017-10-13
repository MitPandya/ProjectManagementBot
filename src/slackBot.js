// Importing the 'botkit' library
var Botkit = require('botkit');
var controller = Botkit.slackbot({
  debug: false  
});

// Connect the Bot to a stream of messages
controller.spawn({
  token: process.env.PROMANTOKEN,
}).startRTM()

// Initialize the Bot and provide it something to listen and respond.

controller.hears('hello', 'direct_message', function(bot, message) 
{
bot.reply(message, 'Hello human.');
});

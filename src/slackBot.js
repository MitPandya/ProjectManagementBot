
var Botkit = require('botkit');


var controller = Botkit.slackbot({
  debug: false
  
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.PROMANTOKEN,
}).startRTM()

// give the bot something to listen for.

controller.hears('hello', 'direct_message', function(bot, message) 
{
bot.reply(message, 'Hello human.');
});
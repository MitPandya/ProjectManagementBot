// Use the following Slack Token : "xoxb-255805314709-WUuIiDe5rWUedZ28tYK5fqQq" 
// and set it as an Environment Variable with name : PROMANTOKEN in your respective OS

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

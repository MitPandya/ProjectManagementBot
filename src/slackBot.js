// Importing the 'botkit' library
var Botkit = require('botkit');
var dbHelper = require('./databaseHelper.js');
var botInteractions = require('./botInteractions.js')
var mock = require('./mock.js');

var controller = Botkit.slackbot({
  debug: false  
});

//fetch trello App key from db
dbHelper.setupTrelloAppKey(function(appkey){
  console.log("#KEY: "+appkey);
  if(typeof appkey != 'undefined'){
    global.APP_KEY = appkey;
    global.TRELLO_TOKEN_MAP = {}; // initialize the map

    console.log(process.env.MOCKON);
    // initialize mocking
    if(process.env.MOCKON=="true"){
      mock.startMock();
    }

    // connect the bot to a stream of messages
    controller.spawn({
      token: process.env.PROMANTOKEN,
    }).startRTM()
  }else{
    console.log("No Trello APP key. Please generate one before running this bot.")
  }
});

// Default Bot Invocation
controller.hears([/hey/i,/hi/i,/hey promanbot/i],['mention', 'direct_message'], function(bot,message) 
{
  //console.log("#SLACK USER ID: "+message.user);
  // check for user trello account link

  if(typeof global.TRELLO_TOKEN_MAP[message.user] != 'undefined'){
    // ALL Good
    startMainThread(bot,message);
  }else{
    // trello token either in DB or Trello Account not setup at all
    dbHelper.getTrelloToken(message.user,function(trelloToken){
      //console.log("#TRELLO TOKEN : "+trelloToken);
      if (typeof trelloToken != 'undefined'){
        // return to usual logic
          global.TRELLO_TOKEN_MAP[message.user] = trelloToken;
          startMainThread(bot,message);
      }else{
        // User hasn't setup OAUTH token for trello
        askForSetup(bot, message);
      }
    });
  }
});

function startMainThread(bot, message){
  bot.startConversation(message,function(err,convo) {
    convo.say('Good to see you.');
    convo.ask('How can I help you?', [
     // Please add the bot interaction code snippets here for your Use case
      {
        pattern: /Open a card/i,
        callback: botInteractions.handleOpenCard
      },
      {
        pattern: /Create weekly summary for completed and incompleted tasks/i,
        callback: botInteractions.getCardsForWeeklySUmmary
      },
      {
        pattern: /Send notification to members of card/i,
        callback: botInteractions.handleNotifyUser
      },
    ]);
    convo.next();
  });
}

function askForSetup(bot, message){
  bot.startConversation(message,function(err,convo) {
    convo.say('It seems like you haven\'t linked you trello account.');
    convo.ask('Do you want to setup now ?',[
      {
        pattern:bot.utterances.yes,
        callback: function(response,convo){
          console.log('Load up the web module');
          convo.say('Open this link: <http://trello.com|LINK ACCOUNT>');
          convo.next();
        }
      },
      {
        pattern: bot.utterances.no,
        callback: function(response,convo){
          console.log('Fall back to error message');
          convo.say('Ok, we can do it sometime later. I will have to leave since I can\'t access you trello.');
          convo.stop("ending");
        }
      }
    ]);
  });
}

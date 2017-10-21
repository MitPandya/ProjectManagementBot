//var restHelper = require('./restAPIHelper.js');

module.exports.handleOpenCard = function(response,convo){
  convo.ask('What is the card name?',[
    {
      pattern: '.*',
      callback:function(response,convo){
        
        cardName = response.text;
        //restHelper.openCard(response.user, cardName, convo, fetchCardHandler);
        convo.next();
      }
    }
  ])
  convo.next();
}

var fetchCardHandler=function(convo, cardName, cardList){
    var count = cardList.length;
    for(var i=0;i<count;i++){
        if(cardName == cardList[i].name){
          convo.say("Here is the card "+cardName+" with description : "+cardList[i].desc);
          convo.ask("What do you want to do ? Below are the available options:\n1) Add todo item\n2) Mark a todo item\n3) Remove a todo item",[
              {
                  pattern: "Add todo item",
                  callback: function(){}// Function to handle add todo item
              },
              {
                  pattern: "List todo items",
                  callback: function(){}// Function to handle add todo item
              },
              {
                  pattern: "Mark a todo item",
                  callback: function(){}// Function to mark a todo item
              },
              {
                  pattern: "Remove a todo item",
                  callback: function(){}// Function to handle remove todo item
              }
          ]);
          return;
        }
    }
    convo.say("I couldn't find the card name '"+cardName+"' in your storyboard");
}

// method to call rest api to get cards for weekly summary
module.exports.getCardsForWeeklySummary = function(response,convo){
  
}
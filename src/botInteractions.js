//var restHelper = require('./restAPIHelper.js');
var mock = require('./mock.js');

module.exports.handleOpenCard = function(response,convo){
  convo.ask('What is the card name?',[
    {
      pattern: '.*',
      callback:function(response,convo){
        
        cardName = response.text;
        //restHelper.openCard(response.user, cardName, convo, fetchCardHandler);

        //mocked cardlist
        cardList = [
        {
          name:cardName,
          id:'1',
          desc:'NONE'
        }];

        fetchCardHandler(convo,cardName,cardList);


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
                  pattern: /List checklist items/i,
                  callback: getListChecklistItemsHandler(cardName,cardList[i].idChecklists)// Function to handle add todo item
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

function getListChecklistItemsHandler(cardName, checkListID){
  var listChecklistItems = function(response, convo){
    mock.getCheckListItems(checkListID,function(err, result, body)  {
      if (err) {
          convo.say(err);
      } else {
          convo.say(body);
      }
      convo.next();
    });
  };
  return listChecklistItems;
}

// method to call rest api to get cards for weekly summary
module.exports.getCardsForWeeklySummary = function(response,convo){
  
}
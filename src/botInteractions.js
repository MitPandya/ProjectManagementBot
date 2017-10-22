var restHelper = require('./restAPIHelper.js');
var mock = require('./mock.js');
var moment = require('moment');

module.exports.handleOpenCard = function(response,convo){
  convo.ask('What is the card name?',[
    {
      pattern: '.*',
      callback:function(response,convo){
        
        cardName = response.text;
        restHelper.openCard(response.user, cardName, convo, fetchCardHandler);
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
                  pattern: /Add todo item/i,
                  callback: getAddChecklistItemHandler(cardList[i].idChecklists)// Function to handle add todo item
              },
              {
                  pattern: /List checklist items/i,
                  callback: getListChecklistItemsHandler(cardName,cardList[i].idChecklists)// Function to handle add todo item
              },
              {
                  pattern: /Mark a todo item/i,
                  callback: function(){}// Function to mark a todo item
              },
              {
                  pattern: /Remove a todo item/i,
                  callback: getRemoveChecklistItemHandler(cardList[i].idChecklists)// Function to handle remove todo item
              }
          ]);
          return;
        }
    }
    convo.say("I couldn't find the card name '"+cardName+"' in your storyboard");
}

function getAddChecklistItemHandler(ChecklistID){
    var temp = function(response,convo){
        
        convo.ask("Enter the name of the checklist item you want to add: ",[
            {
                pattern:".*",
                callback:AddChecklistItem(ChecklistID)
            }
        ]);
        convo.next();

    }
    return temp;
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

function getRemoveChecklistItemHandler(ChecklistID){
    var temp = function(response,convo){
        convo.ask("Enter the name of the checklist item you want to delete: ",[
            {
                pattern: ".*",
                callback:RemoveChecklistItem(ChecklistID)
            }
        ]);
        convo.next();
    }
    return temp;
}


function AddChecklistItem(ChecklistID){
    var temp = function(response,convo){
        
        var ChecklistItemName = response.text;
        //Call RestAPI for adding the checklist Item over here
        restHelper.addCheckListItem(response.user, ChecklistID, ChecklistItemName, convo, sendFeedback);
        
        var sendFeedback = function(done){
            if (done == true){
                convo.say("I have added your checklist item "+ ChecklistItemName);
            }
            else{
                convo.say("Error happened while adding the checklist item "+ ChecklistItemName + ". Please try again.");
            }
            
            
        }
        convo.next();
    }
    return temp;
}

function RemoveChecklistItem(ChecklistID){
    var temp = function(response,convo){
        var findItem = 0; 
        var ChecklistItemName = response.text;

        var checklistItems = [] ;
        restHelper.getCheckListItems(response.user, ChecklistID, function(e,r,b){
            checklistItems  = JSON.parse(b);

            for(var i=0;i<checklistItems.length;i++){
                if(ChecklistItemName == checklistItems[i].name){
                    findItem = 1;
                    restHelper.removeChecklistitem(response.user, ChecklistID, checklistItems[i].id, convo, sendFeedback);
                    var sendFeedback = function(done){
                        if(done == true){
                            convo.say("I have deleted the checklist item "+ ChecklistItemName);
                        }
                        else{
                            convo.say("Error occurred while deleting the checklist item "+ ChecklistItemName + ". Please try again.");
                        }    
                    }
                } 
            }
            if(findItem == 0){
                convo.say("Item "+ ChecklistItemName + " is not present. Verify that you have entered the correct item name and also verify that the checklist item is present in the above mentioned card.");
            }
            convo.next();
        });  
    };
    return temp;
}

// method to call rest api to get cards for weekly summary
module.exports.getCardsForWeeklySummary = function(response,convo){

  // start of the week is Monday and end of the week is Sunday.
  var startOfWeek = moment().startOf('isoWeek').format("MM/DD/YYYY");
  var endOfWeek   = moment().endOf('isoweek').format("MM/DD/YYYY");
  //console.log(startOfWeek);
  //console.log(endOfWeek);
  convo.ask('Creating weekly summary from '+startOfWeek+' to '+endOfWeek+' , would you like to change dates?',[
    {
      pattern: /no/i,
      callback:function(response,convo){
        
        cardName = response.text;
        // rest api handler
        convo.next();
      }
    },
    {
      pattern: ".*",
      callback:function(response,convo){
        
        // parse dates from response
        var res = response.text.match(/\d{2}(\D)\d{2}\1\d{4}/g);
        // rest api handler
        
        convo.next();
      }
    }
  ])
  convo.next();
  
}

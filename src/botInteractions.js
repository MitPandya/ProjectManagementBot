var restHelper = require('./restAPIHelper.js');
var mock = require('./mock.js');

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
                  pattern: "Add todo item",
                  callback: getAddChecklistItemHandler(cardList[i].idChecklists)// Function to handle add todo item
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
        var success = 0; 
        var ChecklistItemName = response.text;

        var checklistItems = [] ;
        mock.getCheckListItems(function(e,r,b){
            checklistItems  = JSON.parse(b);

            for(var i=0;i<checklistItems.length;i++){
                if(ChecklistItemName == checklistItems[i].name){
                    success = 1;
                    //Call RestAPI for deleting the checklist Item over here
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
            if(success == 0){
                convo.say("Item "+ ChecklistItemName + " is not present. Verify that you have entered the correct item name and also verify that the checklist item is present in the above mentioned card.");
            }
            convo.next();
        });  
    };
    return temp;
}

// method to call rest api to get cards for weekly summary
module.exports.getCardsForWeeklySummary = function(response,convo){
  
}

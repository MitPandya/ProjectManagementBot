var request = require('request');


var api_fetch_story_board = "https://api.trello.com/1/members/me/boards?key={APP_KEY}&token={TOKEN_VALUE}";
var api_fetch_lists = "https://api.trello.com/1/boards/{BOARD_ID}/lists?key={APP_KEY}&token={TOKEN_VALUE}";
var api_fetch_cards = "https://api.trello.com/1/batch/?urls={LISTS_IDS}&key={APP_KEY}&token={TOKEN_VALUE}";
var api_add_checklistitem = "https://api.trello.com/1/checklists/{CHECKLIST_ID}/checkItems?name={CHECKLIST_ITEM_NAME}&key={APP_KEY}&token={TOKEN_VALUE}";
var api_mark_item = "https://api.trello.com/1/cards/{CARD_ID}/checkItem/{ITEM_ID}?state=complete&key={APP_KEY}&token={TOKEN_VALUE}";

// Wrapper to hide underlying callbacks
module.exports.openCard = function(userID, cardName, convo, callback){
    loadStoryBoard(userID,cardName, convo,callback);
}

module.exports.addTodoItem = function(userID, checkListID, todoItemName, callback){
    addCheckListItem(userID, checkListID, todoItemName, callback);
}

module.exports.markListItem = function(userID, cardID, checklistID, callback){
    MarkCheckListItem(userID, cardID, checkListID, callback);
}

function loadStoryBoard(userID, cardName, convo, callback){
    var urlBoard = api_fetch_story_board.replace("{APP_KEY}",global.APP_KEY).replace("{TOKEN_VALUE}",global.TRELLO_TOKEN_MAP[userID]);
    var options = { 
                    method: 'GET',
                    url: urlBoard  };
    request(options, function (error, response, body) {
        // parse response
        if (error) throw new Error(error);
        body = JSON.parse(body);
        
        loadBoardList(userID,body[0].id,cardName, convo,callback);
    });
}

function loadBoardList(userID, boardID,cardName, convo, callback){
    // load all cards in this board
    var urlList= api_fetch_lists.replace("{BOARD_ID}",boardID).replace("{APP_KEY}",global.APP_KEY).replace("{TOKEN_VALUE}",global.TRELLO_TOKEN_MAP[userID]);

    var options = { 
                    method: 'GET',
                    url: urlList  };

    request(options, function (error, response, body) {
        // parse response
        if (error) throw new Error(error);
        body = JSON.parse(body);

        loadCards(userID,body,cardName, convo,callback);

    });
}

function loadCards(userID, listArray,cardName, convo,callback){
    // consider only only first story board
    var listCount = listArray.length;
    var batchListInfo = [];

    for(var i=0;i<listCount;i++){
        batchListInfo.push("/lists/"+listArray[i].id+"/cards");
    }
    batchListInfo = batchListInfo.join();

    // load all cards in this board
    var urlCards= api_fetch_cards.replace("{LISTS_IDS}",batchListInfo).replace("{APP_KEY}",global.APP_KEY).replace("{TOKEN_VALUE}",global.TRELLO_TOKEN_MAP[userID]);
    var options = { 
                    method: 'GET',
                    url: urlCards  };
    request(options, function (error, response, body) {
        // parse response
        if (error) throw new Error(error);
        
        body = JSON.parse(body);
        
        var respCount = body.length;

        var cardList = [];

        for(var i=0;i<respCount;i++){
            respCardList = body[i]['200'];
            for(var j=0;j<respCardList.length;j++){
                cardList.push({
                    'id':respCardList[j].id,
                    'name':respCardList[j].name,
                    'desc':respCardList[j].desc,
                    'idChecklists':respCardList[j].idChecklists[0],
                });
            }
        }
        console.log(callback);
        callback(convo,cardName, cardList);
    }); 

}

function addCheckListItem(userID, checkListID, itemName, callback){
    var urlCards= api_add_checklistitem.replace("{CHECKLIST_ID}",checkListID).replace("{CHECKLIST_ITEM_NAME}",itemName).replace("{APP_KEY}",global.APP_KEY).replace("{TOKEN_VALUE}",global.TRELLO_TOKEN_MAP[userID]);
    var options = { 
        method: 'POST',
        url: urlCards  };
        request(options, function (error, response, body) {
            if(error){
                console.log(error);
                callback(false);
            }else{
                callback(true);
            }
        });

}        

function MarkCheckListItem(userID, cardID, checkListID,  callback){
    var urlCards= api_mark_item.replace("{CARD_ID}",cardID).replace("{ITEM_ID}",checkListID).replace("{APP_KEY}",global.APP_KEY).replace("{TOKEN_VALUE}",global.TRELLO_TOKEN_MAP[userID]);
    var options = { 
        method: 'PUT',
        url: urlCards  };
        request(options, function (error, response, body) {
            if(error){
                console.log(error);
                callback(false);
            }else{
                callback(true);
            }
        });
    
}
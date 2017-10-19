var restHelper = require('./restAPIHelper.js');

module.exports.handleOpenCard = function(response,convo){
  convo.ask('What is the card name?',[
    {
      pattern: '.*',
      callback:function(response,convo){
        
        cardName = response.text;
        // Call Rest api to validate card name and its ID on trello
        
        convo.next();
      }
    }
  ])
  convo.next();
}
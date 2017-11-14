# Milestone: SERVICE

### Service
For this milestone and for our project, we have used the following REST APIs to fetch data and perform necessary actions using the Slack Bot.

#### Use Case #1
* REST-API call to fetch and list all the Trello Boards that a member has access to: https://api.trello.com/1/members/me/boards?key={APP_KEY}&token={TOKEN_VALUE} 
* REST-API call to fetch all the lists present within a Trello's story board: https://api.trello.com/1/boards/{BOARD_ID}/lists?key={APP_KEY}&token={TOKEN_VALUE} : 
* REST-API call to fetch all the cards present within a Trello's story board: https://api.trello.com/1/batch/?urls={LISTS_IDS}&key={APP_KEY}&token={TOKEN_VALUE}
* REST-API call to add a new checklist item on the Trello card: https://api.trello.com/1/checklists/{CHECKLIST_ID}/checkItems?name={CHECKLIST_ITEM_NAME}&key={APP_KEY}&token={TOKEN_VALUE}
* REST-API call to mark a checklist item already present on the Trello card: https://api.trello.com/1/cards/{CARD_ID}/checkItem/{ITEM_ID}?state=complete&key={APP_KEY}&token={TOKEN_VALUE}
* REST-API call to remove a checklist item already present on the Trello card: https://api.trello.com/1/checklists/{CHECKLIST_ID}/checkItems/{ITEM_ID}?key={APP_KEY}&token={TOKEN_VALUE}
* REST-API call to list all the checklist items present on the Trello card: https://api.trello.com/1/checklists/{CHECKLIST_ID}/checkItems?key={APP_KEY}&token={TOKEN_VALUE}

#### Use Case #2
* A new comment is added on the card to send notifications about tasks to all the members attached to a Trello card.   
* REST-API call to add a new comment on the card: https://api.trello.com/1/cards/{CARD_ID}/actions/comments?text={COMMENT_VALUE}&key={APP_KEY}&token={TOKEN_VALUE}

#### Use Case #3

* In order to create a weekly summary of completed and incompleted cards, all the cards present within a Trello's story board needs to be fetched. 
* REST-API call to fetch all the cards present within a Trello's story board: https://api.trello.com/1/batch/?urls={LISTS_IDS}&key={APP_KEY}&token={TOKEN_VALUE}

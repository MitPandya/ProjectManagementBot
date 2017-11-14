# Milestone: SERVICE

### Service
For this milestone and for our project, we have used following REST APIs to fetch data and perform necessary actions using Slack Bot.

#### Use Case #1
* https://api.trello.com/1/members/me/boards?key={APP_KEY}&token={TOKEN_VALUE} : To fetch all the Trello Boards
* https://api.trello.com/1/boards/{BOARD_ID}/lists?key={APP_KEY}&token={TOKEN_VALUE} : 
* https://api.trello.com/1/batch/?urls={LISTS_IDS}&key={APP_KEY}&token={TOKEN_VALUE}
* https://api.trello.com/1/checklists/{CHECKLIST_ID}/checkItems?name={CHECKLIST_ITEM_NAME}&key={APP_KEY}&token={TOKEN_VALUE}
* https://api.trello.com/1/cards/{CARD_ID}/checkItem/{ITEM_ID}?state=complete&key={APP_KEY}&token={TOKEN_VALUE}
* https://api.trello.com/1/checklists/{CHECKLIST_ID}/checkItems/{ITEM_ID}?key={APP_KEY}&token={TOKEN_VALUE}
* https://api.trello.com/1/checklists/{CHECKLIST_ID}/checkItems?key={APP_KEY}&token={TOKEN_VALUE}
* https://api.trello.com/1/cards/{CARD_ID}/actions/comments?text={COMMENT_VALUE}&key={APP_KEY}&token={TOKEN_VALUE}

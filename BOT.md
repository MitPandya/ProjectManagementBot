## Bot

In this Milestone, we have implemented a bot based on our proposed design and use cases. We have used Slack as our bot interaction platform, Node.js as our backend server, PostGre database for persistence, BotKit.js for bot interactions module, Nock along with JSON for mocking REST APIs and Selenium for testing the end to end use case. Below we will describe every component implemented in this milestone in details.

### Use Case Refinement
Based on the feedback from design milestone, we have updated the use cases in our bot. Also, during the implementation, we found various flows inside a use case as trivial and not adding much value to the conversations and hence were modified. Below are the updated use cases:

1. USE CASE1 Flow of events to interact with a todo/checklist items of a card.
```
=> Prerequisite: User has already created cards on a Trello Storyboard either using Trello website or an external application.

=> Main Flow: User asks the bot to open a card by providing card name.The user is shown the matching card along with descriptions[E1] and displayed options to either add[S1], list[S2], mark[S3] or remove a todo/checklist item[S4].

=> Sub Flows:
 - [S1] User asks the bot to add todo item on the card and provides an item text. Bot adds a new todo item to the card on Trello and closes the conversation.
 - [S2] User asks to list all the todo items. Bot lists all the todo items (checklist items) attached to the card and closes the conversation.
 - [S3] User asks the bot to mark a todo item as completed, after performing [S2], by providing todo item name[E2]. Bot inform the user about the update and closes the conversation.
 - [S4] User asks the bot to remove a todo item, after performing [S2], by providing todo item name[E2]. Bot inform the user about the removal and closes the conversation.
  
=> Alternate Flows: 
 - [E1] If no card exists matching the name, the user is shown the error message "No such card exists" and the bot closes the conversation.
 - [E2] If no todo item with such name exists, the user is shown the error message "No such todo items exist" and the bot asks the user to either re-enter todo item name and on second attempt bot informs the user that he has exceeded maximum attempts and closes the conversation.

```
2. USE CASE2 Reminding members of a card through Notifications.
```
=> Prerequisite:
- Card exist in the Trello board and is already attached to a team member.

=> Main Flow:
- The manager asks the bot to remind all members attached to a certain card[E1] by providing a message such as 'card due soon' or 'demo coming up next week' etc. Bot adds a comment to the card by mentioning '@card' which in turn sends the notification to all members attached to given card.

=> Sub Flows:   
- None

=> Alternative Flows:   
- [E1] If no card exists matching the name, the user is shown the error message "No such card exists" and the bot closes the conversation.
```
3. USE CASE3 Create weekly summary of completed and incomplete cards
```
=> Prerequisite:
- Cards regarding a board exist in the Trello.
- Team members have updated statuses of their cards.
                 
=> Main Flow:
- Manager asks the bot to create a weekly summary of completed and incomplete cards[E1][E2].

=> Sub Flows:   
- [S1] By default bot will start creating summary for current week starting from Monday as first day of the week and ask manager if they want to create summary of current week or any other week[E1][E2].
- [S2] If manager responds with other date range, bot will start preparing summary of the cards for the date range specified by manager and display it[E1][E2].

=> Alternative Flows:   
- [E1] If team members have not updated status of any of the task for that week, bot will display all the tasks as incomplete even if the due date has passed. 
- [E2] If no card is available for the week or date duration mentioned by the manager, an error is printed saying no cards found for the specified duration.
```

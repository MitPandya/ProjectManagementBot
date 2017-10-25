## Bot

In this Milestone, we have implemented a bot based on our proposed design and use cases. We have used Slack as our bot interaction platform, Node.js as our backend server, PostGre database for persistence, BotKit.js for bot interactions module, Nock along with JSON for mocking REST APIs and Selenium for testing the end to end use case. Below we will describe every component implemented in this milestone in details.

### Use Case Refinement

Based on the feedback from design milestone, we have updated the use cases in our bot. Also, during the implementation, we found various flows inside a use case as trivial and not adding much value to the conversations and hence were modified. Below are the updated use cases:

1. USE CASE 1 : Flow of events to interact with a todo/checklist items of a card.
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
2. USE CASE 2 : Reminding members of a card through Notifications.
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
3. USE CASE 3 : Create weekly summary of completed and incomplete cards
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


### Mocking

Mocking is a simulation technique which provides a Restful environment without the need to make a real call and it is very useful during the initial phase of a project development when the use cases keeps on changing. In this project, we have used 'Nock' to intercept REST API calls and instead of calling actual REST API, we are sending a response from a predefined JSON file. 

                                                      
                                                      
                                                         ____NOCK Package____                 
     _____________________                                      |                             __________________
    |                     |                                     |                            |  REST API SERVER |
    |   NodeJS Server     | ______ REST API CALL __________>    | ____ X                     |__________________|
    |_____________________|                                     |
                                                                | === +
                  ______________________                        |     |
                 |   Mocking Component  |  <==========================+
                 |______________________|
                 
                 
Mocking components are defined in mock.js and the mocking feature is activated by setting the environment variable "MOCKON" value as "true". 



### Selenium Testing

Selenium testing is a tool which automates the testing of the functionality of a use case end to end.
In this milestone we have implemented Selenium unit test cases to test every main flow as well as sub slows of our proposed design.
We have implemented Selenium test cases as per selenium testing user guide and lecture notes and integrated with our Bot's Slack environment.
For every use case Selenium will interact with our Bot on a Slack channel and give certain commands to the Bot and verify Bot's responses to check if the Bot is responding as desired. This way it is easier for us to find bugs and edge cases in our design and overall verify the functionality of the underlying implementation.

#### Stories and Tasks

In this project we have tried to use Agile team methodlogies to divide tasks and contribution for the project. We have achieved this through planning the implemntation and work flow in advance and breaking every feature into smaller components called stories.
We have used git issues to track all the stories. We have also used assigning story points to every issue such that to track what task needs how much effort and time and it is easy to track progress of every team memers as well as overall project.
We have distributed every tasks amongst every team member in such a way that every team member can contribute towards every technology used in the project let it be bot interaction messaging api or nock mocking api or selenium tests etc.


## Problem Statement
Effective Project Management and its timely completion require a lot of complicated and manual efforts by the Project Managers to identify different small tasks associated with different projects and assign these tasks to appropriate team members. The project manager also has to keep track of the current status of the todo and ongoing tasks related to different projects. Moreover, it is also expected from the developers and testers to keep track of the individual tasks assigned to them, which is done usually by using some basic tools such as sticky notes.

Since humans are prone to errors, there is a high probability that issues will arise in the situations discussed above. One such example could be, a user needs a reminder about his task's deadline which is to be completed by the next day, and a simple notification using automation in this case would be helpful.

## Bot Description

ProManBot is a DevOps bot which is designed to handle several problems related to Project Management Life-Cycle on ‘Trello’ platform. Project managers can make use of this bot to attach cards (tasks) to a list in a story-board and receive notifications related to it. Engineers can talk to the bot to know their assigned cards and related details such as due date, labels, comments etc. Since, the bot tackles several Project Management related issues, it is directly related to the topic of Agile Development Technique discussed in class.

ProManBot can be considered as a Personal Assistant bot which is based on Space Reactors and Responders design patterns that interacts with the users and adapts its response based on each user type viz. manager, or team member. The bot responds to user’s queries based on information stored on Trello’s platform.

## Use Cases

UC1: Flow of events to interact with a todo item on an existing card.
```
=> Preconditions: None

=> Main Flow: User asks the bot to open a card by providing card name[E1][E2]. User is shown all the matching cards along with descriptions and asked to select any one card. User selects the desired card [E2].

=> Subflows:
 - [S1] User asks the bot to add todo item on the card and provides an item text[E2]. Bot adds a new checklist item to the card on Trello.
 - [S2] User asks to list all the todo items. Bot lists all the todo items (checklist items) attached to the card and closes the conversation.
 - [S3] User asks the bot to mark a todo item as completed, after performing [S2], by providing todo item name[E2][E3]. Bot inform the user about the update and closes the conversation.
 - [S4] User asks the bot to remove a todo item, after performing [S2], by providing todo item name[E2][E3]. Bot inform the user about the removal and closes the conversation.
  
=> Alternate Flows: 
 - [E1] If no card exists matching the name, the user is shown the error message "No such card exists" and the bot asks the user to either re-enter card name and on second attempt bot informs the user that he has exceeded maximum attempts and closes the conversation.
 - [E2] If no input is provided, a prompt is displayed asking the user to enter input. If the user enters empty card name again, bot informs the user that he has exceeded maximum attempts and closes the conversation.
 - [E3] If no todo item with such name exists, the user is shown the error message "No such todo items exist" and the bot asks the user to either re-enter todo item name and on second attempt bot informs the user that he has exceeded maximum attempts and closes the conversation.
```

2.  Reminding user through Notifications.
```
=> Prerequisite: - Cards exist in the Trello board and is already attached to a team member but the card is still in the todo list of the team member
=> Flow: - Manager asks the bot to remind a member about certain card
```

3.  Creating a weekly summary of pending and completed cards
```
=> Prerequisite: - Cards regarding a board exist in the Trello
                 - Team members have updated status of their cards
=> Flow: - Manager asks the bot to create a weekly summary of completed and incomplete cards
```

## Design Sketches

#### Wireframe mockup

![SE-Wireframe](./SE-Wireframe-1.png)

#### Story Board for Use Case 2
![Story board for use case 2](./SE-StoryBoard-1.png)

#### Story Board for Use Case 3
![Story board for use case 3](./SE-StoryBoard-2.png)

## Architecture Design

#### Architecture Design Pattern(_Data centered Pattern_)  
All the information regarding the skills of team members is stored on Trello’s database and because of this aspect, the project follows a data-centered pattern. Also, the information regarding status of cards assigned to team members on the board’s list is updated dynamically. Moreover, all the team members can independently update this information without affecting any other team member’s lists. Therefore, by considering the above mentioned aspects, one can say that this project follows a blackboard data-centered pattern.

![SE-Wireframe](./SE-Architecture.png)

1. __SLACK USER INTERFACE__ : This component is the webpage on the "slack.com" where user can go by clicking on the app "ProManBot" after login.

2. __SLACK MESSAGING API__ : This is a component inside slack's infrastructure which provides Websocket based API for real time messaging. This component is essential to help bot respond to user's queries in a real time and triggers events inside slack bot controller.

3. __NATURAL LANGUAGE PARSER__ : Natural language parser is the component which takes the input sentences from user and categorise them into intents. This component can either be an internal feature such as a library or an external service provider such as "API.AI".

4. __SLACK BOT API HANDLER__ : This component is responsible for connecting and coordinating among all the other components. This component creates a web-socket with Slack Messaging API and invokes respective functions based on events trigger by user's chat.

5. __TRELLO REST API CLIENT__ : This component calls REST API’s on Trello platform to either perform actions or fetch information about cards/ members.

6. __TRELLO REST API SERVER__ : This is a web interface which is deployed inside Trello’s platform which manages all the REST API calls. This is used to handle actions such as card creation, updates etc. 

7. __SLACK TRELLO TOKEN MAP__ : This unit is used to handle tokens across platforms i.e. map slack user to trello account using oauth tokens.

#### Constraints

1. A team member can neither ask the bot about the status of other team members’ cards nor it can ask about the cards          assigned to other team members.

#### Additional Patterns

#### Data Flow Pattern (_Batch Sequential flow_)  
In order to provide weekly summary of pending and completed cards within a story board, the bot will have to provide a list of pending and completed cards to the manager or any other team member. For providing this list, the bot has to collect the status of all the cards present within different storyboards and then segregate the cards according to which card is assigned to which team member. Only after this segregation is completed, the list of pending and completed cards can be provided to the manager or any other team member who made a weekly summary request. Thus, this project can also resemble batch sequential data flow pattern. 


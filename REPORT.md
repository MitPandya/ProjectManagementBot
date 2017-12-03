
## REPORT

### Problems Solved

Promanbot is designed to solve many Project Management related issues when it comes to using the Trello Board as it has a lot of limitations on the features related to effective Agile Software Development Process. Promanbot dealth with solving three major issues as follows:
* Trello Card Interactions e.g. Add, Mark, Remove, and listing Checklist/Todo Items of the card
* Sending Real-Time Notifications to all the Members of a Card
* Generating a Weekly Summary of all the Card's Status (Complete and Pending)

### Primary Features
The bot initializes by asking the first time user to do their Trello account's setup. After the Trello account is setup, the bot shows the main menu, which provides three options to the user.   

![Main Menu](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/intro.png)  



#### UseCase1: Allow users to interact with TODO items


**1. Add a new TODO item**   

![Add an item](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/UC1_add.png)  



**2. Mark TODO items**  

![Mark a item](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/UC1_mark.png)  



**3. Remove TODO items**  

![Remove an item](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/UC1_delete.png)  



**4. List All TODO items**  

![List items](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/UC1_list.png)  



#### UseCase2: Send notifications to card member

![Send notifications](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/UC2.png)  



#### UseCase3: Create summary of completed and pending cards

**1. Current week**

![Current week summary](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/UC3_no.png)  



**2. Custom date range**

![Custom week](https://github.ncsu.edu/dgupta9/ProManBot/blob/REPORT/screenshots/UC3_yes.png)  

### Limitations  
1. Since we are using ‘quit’ and ‘abort’ keywords to close the conversation with the Bot, thus we cannot have Trello card or checklist item which have the same name as these keywords.  
2. For usecase-3 the date format should be in MM/DD/YYYY format. So, input in any other date format will generate an error.
Trello card names and todo items are case-sensitive. So, if the input contains same trello card name but it is just in different case, the bot won’t recognize it and generate an error that the card is not present even though that card is actually present in the Trello board.  
3. Currently, our project is limited to cards present in a single Trello storyboard and it doesn’t deal with cards present in multiple storyboards.  
4. The user needs to type the name of the card/checklist item manually and hence the user needs to know the Trello card/checklist item name beforehand. Currently there is no drop down menu available which can list all the card/checklist item names.  


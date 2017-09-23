## Problem Statement
Effective Project Management and its timely completion require a lot of complicated and manual efforts by the Project Managers to identify tasks and assign them to appropriate team members. One of the responsibilities of the project manager is to maintain several sprints in the Agile Project LifeCycle keeping track of the progress of those particular sprints. Developer and testers being expected to keep track of their respective task's schedule often use some basic tools such as sticky notes to keep track.

Since humans are prone to errors, there is a high probability that issues will arise in the situations.  discussed above. One such example could be, the project manager assigns a task to a team member without knowing their current workload or, if their skills are a fit for the task which could have been avoided with a simple automation.

## Bot Description

ProManBot is a smart bot designed to handle several problems related to one project sprint. Managers can use this bot to easily know what each team member is working on and what percentage of the sprint has been completed using simple chat commands. Engineers can talk to the bot to know their task related details such as any urgent issues or any upcoming close deadlines or they can also know their domain fit based on their technical skills. Since, the bot tackles several Project Management related issues, it is directly related to the topic of Agile Development Technique discussed in class.

ProManBot can be considered as a Personal Assistant bot which adapts its response based on each user type viz. manager, or team member. The bot responds to each user after fetching data from the activity engine(a component responsible for storing and processing information).

### Use Cases

1.  Project Manager asks the bot to create a new Agile Sprint for the next 2 weeks.
```
=> Pre-requisite: - Another Sprint does not exist already for that project in that time frame
=> Flow:    - Manager asks the bot to create a Agile Sprint specifying dates for the time period
            - Bot confirms if any other Sprint does not exist for that time period, else notifies manager about it
            - Bot creates the sprint and notifies the manager with the assigned dates
```

2.  Team Members interact with the Bot to update their details in the system such as their personal details, skills,             availability, or updates on the story points for the particular sprint.
```
=> Pre-requisite: - Team Member's profile is already present in the database
                  - Tasks are already assigned to the Team Member with story points on each task
=> Flow:    - Team Member asks the bot to bring up their profile and once returned, asks the bot to update changes if required
            - Team Member asks the bot to update their story points for a particular task or mark the task as pending,completed etc.
```

3.  Project Manager creates tasks for a project.
```
=> Pre-requisite: - Project manager knows various tasks associated with the project and wants to create tasks in the dashboard.
=> Flow:    - Manager informs bot to add new task for a project and assigns skill-sets and story points associated with the project
            - Bot compares the task with any existing item and warns if duplicates are found
                 + If duplicates are desired, manager has to confirm it.
            - Bot asks if the task needs to be assigned
            - Manager decides if the task needs to be assigned now or later
```

4.  Project Manager wants to distribute tasks among team members
```
=> Pre-requisite: - Tasks exist in the ProManBot's activity engine
                  - Team members already entered their skills into ProManBot's database system
=> Flow:    - Manager asks the bot for unassigned tasks
            - A list of tasks are returned by the bot
            - Manager either assigns task to specific team member by name or asks for suggestions
                + Bot suggests names based on skills or availability of the team member, if manager asked for suggestion
                + Manager may ask the bot for the current workload on the team member and the bot brings up the member's                       schedule
                + Manager assigns task to that team member or any one of the names suggested in the earlier step
```

5.  Team member reporting progress and raising issues.
```
=> Pre-requisite: - Tasks exist in the ProManBot's activity engine and is assigned to a member
=> Flow:    - Team Member asks bot for the list of tasks assigned to him/her.
            - Team Member informs the bot to mark a task as completed.
            - If the task doesn't exist, bot informs user about it.
            - Else, the task gets updated and user is informed about it.
```

6.  Checking the overall and per team member status of current sprint
```
=> Pre-requisite: - Tasks regarding a project exist in the ProManBot's activity engine
                  - Team members have updated their status of tasks
=> Flow:    - Manager asks bot for overall sprint status
            - ProManBot compiles the result from each task and give completed percentage.
```

### Design Sketches

#### Wireframe mockup

![SE-Wireframe](./SE-Wireframe-1.png)

#### Story Board for Use Case 3
![Story board for use case 3](./SE-StoryBoard-1.png)

#### Story Board for Use Case 4
![Story board for use case 4](./SE-StoryBoard-2.png)

## Architecture Design

![SE-Wireframe](./SE-Architecture.png)

#### Constraints

1. A team member cannot ask the bot to assign him/her a task. This feature is only available to the project manager

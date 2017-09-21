## Problem Statement
Effective Project Management and it's timely completion requires a lot of complicated and manual efforts by the Project Managers to identify tasks and assign them to appropriate team members. The project manager are also responsible for certain trivial responsibilities such as scheduling test/release date for project features and making sure all the feature related tasks are completed before deadlines. Developer and testers being expected to keep of track of their respective task's schedule often use some basic tools such as sticky notes to keep track.

Since humans are prone to errors, there is a high probability that issues will arise in the above discussed situations. One such example could be, the development team are blocked on a task and manager is unaware of it or some miscommunications can cause significant delays in project release which could have been avoided with a simple automation.

## Bot Description

ProManBot is a smart bot designed to handle several problems related to Project Development Lifecycle. Managers can use this bot to easily know what each team member is working on and what percentage of project has been completed using simple chat commands. Engineers can talk to the bot to know their task related details such as any urgent issues or any upcoming close deadlines or they can also know their domain fit based on their technical skills. The bot can also help a team member to resolve common coding issues such as minor syntax errors. Since, the bot tackles several Project Management related issues, it is directly related to the topic of Agile Development Technique discussed in class.

ProManBot can be considered as a Personal Assistant bot which adapts its response based on each user type viz. manager, developer, tester, etc. The bot responds to each user after fetching data from the activity engine(a component responsible for storing and processing information).

### Use Cases

1.  Project Manager wants to distribute tasks among team members
```
=> Pre-requisite: - Tasks exist in the ProManBot's activity engine
                  - Team members enter their skills into ProManBot's database system
=> Flow:    - Manager asks the bot for unassigned tasks
            - A list of tasks are returned by the bot
            - Manager either assigns task to specific team member by name or asks for suggestions
                + Bot suggests names based on skills if manager asked for suggestion
                + Manager assigns task to any one of the names suggested
```

2.  Project Manager creates tasks for a project
```
=> Pre-requisite: - Project manager know various tasks associated with a project
=> Flow:    - Manager inform bot to add new task for a project
            - Bot compares the task with any existing item and warns if duplicates are found
                 + If duplicates are desired, manager has to confirm it.
            - Bot asks if the task needs to be assigned
            - Manager decides if the task needs to be assigned now or later
```

3.  Checking the overall and per team member status of project
```
=> Pre-requisite: - Tasks regarding a project exist in the ProManBot's activity engine
                  - Team members have updated their status of tasks
=> Flow:    - Manager asks bot for overall project status
            - ProManBot compiles the result from each task and give completed percentage.
```

4.  Team member reporting progress and raising issues.
```
=> Pre-requisite: - Tasks exist in the ProManBot's activity engine and is assigned to a member
=> Flow:    - Developer asks bot for the list of tasks assigned to him/her.
            - Developer informs bot to mark a task as completed.
            - If the task doesn't exist, bot informs user about it.
            - Else, the task gets updated and user is informed about it.
```

5.  Creation of regular team meetings
```
=> Pre-requisite: - Manager wants to create a meeting regarding projects such as demo, issues etc.
                  - Manager and Team members have allowed access to their google calendar
=> Flow:    - Manager asks the bot to setup a meeting in a given time range and invitees
            - Bot checks availability of each user and selects the time slot which covers maximum participants and must    include manager.
            - Each user is sent a notification about their meeting and asked to confirm their participation.
```

### Design Sketches

* Wireframe mockup

![SE-Wireframe](./SE-Wireframe-1.png)

## Architecture Design

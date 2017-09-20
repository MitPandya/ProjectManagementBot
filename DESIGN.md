## Problem Statement
Successful and timely development of projects requires lots of complications and manual work involved in identifying tasks and assigning them to appropriate person. The project manger are also responsible for certain trivial responsibilities such as scheduling test/release date and making sure all the tasks are completed before deadlines. Developer and testers are expected to keep of track of task schedules and it often results in them using some simple kind of tools such as sticky notes.

All the above problems pose one or more problems since humans are prone to errors. The develoment team might be struck on a task and manager might not be aware of such problems. Miscommunications can cause significant delays in project release and could have been avoided with a simple automation.

## Bot Description

ProManBot is bot designed to handle most of the problems related to project development cycle. Using this bot, managers can easily know what each team member is working and how much of percentage of project has been completed. This bot is quite useful to engineers since they can specify their technical skills and get desired modules to work on. Also, if some team member needs help he can ask the bot which can resolve common issues such syntax related problems. Since the bot tackles the problem of project management it is directly related to the topic of agile development technique discussed in class.

ProManBot can be considered as a personal assistant bot which adapts its response based on each user's type. The bot responds to each user after fetching data from the activity engine( a component responsible for storing and processing information).

### Use Cases

1.  Project Manager wants to distribute the task among team members
```
=> Pre-requisite: - Tasks exist in the ProManBot's activity engine
                  - Team members enter their skills into ProManBot's system
=> Flow:    - Manager asks bot for unassigned tasks
            - A list of tasks are presented
            - Manager either assigns task to specific team member by name or asks for suggestions
                + If manager asked for suggestion, based on skills
                + Manager assigns task to any one of the names suggested
```

2.  Project Manager creating tasks for a project
```
=> Pre-requisite: - Project manager know various tasks associated with a project
=> Flow:    - Manager inform bot to add new task for a project
            - Bot compares the task with any existing item and warns if duplicates are found
                 + If duplicates are desired, manager has to confirm it.
            - Bot asks it the task needs to be assigned
            - Manager decides if the task needs to be assigned now or later
```

3.  Checking the overall and per team member status of project
```
=> Pre-requisite: - Tasks regarding a project exist in the ProManBot's activity engine
                  - Team members have update their status of tasks
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
                  - Manger and Team members have allowed access to their google calender
=> Flow:    - Manager asks bot to setup a meeting in a given time range and invitees
            - Bot checks availability of each user and selects the time slot which covers maximum participant and must include manager.
            - Each user is sent a notification about their meeting and asked to confirm their participation.
```

### Design Sketches

## Architecture Design

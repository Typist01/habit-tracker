# Habit tracker application
## An application for recording any habit you would like
#### Collaborators
Jeffrey Champion  : [JChampion42](https://github.com/Jchampion42) 

Mustafa Nawaz     : [Typist01](https://github.com/Typist01)

Yanaki Kolarov    : [ykolarov](	https://github.com/ykolarov)

## Setup
1. Download MySQL
2. Complete the setup for MySQL
3. Copy ALL of the Query from backend/mysqlScript
4. Enter the query into MySQL, and use the lightning-shaped button then run it
5. Navigate to backend/src/main/resources/application.properties
6. Change the username to suit the name of the connection you use on MySQL, and the password correspondingly
7. Using your favourite command line interface navigate to frontend3/my-app
8. Enter( npm install ) to install the required libraries
9. Within a Java supported IDE open the backend, then build and run the project.
10. In your command line interface at frontend3/my-app type( npm start )
11. In a web browser navigate to http://localhost:3000/
12. You should now be redirected to a log-in page, where you will need to first sign-up to use the application
13. Track any all habits you would like

## Project goals
The three members involved in creating this project all graduated from Sparta global's Java Engineering training course and were awaiting deployment, which sparked the idea to work on a project together - 
this project. With this background in mind, our personal goals were as follows.
### Personal goals
- Maintain and improve Java skills by developing a SQL database backend using Spring Boot and Hibernate.
- Learn React and Node.js as well as practice HTML, CSS, and JS by developing a front-end user interface.
- Establish a way to connect the Javascript-based front end to the Java-based backend.
- ~~Keep ourselves entertained working on a fun project~~
### Application goals
- Allow a user to create an account, and to use that account to create and store habits unique to them
- Allow as much freedom as possible to the user when creating a habit such as
  - entering the activity they wish to do
  - how they wish to measure it
  - naming the habit
- Create an interface as simple as possible so the user only has to push a couple of buttons to deal with any habit
- View historical data
- Change information about a habit and data entries
- Set targets to reach and monitor progress to them
## Planning
-  Adhered to the scrum methodology throughout the project, having a daily standup in the morning to discuss what actions needed to be taken for the day. 
- Used GitHub projects to create a project board in Scrum style and assigned ourselves to the tasks of our liking from the sprint backlog.
![Github project board](https://i.imgur.com/WdMx40m.png)
- Made use of both individual and pair programming appropriately via git branches and code-with-me/live-share, respectively, to reduce merge conflicts.
- Made use of Figma to visualize the front end collaboratively before implementing it in code. 
![Figma image](https://i.imgur.com/sldWhCK.png)
## Review
Within the three weeks, we had a lot to cover and create, to address our goals
### Personal goals
- [Java]We were able to quickly develop an API to access the SQL database but also discovered “@RequestParam” which for us was a better way to access than using path-variables
- [React, Node, JS, CSS] After building the back-end about a week was dedicated to learning how to use Node and React, and a full front end developed from it, providing invaluable knowledge and experience
-[front-back connection] Within our front end we found we could use Axios to send requests to the API, and this allowed us to keep the two halves of our program on different servers.
- ~~We enjoyed developing the project and the time spent together~~

### Application goals
- We were able to deliver a Minimum Viable Product (MVP) consisting of a frontend with a simplistic UI connected to a RESTful API backend connected to a MySQL database in 3 weeks.
- The MVP enabled us to present our work in front of a group of 25 Java Sparta trainees who provided us with feedback. This follows the iterative development process, which relies on iteration after feedback at short intervals.
- All functional goals set out were addressed except for:
  - editing the habit
  - setting and monitoring targets 

## Further work
- Polishing frontend components by adjusting icon placements and font sizing.
- Live deployment to a cloud provider.
- Implementation of a graph for a simple visual display to the user
- A method to change the name, activity or units for a data-set

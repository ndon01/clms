# TeamIQ

## Overview
TeamIQ is a versatile sports and team management platform designed to empower teams with tools for playbook creation, game analysis, live collaboration, and athlete development.

## Features
- **Playbook Management:** Create, organize, and share dynamic playbooks.
- **Scouting Reports:** Comprehensive tools for analyzing opponents.
- **Learning Modules:** Customizable quizzes, tests, flashcards, and learning games.
- **Film Analysis:** Upload, tag, and annotate practice, game, and opponent films.
- **Live Collaboration:** Real-time editing, chat, and feedback.
- **User Roles and Permissions:** Manage access and permissions for different roles.

# Local Installation
Follow these steps to set up TeamIQ on your local machine.

## Prerequisites
- Node 20^
- Java 17
    - Mac Homebrew Installation: 
    ```bash
    brew install openjdk@17
    ```
    - Maven Configuration: 
    ``` bash 
    export JAVA_HOME=/path/to/java17
                            
    export PATH=$JAVA_HOME/bin:$PATH
    ```
- Docker

## Backend Setup
#### Clone the repository:
```bash
git clone https://github.com/ndon01/teamiq-api.git

cd teamiq-api
```

#### Run the docker contianers
```bash
cd docker
docker-compose up -d
cd ../
```

#### Build the java app for the first time 
```bash
./mvnw clean install
```

Now you are ready to run the server.  Ways to run:

### Ways to run the Backend

#### Recommendation for Development
Using IntelliJ, or your IDE of choice.  Run the Springboot Application in Debug Mode .

#### Maven Springboot Target Option
```
./mvnw spring-boot:run
```

## Frontend Setup
If you just need to work on the backend API you don't need to do this, but if you want to work on the frontend while running the backend follow these steps.

#### Install node dependencies
```bash
cd teamiq-spa
npm install
```

#### Start npm watch target
```bash
npm run watch
```
this will start a program to watch when changes are made in the angular app, and will automatically build the app into the src/main/resources/static folder.  If springboot is running, it will automatically redeploy the updated static files.

#### Start npm start target
```bash
npm start
```
This will serve the application, won't have access to the API
#   c l m s  
 
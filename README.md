# Capstone Learning Management System
The Capstone Learning Management System is a user-friendly platform designed to help manage courses, users, and roles efficiently. It offers a range of RESTful API endpoints for handling tasks like user authentication, role assignments, and course management, making it easy to create, update, and organize educational content. CLMS is built to provide a smooth experience for both administrators and users, keeping everything organized and accessible.

# Table of Contents
1. [Dependencies](#dependencies)
2. [Setup](#setup)
     
# DEPENDENCIES
There are a couple prerequisites required to get this application running for local development.
The following are the required dependencies:
- Docker Desktop
- Java 21
- Node 20+
- IntelliJ (Optional but very helpful)

# SETUP
1. Clone the repository
```bash
git clone https://github.com/ndon01/clms.git
cd clms
```

2. Create a `.env` file in the '/clms-api/src/main/resources' directory of the project.
- There is a `.env.example` file in the same directory that you can copy and paste into a new `.env` file.


3. Install node dependencies
- (IntelliJ) Run the `Install Angular` script
- (Terminal) Change directory to '/clms-angular' and run:
```bash
npm install
```
4. Running the Docker Containers
- Make sure docker is open and running
- (IntelliJ) Run the `Containers` run configuration
- (Terminal) Change directory to '/' and run:
```bash
docker-compose up -d
```
5. Run the API:
- (IntelliJ) Run the API through the `API` run configuration in IntelliJ
- (Terminal) Change directory to '/clm-angular' and run:
```bash
./mvnw spring-boot:run
```

6. We use openapi-generator to generate typescript models and services from the API. To generate the models and services:
- (IntelliJ) open the run configurations and run `Generate APIs`
- (Terminal) Change directiory to '/' and run:
```bash
npm run generate-openapi:all
```

8. Running the Frontend:
- (IntelliJ) Run the run configuration `Watch Angular`
- (Terminal) Change directory to '/clms-angular' and run:
```bash
npm run watch
```

The application should now be running on `localhost:8080`, you may need to hard refresh to see the changes.

Default credentials:
- Username: admin
- Password: changeme
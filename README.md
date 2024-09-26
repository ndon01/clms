# Capstone Learning Management System
The Capstone Learning Management System is a user-friendly platform designed to help manage courses, users, and roles efficiently. It offers a range of RESTful API endpoints for handling tasks like user authentication, role assignments, and course management, making it easy to create, update, and organize educational content. CLMS is built to provide a smooth experience for both administrators and users, keeping everything organized and accessible.

# Table of Contents
1. [Dependencies](#dependencies)
2. [Setup](#setup)
    1. [With IntelliJ](#with-intellij)
3. [API Documentation](#api-documentation)
    1. [Authentication](#authentication)
        1. [POST /api/v1/authentication/register](#post-apiv1authenticationregister)
        2. [POST /api/v1/authentication/login](#post-apiv1authenticationlogin)
    2. [Users](#users)
        1. [GET /api/v1/users/me](#get-apiv1usersme)
    3. [Admin](#admin)
        1. [GET /api/admin/users](#get-apiadminusers)
        2. [POST /api/admin/users/createUser](#post-apiadminuserscreateuser)
        3. [POST /api/admin/users/updateUser/{id}](#post-apiadminusersupdateuserid)
        4. [POST /api/admin/authorization/roles/createRole](#post-apiadminauthorizationrolescreaterole)
        5. [POST /api/admin/authorization/roles/updateRole/{id}](#post-apiadminauthorizationrolesupdateroleid)
    4. [Courses](#courses)
        1. [PUT /api/courses](#put-apicourses)
        2. [POST /api/courses/courses/{courseId}](#post-apicoursescoursescourseid)
        3. [DELETE /api/courses/courses/{courseId}](#delete-apicoursescoursescourseid)

     
# DEPENDENCIES
- Java 21
- Node 20+

# SETUP

### With IntelliJ
1. Clone the repository
```bash
git clone https://github.com/ndon01/clms.git
cd clms
```
2. Install node dependencies
```bash
cd clms-angular
npm install
```
3. Open the project with ***IntelliJ***
4. Through the ***Project Structure*** in IntelliJ, set the following:
- Project > SDK: 21
5. Through the run configurations run:
- `Containers`, or in the terminal at `/clms` run:
```bash
docker-compose up -d
```
- `Frontend`, or in the terminal at `/clms/clms-angular` run:
```bash
npm run watch
```
- `API`

The application should now be running on `localhost:8080`
nd-LMS-8-user-authentication-work

# API Documentation
## Authentication

### POST /api/v1/authentication/register
Registers a new user with a provided username and password.
#### Request
```yaml
Body:
    username: string
    password: string
```

#### Response
```yaml
Status: 201 Created
```

### POST /api/v1/authentication/login
Authenticates a user and provides a token for future requests.
#### Request
```yaml
Body:
    username: string
    password: string
```

#### Response
```yaml
Status: 201 Created
Headers:
    Authorization: Bearer <token>
```

## Users

### GET /api/v1/users/me
Retrieves the profile of the authenticated user.
#### Request
```yaml
Headers:
    Authorization: Bearer <token
```

#### Response
```yaml
Status: 200 OK
Body:
    id: string
    username: string
```
## Admin

### GET /api/admin/users
Retrieves a list of all users in the system.
#### Request
```yaml
Headers:
    Authorization: Bearer <token>
```

#### Response
```yaml
Status: 200 OK
Body:
    - id: integer
      username: string
      email: string
      roles: 
        - name: string
```

### POST /api/admin/users/createUser
Creates a new user with a specified username and password.
#### Request
```yaml
Body:
    username: string
    password: string
```

#### Response
```yaml
Status: 201 Created
```

### POST /api/admin/users/updateUser/{id}
Updates an existing user's details, such as username, email, or roles.
#### Request
```yaml
Body:
    username: string
    email: string
    roles: 
      - name: string
```

#### Response
```yaml
Status: 200 OK
```

### POST /api/admin/authorization/roles/createRole
Creates a new role with specified permissions.
#### Request
```yaml
Body:
    name: string
    description: string
    permissions:
      - id: integer
        name: string
        description: string
```

#### Response
```yaml
Status: 201 Created
Body:
    id: integer
    name: string
    description: string
    permissions:
      - id: integer
        name: string
        description: string
```

### POST /api/admin/authorization/roles/updateRole/{id}
Updates an existing role's name, description, or permissions.
#### Request
```yaml
Body:
    name: string
    description: string
    permissions:
      - id: integer
        name: string
        description: string
```

#### Response
```yaml
Status: 200 OK
Body:
    id: integer
    name: string
    description: string
    permissions:
      - id: integer
        name: string
        description: string
```


## Courses
### PUT /api/courses
Retrieves a list of all courses availabvle in the system.
#### Request
```yaml
Body:
    courseName: string
    description: string

```

#### Response 
```yaml
Status: 201 Created
```


### POST /api/courses/courses/{courseId}
Updates the course name for an existing course based on the provided course ID.
#### Request
```yaml
Body:
Parameters:
    courseId: integer (path)
Body (optional):
    courseName: string (Only if you want to update the course name)
```

#### Response
```yaml
Status: 200 OK
```

### DELETE /api/courses/courses/{courseId}
Deletes an existing course based on the provided course ID.
#### Request
```yaml
Parameters:
    courseId: integer (path)
```

#### Response
```yaml
Status: 200 OK
```

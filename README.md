# Capstone Learning Management System
# Table of Contents
1. [Dependencies](#dependencies)
2. [Setup](#setup)
    1. [With IntelliJ](#with-intellij)
3. [API Documentation](#api-documentation)
    1. [Authentication](#authentication)
        1. [POST /api/v1/authentication/register](#post-apiv1authenticationregister)
        2. [POST /api/v1/authentication/login](#post-apiv1authenticationlogin)
   1. [Users](#users)
      1. [GET /api/v1/users/me](#get-apiv1usersme)
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
#### Request
```yaml
Parameters:
    courseId: integer (path)
```

#### Response
```yaml
Status: 200 OK
```

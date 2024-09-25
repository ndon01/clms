# Capstone Learning Management Syste
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

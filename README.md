# Table of Contents
1. [Dependencies](#dependencies)
3. [Setup](#setup)
    1. [With IntelliJ](#with-intellij)

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

2. Open the project with ***IntelliJ***
3. Through the ***Project Structure*** in IntelliJ, set the following:
- Project > SDK: 21
4. Through the run configurations run:
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
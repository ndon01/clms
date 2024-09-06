# DEPENDENCIES
- Java 21
- Node 20+

# Installation
1. Clone the repository
```bash
git clone ...
cd clms
```

# SETUP

### With IntelliJ
1. Clone the repository
```bash
git clone ...
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
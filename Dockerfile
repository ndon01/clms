# Stage 1: Build Angular App
FROM node:18-alpine as angular-builder
WORKDIR /app
COPY clms-angular/ ./clms-angular/
WORKDIR /app/clms-angular
RUN npm install
RUN npm run build --prod

# Stage 2: Build Maven API
FROM maven:3.9.4-eclipse-temurin-21 as builder
WORKDIR /app/clms-api
COPY clms-api/pom.xml .
COPY clms-api/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Final Image
FROM eclipse-temurin:21
WORKDIR /deploy
COPY --from=builder /app/clms-api/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

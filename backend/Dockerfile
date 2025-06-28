FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app
# Create data directory for H2 database
RUN mkdir -p /app/data

COPY pom.xml .
        COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
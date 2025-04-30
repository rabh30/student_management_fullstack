# --- Stage 1: Build the application using Maven ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
COPY .mvn/ .mvn
COPY mvnw .
# --->>> ADD THIS LINE <<<---
RUN chmod +x mvnw
# Download dependencies
RUN if [ -f mvnw ]; then ./mvnw dependency:go-offline; else mvn dependency:go-offline; fi
COPY src ./src
# Build the application JAR file
RUN if [ -f mvnw ]; then ./mvnw package -DskipTests; else mvn package -DskipTests; fi

# --- Stage 2: (No changes needed here) ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
# 1. Base Image: Use Java 21
FROM openjdk:21-jdk-slim

# 2. Working Directory: Create /app directory
WORKDIR /app

# 3. Copy JAR File: Choose ONE of the following lines based on your build tool
#    Maven:
COPY target/*.jar app.jar
#    Gradle:
# COPY build/libs/*.jar app.jar

# 4. Expose Port: (Usually 8080 for Spring Boot)
EXPOSE 8080

# 5. Entry Point: Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
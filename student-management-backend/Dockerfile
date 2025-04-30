# --- Stage 1: Build the application using Maven ---
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the build stage
WORKDIR /workspace

# Copy the Maven project file first to leverage Docker cache for dependencies
COPY pom.xml .

# Copy the Maven wrapper files (if you use ./mvnw) - Optional but good practice
COPY .mvn/ .mvn
COPY mvnw .

# Download dependencies (this layer is cached if pom.xml doesn't change)
# Using ./mvnw if available, otherwise system maven
RUN if [ -f mvnw ]; then ./mvnw dependency:go-offline; else mvn dependency:go-offline; fi

# Copy the rest of your source code
COPY src ./src

# Build the application JAR file
# Using ./mvnw if available, otherwise system maven
RUN if [ -f mvnw ]; then ./mvnw package -DskipTests; else mvn package -DskipTests; fi
# Note: The JAR will be in /workspace/target/

# --- Stage 2: Create the final lightweight image using JRE ---
# Use a JRE image matching your Java version
FROM openjdk:21-jre-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the 'build' stage
COPY --from=build /workspace/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
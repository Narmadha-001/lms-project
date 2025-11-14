# ---------- Build Stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom and download dependencies first (faster builds)
COPY pom.xml .
RUN mvn -q dependency:resolve

# Now copy full backend
COPY . .

# Build the application
RUN mvn -q clean package -DskipTests

# ---------- Run Stage ----------
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the generated JAR from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Render sets PORT env automatically, we pass it to Spring Boot:
CMD ["sh", "-c", "java -Dserver.port=$PORT -jar app.jar"]

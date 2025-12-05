# ===========================
# 1) BUILD STAGE
# ===========================
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copy Maven wrapper + pom first (better layer caching)
COPY mvnw mvnw.cmd pom.xml ./
COPY .mvn .mvn

# Make mvnw executable (important if committed from Windows)
RUN chmod +x mvnw

# Download dependencies (so next builds are faster)
RUN ./mvnw -B dependency:go-offline

# Copy source code
COPY src ./src

# Build the jar (skip tests for faster image builds)
RUN ./mvnw -B clean package -DskipTests


# ===========================
# 2) RUNTIME STAGE
# ===========================
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built jar from previous stage
# You can use the exact name OR wildcard. Both shown below.

# Option A: exact jar name (from your pom.xml)
# COPY --from=build /app/target/ecommerce-backend-0.0.1-SNAPSHOT.jar app.jar

# Option B (recommended): wildcard (works even if version changes)
COPY --from=build /app/target/*.jar app.jar

# Expose backend port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

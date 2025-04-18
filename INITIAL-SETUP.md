
# Netflix Clone - Setup Instructions

This document provides step-by-step instructions for setting up and running the Netflix Clone application using Spring Boot microservices and React.

## Technology Stack

- **Backend**:
  - Java 21 (LTS)
  - Spring Boot 3.0.4
  - Spring Cloud 2022.x
  - Spring Cloud API Gateway
  - Gradle 8.4
  - MongoDB 6.0.x (LTS)

- **Frontend**:
  - React
  - Tailwind CSS

- **Tools**:
  - IntelliJ IDEA 2023.3.1
  - Postman (for API testing)

## Project Structure

The application follows a microservices architecture with these components:

1. **Discovery Service**: Static service registry for service discovery
2. **API Gateway**: Entry point for all client requests
3. **Auth Service**: Handles user authentication and registration
4. **Content Service**: Manages movie/show content
5. **Subscription Service**: Handles subscription plans and user subscriptions
6. **Frontend**: React application for user interface

## Prerequisites

1. Install Java 21 (LTS)
2. Install MongoDB 6.0.x
3. Install Node.js and npm
4. Install IntelliJ IDEA 2023.3.1
5. Install Postman

## Backend Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
```

### Step 2: Import Projects in IntelliJ IDEA

1. Open IntelliJ IDEA
2. Choose "Open" and select the `netflix-clone` directory
3. Wait for Gradle to sync all dependencies

### Step 3: Set up MongoDB

1. Install MongoDB if not already installed
2. Start MongoDB service:
   ```bash
   sudo systemctl start mongod
   ```
3. Verify MongoDB is running:
   ```bash
   mongo --version
   ```

### Step 4: Start Microservices (in this order)

1. **Discovery Service**:
   - Navigate to the discovery-service directory
   - Run the application from IntelliJ or use:
   ```bash
   ./gradlew :discovery-service:bootRun
   ```
   - Service should start on port 8761

2. **Auth Service**:
   - Navigate to the auth-service directory
   - Run the application from IntelliJ or use:
   ```bash
   ./gradlew :auth-service:bootRun
   ```
   - Service should start on port 8081

3. **Content Service**:
   - Navigate to the content-service directory
   - Run the application from IntelliJ or use:
   ```bash
   ./gradlew :content-service:bootRun
   ```
   - Service should start on port 8082

4. **Subscription Service**:
   - Navigate to the subscription-service directory
   - Run the application from IntelliJ or use:
   ```bash
   ./gradlew :subscription-service:bootRun
   ```
   - Service should start on port 8083

5. **API Gateway**:
   - Navigate to the api-gateway directory
   - Run the application from IntelliJ or use:
   ```bash
   ./gradlew :api-gateway:bootRun
   ```
   - Gateway should start on port 8080

### Step 5: Verify Services

1. Open a browser and navigate to `http://localhost:8761`
2. Ensure all services are registered with the discovery service

## Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start the Frontend Application

```bash
npm start
```

The application should open automatically at `http://localhost:3000`

## Testing the API with Postman

1. Import the Postman collection from the `postman` directory
2. Use the collection to test the various endpoints

## Common Issues and Troubleshooting

1. **Port Conflicts**: If a port is already in use, change the port in the corresponding service's `application.yml` file.
2. **MongoDB Connection**: Ensure MongoDB is running and accessible.
3. **Java Version**: Verify you're using Java 21.

## Development Workflow

1. Make backend changes in the respective service modules
2. Test changes with Postman
3. Make frontend changes in the frontend directory
4. Test the full application flow

## Deployment

Follow the deployment instructions in DEPLOYMENT.md for production deployment.

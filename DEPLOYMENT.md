
# Netflix Clone - Deployment Guide

This document provides instructions for deploying the Netflix Clone application to production environments.

## Prerequisites

Before deploying the application, make sure you have the following:

- Java 21 installed on your production server
- MongoDB 6.0.x installed and configured
- Node.js and npm for the frontend
- Nginx or another reverse proxy (recommended)
- A domain name (optional but recommended)

## Backend Deployment

### Option 1: Deploy as Standalone JAR Files

1. **Build the services**:

```bash
./gradlew clean build
```

2. **Copy the JAR files to the production server**:

```bash
scp discovery-service/build/libs/discovery-service-0.0.1-SNAPSHOT.jar user@server:/path/to/deploy
scp api-gateway/build/libs/api-gateway-0.0.1-SNAPSHOT.jar user@server:/path/to/deploy
scp auth-service/build/libs/auth-service-0.0.1-SNAPSHOT.jar user@server:/path/to/deploy
scp content-service/build/libs/content-service-0.0.1-SNAPSHOT.jar user@server:/path/to/deploy
scp subscription-service/build/libs/subscription-service-0.0.1-SNAPSHOT.jar user@server:/path/to/deploy
```

3. **Create service scripts**:

For each service, create a systemd service file in `/etc/systemd/system/`:

Example for discovery-service:
```
[Unit]
Description=Netflix Clone Discovery Service
After=network.target

[Service]
User=youruser
WorkingDirectory=/path/to/deploy
ExecStart=/usr/bin/java -jar discovery-service-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143
TimeoutStopSec=10
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

4. **Enable and start the services**:

```bash
sudo systemctl enable discovery-service
sudo systemctl start discovery-service
# Repeat for other services
```

### Option 2: Deploy Using Docker

1. **Create Dockerfiles for each service**:

Example Dockerfile for a service:
```dockerfile
FROM eclipse-temurin:21-jdk
VOLUME /tmp
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

2. **Create a docker-compose.yml file**:

```yaml
version: '3'
services:
  mongodb:
    image: mongo:6.0
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"
    networks:
      - netflix-network

  discovery-service:
    build: ./discovery-service
    ports:
      - "8761:8761"
    networks:
      - netflix-network

  auth-service:
    build: ./auth-service
    depends_on:
      - mongodb
      - discovery-service
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/netflix_auth
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://discovery-service:8761/eureka/
    networks:
      - netflix-network

  content-service:
    build: ./content-service
    depends_on:
      - mongodb
      - discovery-service
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/netflix_content
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://discovery-service:8761/eureka/
    networks:
      - netflix-network

  subscription-service:
    build: ./subscription-service
    depends_on:
      - mongodb
      - discovery-service
      - auth-service
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/netflix_subscription
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://discovery-service:8761/eureka/
    networks:
      - netflix-network

  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - discovery-service
      - auth-service
      - content-service
      - subscription-service
    environment:
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://discovery-service:8761/eureka/
    networks:
      - netflix-network

networks:
  netflix-network:

volumes:
  mongo-data:
```

3. **Build and start the containers**:

```bash
docker-compose up -d
```

## Frontend Deployment

1. **Build the frontend**:

```bash
cd frontend
npm install
npm run build
```

2. **Deploy the build files**:

Option 1: Serve with Nginx:
```bash
# Copy files to Nginx document root
scp -r build/* user@server:/var/www/netflix-clone/
```

Configure Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/netflix-clone;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Option 2: Deploy with Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init
# Select hosting and follow the prompts
firebase deploy
```

## Production Configuration

### Security Considerations

1. **Generate a Strong JWT Secret**:
   Update the `jwt.secret` in the auth-service's `application.yml` for production.

2. **Enable HTTPS**:
   Configure SSL in your reverse proxy (Nginx, etc.).

3. **Configure CORS Properly**:
   Update the CORS settings in API Gateway to only allow your frontend domain.

### Scaling

1. **Horizontal Scaling**:
   You can run multiple instances of each service (except discovery-service) for load balancing.

2. **Database Scaling**:
   Consider setting up MongoDB replication for high availability.

## Monitoring and Maintenance

1. **Set up Logging**:
   Configure a centralized logging solution like ELK Stack.

2. **Implement Monitoring**:
   Use services like Prometheus and Grafana for monitoring.

3. **Regular Backups**:
   Schedule regular backups of your MongoDB databases.

## Troubleshooting

1. **Service Not Registering**:
   Check network connectivity between services and the discovery service.

2. **API Gateway Not Routing**:
   Verify service registration names match the routes defined in the gateway.

3. **Frontend Not Connecting**:
   Check CORS settings and ensure API endpoints are correctly configured.

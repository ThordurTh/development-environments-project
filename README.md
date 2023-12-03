# Containerizing a Web Application

This guide provides steps to containerize and run a web application built with Next.js, Nest.js, and MongoDB using Docker and Docker-Compose.

## Prerequisites

Before proceeding, ensure that you have the following installed on your system:

- Docker ([Installation Guide](https://docs.docker.com/get-docker/))

## Containerization Process

### 1. Clone the Repository

Clone the repository containing your Next.js frontend, Nest.js backend, and Docker configuration files.

### 2. Dockerfiles

You'll find Dockerfiles for the frontend and backend applications:

#### Frontend Dockerfile

```dockerfile
# Frontend Dockerfile
FROM node:20.3.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Backend Dockerfile

```dockerfile
# Backend Dockerfile
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

### 3. Docker-Compose File

Utilize the docker-compose.yml file to orchestrate the services:

```yml
version: '3'
services:
  frontend:
    build: ./OLA-5-FrontEnd
    ports: 
      - "3000:3000"

  backend:
    build: ./OLA-5-Server
    ports:
      - "8080:8080"
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017" 
    environment:
      MONGO_INITDB_ROOT_USERNAME: username
      MONGO_INITDB_ROOT_PASSWORD: password 
    volumes:
      - mongo-data:/data/hotels 

volumes:
  mongo-data: 

```

### 4. Running the Application

Execute the following commands in the terminal:

```bash
# Build and start the containers
docker-compose up --build
```

This will build the necessary Docker containers for the frontend, backend, and MongoDB services defined in the docker-compose.yml file and start the application.

### 5. Accessing the Application

- Frontend: Access the Next.js application at http://localhost:3000
- Backend: Nest.js application will be available at http://localhost:8080
- MongoDB: MongoDB service accessible at mongodb://username:password@localhost:27017

## Notes

- Make sure no other service is using the same ports (3000, 8080, 27017) to avoid conflicts.
- Adjust configuration files and environment variables as needed for your specific setup.

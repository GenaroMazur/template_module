# README #

## TypeScript Microservices Template ##

This project template provides a starting point for creating microservices using TypeScript. It includes configurations for using Express, MongoDB, Redis, and WebSocket (ws), which can be customized through the **.env** file.

### Features ###

* **Express**: Easily set up RESTful APIs.
* **MongoDB**: Integrate with MongoDB for data storage.
* **Redis**: Use Redis for caching and other purposes.
* **WebSocket** (ws): Enable real-time communication with WebSockets.

## Configuration ##

The project uses a **.env** file for configuration. Here is the structure of the **.env** file:

```properties
PORT_TCP=8080

# Uncomment to use the databases
# REDIS_URL="redis://localhost:6379"
# MONGO_URL="mongodb://localhost:25015"

# Connection with WebSocket (true / false)
WEBSOCKET=false
```

* **PORT_TCP**: The port on which the microservice will run.
* **REDIS_URL**: URL for connecting to Redis (uncomment to use).
* **MONGO_URL**: URL for connecting to MongoDB (uncomment to use).
* **WEBSOCKET**: Enable (true) or disable (false) WebSocket support.

## Commands ##

The project uses Yarn for package management and includes the following commands:

* **yarn build**: Compiles the project and generates the dist folder.
* **yarn dev**: Runs the project using ts-node-dev for development.
* **yarn test**: Executes tests using Jest.
* **yarn start**: Runs the compiled project from the dist folder.

## Getting Started ##

1. Clone the repository.
2. Install dependencies: **yarn**.
3. Configure the **.env** file as needed.
4. Build and run the project:

  * For development: yarn dev
  * For production: yarn build && yarn start

5. Optionally, build and run the Docker container:

```bash
Copy code
docker build -t my-microservice .
docker run -p 8080:8080 --env-file .env my-microservice
```

## License ##

This project is licensed under the MIT License.

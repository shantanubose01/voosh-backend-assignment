# Voosh Backend Assignment by Shantanu

This project is a backend application developed  for the Voosh backend assignment. It provides an API for user authentication, profile management, and other related functionalities.

## Getting Started

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible remotely

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shantanubose01/voosh-backend-assignment.git
   ```

2. Install dependencies:

   ```bash
   cd voosh-backend-assignment
   npm install
   ```

### Running the Application

1. Set up environment variables:

   - For your ease , env will be provided in the github repo itself.

2. Start the server:

   ```bash
   npm start
   ```

   This will start the server using nodemon, which automatically restarts the server when changes are detected.

## Endpoints

 base url - /api

- `/user/register`: Register a new user.
- `/user/login`: Login an existing user.
- `/user/update`: Update user details (requires authentication).
- `/user/visibility`: Update profile visibility (requires authentication).
- `/user/profile`: Get user profile (requires authentication).
- `/user/profiles`: Get all profiles (requires authentication).
- `/user/signout`: Sign out (requires authentication).   

## Swagger API

This application provides a Swagger API for easy interaction with the endpoints. Follow the steps below to explore and interact with the API:

1. After starting the server locally, navigate to `http://localhost:3001/api-docs` in your web browser.

2. You will be presented with the Swagger UI interface, where you can see all the available endpoints, their descriptions, request parameters, and responses.

3. Click on each endpoint to expand and see details about how to use them.

4. To interact with an endpoint, click on the "Try it out" button, fill in the required parameters, and click "Execute" to send a request to the server.
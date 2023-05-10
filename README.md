# Nodejs-Notes-App

This is a simple Notes App project aimed at learning backend development using Node.js and interacting with a MySQL database. The app allows users to create, read, update, and delete notes. Additionally, it includes user authentication with login and registration functionality, input validation, and user logout.

## Technologies Used

- Node.js (Express framework)
- MySQL
- Handlebars (templating engine)
- JWT (JSON Web Tokens)
- SASS

## Prerequisites

Before running the project, ensure that you have the following prerequisites:

- Node.js installed on your machine
- MySQL server set up

## Installation

- Clone the repository:

```sh
git clone <repository-url>
```

- Navigate to the project directory:

```sh
cd notes-app
```

- Install dependencies:

```sh
npm install
```

## Database Setup

- Create a new MySQL database for the project.
- Import the database schema from the `database/schema.sql` file.

## Configuration

- Create a new .env file in the project's root directory.
- Configure the following environment variables in the .env file:

```sh
# Port
PORT=

# Database info
DB_HOST=
DB_NAME=
DB_USER=

# JWT Authentication
JWT_ACCESS_KEY=
JWT_REFRESH_KEY=
```

## Usage

- Run the application:

```sh
npm start
```

- Access the app in your browser at http://localhost:3000

# REST-Deno

## Overview

REST-Deno is a simple Restful API backend written with Deno and Express. This project demonstrates how to build a RESTful API using Deno, a modern runtime for JavaScript and TypeScript, and Express, a minimal and flexible Node.js web application framework.
Project uses the server originally written with Node.js [here](https://github.com/Abdulkareemoj/node-react-ts-docker)

## Features

- User authentication with JWT
- Google OAuth2 authentication
- Role-based access control (RBAC)
- CRUD operations for products and posts
- Session management
- Schema validation with Zod
- MongoDB integration with Mongoose

## Project Structure

## Getting Started

### Prerequisites

- Deno
- MongoDB Database
- A terminal/CLI with Git
- A Text Editor or IDE of your choice

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/rest-deno.git
cd rest-deno
```

1. Rename the [.env.template] file to [.env] and fill in the required environment variables

2. Install dependencies:

```sh
deno install
```

### Running the Application

Start the development server:

```sh
deno task dev
```

The server will start on the port specified in the .env file.

### API Endpoints

Authentication

- POST /api/signin - Sign in a user
- POST /api/signout - Sign out a user

Users

- POST /api/users - Create a new user

Sessions

- POST /api/sessions - Create a new session
- GET /api/sessions - Get user sessions
- DELETE /api/sessions - Delete a session

Products

- POST /api/products - Create a new product
- PUT /api/products/:productId - Update a product
- GET /api/products/:productId - Get a product
- DELETE /api/products/:productId - Delete a product

Posts

- POST /api/posts - Create a new post
- PUT /api/posts/:postId - Update a post
- GET /api/posts/:postId - Get a post
- DELETE /api/posts/:postId - Delete a post

## License

This project is licensed under the MIT License.

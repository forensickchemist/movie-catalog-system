# Movie Catalog API

A simple REST API for managing a movie catalog. The API supports movie creation, retrieval, updating, deletion, and user comments.

## Features

* User authentication with JWT
* Admin-only movie management
* Retrieve all movies
* Retrieve a single movie
* Update movies
* Delete movies
* Add comments to movies
* Retrieve movie comments
* MongoDB database with Mongoose

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

## Project Structure

```text
project/
├── controllers/
│   ├── movieController.js
│   └── ...
├── middleware/
│   ├── asyncHandler.js
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models/
│   ├── Movie.js
│   └── User.js
├── routes/
│   ├── movieRoutes.js
│   └── ...
├── .env
├── server.js
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

Do not commit your `.env` file to Git.

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

For development, if you have a development script configured:

```bash
npm run dev
```

## Authentication

Protected endpoints require a JWT in the `Authorization` header.

```http
Authorization: Bearer <your_token>
```

Admin-only endpoints require the authenticated user to have `isAdmin: true`.

## Movie Endpoints

### Get All Movies

```http
GET /movies
```

Returns all movies in the catalog.

### Get Movie by ID

```http
GET /movies/:id
```

Returns a single movie.

### Add Movie

```http
POST /addMovie
```

Requires authentication and admin privileges.

Example request:

```json
{
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "description": "A thief who enters the dreams of others.",
    "genre": ["Sci-Fi", "Thriller"]
}
```

### Update Movie

```http
PUT /updateMovie/:id
```

Requires authentication and admin privileges.

Example request:

```json
{
    "title": "Inception",
    "year": 2010,
    "genre": ["Sci-Fi", "Thriller"],
    "poster": {
        "url": "https://example.com/poster.jpg",
        "publicId": "poster123"
    }
}
```

### Delete Movie

```http
DELETE /deleteMovie/:id
```

Requires authentication and admin privileges.

## Comment Endpoints

### Add Comment

```http
POST /:id/addComment
```

Requires authentication.

Example request:

```json
{
    "comment": "This movie was amazing!"
}
```

The authenticated user's ID is automatically stored with the comment.

### Get Movie Comments

```http
GET /:id/getComments
```

Returns the comments for a specific movie.

Example response:

```json
[
    {
        "userId": "66abc123...",
        "comment": "This movie was amazing!",
        "id": "67def456..."
    }
]
```

## Movie Model

A movie contains:

```text
title
director
year
description
genre
poster
comments
```

The poster is optional and can contain:

```json
{
    "url": "https://example.com/poster.jpg",
    "publicId": "poster123"
}
```

Each comment contains:

```json
{
    "userId": "user_id",
    "comment": "Comment text"
}
```

Mongoose automatically generates an ID for each comment.

## Error Handling

The API handles common errors such as:

* Invalid MongoDB IDs → `400 Bad Request`
* Validation errors → `400 Bad Request`
* Duplicate values → `409 Conflict`
* Unauthenticated requests → `401 Unauthorized`
* Unauthorized admin actions → `403 Forbidden`
* Missing resources → `404 Not Found`
* Unexpected server errors → `500 Internal Server Error`

## License

This project is for educational purposes.

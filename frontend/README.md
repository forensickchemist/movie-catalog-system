# Movie Catalog System — Frontend Documentation

## Overview

The **Movie Catalog System** is a React-based frontend application for browsing and managing a movie catalog.

The application provides a public movie-browsing experience for users and a protected administration area for managing movies and featured content.

## Resources

### Frontend Application

- **Production URL:** https://movie-catalog-system.vercel.app

### Backend API

- **API Base URL:** https://movie-catalog-system-fzuu.onrender.com

### Admin Account

For development/testing purposes:

- **Email:** `ingrid.bergman@hollywood.com`
- **Password:** 

> **Security note:** Password will be given upon request

## Features

### User Features

- User registration and login
- Protected authentication state
- Browse the movie catalog
- View individual movie details
- View featured movies
- View movie comments
- Add comments to movies
- Back navigation between pages
- Loading and error states
- Poster placeholders for unavailable images
- Responsive, cinematic user interface

### Admin Features

Authenticated administrators can access the admin dashboard to:

- View movies in a paginated table
- Search movies
- Sort movie table data
- Add movies
- Edit movies
- Delete movies
- Manage featured movies

## Frontend Architecture

The frontend is organized around reusable React components and separates UI, authentication, routing, and API communication.

```text
src/
├── components/
│   ├── reusable UI components
│   └── movie/admin components
├── context/
│   └── AuthContext
├── pages/
│   ├── authentication
│   ├── movies
│   └── admin
├── services/
│   └── API/service functions
├── App.jsx
└── main.jsx
```

### Main Architectural Areas

#### Components

Reusable UI components are used throughout the application to reduce duplication and keep the interface consistent.

Examples include:

- `Navbar`
- `Loading`
- `ErrorMessage`
- `PosterPlaceholder`
- Movie-related components
- Admin dashboard components

#### Context

`AuthContext` manages authentication-related state and makes the current user/session information available throughout the application.

#### Services

API requests are separated into service modules instead of being placed directly inside UI components.

The movie service handles operations such as:

- Fetching movies
- Fetching a movie by ID
- Adding movies
- Updating movies
- Deleting movies
- Fetching comments
- Adding comments

#### Routing

React Router is used for client-side navigation between:

- Public pages
- Authentication pages
- Movie pages
- Movie detail pages
- Protected admin pages

## API Endpoints Used by the Frontend

The frontend communicates with the deployed backend API.

### Users

#### `POST /users/login`

Authenticates a user.

**Request Body**

```json
{
  "email": "sample@mail.com",
  "password": "samplePw123"
}
```

#### `POST /users/register`

Registers a new user.

**Request Body**

```json
{
  "email": "sample@mail.com",
  "password": "samplePw123"
}
```

## Movies

### `POST /movies/addMovie`

Adds a new movie.

**Request Body**

```json
{
  "title": "Sample: The Movie",
  "director": "Sample L. Jackson",
  "year": 2024,
  "description": "sample description",
  "genre": "sample"
}
```

### `GET /movies/getMovies`

Retrieves the movie catalog.

**Request Body:** None

### `GET /movies/getMovie/:id`

Retrieves a specific movie using its ID.

**Request Body:** None

### `PATCH /movies/updateMovie/:id`

Updates an existing movie.

**Request Body**

```json
{
  "title": "Sample 2: The Update",
  "director": "Sample L. Jackson",
  "year": 2026,
  "description": "sample updated description",
  "genre": "sample"
}
```

### `DELETE /movies/deleteMovie/:id`

Deletes a movie using its ID.

**Request Body:** None

## Comments

### `POST /movies/addComment/:id`

Adds a comment to a specific movie.

**Request Body**

```json
{
  "comment": "Sample 2: The Reckoning is the best sample update of all time."
}
```

### `GET /movies/getComments/:id`

Retrieves comments associated with a specific movie.

**Request Body:** None

## Authentication & Authorization

The frontend uses authentication state to control access to protected functionality.

The general access flow is:

```text
Visitor
   │
   ├── Browse public movie content
   │
   └── Login/Register
          │
          ▼
     Authenticated User
          │
          ├── View movie details
          ├── Add comments
          │
          └── Administrator
                 │
                 ▼
            Admin Dashboard
```

Administrative pages are protected so regular users cannot access administrative functionality.

## Admin Dashboard

The admin dashboard is designed to remain usable as the movie catalog grows.

### Search

Administrators can search the movie table to quickly locate movies without manually browsing the entire catalog.

### Sorting

Movie table data can be sorted to make managing and locating records easier.

### Pagination

Movies are displayed using pagination rather than loading the entire catalog into one large table.

This keeps the administration interface practical as the database grows.

### Featured Movies

The frontend includes functionality for managing movies that are highlighted as featured content.

## UI & Design

The application follows a cinematic visual style appropriate for a movie catalog.

The movie detail experience includes a cinematic header that uses movie information and imagery to create a more immersive presentation.

The frontend also includes reusable loading, error, navigation, and placeholder components to provide consistent user feedback.

## Environment Configuration

The API base URL should be configured through the frontend's environment configuration rather than hard-coded throughout individual components.

For a Vite application, an environment variable can follow this pattern:

```env
VITE_API_URL=https://movie-catalog-system-fzuu.onrender.com
```

Use the environment variable name configured by the project when setting up a local or Vercel deployment.

> Never commit `.env` files containing secrets or private credentials to the repository.

## Running the Frontend Locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the backend API URL.

```env
VITE_API_URL=https://movie-catalog-system-fzuu.onrender.com
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## Deployment

The frontend is deployed on **Vercel**.

### Production

https://movie-catalog-system.vercel.app

When deploying a new version, make sure the required environment variables are configured in the Vercel project settings.

## Backend Dependency

This frontend depends on the deployed Movie API for:

- Authentication
- User registration
- Movie data
- Movie management
- Comments

Backend API:

https://movie-catalog-system-fzuu.onrender.com

If the backend is unavailable, features that require API communication may fail or display an error state.

## Technologies

- React
- React Router
- Vite
- JavaScript
- CSS
- React Context API
- REST API
- Vercel

## Project Status

**Status:** Deployed and functional

**Frontend:** https://movie-catalog-system.vercel.app

**Backend API:** https://movie-catalog-system-fzuu.onrender.com

The frontend is structured with reusable components and separated service/context layers so that additional movie catalog and administrative features can be added as the project evolves.

## Future Improvements

Potential future improvements include:

- Advanced movie filtering
- Genre filtering
- Additional movie sorting options
- User profiles
- Movie ratings
- Favorites and watchlists
- Comment editing and deletion
- Improved admin analytics
- Bulk movie management
- Improved accessibility
- Automated frontend testing
- Performance and image optimization

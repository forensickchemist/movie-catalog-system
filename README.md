# Movie Catalog System

A full-stack movie catalog web application that allows users to browse movies, view detailed movie information, interact through comments, and provides administrators with a dedicated dashboard for managing the movie catalog.

The application is deployed and accessible online:

**Live Demo:** https://movie-catalog-system.vercel.app

---

## Overview

The Movie Catalog System was developed as a web application for managing and browsing a collection of movies.

The system provides two primary experiences:

* **Users** can browse movies, view movie details, discover featured movies, and participate in discussions through comments.
* **Administrators** can manage the movie catalog through a dedicated dashboard with search, sorting, pagination, and movie management functionality.

The frontend was designed with reusable React components and a structured service/context architecture to keep the application maintainable as new features were added.

---

## Features

### User Features

* User authentication
* Protected routes
* Browse the movie catalog
* View individual movie details
* Cinematic movie detail header
* View movie posters and movie information
* View movie comments
* Add comments to movies
* Featured movie section
* Responsive navigation
* Back navigation between pages
* Loading states
* Error handling
* Poster placeholders when movie artwork is unavailable

### Authentication

The application includes an authentication system with:

* Login functionality
* Authentication state management
* Protected pages
* User session handling
* Admin access control

Authentication state is managed through a reusable `AuthContext`.

---

## Admin Dashboard

Administrators have access to a dedicated dashboard for managing the movie catalog.

### Movie Management

The admin dashboard supports:

* Viewing movies in a management table
* Adding movies
* Editing movies
* Deleting movies
* Searching movies
* Sorting table data
* Pagination
* Managing featured movies
* Administrative controls separate from the regular user experience

### Admin Table Search

The movie management table includes search functionality so administrators do not have to manually browse through the entire catalog.

Search is integrated into the existing dashboard/table structure rather than creating an entirely separate movie management interface.

### Table Sorting

Movie data can be sorted directly from the administration table.

This makes it easier to organize and locate movies as the catalog grows.

### Pagination

The admin movie table uses pagination instead of displaying the entire movie collection at once.

This keeps the dashboard practical as the database increases in size.

---

## Featured Movies

The application supports featured movies that can be highlighted throughout the user-facing interface.

The featured movie management functionality was designed with scalability in mind so administrators do not need to select from an unnecessarily large list of movies as the catalog grows.

---

## Movie Comments

Users can interact with movies through comments.

Movie detail pages provide functionality for:

* Loading existing comments
* Displaying comments associated with a movie
* Adding new comments
* Handling comment loading and error states

---

## User Interface

The interface was designed around a cinematic theme appropriate for a movie catalog application.

### Cinematic Header

Movie detail pages use a cinematic header that emphasizes the movie's visual identity and provides a more immersive presentation.

### Reusable UI Components

Common interface elements are implemented as reusable components to avoid duplicating UI and logic throughout the application.

Examples include:

* Navigation bar
* Loading indicators
* Error messages
* Poster placeholders
* Movie-related UI
* Admin dashboard components

---

## Navigation

The application uses client-side routing to provide separate pages for different parts of the application.

The routing structure supports:

* Public pages
* Authentication pages
* Movie pages
* Movie detail pages
* Protected admin pages

A back-navigation experience is also provided where appropriate to make navigating between movie pages more intuitive.

---

## Project Architecture

The frontend follows a component-based React architecture.

The main application structure is organized around:

```text
src/
├── components/
│   ├── reusable UI components
│   └── movie/admin components
│
├── context/
│   └── AuthContext
│
├── pages/
│   ├── movie-related pages
│   ├── authentication pages
│   └── admin pages
│
├── services/
│   └── API/service functions
│
├── App.jsx
└── main.jsx
```

The exact files may change as the application continues to evolve, but the overall structure separates:

* UI components
* Pages
* Authentication state
* API/service logic
* Application routing

---

## Reusable Components

A major part of the application's development was refactoring repeated functionality into reusable components.

Instead of placing all functionality directly inside individual pages, common functionality is extracted into components that can be reused throughout the application.

This makes the codebase:

* Easier to maintain
* Easier to modify
* Less repetitive
* More consistent
* Easier to extend with new features

---

## Service Layer

API-related functionality is separated from UI components through service modules.

For example, movie-related operations are handled through movie service functions rather than placing API requests directly inside every component.

This provides a cleaner separation between:

```text
UI
 ↓
React Components
 ↓
Service Layer
 ↓
Backend API
 ↓
Database
```

---

## State Management

Application-level authentication state is handled using React Context.

The authentication context allows components throughout the application to access the current authentication state without manually passing authentication information through multiple component levels.

Local component state is used for page-specific functionality such as:

* Movie data
* Comments
* Search values
* Sorting
* Pagination
* Loading states
* Error states
* Form values

---

## Protected Routes

Administrative functionality is protected so that regular users cannot access the admin dashboard.

The application uses authentication state together with route protection to distinguish between:

```text
Public User
     ↓
Authenticated User
     ↓
Administrator
```

---

## Responsive Design

The interface is designed to work across different screen sizes.

The layout adapts the movie catalog, navigation, movie details, and administrative interface for different viewport sizes.

---

## Deployment

The frontend application is deployed using **Vercel**.

### Production URL

https://movie-catalog-system.vercel.app

The deployed application represents the current production version of the Movie Catalog System.

---

## Running the Project Locally

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

Create a `.env` file in the project root and provide the environment variables required by the application.

Example:

```env
VITE_API_URL=<your-api-url>
```

Use the actual environment variable names configured in the project.

### 4. Start the development server

```bash
npm run dev
```

The application should then be available through the local development URL provided by Vite.

---

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Development Considerations

The application was progressively refactored as functionality increased.

Particular attention was given to:

* Reusable components
* Separation of API/service logic
* Authentication state management
* Protected routes
* Admin dashboard organization
* Search functionality
* Table sorting
* Pagination
* Featured movie management
* Loading and error states
* Responsive UI
* Maintainability as the movie catalog grows

---

## Future Improvements

Potential future improvements include:

* Advanced movie filtering
* Genre-based filtering
* Multiple sorting options
* Improved admin analytics
* Dashboard statistics
* Bulk movie management
* Improved featured movie selection
* User profile functionality
* Comment editing and deletion
* Movie ratings
* Watchlists
* Favorites
* Advanced authentication and authorization
* Improved accessibility
* Automated testing
* Performance optimization
* Image optimization and caching

---

## Technologies

The project is built around a modern React-based frontend architecture, including:

* React
* React Router
* Vite
* JavaScript
* CSS
* REST/API service architecture
* React Context
* Vercel deployment

---

## Project Status

**Status:** Deployed and functional

**Production:**
https://movie-catalog-system.vercel.app

The project is actively structured for continued development, with reusable components and a modular architecture allowing additional movie catalog and administrative features to be added without significantly restructuring the application.

**Test Accounts:**
- Admin
```
email: ingrid.bergman@hollywood.com
password: password123
```

- Regular User:
```
email: marion.cotillard@hollywood.com
password: password123
```


---

## License

This project was created for educational and development purposes.

Add the appropriate license here if the project will be distributed publicly.

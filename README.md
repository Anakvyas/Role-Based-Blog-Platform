# Role-Based Blog Platform

This is my backend assignment project for a role-based blog platform. The main focus of the project is authentication, authorization, secure CRUD APIs, and a simple frontend to test the complete flow.

## What this project does

- user signup and login
- admin login
- JWT authentication using cookies
- role-based access control
- blog CRUD for admin
- blog view access for normal users
- protected dashboard
- API documentation with Swagger
- versioned APIs using `/api/v1`
- Joi request validation
- centralized error handling
- request logging with log files

## Tech stack

- Node.js
- Express.js
- MongoDB with Mongoose
- React + Vite
- Tailwind CSS
- JWT
- bcrypt
- Joi
- Morgan
- react-hot-toast

## Roles

### User

- can sign up
- can log in
- can view blogs

### Admin

- can log in
- can create blogs
- can update blogs
- can delete blogs

## Main features

- secure signup and login flow
- JWT authentication with HTTP-only cookies
- role-based route protection
- admin-only blog create, update, and delete
- user read-only blog access
- protected frontend dashboard
- toast messages for API success and error responses
- Swagger API documentation
- Joi validation for request data
- centralized backend error handling
- request logging in a log file

## API routes

Base route:

```text
/api/v1
```

Auth routes:

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

Blog routes:

- `GET /api/v1/blogs`
- `POST /api/v1/blogs`
- `PUT /api/v1/blogs/:id`
- `DELETE /api/v1/blogs/:id`

## Swagger docs

After starting the backend, open this in the browser:

```text
http://localhost:3000/api-docs
```

## Logging

Backend requests are logged to:

```text
Backend/logs/access.log
```

## Project structure

```text
Backend/
  config/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  server.js

frontend/
  src/
    components/
    pages/
    utils/
```

## How to run the project

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend` and add:

```env
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=12345
```

Run the backend:

```bash
node server.js
```

If you want auto-reload during development, you can also run:

```bash
npx nodemon server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Admin account

For testing the admin flow, use:

- email: `admin@gmail.com`
- password: `12345`

## Frontend flow

- new users can sign up from the signup page
- after signup, they are redirected to login
- after login, they go to the dashboard
- if the logged-in user is an admin, they can manage blogs
- if the logged-in user is a normal user, they can only read blogs

## Security

- passwords are hashed using `bcrypt`
- JWT token is stored in an HTTP-only cookie
- admin-only routes are protected by middleware
- protected routes check authentication before access
- Joi is used for request validation on auth and blog routes
- backend uses centralized error handling for cleaner API responses

## Scalability note

The project is kept modular so new features can be added easily by following the same pattern of model, controller, route, and middleware. If this project needs to scale further, the next improvements would be:

- split auth and blog features into separate services/modules
- add Redis caching for frequently read blog data
- extend logging with monitoring and alerting
- use a load balancer for multiple backend instances
- add Docker for easier deployment

## Final note

This project was built to cover the assignment requirements with working authentication, role-based access, CRUD APIs, versioned APIs, Swagger documentation, validation, logging, a connected frontend, and a structure that can be extended later.

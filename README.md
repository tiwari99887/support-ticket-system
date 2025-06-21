🎫 Support Ticket Management System
A full-featured backend API built with Node.js, Express, and MongoDB to manage support tickets. This system includes JWT-based authentication, role-based authorization (User, Agent, Admin), and a complete ticket lifecycle.

—

📦 Project Overview

The Support Ticket Management System allows customers (Users) to create and manage support tickets, agents to respond to those tickets, and administrators to manage users and system settings.

Core Modules:

User Authentication (Register/Login)

Role Management (User, Agent, Admin)

Ticket CRUD (Create, View, Update, Delete)

Admin tools to manage users and roles

Search, filter, and pagination

—

🛠 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JSON Web Tokens (JWT)

bcryptjs

dotenv

nodemon

—

🚀 Setup Instructions

Step 1: Clone the Repository

git clone https://github.com/tiwari99887/support-ticket-system.git
cd support-ticket-system

Step 2: Install Dependencies

npm install

Step 3: Set Up Environment Variables

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/support-ticket-system
JWT_SECRET=mysecrettoken

Step 4: Start MongoDB Server

Ensure MongoDB is running locally:

mongod

Step 5: Run the Application

npm run dev

Server will start on http://localhost:5000

—

📂 Folder Structure

ticket-system/
│
├── config/ → MongoDB configuration
├── controllers/ → Business logic for auth, tickets, admin
├── middleware/ → Auth middleware and error handlers
├── models/ → Mongoose schemas for User and Ticket
├── routes/ → Auth, Ticket, Admin route files
├── app.js → Core Express setup
├── server.js → Entry point
└── .env → Environment variables

—

🔑 User Roles

Role Permissions
User Register, login, create/view/update/delete own tickets
Agent View all tickets, update/delete any ticket
Admin All agent privileges + manage users and their roles

—

🧪 API Documentation

Base URL: http://localhost:5000

Auth Routes

POST /auth/register
Register a new user
Body:

{
"name": "Shivam",
"email": "shivam@example.com",
"password": "123456"
}

POST /auth/login
Login and get JWT
Body:

{
"email": "shivam@example.com",
"password": "123456"
}

Response:

{
"token": "JWT_TOKEN"
}

Ticket Routes

All ticket routes require authentication via Bearer Token.

POST /tickets
Create a new ticket (role: user)
Body:

{
"title": "App Crash",
"description": "Crashing on login",
"priority": "high"
}

GET /tickets/my
Get tickets created by logged-in user (role: user)

GET /tickets
Get all tickets (role: agent/admin)
Query Parameters: status, priority, search, page, limit

GET /tickets/:id
Get a specific ticket (user can only view their own)

PATCH /tickets/:id
Update a ticket (role: agent or ticket creator)

DELETE /tickets/:id
Delete a ticket (role: agent or ticket creator)

Admin Routes

All admin routes require admin role and JWT auth.

GET /admin/users
View all users

PATCH /admin/users/:id/role
Change user role
Body:

{
"role": "agent"
}

PATCH /admin/users/:id/status
Enable/disable user
Body:

{
"isActive": false
}

—

📥 Testing with Thunder Client or Postman

Test /auth/register and /auth/login

Copy the JWT token and add to headers:
Authorization: Bearer <your_token>

Call /tickets and /admin routes as per role

—

📧 Author

Shivam Kumar Tiwari
Email: tiwarishivam99887@gmail.com

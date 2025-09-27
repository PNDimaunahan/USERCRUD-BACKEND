# User CRUD API

This project is a **backend API** for managing user data, built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**.  
It follows a clean folder structure and includes request logging and environment configuration.

---

## Folder Structure

```
src/
│
├── config/ # Database connection and environment config
├── controllers/ # Route handlers
├── middleware/ # Middleware functions (validation, logging, etc.)
├── repositories/ # Database interaction logic
├── routes/ # API route definitions
├── schemas/ # Zod validation schemas
├── services/ # Business logic
├── utils/ # Utility functions (e.g. logger)
├── validators/ # Request validation logic
│
├── app.js # Express app setup
└── server.js # Server startup
```
---

## Features

- CRUD operations for user management
- Request validation using **Zod**
- Environment configuration via `.env`
- Request logging to `logs/access.log`
- Archiving instead of soft deletion
- Organized folder structure for scalability

---

## Install Dependencies
```
npm install nodemon mongoose express cors dotenv zod
```

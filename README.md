🎬 WS5 Movie API

A simple RESTful API built with Node.js, Express, and MongoDB Atlas.
This project was created as part of the WS5 assignment to demonstrate backend development, database integration, and CRUD operations.

📌 Features
🔗 Database & Server

Connects to MongoDB Atlas using Mongoose

Uses Express middleware for request handling

Supports JSON request bodies

Easy to run locally

🎯 CRUD Functionality

The API provides full CRUD operations for movie items, including:

GET – Retrieve all movies

GET – Retrieve a movie by ID

POST – Create a new movie

PUT – Update an existing movie

DELETE – Delete a movie

🛠️ Technologies Used

Node.js

Express.js

MongoDB Atlas

Mongoose

PowerShell / curl / Invoke-RestMethod for testing

📡 API Endpoints Overview
➤ GET /api/movies

Returns all movies.

➤ GET /api/movies/:id

Returns a single movie by its MongoDB ID.

➤ POST /api/movies

Creates a new movie.

Example body:

{
  "title": "Avatar",
  "year": 2009,
  "director": "James Cameron",
  "rating": 8
}

➤ PUT /api/movies/:id

Updates an existing movie.

➤ DELETE /api/movies/:id

Deletes a movie by ID.

▶️ How to Run Locally
1. Install dependencies:
npm install

2. Create a .env file:
MONGODB_URI=your_connection_string_here

3. Start the server:
npm start


The API will run at:

http://localhost:3000

🧪 Testing Examples (PowerShell)
Create a movie:
Invoke-RestMethod -Uri "http://localhost:3000/api/movies" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{ title = "Avatar"; year = 2009; director = "James Cameron"; rating = 8 } | ConvertTo-Json)

Get all movies:
Invoke-RestMethod -Uri "http://localhost:3000/api/movies" -Method GET

👤 Author

Created by Astrit Popova
WS5 Backend Development Assignment

# Password Manager

## Overview
Password Manager is a secure and efficient web application that helps users manage their credentials for different websites. It allows users to store and retrieve usernames and passwords securely using MongoDB as the database.

## Features
- **Secure Storage:** User credentials are encrypted before being stored in MongoDB.
- **User Authentication:** Users can register and log in to access their saved passwords.
- **CRUD Operations:** Add, update, retrieve, and delete credentials.
- **Search Functionality:** Easily find saved credentials by site name.
- **Responsive UI:** User-friendly interface for managing passwords.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens) & bcrypt for password hashing

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/password-manager.git
   cd password-manager
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file in the root directory and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. **Run the application**
   ```sh
   npm start
   ```
5. **Access the application**
   - Open `http://localhost:3000` in your browser.

## API Endpoints
- `POST /register` - Register a new user
- `POST /login` - Authenticate a user
- `POST /save-password` - Save a new password
- `GET /get-passwords` - Retrieve stored passwords
- `PUT /update-password/:id` - Update a password
- `DELETE /delete-password/:id` - Delete a stored password

## Security Measures
- Passwords are encrypted using `bcrypt`.
- Authentication is secured using `JWT`.
- Uses `dotenv` for environment variable management.

## Future Enhancements
- Implement two-factor authentication (2FA).
- Add password strength meter.
- Implement role-based access control.
- Develop a browser extension for easier password retrieval.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


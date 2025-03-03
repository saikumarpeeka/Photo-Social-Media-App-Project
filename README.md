# Photo Social Media App

## Description

The **Photo Social Media App** is a feature-rich web application that enables users to share their favorite photos and engage with a community of photography enthusiasts. Built using the **MERN Stack (MongoDB, Express.js, React.js, Typescript, Node.js, Next.js)** along with **Tailwind CSS and Shadcn**, this project provides a seamless user experience with a modern and responsive UI. Users can upload images, like, comment, and interact with other users, making it a social hub for sharing visual content.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication** - Secure login and registration system using JWT authentication.
- **Photo Uploading** - Users can upload and manage photos, which are stored using **Cloudinary**.
- **Photo Feed** - A dynamic feed displaying photos from various users.
- **Like & Comment System** - Users can like and comment on posts to engage with others.
- **User Profiles** - Each user has a profile displaying their uploaded photos and bio.
- **Search Functionality** - Users can search for photos or other users by name or keyword.
- **Responsive UI** - Optimized for mobile and desktop experiences with a professional design.

## Technologies Used

### Frontend:
- **React.js** - Component-based architecture for a dynamic UI.
- **Tailwind CSS & Shadcn** - Modern and customizable UI components.
- **Axios** - Handling API requests efficiently.
- **React Router** - Client-side routing for navigation.

### Backend:
- **Node.js & Express.js** - RESTful API development.
- **MongoDB & Mongoose** - NoSQL database for storing user data and posts.
- **Cloudinary** - Media storage for image uploads.
- **JWT Authentication** - Secure authentication and authorization.

## Installation

To set up the project locally, follow these steps:

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/saikumarpeeka/Photo-Social-Media-App-Project.git
   cd Photo-Social-Media-App-Project
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

Once the project is set up, users can:

- **Sign Up / Log In** to access the platform.
- **Upload Photos** to share with the community.
- **Like & Comment** on posts to interact with others.
- **Search for Users and Photos** to discover new content.
- **Edit Your Profile** to update personal details and photos.

## Project Structure

```
Photo-Social-Media-App-Project/
│── backend/              # Express.js backend
│   ├── models/          # Mongoose models (User, Post)
│   ├── routes/          # API route handlers
│   ├── controllers/     # Business logic for handling requests
│   ├── middleware/      # Authentication and validation
│   ├── config/          # Configuration files (DB, Cloudinary)
│   ├── server.js        # Main server file
│
│── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components (Home, Profile, Login, etc.)
│   │   ├── api/         # Axios API requests
│   │   ├── App.js       # Main application file
│
│── .env.example         # Example environment variables
│── package.json         # Dependencies and scripts
│── README.md            # Documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login user and receive a JWT token.

### User
- `GET /api/users/:id` - Get user profile details.
- `PUT /api/users/:id` - Update user profile.

### Posts
- `POST /api/posts` - Create a new post.
- `GET /api/posts` - Get all posts.
- `GET /api/posts/:id` - Get a single post by ID.
- `PUT /api/posts/:id` - Update a post.
- `DELETE /api/posts/:id` - Delete a post.

### Likes & Comments
- `POST /api/posts/:id/like` - Like a post.
- `POST /api/posts/:id/comment` - Add a comment to a post.

## Contributing

We welcome contributions! To contribute:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-name
   ```
5. **Create a Pull Request** explaining your changes.

## License

This project is Open-source and avaliable for modification and use under the specified license.

---

⭐ Feel free to contribute and make this project better!

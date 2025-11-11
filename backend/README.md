# Recipe App - Backend API

A Node.js + Express.js backend for a Recipe management application with MongoDB integration, JWT authentication, and RESTful API endpoints.

## 🚀 Features

- **User Authentication**: Signup and login with JWT token generation
- **Recipe Management**: Create, read, update, and delete recipes
- **Authorization**: Owner-based access control for recipe operations
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` (or create `.env`)
   - Update the following variables:
     ```
     MONGODB_URL=mongodb://localhost:27017/recipe-app
     JWT_SECRET=your_secret_key_here
     PORT=5000
     NODE_ENV=development
     ```

4. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas connection string in `.env`

5. **Run the server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication

#### 1. Sign Up
- **POST** `/api/auth/signup`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### 2. Login
- **POST** `/api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Recipes

#### 3. Get All Recipes
- **GET** `/api/recipes`
- **Auth:** Not required
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recipes fetched successfully",
    "count": 5,
    "recipes": [
      {
        "_id": "recipe_id",
        "title": "Pasta Primavera",
        "description": "A delicious pasta with fresh veggies.",
        "ingredients": ["Pasta", "Tomato", "Basil"],
        "image": "https://...",
        "userId": {
          "_id": "user_id",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2025-11-11T00:00:00Z"
      }
    ]
  }
  ```

#### 4. Create Recipe
- **POST** `/api/recipes`
- **Auth:** Required (Bearer token in Authorization header)
- **Request Header:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Request Body:**
  ```json
  {
    "title": "Pasta Primavera",
    "description": "A delicious pasta with fresh veggies.",
    "ingredients": ["Pasta", "Tomato", "Basil", "Garlic"],
    "image": "https://example.com/image.jpg"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recipe created successfully",
    "recipe": {
      "_id": "recipe_id",
      "title": "Pasta Primavera",
      "description": "A delicious pasta with fresh veggies.",
      "ingredients": ["Pasta", "Tomato", "Basil", "Garlic"],
      "image": "https://example.com/image.jpg",
      "userId": {
        "_id": "user_id",
        "name": "John Doe"
      },
      "createdAt": "2025-11-11T00:00:00Z"
    }
  }
  ```

#### 5. Get Recipe by ID
- **GET** `/api/recipes/:id`
- **Auth:** Not required
- **Response:** Single recipe object (same structure as above)

#### 6. Update Recipe
- **PUT** `/api/recipes/:id`
- **Auth:** Required (Bearer token)
- **Authorization:** Must be recipe owner
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "ingredients": ["Updated", "Ingredients"],
    "image": "https://..."
  }
  ```
- **Response:** Updated recipe object

#### 7. Delete Recipe
- **DELETE** `/api/recipes/:id`
- **Auth:** Required (Bearer token)
- **Authorization:** Must be recipe owner
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recipe deleted successfully",
    "recipe": { ... }
  }
  ```

## 🗃️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  passwordHash: String,
  createdAt: Date
}
```

### Recipes Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  ingredients: [String],
  image: String (optional),
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

- Uses JWT (JSON Web Tokens) for stateless authentication
- Tokens expire after 7 days
- Password hashing with bcrypt (salt rounds: 10)
- Include token in Authorization header: `Bearer <token>`

## ✅ Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

### Common Error Codes
- **400**: Bad Request (missing or invalid fields)
- **401**: Unauthorized (invalid/expired token)
- **403**: Forbidden (not authorized to perform action)
- **404**: Not Found (resource doesn't exist)
- **409**: Conflict (duplicate email)
- **500**: Internal Server Error

## 📝 Development

### Scripts
- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon (auto-reload)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/recipe-app` |
| `JWT_SECRET` | Secret key for JWT signing | Required to change in production |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment type | `development` |

## 🧪 Testing the API

### Using cURL

**Sign Up:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

**Create Recipe:**
```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title":"My Recipe",
    "description":"Description",
    "ingredients":["Ingredient1","Ingredient2"]
  }'
```

**Get All Recipes:**
```bash
curl http://localhost:5000/api/recipes
```

### Using Postman

1. Import the API endpoints
2. Set up environment variable `{{base_url}}` = `http://localhost:5000`
3. After login, copy the token and set `{{token}}` = `<jwt_token>`
4. Use `Authorization: Bearer {{token}}` for protected routes

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** (dev) - Auto-reload during development

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create a cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URL` in `.env` or environment variables

### Hosting Options
- **Render.com** (free tier available)
- **Railway.app**
- **Heroku**
- **AWS/GCP/Azure**

### Deployment Steps
1. Set environment variables on your hosting platform
2. Ensure `JWT_SECRET` is strong and unique
3. Update `NODE_ENV` to `production`
4. Deploy with `npm start`

## 🤝 Contributing

Feel free to submit issues and pull requests.

## 📄 License

MIT License

## 📞 Support

For issues or questions, please create an issue in the repository.

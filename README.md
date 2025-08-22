# BookSwap Marketplace

A full-stack Node.js application for users to exchange used books. Built with Express.js, Sequelize ORM, MySQL database, and JWT authentication.

## 🚀 Features

### Core Functionality

- **User Authentication**: Secure signup/login with JWT tokens
- **Book Management**: Create, list, update, and delete books with image uploads
- **Book Requests**: Request books from other users with status tracking
- **User Profiles**: View and manage user information
- **File Uploads**: Support for book cover images

### Technical Features

- **RESTful API**: Clean, well-structured endpoints
- **Database**: MySQL with Sequelize ORM and migrations
- **Authentication**: JWT-based with password hashing
- **Validation**: Request validation using Joi
- **File Handling**: Multer for image uploads
- **Security**: Helmet, CORS, input sanitization
- **Logging**: Winston logger with structured output
- **Error Handling**: Comprehensive error management

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT, bcrypt
- **Validation**: Joi
- **File Upload**: Multer
- **Security**: Helmet, CORS
- **Logging**: Winston
- **Development**: Nodemon, ESLint

## 📋 Prerequisites

- Node.js 18+
- MySQL Server 8.0+
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd BookSwap
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your MySQL credentials
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bookswap
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Database Setup

```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npm run migrate
```

### 4. Start Development Server

```bash
npm run dev
```

Server will start at: `http://localhost:4000`

## 📚 API Documentation

### Base URL

```
http://localhost:4000/api
```

### Authentication Endpoints

#### POST /auth/signup

Create a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-08-22T10:00:00.000Z",
    "updatedAt": "2025-08-22T10:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### POST /auth/login

Authenticate existing user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** Same as signup

### User Endpoints

#### GET /users/me

Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-08-22T10:00:00.000Z",
  "updatedAt": "2025-08-22T10:00:00.000Z"
}
```

### Book Endpoints

#### POST /books

Create a new book listing.

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**

```
title: "Clean Code"
author: "Robert C. Martin"
condition: "good"
image: [optional file upload - field name must be "image"]
```

**Book Conditions:** `new`, `like_new`, `good`, `fair`, `poor`

**Important:** The `image` field must be a file upload, not a URL string. Use `multipart/form-data` with the field name `image`.

**Response:**

```json
{
  "id": "uuid",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "condition": "good",
  "imageUrl": "uploads/1234567890-image.jpg",
  "ownerId": "user_uuid",
  "createdAt": "2025-08-22T10:00:00.000Z",
  "updatedAt": "2025-08-22T10:00:00.000Z"
}
```

#### GET /books

List all available books.

**Response:**

```json
[
  {
    "id": "uuid",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "condition": "good",
    "imageUrl": "uploads/1234567890-image.jpg",
    "ownerId": "user_uuid",
    "createdAt": "2025-08-22T10:00:00.000Z",
    "updatedAt": "2025-08-22T10:00:00.000Z"
  }
]
```

#### GET /books/mine

List current user's books.

**Headers:** `Authorization: Bearer <token>`

#### PUT /books/:id

Update a book (owner only).

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**

```
title: "Updated Title" [optional]
author: "Updated Author" [optional]
condition: "like_new" [optional]
image: [optional file upload]
```

#### DELETE /books/:id

Delete a book (owner only).

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "success": true
}
```

### Request Endpoints

#### POST /requests

Request a book from another user.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "bookId": "book_uuid"
}
```

**Response:**

```json
{
  "id": "request_uuid",
  "status": "pending",
  "bookId": "book_uuid",
  "requesterId": "user_uuid",
  "createdAt": "2025-08-22T10:00:00.000Z",
  "updatedAt": "2025-08-22T10:00:00.000Z"
}
```

#### GET /requests/mine

List current user's requests.

**Headers:** `Authorization: Bearer <token>`

#### PATCH /requests/:id/status

Update request status (book owner only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "status": "accepted"
}
```

**Status Options:** `accepted`, `declined`

## 🧪 Testing with Postman

### Import Collection

1. Import `postman/BookSwap.postman_collection.json`
2. Import `postman/BookSwap.postman_environment.json`
3. Select "BookSwap" environment

### File Upload Testing

When testing book creation with images:

1. **Use `form-data` body type** (not `raw` JSON)
2. **Field name must be exactly `image`** (not `imageUrl` or any other name)
3. **Set the `image` field type to `File`** in Postman
4. **Select an actual image file** from your computer

**Example Postman Setup:**

- Body Type: `form-data`
- Fields:
  - `title`: `Clean Code` (Text)
  - `author`: `Robert C. Martin` (Text)
  - `condition`: `good` (Text)
  - `image`: [Select File] (File)

**Common Mistakes:**

- ❌ Using field name `imageUrl` instead of `image`
- ❌ Using `raw` JSON body instead of `form-data`
- ❌ Setting image field type to `Text` instead of `File`

### Test Flow

1. **Signup** → **Login** → Get JWT token
2. **Create Book** → Book ID auto-saved
3. **List Books** → View all books
4. **Create Request** → Request someone else's book
5. **Update Request Status** → Accept/decline requests

### Environment Variables

- `base_url`: `http://localhost:4000/api`
- `token`: Auto-populated after login
- `book_id`: Auto-populated after creating book
- `request_id`: Auto-populated after creating request

## 📁 Project Structure

```
BookSwap/
├── src/
│   ├── config/
│   │   └── index.js          # Configuration loader
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── request.controller.js
│   │   └── user.controller.js
│   ├── database/
│   │   ├── config.js         # Sequelize config
│   │   ├── migrations/       # Database migrations
│   │   └── seeders/          # Database seeders
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   └── validate.js       # Request validation
│   ├── models/
│   │   ├── index.js          # Sequelize bootstrap
│   │   ├── user.js           # User model
│   │   ├── book.js           # Book model
│   │   └── bookrequest.js    # BookRequest model
│   ├── routes/
│   │   ├── index.js          # Route aggregator
│   │   ├── auth.routes.js
│   │   ├── book.routes.js
│   │   ├── request.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── book.service.js
│   │   ├── request.service.js
│   │   └── user.service.js
│   ├── utils/
│   │   └── logger.js         # Winston logger
│   ├── validation/
│   │   ├── auth.validation.js
│   │   ├── book.validation.js
│   │   └── request.validation.js
│   └── server.js             # Express app entry
├── uploads/                  # File upload directory
├── postman/                  # Postman collection & environment
├── .env.example             # Environment template
├── .sequelizerc             # Sequelize CLI config
└── package.json
```

## 🗄️ Database Schema

### Users Table

- `id` (UUID, Primary Key)
- `name` (VARCHAR, Required)
- `email` (VARCHAR, Unique, Required)
- `password` (VARCHAR, Hashed, Required)
- `createdAt`, `updatedAt` (Timestamps)

### Books Table

- `id` (UUID, Primary Key)
- `title` (VARCHAR, Required)
- `author` (VARCHAR, Required)
- `condition` (ENUM: new, like_new, good, fair, poor)
- `imageUrl` (VARCHAR, Optional)
- `ownerId` (UUID, Foreign Key to Users)
- `createdAt`, `updatedAt` (Timestamps)

### BookRequests Table

- `id` (UUID, Primary Key)
- `status` (ENUM: pending, accepted, declined, Default: pending)
- `bookId` (UUID, Foreign Key to Books)
- `requesterId` (UUID, Foreign Key to Users)
- `createdAt`, `updatedAt` (Timestamps)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run migrate      # Run database migrations
npm run seed         # Run database seeders
npm run lint         # Run ESLint
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Joi schema validation
- **CORS Protection**: Cross-origin request handling
- **Helmet Security**: HTTP headers protection
- **File Upload Security**: Multer with file type validation

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "details": ["Specific validation errors"]
}
```

Common HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `409` - Conflict (Duplicate data)
- `500` - Internal Server Error

## 🔄 API Workflow Examples

### Complete Book Exchange Flow

1. **Alice signs up and logs in**

   ```bash
   POST /auth/signup
   POST /auth/login
   ```

2. **Alice creates a book listing**

   ```bash
   POST /books (with form data)
   ```

3. **Bob signs up and logs in**

   ```bash
   POST /auth/signup
   POST /auth/login
   ```

4. **Bob requests Alice's book**

   ```bash
   POST /requests {"bookId": "alice_book_id"}
   ```

5. **Alice accepts the request**
   ```bash
   PATCH /requests/request_id/status {"status": "accepted"}
   ```

## 🚀 Deployment

### Production Setup

1. Set `NODE_ENV=production` in environment
2. Configure production database
3. Set secure JWT secret
4. Configure file upload directory
5. Set up reverse proxy (nginx)
6. Use PM2 for process management

### Environment Variables

```bash
NODE_ENV=production
PORT=4000
DB_HOST=your_db_host
DB_PORT=3306
DB_NAME=bookswap_prod
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Failed**

- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists: `npx sequelize-cli db:create`

**Migration Errors**

- Drop and recreate database
- Check migration files for syntax errors
- Verify MySQL version compatibility

**JWT Token Issues**

- Check JWT_SECRET in `.env`
- Verify token format: `Bearer <token>`
- Check token expiration

**File Upload Issues**

- Ensure `uploads/` directory exists
- Check file size limits (max 5MB)
- Verify file type restrictions (images only)
- **Common Error:** `"Unexpected field"` - Field name must be exactly `image`, not `imageUrl`
- **Common Error:** `"body.imageUrl" is not allowed` - Use file upload with field name `image`, not `imageUrl` text field
- **Postman Setup:** Use `form-data` body type with `image` field set to `File` type
- **Field Name:** Must be exactly `image` (case sensitive)

**Validation Errors**

- Check request body format
- Verify required fields
- Check data types and constraints

## 📞 Support

For issues and questions:

1. Check the troubleshooting section
2. Review API documentation
3. Check server logs for detailed errors
4. Create an issue in the repository

---

**Built with ❤️ using Node.js, Express, and Sequelize**

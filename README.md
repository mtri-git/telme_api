# Telme API Server

## Overview

Telme is a real-time chat application backend that provides robust communication infrastructure with advanced features for modern messaging experiences.

## 🚀 Features

### Core Functionality
- Real-time messaging
- User authentication and authorization
- One-to-one and group chat support
- Message status tracking (sent, delivered, read)
- Multimedia message support

### Advanced Features
- WebSocket real-time communication
- JWT-based authentication
- User presence tracking
- Message encryption
- Comprehensive error handling

## 🛠 Technologies

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
- Mongoose
- JSON Web Token (JWT)

### Security
- bcrypt for password hashing
- helmet for HTTP security
- cors protection
- Rate limiting
- Input validation

## 📦 Prerequisites

- Node.js (v16.0.0 or higher)
- MongoDB (v5.0 or higher)
- npm (v8.0.0 or higher)

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/mtri-git/telme_api.git
cd telme_api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Run the development server
```bash
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register`: User registration
- `POST /api/auth/login`: User login
- `POST /api/auth/renew-token`: Token refresh

### User
- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile
- `GET /api/users/search`: Search users

### Chat
- `POST /api/chats/create`: Create new chat
- `GET /api/chats`: List user chats
- `GET /api/chats/:chatId`: Get specific chat details

### Messages
- `POST /api/messages/send`: Send a message
- `GET /api/messages/:chatId`: Retrieve chat messages

## 🔐 Authentication Flow

1. Register a new account
2. Login to receive JWT tokens
3. Use access token for authenticated requests
4. Use refresh token to obtain new access tokens

## 📝 Environment Configuration

You can config the .env.develop

## 📊 Performance Considerations

- Implemented connection pooling
- Indexed database collections
- Efficient query optimization
- Pagination for large datasets

## 🛡️ Security Measures

- Input sanitization
- Rate limiting
- CORS configuration
- Secure HTTP headers
- JWT token validation
- Password complexity requirements

## 🧪 Testing

```bash
npm test
```

Includes:
- Unit tests
- Integration tests
- API endpoint tests

## 📦 Deployment

Supports deployment on:
- Heroku
- AWS
- DigitalOcean
- Vercel

### Docker Support
```bash
docker-compose up
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

**Author**: MTri
**Email**: [Your Email]
**Project Link**: https://github.com/mtri-git/telme_api

---

**Made with ❤️ by mtri-git**
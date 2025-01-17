﻿# Telme API Server

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
- Fastify.js
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
yarn install
```

3. Create a `.env` file with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Run the development server
```bash
yarn dev
```

## 🌐 API Endpoints
You can download api endpoint file for postman: telme.postman_collection.json

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

- CORS configuration
- Secure HTTP headers
- JWT token validation
- Password complexity requirements

## 📦 Deployment

This repo currently deploy on [render](https://render.com/)

<!-- ### Docker Support
```bash
docker-compose up
``` -->
## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

**Author**: MTri
**Project Link**: https://github.com/mtri-git/telme_api

---

**Made with ❤️ by mtri-git**

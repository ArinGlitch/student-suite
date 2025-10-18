# Student Suite - Campus Management Platform

A full-stack web application for managing campus activities including courses, assignments, attendance, and announcements with role-based access control.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system
- Git (to clone the repository)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd student-suite
```

### 2. Environment Setup
```bash
# Copy the environment template
cp env.example .env

# Edit the .env file with your preferred settings
nano .env
```

### 3. Run with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 4. Access the Application
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:5001
- **MongoDB**: localhost:27017

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📋 Available Scripts

### Root Level
- `npm run dev` - Start backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐳 Docker Commands

### Basic Operations
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
```

### Database Operations
```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh

# Backup database
docker-compose exec mongodb mongodump --out /data/backup

# Restore database
docker-compose exec mongodb mongorestore /data/backup
```

### Development
```bash
# Run only database
docker-compose up mongodb

# Run backend with local database
docker-compose up mongodb backend

# Rebuild specific service
docker-compose build backend
```

## 🏗️ Architecture

### Services
- **Frontend**: React + Vite + Chakra UI (Port 80)
- **Backend**: Node.js + Express (Port 5001)
- **Database**: MongoDB (Port 27017)

### Features
- Role-based access control (Students, Faculty, Admins)
- Real-time updates
- Responsive design
- RESTful API
- Secure authentication

## 🔧 Configuration

### Environment Variables
- `MONGO_ROOT_USERNAME` - MongoDB root username
- `MONGO_ROOT_PASSWORD` - MongoDB root password
- `MONGO_DATABASE` - Database name
- `NODE_ENV` - Environment (development/production)
- `PORT` - Backend server port

### MongoDB Connection
The application connects to MongoDB using the connection string:
```
mongodb://username:password@mongodb:27017/database_name?authSource=admin
```

## 🚀 Production Deployment

### Using Docker Compose
1. Set `NODE_ENV=production` in your `.env` file
2. Use a reverse proxy (nginx) for SSL termination
3. Set up proper secrets management
4. Configure monitoring and logging

### Environment-specific Configurations
- Update `VITE_API_URL` for frontend API calls
- Configure proper CORS settings
- Set up database backups
- Enable security headers

## 📊 Health Checks

All services include health checks:
- **Backend**: `GET /api/tasks`
- **Frontend**: `GET /health`
- **MongoDB**: `mongosh --eval "db.adminCommand('ping')"`

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 5000, and 27017 are available
2. **Database connection**: Check MongoDB credentials in `.env`
3. **Build failures**: Clear Docker cache with `docker system prune`
4. **Permission issues**: Ensure Docker has proper permissions

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

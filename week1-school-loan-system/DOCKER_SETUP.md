# Docker Setup for School Loan System

This guide will help you set up the complete development environment using Docker containers for MongoDB, PostgreSQL, and Redis.

## 🚀 Quick Start

### 1. Start All Services
```bash
npm run docker:up
```

This will start:
- MongoDB (port 27017)
- PostgreSQL (port 5432)
- Redis (port 6379)
- pgAdmin (port 5050) - PostgreSQL GUI
- Mongo Express (port 8081) - MongoDB GUI

### 2. Start the Application
```bash
npm run full:setup
```

This will start all Docker services and then run your application.

## 📋 Available Commands

### Database Services
```bash
# Start only databases
npm run docker:db:up

# Stop only databases
npm run docker:db:down

# Start only GUI tools
npm run docker:gui:up

# Stop only GUI tools
npm run docker:gui:down
```

### Full Stack
```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs

# Clean up (remove volumes and orphans)
npm run docker:clean
```

### Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔧 Service Details

### MongoDB
- **Container**: school-loan-mongodb
- **Port**: 27017
- **Database**: school_loan_system
- **Username**: admin
- **Password**: password123
- **Connection**: `mongodb://admin:password123@localhost:27017/school_loan_system?authSource=admin`

### PostgreSQL
- **Container**: school-loan-postgres
- **Port**: 5432
- **Database**: school_loan_system
- **Username**: postgres
- **Password**: password123

### Redis
- **Container**: school-loan-redis
- **Port**: 6379
- **No authentication required**

### pgAdmin (PostgreSQL GUI)
- **URL**: http://localhost:5050
- **Email**: admin@schoolloan.com
- **Password**: admin123

### Mongo Express (MongoDB GUI)
- **URL**: http://localhost:8081
- **No authentication required**

## 📁 Project Structure

```
├── docker/
│   ├── mongo-init/
│   │   └── init.js          # MongoDB initialization script
│   └── postgres-init/
│       └── init.sql         # PostgreSQL initialization script
├── docker-compose.yml        # Docker services configuration
└── src/
    └── config/
        ├── env.js           # Environment variables
        ├── mongo.js         # MongoDB connection
        └── postgres.js      # PostgreSQL connection
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Environment Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
MONGO_URI=mongodb://admin:password123@localhost:27017/school_loan_system?authSource=admin

PG_DB=school_loan_system
PG_USER=postgres
PG_PASS=password123
PG_HOST=localhost
PG_PORT=5432

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## 🗄️ Database Initialization

### MongoDB
- Automatically creates `users` and `audit_logs` collections
- Sets up indexes and validation rules
- Inserts sample user data

### PostgreSQL
- Creates `loans` and `payments` tables with proper relationships
- Sets up indexes for performance
- Creates triggers for `updated_at` timestamps
- Inserts sample loan and payment data

## 🔍 Health Checks

- **Application**: http://localhost:3000/health
- **Swagger Docs**: http://localhost:3000/docs

## 🛠️ Troubleshooting

### Services Won't Start
```bash
# Check if ports are available
docker-compose ps

# View service logs
docker-compose logs [service-name]

# Restart services
docker-compose restart
```

### Database Connection Issues
```bash
# Check if databases are healthy
docker-compose ps

# Wait for databases to be ready (can take up to 30 seconds)
sleep 30

# Check database logs
docker-compose logs mongodb
docker-compose logs postgres
```

### Clean Restart
```bash
# Stop everything and clean up
npm run docker:clean

# Start fresh
npm run docker:up
```

## 🎯 Production Deployment

For production deployment:

1. Update environment variables with production values
2. Use managed database services (AWS RDS, MongoDB Atlas, etc.)
3. Configure proper security settings
4. Use Docker secrets for sensitive data
5. Set up monitoring and logging

## 📞 Support

If you encounter issues:

1. Check the logs: `npm run docker:logs`
2. Verify Docker is running: `docker --version`
3. Check port availability: `netstat -tlnp | grep :[port]`
4. Restart services: `npm run docker:clean && npm run docker:up`


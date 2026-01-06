# Redis Mastery - 8 Week Backend Challenge

A comprehensive Node.js/Express API demonstrating advanced Redis features and data structures through 12 practical exercises.

## 🚀 Features

- **Redis Integration**: Full integration with Redis using ioredis
- **12 Comprehensive Exercises**: Each demonstrating different Redis capabilities
- **RESTful API**: Clean Express.js API with proper error handling
- **Swagger Documentation**: Complete API documentation
- **Performance Testing**: Pipeline performance comparisons

## 🏗️ Architecture

```
redis-mastery/
├── src/
│   ├── config/
│   │   └── redis.js          # Redis client configuration
│   │   └── env.js            # Environment variables
│   ├── helpers/
│   │   ├── swaggerHelper.js      # Swagger UI helper functions
│   │   └── swaggerTemplate.html  # Swagger UI HTML template
│   ├── modules/
│   │   └── exercise/
│   │       ├── exercise.controller.js  # API controllers
│   │       └── exercise.service.js     # Business logic & Redis operations
│   ├── routes/
│   │   ├── exercise.routes.js          # Exercise endpoints
│   │   └── routes.js                   # Main router
│   ├── server.js                       # Express server setup
│   └── utils/
│       └── pipelinePerformanceTest.js  # Performance testing utilities
├── docs/
│   └── swagger.yml                     # API documentation
├── package.json
├── .env
└── README.md
```

## 📋 Prerequisites

- **Node.js** (>= 16.0.0)
- **Redis Server** (>= 7.0)
- **npm** or **yarn**

## 📖 Documentation

- **API Documentation**: Complete Swagger/OpenAPI specs available at `docs/swagger.yml`
- **Interactive Docs**: Import the YAML file into Swagger UI or Postman for interactive testing

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd redis-mastery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Redis server**
   ```bash
   redis-server
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USERNAME=default
   REDIS_PASSWORD=your_password
   PORT=3000
   ```

5. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

6. **View API Documentation**
   ```bash
   # Interactive Swagger UI (Recommended)
   # Visit: http://localhost:3000/docs/

   # Or access raw YAML file:
   # Visit: http://localhost:3000/docs/swagger.yml

   # Alternative: Use online Swagger Editor
   # Copy docs/swagger.yml content to https://editor.swagger.io/
   ```

## 📚 API Endpoints

### Root Endpoints
- **GET /** - Visit counter with Redis caching
- **GET /docs/** - Interactive API documentation (Swagger UI)
- **GET /docs/swagger.yml** - Raw OpenAPI specification

### Exercise Endpoints

| Method | Endpoint | Description | Redis Concepts |
|--------|----------|-------------|----------------|
| GET | `/api/exercise/` | Welcome message | - |
| GET | `/api/exercise/one` | Visit counter & OTP generation | Strings, TTL, Lists |
| GET | `/api/exercise/two` | Transaction example | Multi/Exec, Watch |
| GET | `/api/exercise/three` | Hash operations | Hashes |
| GET | `/api/exercise/four` | Set operations | Sets |
| GET | `/api/exercise/five` | Sorted set operations | Sorted Sets, Rankings |
| GET | `/api/exercise/six` | Pub/Sub messaging | Publish/Subscribe |
| GET | `/api/exercise/seven` | Financial transactions | Transactions |
| GET | `/api/exercise/eight` | Pipeline performance | Pipelining |
| GET | `/api/exercise/nine` | Custom Lua scripts | Scripting |
| GET | `/api/exercise/ten` | Stream processing | Streams |
| GET | `/api/exercise/eleven` | Database inspection | Scan, Info, Types |
| GET | `/api/exercise/twelve` | Geospatial queries | Geo commands |

### Detailed Exercise Breakdown

1. **Exercise One**: Implements a visit counter with OTP generation, demonstrating string operations, TTL management, and list-based recent items tracking.

2. **Exercise Two**: Shows Redis transactions for atomic operations, useful for financial transfers and multi-step operations.

3. **Exercise Three**: Demonstrates hash data structures for storing user profiles and object-like data.

4. **Exercise Four**: Covers set operations for unique collections like tags, followers, or access control lists.

5. **Exercise Five**: Implements sorted sets for leaderboards, rankings, and ordered collections with scores.

6. **Exercise Six**: Real-time messaging with Redis Pub/Sub pattern for notifications and live updates.

7. **Exercise Seven**: Atomic financial transactions ensuring data consistency in money transfers.

8. **Exercise Eight**: Performance optimization using Redis pipelining to batch multiple commands.

9. **Exercise Nine**: Custom server-side logic with Lua scripting for complex operations.

10. **Exercise Ten**: Event sourcing with Redis Streams for message queues and audit trails.

11. **Exercise Eleven**: Database introspection using SCAN, TYPE, DBSIZE, and INFO commands.

12. **Exercise Twelve**: Location-based queries using Redis geospatial commands for ride-sharing apps.

## 🔧 Redis Concepts Covered

### Data Structures
- **Strings**: Basic key-value operations, counters, TTL
- **Hashes**: Object-like data storage
- **Lists**: Ordered collections, queues
- **Sets**: Unique value collections
- **Sorted Sets**: Ordered unique collections
- **Streams**: Append-only logs for event sourcing
- **Geospatial**: Location-based queries

### Advanced Features
- **Pub/Sub**: Real-time messaging
- **Transactions**: Atomic operations
- **Pipelining**: Performance optimization
- **Lua Scripting**: Custom server-side logic
- **SCAN**: Safe key iteration
- **TTL & Expiration**: Automatic key expiration
- **Connection Pooling**: Efficient client management

## 📖 API Usage Examples

### Basic Usage
```bash
# Get visit count
curl http://localhost:3000/

# Get exercise welcome
curl http://localhost:3000/api/exercise/

# Execute exercise one
curl http://localhost:3000/api/exercise/one
```

### Using Swagger Documentation
1. **Online Swagger Editor**: Copy the contents of `docs/swagger.yml` and paste into [swagger.io/editor](https://editor.swagger.io/)
2. **Postman**: Import the YAML file directly into Postman for testing
3. **Swagger UI**: Serve the YAML file with a local Swagger UI instance

### Interactive Testing
The Swagger documentation provides:
- Complete endpoint specifications
- Request/response examples
- Error handling details
- Redis operations explained for each exercise

### Sample Response
```json
{
  "message": "Exercise One executed",
  "data": {
    "visitorCount": 42,
    "otpToken": "123456",
    "ttl": 30,
    "recentOtps": ["123456", "789012", "345678"]
  }
}
```

## 🔍 Monitoring & Debugging

### Redis CLI Commands
```bash
# Connect to Redis
redis-cli

# View all keys
KEYS *

# Check key type
TYPE your_key

# Get key info
TTL your_key
EXISTS your_key

# Monitor commands (in another terminal)
MONITOR
```

### Server Logs
The server provides detailed console logs for each Redis operation, including:
- Connection status
- Operation results
- Error handling
- Performance metrics

## 🧪 Testing

### Manual Testing
Use tools like Postman, Insomnia, or curl to test endpoints.

### Performance Testing
The project includes pipeline performance testing utilities:
```javascript
// Located in src/utils/pipelinePerformanceTest.js
// Compare pipelined vs non-pipelined operations
```

## 📋 Development

### Project Structure
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic and Redis operations
- **Routes**: Define API endpoints
- **Config**: Redis and environment configuration
- **Utils**: Performance testing and utilities

### Adding New Exercises
1. Add service function in `exercise.service.js`
2. Add controller function in `exercise.controller.js`
3. Add route in `exercise.routes.js`
4. Update Swagger documentation
5. Test the endpoint

## 🔒 Security Considerations

- Environment variables for sensitive configuration
- Input validation for all endpoints
- Redis authentication enabled
- Connection pooling for performance

## 🚀 Deployment

### Environment Setup
1. Set up Redis server (local or cloud)
2. Configure environment variables
3. Build and deploy the Node.js application

### Recommended Redis Providers
- **Local**: Redis server installation
- **Cloud**: Redis Labs, AWS ElastiCache, Google Memorystore
- **Docker**: Redis official Docker image

## 📈 Performance Optimization

- **Connection Pooling**: Reuse Redis connections
- **Pipelining**: Batch multiple commands
- **Caching Strategy**: TTL-based expiration
- **Memory Management**: Monitor Redis memory usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Update documentation
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details.

## 🙏 Acknowledgments

This project demonstrates Redis capabilities through hands-on exercises, perfect for learning advanced Redis features and best practices.

---

**Happy coding! 🎉**

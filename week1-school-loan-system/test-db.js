require('dotenv').config();
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

// Test MongoDB connection
async function testMongoDB() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://admin:password123@localhost:27017/school_loan_system?authSource=admin";
    console.log('Testing MongoDB connection...');
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');

    // Test basic operations
    const db = mongoose.connection.db;
    const collections = await db.collections();
    console.log(`📊 Available collections: ${collections.map(c => c.collectionName).join(', ')}`);

    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
}

// Test PostgreSQL connection
async function testPostgreSQL() {
  try {
    console.log('Testing PostgreSQL connection...');
    const sequelize = new Sequelize(
      process.env.PG_DB || 'school_loan_system',
      process.env.PG_USER || 'postgres',
      process.env.PG_PASS || 'password123',
      {
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT || 5432,
        dialect: 'postgres',
        logging: false
      }
    );

    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');

    // Test basic query
    const [results] = await sequelize.query('SELECT version()');
    console.log('📊 PostgreSQL version:', results[0].version.split(' ')[0]);

    await sequelize.close();
    return true;
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Testing database connections...\n');

  const mongoOk = await testMongoDB();
  console.log('');
  const postgresOk = await testPostgreSQL();

  console.log('\n' + '='.repeat(50));
  if (mongoOk && postgresOk) {
    console.log('🎉 All database connections successful!');
    console.log('✅ Ready to start the application');
  } else {
    console.log('❌ Some database connections failed');
    console.log('🔧 Check your Docker containers and configuration');
  }
  console.log('='.repeat(50));
}

runTests().catch(console.error);


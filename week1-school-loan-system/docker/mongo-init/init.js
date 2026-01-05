// MongoDB initialization script for School Loan System

// Switch to the school_loan_system database
db = db.getSiblingDB('school_loan_system');

// Create users collection with validation
db.createCollection('users', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'createdAt'],
            properties: {
                name: {
                    bsonType: 'string',
                    minLength: 2,
                    maxLength: 100,
                    description: 'User full name'
                },
                email: {
                    bsonType: 'string',
                    pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
                    description: 'User email address'
                },
                createdAt: {
                    bsonType: 'date',
                    description: 'Account creation timestamp'
                },
                updatedAt: {
                    bsonType: 'date',
                    description: 'Last update timestamp'
                }
            }
        }
    },
    validationLevel: 'moderate',
    validationAction: 'warn'
});

// Create indexes for users collection
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });
db.users.createIndex({ name: 1 });

// Insert sample users data
db.users.insertMany([
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

// Create audit_logs collection for tracking changes
db.createCollection('audit_logs', {
    capped: true,
    size: 1048576, // 1MB
    max: 1000     // Maximum 1000 documents
});

// Create index for audit logs
db.audit_logs.createIndex({ timestamp: -1 });
db.audit_logs.createIndex({ action: 1 });

// Insert sample audit log
db.audit_logs.insertOne({
    action: 'database_initialized',
    details: 'School Loan System database initialized',
    timestamp: new Date(),
    ip: 'system'
});

// Print completion message
print('MongoDB initialization completed successfully!');
print('Database: school_loan_system');
print('Collections created: users, audit_logs');
print('Sample data inserted for testing.');


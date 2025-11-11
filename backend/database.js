const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/recipe-app';
    
    const connection = await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(` MongoDB connected successfully`);
    console.log(` Database: ${connection.connection.db.databaseName}`);
    console.log(` Host: ${connection.connection.host}`);
    
    return connection;
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  disconnectDB
};

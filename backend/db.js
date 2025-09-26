const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL=process.env.MONGO_URI

mongoose.connect(mongoURL)
mongoose.set('strictQuery', true);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

db.on('error', (err) => {
  console.log('Error opening MongoDB connection:', err);
});


module.exports=db;
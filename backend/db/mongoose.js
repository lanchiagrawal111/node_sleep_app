const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://lanchiagrawal11:Lanchi5566@cluster0.vmqenah.mongodb.net/Wysa?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = mongoose;

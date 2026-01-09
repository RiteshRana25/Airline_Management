const mongoose = require('mongoose');

let isConnected; 

async function connectToDatabase() {
  if (isConnected) {
    console.log('Reusing existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect('mongodb+srv://riteshrana251104:Wme7KRrm6nY2u1D8@airline.j35ch.mongodb.net/airline?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = connectToDatabase;

const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const connectToDatabase = require('./db'); // Import MongoDB connection logic

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: "https://airline-management-9ykr.vercel.app", // Update with your frontend URL
  methods: ["POST", "GET"],
  credentials: true,
}));
app.use(express.json());

// Schemas for MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: String },
  gender: { type: String },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const bookingSchema = new mongoose.Schema({
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  username: { type: String, required: true },
  totalTraveller: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Default status
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

// Middleware to connect to MongoDB
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json("Hello! Your backend is working.");
});

// User Registration
app.post('/submit-form', async (req, res) => {
  const { firstname, lastname, username, email, phonenumber, gender, password } = req.body;

  try {
    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'Username is required.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken.' });
    }

    if (!/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits.' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Email must contain @.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      phonenumber,
      gender,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        res.status(400).json({ message: 'Email already exists.' });
      } else if (error.keyPattern.username) {
        res.status(400).json({ message: 'Username already exists.' });
      }
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Book a Flight
app.post('/bookFlight', async (req, res) => {
  const { departureCity, arrivalCity, departureDate, totalPrice, username, totalTraveller } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found. Please log in first.' });
    }

    const newBooking = new Booking({
      departureCity,
      arrivalCity,
      departureDate,
      totalPrice,
      username,
      totalTraveller,
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successful!', booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: 'Server error during booking.' });
  }
});

// Fetch Bookings by Username
app.get('/bookings/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const bookings = await Booking.find({ username });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this username.' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

// Update Booking Status
app.patch('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value. Must be Pending, Approved, or Rejected.' });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating booking.', error });
  }
});

// Export the app for Vercel
module.exports = app;

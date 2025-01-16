const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://riteshrana251104:Wme7KRrm6nY2u1D8@airline.j35ch.mongodb.net/airline?retryWrites=true&w=majority', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log('MongoDB connection error:', err));


// Schema for User
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

// Schema for Booking
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

// Route to handle user registration
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

// Route to handle login
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

// Route to handle booking a flight
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
    console.error('Error booking flight:', err);
    res.status(500).json({ message: 'Server error during booking.' });
  }
});

// Route to fetch bookings by username
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

app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Get all bookings, no filter applied
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings.', error });
  }
});


// Route to update booking status
// Express route to handle updating booking status
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

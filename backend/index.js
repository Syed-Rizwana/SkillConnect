// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/paint', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected.');
}).catch(err => {
    console.log('DB Err.');
    console.error(err);
});

// Define MongoDB schema and model for user data
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('Artist', userSchema);

// Define MongoDB schema and model for upload data
const uploadSchema = new mongoose.Schema({
    name: String,
    artName: String,
    email: String,
    phoneNumber: String,
    address: String,
    demoVideo: String, // Store file path in the database
    experience: String
});
const UploadData = mongoose.model('UploadData', uploadSchema);

// Define MongoDB schema and model for newsletter subscriptions
const newsletterSchema = new mongoose.Schema({
    email: { type: String, unique: true }
});
const NewsletterSubscription = mongoose.model('NewsletterSubscription', newsletterSchema);

// Middleware
app.use(bodyParser.json());

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
        console.log(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Sign-in endpoint
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Sign in successful', user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload endpoint
app.post('/upload', upload.single('demoVideo'), async (req, res) => {
    try {
        // Create a new upload data instance with form data and file path
        const newUploadData = new UploadData({
            name: req.body.name,
            artName: req.body.artName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            demoVideo: req.file.path.replace(/\\/g, '/'), // Replace backslashes with forward slashes
            experience: req.body.experience
        });
        // Save the upload data to the database
        await newUploadData.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/upload-data', async (req, res) => {
    try {
        // Retrieve all uploaded data from the database
        const data = await UploadData.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Newsletter subscription endpoint
app.post('/subscribe-newsletter', async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the email is already subscribed
        const existingSubscription = await NewsletterSubscription.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: 'Email is already subscribed to the newsletter' });
        }
        // Create a new newsletter subscription
        const newSubscription = new NewsletterSubscription({ email });
        await newSubscription.save();
        res.status(201).json({ message: 'Thank you for subscribing to our newsletter!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

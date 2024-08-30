const express = require('express');
const dbConnect = require('./config/dbConnect');
const path = require('path');
// const helmet = require('helmet');
// const compression = require('compression');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const authRouter = require('./routes/authRouts');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// Initialize Express app
const app = express();

// Connect to the database
dbConnect();

// Security middleware
// app.use(helmet()); // Set security headers
// app.use(compression()); // Enable GZIP compression for responses

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Use morgan for logging requests in development
}

// Rate limiting middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Serve static files (if you have a frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User routes
app.use('/api/user', authRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

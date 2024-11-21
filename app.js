const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;

// Load environment variables from .env file
require('dotenv').config();

// Kết nối tới MongoDB
const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');  
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Cấu hình middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public')); 

// Sử dụng routes
app.use('/products', productRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
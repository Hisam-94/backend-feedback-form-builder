const express = require('express');
const mongoose = require('mongoose');
const connectDB = require("./config/db");
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
require('dotenv').config();

const app = express();
connectDB()
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/forms', formRoutes);
const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
  res.send('Welcome to The Alter Office')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

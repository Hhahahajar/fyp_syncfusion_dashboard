// server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Order = require('./models/order'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routes for AddOrders page
// Synchronize the database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database:', err));

// Route to add a new order
app.post('/add-orders', async (req, res) => {
  try {
    const { item, customerName, totalAmount, status, location } = req.body;

    // Validate the input data
    if (!item || !customerName || !totalAmount || !status || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new order
    const newOrder = await Order.create({
      item,
      customerName,
      totalAmount,
      status,
      location,
    });

    // Send a success response
    res.status(201).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Error adding order', error });
  }
});

// Route to fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

sequelize.sync({ force: false }) // Use { force: false } to avoid dropping existing tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Error syncing with the database:', error);
  });

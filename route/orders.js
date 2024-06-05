// routes/orders.js

const express = require('express');

const router = express.Router();
const Order = require('../models/order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new order
router.post('/', async (req, res) => {
  try {
    const { customerName, productName, quantity } = req.body;

    // Create a new order
    const newOrder = await Order.create({
      customerName,
      productName,
      quantity,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

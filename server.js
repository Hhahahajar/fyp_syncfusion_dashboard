// server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const ordersRouter = require('./route/orders');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRouter);

sequelize.sync({ force: false }) // Use { force: false } to avoid dropping existing tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(error => {
    console.error('Error syncing with the database:', error);
  });

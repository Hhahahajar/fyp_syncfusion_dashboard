/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';

const AddOrder = () => {
  const [newOrder, setNewOrder] = useState({
    orderId: '',
    customerName: '',
    product: { name: '', quantity: 1, price: 0 }, // Changed to single product object
    location: '',
    status: '',
    telephone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value,
    });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      ...newOrder,
      totalAmount: newOrder.product.quantity * newOrder.product.price, // Calculate totalAmount based on single product
    };

    try {
      const response = await axios.post('http://localhost:8080/add-orders', orderData);
      console.log('Order added successfully:', response.data);
      navigate('/orders'); // Redirect to the orders page or show a success message
    } catch (error) {
      console.error('Error adding order:', error.response); // Log the error response
      alert('Failed to submit order. Please try again later.'); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Order" />
      <form className="form-layout" onSubmit={handleAddOrder}>
        <div className="form-group">
          <label htmlFor="orderId">Order ID</label>
          <input type="text" id="orderId" name="orderId" value={newOrder.orderId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input type="text" id="customerName" name="customerName" value={newOrder.customerName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="name"
            value={newOrder.product.name}
            onChange={(e) => setNewOrder({ ...newOrder, product: { ...newOrder.product, name: e.target.value } })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newOrder.product.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, product: { ...newOrder.product, quantity: parseInt(e.target.value, 10) } })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newOrder.product.price}
            onChange={(e) => setNewOrder({ ...newOrder, product: { ...newOrder.product, price: parseFloat(e.target.value) } })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={newOrder.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input type="text" id="status" name="status" value={newOrder.status} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Telephone</label>
          <input type="text" id="telephone" name="telephone" value={newOrder.telephone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <input type="number" id="totalAmount" name="totalAmount" value={newOrder.product.quantity * newOrder.product.price} readOnly />
        </div>
        <div className="form-group">
          <button type="submit" className="button-soft-green">Add New Order</button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;

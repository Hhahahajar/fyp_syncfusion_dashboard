/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';

const AddOrder = () => {
  const [newOrder, setNewOrder] = useState({
    item: '',
    customerName: '',
    totalAmount: '',
    status: '',
    orderId: '',
    location: '',
    createdAt: '',
    updatedAt: '',
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
    try {
      const response = await axios.post('http://localhost:8080/add-orders', newOrder);
      console.log('Order added successfully:', response.data);
      // Show success message or redirect to another page
      navigate('/orders'); // Redirect to the orders page or show a success message
    } catch (error) {
      console.error('Error adding order:', error.response); // Log the error response
      // Show error message to the user
      // You can display this message in a modal, toast, or any other UI component
      // eslint-disable-next-line no-alert
      alert('Failed to submit order. Please try again later.');
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Order" />
      {/* <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">Add Order</h2> */}
      <form className="form-layout" onSubmit={handleAddOrder}>
        <div className="form-group">
          <label htmlFor="item">Item</label>
          <input type="text" id="item" name="item" value={newOrder.item} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input type="text" id="customerName" name="customerName" value={newOrder.customerName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <input type="number" id="totalAmount" name="totalAmount" value={newOrder.totalAmount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input type="text" id="status" name="status" value={newOrder.status} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="orderId">Order ID</label>
          <input type="text" id="orderId" name="orderId" value={newOrder.orderId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={newOrder.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="button-soft-green">Add New Order</button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;

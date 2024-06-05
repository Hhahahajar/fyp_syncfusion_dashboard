// AddOrder.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Header } from '../components';

const AddOrder = () => {
  const history = useHistory();
  const [newOrder, setNewOrder] = useState({
    image: '',
    item: '',
    customerName: '',
    totalAmount: '',
    status: '',
    orderId: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewOrder({
        ...newOrder,
        image: reader.result,
      });
    };
  };

  const handleAddOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/orders', newOrder);
      console.log('Order added successfully:', response.data);
      history.push('/orders'); // Navigate back to the orders page
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Order" />
      <div className="mb-4">
        <h2>Add New Order</h2>
        <form className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
          <input type="file" name="image" onChange={handleImageChange} className="p-2 border rounded-md" />
          <input type="text" name="item" placeholder="Item" value={newOrder.item} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="text" name="customerName" placeholder="Customer Name" value={newOrder.customerName} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="number" name="totalAmount" placeholder="Total Amount" value={newOrder.totalAmount} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="text" name="status" placeholder="Status" value={newOrder.status} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="text" name="orderId" placeholder="Order ID" value={newOrder.orderId} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="text" name="location" placeholder="Location" value={newOrder.location} onChange={handleChange} className="p-2 border rounded-md" />
          <button type="button" onClick={handleAddOrder} className="p-2 bg-blue-500 text-white rounded-md">Add Order</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;

/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/stocks';

const StockManagement = () => {
  const [stocks, setStocks] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const response = await axios.get(API_URL);
    setStocks(response.data);
  };

  const addStock = async () => {
    const newStock = { name, quantity: Number(quantity), price: Number(price) };
    const response = await axios.post(API_URL, newStock);
    setStocks([...stocks, response.data]);
    clearForm();
  };

  const updateStock = async () => {
    const updatedStock = { name, quantity: Number(quantity), price: Number(price) };
    const response = await axios.put(`${API_URL}/${editingStock._id}`, updatedStock);
    setStocks(stocks.map(stock => (stock._id === editingStock._id ? response.data : stock)));
    clearForm();
  };

  const deleteStock = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setStocks(stocks.filter(stock => stock._id !== id));
  };

  const editStock = (stock) => {
    setName(stock.name);
    setQuantity(stock.quantity);
    setPrice(stock.price);
    setEditingStock(stock);
  };

  const clearForm = () => {
    setName('');
    setQuantity('');
    setPrice('');
    setEditingStock(null);
  };

  return (
    <div className="container">
      <h1>Stock Management</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={editingStock ? updateStock : addStock}>
          {editingStock ? 'Update' : 'Add'}
        </button>
        {editingStock && <button onClick={clearForm}>Cancel</button>}
      </div>
      <div className="stocks">
        <h2>Stocks</h2>
        <ul>
          {stocks.map((stock) => (
            <li key={stock._id}>
              <span>{stock.name}</span>
              <span>{stock.quantity}</span>
              <span>{stock.price}</span>
              <button onClick={() => editStock(stock)}>Edit</button>
              <button onClick={() => deleteStock(stock._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockManagement;

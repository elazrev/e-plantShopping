import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.cost.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCheckout(false);
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  // If cart is empty, show empty cart message
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any plants to your cart yet.</p>
          <button className="get-started-button" onClick={handleContinueShopping}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-container">
        <h2>Order Summary</h2>
        <ul className="checkout-list">
          {cart.map(item => (
            <li key={item.name} className="checkout-list-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${calculateTotalCost(item)}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-total">Total: ${calculateTotalAmount()}</div>
        <button className="get-started-button keep-shopping" onClick={handleContinueShopping}>Keep Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Total: ${calculateTotalAmount()}</h2>
      <div className="cart-grid">
        {cart.map(item => (
          <div className="cart-tile" key={item.name}>
            <img className="cart-tile-image" src={item.image} alt={item.name} />
            <div className="cart-tile-details">
              <div className="cart-tile-title">{item.name}</div>
              <div className="cart-tile-cost">{item.cost}</div>
              <div className="cart-tile-qty-row">
                <button className="cart-tile-btn" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-tile-qty">{item.quantity}</span>
                <button className="cart-tile-btn" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-tile-total">${calculateTotalCost(item)}</div>
              <button className="cart-tile-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button className="get-started-button keep-shopping" onClick={handleContinueShopping}>Keep Shopping</button>
        <button className="get-started-button1" onClick={() => setShowCheckout(true)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



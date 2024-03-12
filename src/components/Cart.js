import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css'; // Cart.css dosyasını içeri aktar

function Cart(props) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log("Cart Items:", cartItems); // Sepetteki ürünlerin değerini konsola yazdır
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8070/api/cart/${itemId}`);
      setCartItems(prevItems => prevItems.filter(order => order.products.find(product => product.id !== itemId)));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleBuy = async (itemId) => {
    try {
      // Burada "Buy" işlemlerini gerçekleştirebilirsiniz, örneğin siparişi onaylama gibi
      console.log("Buying item with ID:", itemId);
    } catch (error) {
      console.error('Error buying item:', error);
    }
  };

  const handleCheckout = () => {
    // Checkout işlemi
    props.history.push('/checkout');
  };

  return (
    <center>
      <div className="cart-container"> {/* Cart.css'de belirtilen cart-container sınıfını kullan */}
        <h2>Cart</h2>
        <p>Your shopping cart:</p>
        <ul>
          {cartItems.map(order => (
            <div key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <ul>
                {order.products.map(product => (
                  <li key={product.id}>
                    <img className="product-image" src={product.imageUrl} alt={product.name} /><br></br>
                    <strong>{product.name}</strong> - ${product.price}<tr></tr>
                    <button onClick={() => removeItemFromCart(product.id)}>Remove</button>
                    <button onClick={() => handleBuy(product.id)}>Buy</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
        <button onClick={handleCheckout}>Checkout</button>
        <Link to="/home">Back to Home</Link>
      </div>
    </center>
  );
}

export default Cart;

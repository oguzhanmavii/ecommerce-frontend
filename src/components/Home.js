import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: ''
  });
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchProducts();
    getUsernameFromStorage();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8070/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getUsernameFromStorage = () => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleAddToCart = (productId) => {
    window.location.href='/cart';
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/api/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', imageUrl: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8070/api/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = (productId) => {
   // Buraya güncelleme işlemlerini ekleyin
  };

  return (
    <div className="home-container">
      <header className="header-container">
        <h2>Welcome to Homepage</h2>
        <div>
          <a href="#" onClick={() => setShowForm(true)}>Create Product</a>
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      </header>
      <section className="products-container">
        <h3>Products</h3>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img className="product-image" src={product.imageUrl} alt={product.name} />
              <div className="product-info">
                <strong>{product.name}</strong>
                <span>${product.price}</span>
              </div>
              <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
              <button onClick={() => handleUpdateProduct(product.id)}>Update</button>
              <button onClick={() => handleProductDelete(product.id)}>Delete</button>
            </div>  
          ))}
        </div>
        {showForm && (
          <div className="form-container">
            <h3>Create New Product</h3>
            <form onSubmit={handleProductSubmit}>
              <input 
                type="text" 
                placeholder="Product Name" 
                value={newProduct.name} 
                onChange={(e) => setNewProduct(prevState => ({ ...prevState, name: e.target.value }))} 
              />
              <input 
                type="text" 
                placeholder="Price" 
                value={newProduct.price} 
                onChange={(e) => setNewProduct(prevState => ({ ...prevState, price: e.target.value }))} 
              />
              <input 
                type="text" 
                placeholder="Image URL" 
                value={newProduct.imageUrl} 
                onChange={(e) => setNewProduct(prevState => ({ ...prevState, imageUrl: e.target.value }))} 
              />
              <div className="button-group">
                <button type="submit">Add Product</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      
      </section>
    
    </div>
  );
};

export default HomePage;

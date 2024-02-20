import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Stil dosyasını ekleyin

function Home({ history }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = () => {
    // Kullanıcıyı giriş sayfasına yönlendir
    window.location.href = '/';
  };

  const handleAddToCart = (productId) => {
    // Sepete ekleme işlemi burada yapılacak
    // Örneğin, bir API isteği gönderilerek ürün sepete eklenebilir
    // Ardından Cart sayfasına yönlendirilir
    window.location.href='/cart';
  };

  return (
    <div className="home-container"> {/* Ana konteynırı sarmalayın */}
      <header>
        <h2>Home</h2>
        <p>Welcome to our online store!</p>
      </header>
      <section className="products-container"> {/* Ürünleri sarmalayan konteynır */}
        <h3>Products</h3>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card"> {/* Her ürünü kart olarak düzenleyin */}
              <img className="product-image" src={product.imageUrl} alt={product.name} /> {/* Ürün resmi */}
              <div className="product-info">
                <strong>{product.name}</strong>
                <span>${product.price}</span>
              </div>
              <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </div>  
          ))}
        </div>
      </section>
      <footer> <button onClick={handleLogout}>Logout</button></footer>
    </div>
  );
}

export default Home;

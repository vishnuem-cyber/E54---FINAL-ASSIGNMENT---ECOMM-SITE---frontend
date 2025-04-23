import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    updateQuantity(product.id, quantity + 1); 
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateQuantity(product.id, quantity - 1); 
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <div className="quantity-controls">
        <button onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button className="add-to-cart">Add to Cart</button>
      <button className="buy-now">Buy</button>
      
      <button className="details-btn" onClick={() => navigate(`/products/${product.id}`)}>Details</button>
    </div>
  );
}

export default ProductCard;

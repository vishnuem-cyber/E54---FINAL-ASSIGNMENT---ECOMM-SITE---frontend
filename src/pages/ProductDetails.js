import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";
import { useCart } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0); // Start quantity at 1
    const { addToCart } = useCart();

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error("Error fetching product details:", error));
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const handleAddToCart = () => {
        addToCart({ ...product, quantity }); 
    };

    return (
        <div className="product-details-container">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-now">Buy</button>
            <button className="back-btn" onClick={() => navigate("/products")}>Back to Products</button>
        </div>
    );
}

export default ProductDetails;
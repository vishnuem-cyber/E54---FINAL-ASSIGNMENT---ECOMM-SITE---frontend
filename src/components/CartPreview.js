import React from "react";
import { useCart } from "../context/CartContext";

function CartPreview() {
  const cartContext = useCart(); 

  
  if (!cartContext) {
    console.error("CartProvider is missing in the component tree!");
    return <div>Error: CartProvider is not found.</div>;
  }

  const { cart } = cartContext;

  
  if (!cart) {
    console.warn("Cart is undefined in CartPreview");
    return <div>Loading cart...</div>;
  }

  return (
    <div className="cart-preview">
      <h3>Cart ({cart.length} items)</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPreview;

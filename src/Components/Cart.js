import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
} from "../Features/CartSlice";
import PayButton from "./PayButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handledeleteCart = (cartItem) => {
    dispatch(clearCart(cartItem));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Empty</p>
          <div className="start-shopping">
            <Link to="/">
              <span>Go to Home Page</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>

          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem._id}>
                <div className="cart-product">
                  <img src={cartItem.image.url} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-product-price">₹{cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleIncreaseCart(cartItem)}>
                    +
                  </button>
                </div>

                <div className="cart-product-total-price">
                  ₹{cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <button
              className="clear-cart"
              onClick={(cartItem) => handledeleteCart(cartItem)}
            >
              Delete Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Price Details</span>
                <span className="amount">₹{cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and Shipping Calculated in Order Summary</p>
              {auth._id ? (
                <PayButton cartItems = {cart.cartItems} />
              ) : (
                <button className="cart-login" onClick={() => navigate("/login")}>Login to Checkout</button>
              )}
              <div className="exit">
                <Link to="/">
                  <span>Exit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

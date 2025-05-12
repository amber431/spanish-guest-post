import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../CartContext";

const Cart = () => {
  const { cartItems, updateCart } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (index, change) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += change;
    if (updatedCart[index].quantity <= 0) updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const totalAmount = cartItems
  .reduce((acc, item) => acc + item.adjustedPrice, 0)
  .toFixed(2);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="card mb-4 bg-light">
                  <div className="card-header card-header1  py-3 px-3 text-white">
                    <h5 className="mb-0">Your Cart item ({index+1})</h5>
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="p-4   rounded">
                          <h5 className="card-title text-primary mb-4">
                            Website Details
                          </h5>

                          <p className="mb-3 d-flex align-items-center">
                            <i className="fas fa-cogs text-secondary"></i>
                            <strong className="ms-2">Category:</strong>
                            <span className="text-muted ms-3">{item.Category}</span>
                          </p>

                          <p className="mb-3 d-flex align-items-center">
                            <i className="fas fa-chart-line text-secondary"></i>
                            <strong className="ms-2 text-nowrap">Monthly Traffic:</strong>
                            <span className="text-muted ms-3">
                              {item.monthlyTraffic}
                            </span>
                          </p>

                          <p className="mb-3 d-flex align-items-center">
                            <i className="fas fa-briefcase text-secondary"></i>
                            <strong className="ms-2">Niche:</strong>
                            <span className="text-muted ms-3">{item.niche}</span>
                          </p>

                          <p className="mb-3 d-flex align-items-center">
                            <i className="fas fa-flag text-secondary"></i>
                            <strong className="ms-2">Country:</strong>
                            <span className="text-muted ms-3">{item.country}</span>
                          </p>

                          <p className="mb-3 d-flex align-items-center">
                          <i className="fas fa-money-bill-alt text-secondary"></i>
                            <strong className="ms-2">Price:</strong>
                            <span className="text-muted ms-3"> {item.Currency} {item.adjustedPrice}</span>
                          </p>


                          <p className="text-decoration-none text-primary mb-3 d-flex align-items-center">
                            <i className="fas fa-link text-secondary"></i>
                            <strong className="ms-2">Websiteee:</strong>
                           
                            {item.websiteUrl
                              ? (() => {
                                  try {
                                    const parsedUrl = new URL(item.websiteUrl);
                                    const hostname = parsedUrl.hostname;
                                    const maxLength = Math.ceil(
                                      hostname.length / 1
                                    );
                                    return hostname.length > maxLength
                                      ? `${hostname.substring(0, maxLength)}...`
                                      : hostname;
                                  } catch (error) {
                                    return "Invalid URL";
                                  }
                                })()
                              : "N/A"}
                          </p>

                          <div className="d-flex justify-content-between align-items-center">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm me-2"
                              onClick={() => removeItem(index)}
                            >
                              <i className="fas fa-trash"></i> Remove
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="card mb-4 shadow-sm border-0"
                style={{ backgroundColor: "#a80b32;" }}
              >
                <div
                  className="card-header py-4 px-4 text-white bg-danger"
                  style={{ borderRadius: "0.25rem 0.25rem 0 0" }}
                >
                  <h5 className="mb-0 text-center">Your Cart is Empty</h5>
                </div>
                <div className="card-body text-center p-5">
                  <p className="mb-4 text-muted">
                    It looks like your shopping cart is empty. Start exploring
                    and add your favorite items to begin your shopping journey!
                  </p>
                  <Link to="/home" aria-label="Start Shopping">
                    <button
                      type="button"
                      className="btn btn-lg btnn shadow-sm text-white px-4 py-2"
                      style={{ borderRadius: "0.25rem" }}
                    >
                      Start Shopping
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="col-md-4">
            <div className="card mb-4 bg-light">
              <div className="card-header text-white py-3 Order-Summary">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body bg-light p-3">
                <ul className="list-group list-group-flush">
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center bg-light border-0 px-3 py-2"
                    >
                      <div>
                        {item.name}
                      </div>
                      <div>
                        {/* {item.Currency} {item.adjustedPrice } */}
                      </div>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between align-items-center bg-light border-0 px-3 py-2 mt-2">
                    <strong>Total Amount</strong>
                    <strong>{cartItems.length > 0 ? `${cartItems[0].Currency} ${totalAmount}` : "$0.00"}</strong>
                  </li>
                </ul>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-success px-4 py-2"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

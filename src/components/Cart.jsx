import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const Cart = () => {
  const { cartItems, updateCart } = useCart();
  const navigate = useNavigate();

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const totalAmount = cartItems
    .reduce((acc, item) => acc + (item.adjustedPrice || 0), 0)
    .toFixed(2);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <>
      <div className="container py-5 mt-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="card mb-4 bg-light">
                  <div
                    className="card-header py-3 px-3 text-white"
                    style={{ backgroundColor: "#E3652D" }}
                  >
                    <h5 className="mb-0">Selected Website ({index + 1})</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 mb-4">
                        <h5 className="text-primary mb-4">Website Details</h5>
                        <p>
                          <strong>Category:</strong> {item.Category || "N/A"}
                        </p>
                        <p>
                          <strong>Monthly Traffic:</strong>{" "}
                          {item.monthlyTraffic || "N/A"}
                        </p>
                        <p>
                          <strong>Niche:</strong> {item.niche || "N/A"}
                        </p>
                        <p>
                          <strong>Country:</strong> {item.country || "N/A"}
                        </p>
                        <p>
                          <strong>Price:</strong> {item.Currency || "$"}{" "}
                          {item.adjustedPrice || "0.00"}
                        </p>
                        <p>
                          <strong>Website:</strong>{" "}
                          {item.websiteUrl ? (
                            <a
                              href={item.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none text-primary"
                            >
                              {new URL(item.websiteUrl).hostname}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeItem(index)}
                          >
                            <i className="fas fa-trash"></i> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card mb-4 shadow-sm border-0">
                <div
                  className="card-header py-4 px-4 text-white"
                  style={{ borderRadius: "0.25rem 0.25rem 0 0" , backgroundColor: '#E3652D'}}
                >
                  <h5 className="mb-0 text-center">Your Cart is Empty</h5>
                </div>
                <div className="card-body text-center p-5">
                  <p className="mb-4 text-muted">
                    It looks like you haven't selected any websites for your
                    guest post. Start exploring and choose your desired websites
                    to begin!
                  </p>
                  <Link to="/" aria-label="Start Browsing">
                    <button
                      type="button"
                      className="btn btn-lg shadow-sm text-white px-4 py-2"
                      style={{
                        backgroundColor: "#222222",
                        borderRadius: "0.25rem",
                      }}
                    >
                      Explore Websites
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
                <div className="card-header text-black py-3">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body bg-light p-3">
                  <ul className="list-group list-group-flush">
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center bg-light border-0 px-3 py-2"
                      >
                        <div>{item.name || "Website"}</div>
                        <div>
                          {item.Currency || "$"} {item.adjustedPrice || "0.00"}
                        </div>
                      </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light border-0 px-3 py-2 mt-2">
                      <strong>Total Amount</strong>
                      <strong>
                        {cartItems.length > 0
                          ? `${cartItems[0].Currency || "$"} ${totalAmount}`
                          : "$0.00"}
                      </strong>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn px-4 py-2"
                      onClick={handleCheckout}
                      disabled={cartItems.length === 0}
                      style={{backgroundColor: '#222222', color: 'white'}}
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

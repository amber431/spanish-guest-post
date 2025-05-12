import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext";

const OrderSummary = ({ cartItems, totalAmount, wordLimitPrice, wordLimit }) => {
    useEffect(() => {
    }, [wordLimitPrice, totalAmount]);

    return (
        <div className="col-md-4">
            <div className="card mb-4">
                <div className="card-header text-white py-3" style={{ backgroundColor: "#E3652D" }}>
                    <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body p-4">
                    {Array.isArray(cartItems) && cartItems.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {cartItems.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    <div>{item.name}</div>
                                    <div>{item.Currency} {item.adjustedPrice}</div>
                                </li>
                            ))}
                            {/* Word Limit */}
                            {wordLimit && (
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                                    <div>Word Limit: {wordLimit} words</div>
                                    <div>EUR {wordLimitPrice}</div>
                                </li>
                            )}
                            {/* Total Amount */}
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div><strong>Total amount</strong></div>
                                <span>
                                    <strong>
                                        {cartItems.length > 0
                                            ? `${cartItems[0].Currency} ${(Number(totalAmount)).toFixed(2)}`
                                            : "$0"}
                                    </strong>
                                </span>
                            </li>
                        </ul>
                    ) : (
                        <p>No items in the cart</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;

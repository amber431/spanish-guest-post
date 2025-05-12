// import React, { createContext, useState, useEffect, useContext } from "react";
// import { toast } from "react-toastify";
// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(
//     JSON.parse(localStorage.getItem("cartItems")) || []
//   );
//   const [showViewCartButton, setShowViewCartButton] = useState(false); 

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     setShowViewCartButton(cartItems.length > 0); 
//   }, [cartItems]);
//   const addToCart = (item) => {
//     const authToken = localStorage.getItem("authToken");

//     if (!authToken) {
//       toast.error("Please log in to add products to the cart.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const alreadyInCart = cartItems.some((cartItem) => cartItem._id === item._id);

//     if (alreadyInCart) {
//       toast.error(`${item.name} is already in the cart!`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const updatedCart = [...cartItems, item];
//     setCartItems(updatedCart);
//     toast.success(
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <span style={{ marginRight: "10px" }}>
//           {`${item.name} added to the cart!`}
//         </span>
//         <button
//           onClick={() => window.location.href = "/cart"}
//           style={{
//             backgroundColor: "#4CAF50", 
//             color: "#fff",
//             border: "none",
//             padding: "5px 10px",
//             cursor: "pointer",
//             fontSize: "14px",
//             borderRadius: "5px", 
//           }}
//         >
//           View Cart
//         </button>
//       </div>,
//       {
//         position: "top-right",
//         autoClose: 3000,
//         style: {
//           borderRadius: "10px", 
//           display: "flex",
//           alignItems: "center",
//           padding: "15px",
//         },
//       }
//     );
//   };

//   // Remove item from the cart
//   const removeFromCart = (id) => {
//     const updatedCart = cartItems.filter((item) => item._id !== id);
//     setCartItems(updatedCart);
//   };
//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartItems");
//   };
//   const updateCart = (updatedCart) => {
//     setCartItems(updatedCart);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         updateCart,
//         cartCount: cartItems.length,
//         showViewCartButton,  
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };











import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [showViewCartButton, setShowViewCartButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setShowViewCartButton(cartItems.length > 0);
  }, [cartItems]);

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (item) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setModalMessage("Please log in to add products to your cart.");
      setModalAction(() => handleLoginRedirect);
      setIsModalOpen(true);
      return;
    }

    const alreadyInCart = cartItems.some((cartItem) => cartItem._id === item._id);

    if (alreadyInCart) {
      setModalMessage(`${item.name} is already in the cart!`);
      setModalAction(null); // No action for this scenario
      setIsModalOpen(true);
      return;
    }

    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);

    setModalMessage(
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ marginRight: "10px" }}>{`${item.name} added to the cart!`}</span>
        <button
          onClick={() => (window.location.href = "/cart")}
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "14px",
            borderRadius: "5px",
          }}
        >
          View Cart
        </button>
      </div>
    );
    setModalAction(null);
    setIsModalOpen(true);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCart,
        cartCount: cartItems.length,
        showViewCartButton,
      }}
    >
      {children}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h5>Notification</h5>
            <p>{modalMessage}</p>
            <div style={{ marginTop: "20px" }}>
              {modalAction ? (
                <button
                  onClick={modalAction}
                  style={{
                    backgroundColor: "#E3652D",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  Login
                </button>
              ) : null}
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

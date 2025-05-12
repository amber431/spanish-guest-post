import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cartCount } = useCart();
  const authToken = localStorage.getItem("authToken");
  const email = localStorage.getItem("email");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all session-related data from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");

    setShowLogoutPopup(false);
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark px-3 align-items-center sticky-top"
        style={{
          background: "#E3652D",
          borderBottom: "0.2px solid gray",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center p-2">
          {/* Left Section */}
          <div className="navbar-left">
            <a href="/">
              <img
                src="/Logo (2).png"
                alt="Img"
                style={{ width: "70px", height: "50px" }}
              />
            </a>
          </div>
          {/* Middle Section */}
          <div
            className={`navbar-middle collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mb-2 mb-lg-0" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <li className="nav-item">
                <a
                  className="nav-link text-white fontw"
                  href="#Why-us"
                  onClick={closeNavbar}
                >
                  Why Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white fontw"
                  href="#pricing"
                  onClick={closeNavbar}
                >
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white fontw"
                  href="#sites"
                  onClick={closeNavbar}
                >
                  Sites
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white fontw"
                  href="#testimonials"
                  onClick={closeNavbar}
                >
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white fontw"
                  href="#contact"
                  onClick={closeNavbar}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white fontw"
                  href="#faq"
                  onClick={closeNavbar}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>


          {/* Right Section */}
          <div className="navbar-right d-flex align-items-center gap-3">
            {authToken ? (
              <>
                <a className="nav-link text-white position-relative" href="/cart">
                  <i className="fas fa-shopping-cart fa-lg"></i>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </a>
                <div className="dropdown">
                  <a
                    className="text-decoration-none text-white"
                    href="#"
                    id="userMenu"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle fa-lg"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end custom-dropdown" aria-labelledby="userMenu">
                    <li className="dropdown-item d-flex align-items-center hover-white">
                      <i className="fas fa-envelope px-2"></i>
                      {email || "Guest"}
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="dropdown-item d-flex align-items-center hover-white">
                      <i className="fas fa-shopping-bag px-2"></i>
                      <a href="/orders" className="text-decoration-none text-dark hover-white">
                        Order
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="dropdown-item d-flex align-items-center hover-white">
                      <i className="fas fa-cog px-2"></i>
                      <a href="/profile" className="text-decoration-none text-dark hover-white">
                        Account Settings
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="dropdown-item d-flex align-items-center">
                      <i className="fas fa-file-invoice px-2"></i>
                      <a href="/Invoice" className="text-decoration-none text-dark">
                        Invoice
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li
                      className="dropdown-item d-flex align-items-center text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowLogoutPopup(true)}
                    >
                      <i className="fas fa-sign-out-alt px-2"></i>
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // Show Login and Register buttons if not logged in
              <>
                <button className="btn btn-outline-light" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="btn btn-light" onClick={() => navigate("/signup")}>
                  Signup
                </button>
              </>
            )}
          </div>

          {/* Hamburger Toggle Button for Small Screens */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isNavbarOpen ? "true" : "false"}
          >
            <span className={` ${isNavbarOpen ? "cross-icon" : "hamburger-icon"}`} />
          </button>

        </div>
      </nav>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLogoutPopup(false)}
                ></button>
              </div>
              <div className="modal-body text-center">Are you sure you want to log out?</div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setShowLogoutPopup(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

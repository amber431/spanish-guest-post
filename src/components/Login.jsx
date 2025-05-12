import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Api.jsx";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProviderContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animationClass, setAnimationClass] = useState("fadeIn");

  useEffect(() => {
    setAnimationClass("bounceIn-in");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASEURL}/auth/login`, { email, password });
      if (response.data && response.data.user) {
        const { user, token } = response.data;
        const { role } = user;

        localStorage.setItem("userId", user.userId);
        localStorage.setItem("authToken", token);
        localStorage.setItem("email", user.email);
        login(token);

        switch (role) {
          case "publisher":
            window.location.href = "https://publisher.crective.com/";
            break;
          case "admin":
            window.location.href = "https://admin.crective.com/";
            break;
          case "moderator":
            window.location.href = "https://moderator.crective.com/";
            break;
          case "affiliate":
            window.location.href = "https://affiliate.crective.com/";
            break;
          case "superadmin":
            window.location.href = "https://superadmin.crective.com/";
            break;
          case "user":
            navigate("/");
            break;
          default:
            toast.error("Role not recognized!", { position: "top-right", autoClose: 3000 });
        }

        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
      } else {
        toast.error("An error occurred. Please try again.", { position: "top-right", autoClose: 3000 });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const { message } = err.response.data;
        if (message === "Invalid credentials" || message === "Email or password is incorrect") {
          toast.error("Your email or password is incorrect. Please try again.", { position: "top-right", autoClose: 3000 });
        } else {
          toast.error(message || "Login failed", { position: "top-right", autoClose: 3000 });
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.", { position: "top-right", autoClose: 3000 });
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#1A1A1A",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-200px",
          width: "600px",
          height: "600px",
          backgroundColor: "#E3652D",
          borderRadius: "50%",
          zIndex: 0,
          opacity: 0.15,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          backgroundColor: "#E3652D",
          borderRadius: "50%",
          zIndex: 0,
          opacity: 0.1,
        }}
      ></div>

      <div
        className={`card shadow-lg d-flex flex-row overflow-hidden ${animationClass}`}
        style={{
          width: "900px",
          zIndex: 1,
        }}
      >
        {/* Left Side: Login Form */}
        <div className="p-4 flex-fill" style={{ backgroundColor: "#1f1d2c", color: "#fff", width: "400px" }}>
          <div className="text-center mb-4">
            <div
              className="rounded-circle d-inline-flex justify-content-center align-items-center"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#E3652D",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              AA
            </div>
            <h5 className="mt-2">Sign in to dashboard</h5>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                style={{
                  backgroundColor: "#233447",
                  color: "#fff",
                  border: "1px solid #ffffff",
                  borderRadius: "5px",
                  padding: "10px",
                }}
                placeholder="Enter your email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                style={{
                  backgroundColor: "#233447",
                  color: "#fff",
                  border: "1px solid #ffffff",
                  borderRadius: "5px",
                  padding: "10px 40px 10px 10px",
                }}
                placeholder="Enter your password..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-icon"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input"
                  style={{ backgroundColor: "#233447", border: "1px solid #ffffff" }}
                />
                <label htmlFor="rememberMe" className="form-check-label text-white">
                  Remember Me
                </label>
              </div>
              <Link to="/forgot-password" className="text-decoration-none" style={{ color: "#E3652D" }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#E3652D",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              LOGIN
            </button>
            <p style={{ marginTop: "15px", textAlign: "center", color: "white", fontSize: "14px" }}>
              If you don’t have an account:
              <NavLink
                to="/signup"
                style={{
                  color: "#E3652D",
                  fontWeight: "bold",
                  textDecoration: "none",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              >
                Signup
              </NavLink>
            </p>
          </form>
        </div>
        <div
          style={{
            width: "0px",
            backgroundColor: "#E3652D",
            margin: "0 1px",
            height: "100%",
            zIndex: 1,
          }}
        ></div>

        {/* Right Section with Info */}
        <div
          className="p-1 d-flex flex-column justify-content-center align-items-center flex-fill"
          style={{
            background: "linear-gradient(to right, #1F1D2C, #38251D)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h3 className="fw-bold">Join Our Marketplace</h3>
          <p style={{ padding: "10px" }}>Create Your High-Level Cloud guestpost and link insertion!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BASEURL } from "../Api";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email"); 

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please start the reset process again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}/auth/reset-password`, {
        email,
        newPassword: password,
      });

      toast.success(response?.data?.message || "You have successfully reset your password.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsPasswordReset(true);
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again later.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #1f1d2c, #2096ed)",
      }}
    >
      <div
        className="card shadow-sm p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgb(17, 87, 136)",
          borderColor: "#ffffff",
        }}
      >
        {isPasswordReset ? (
          <div className="text-center">
            <h3 className="text-center mb-4" style={{ color: "white", fontWeight: "600" }}>
              Password Reset Successfully!
            </h3>
            <p style={{ color: "white", marginBottom: "20px" }}>
              You have successfully reset your password. Click below to log in.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="btn btnn text-white w-100"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-center mb-4" style={{ color: "white", fontWeight: "600" }}>
              Reset Password
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: "white" }}>
                  New Password
                </label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                  />
                  <span
                    className="input-group-text"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label" style={{ color: "white" }}>
                  Confirm Password
                </label>
                <div className="input-group">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  <span
                    className="input-group-text"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="btn btnn text-white w-100 mt-4"
                style={{
                  border: "2px solid #fff",
                  borderRadius: "7px",
                  padding: "10px 0",
                }}
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;

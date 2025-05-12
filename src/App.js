import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./components/custom.css";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Contentguidline from "./components/Contentguidline";
import Orders from "./components/Orders";
import SignUp from "./components/Signup";
import ForgotPassword from "./components/forgotpassword";
import Profile from "./components/Profile";
import Invoice from "./components/Invoive";
import Otpform from "./components/Otpform";
import ResetPassword from "./components/ResetPassword";
import ForgotOtp from "./components/ForgotOtp";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import ContactSection from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./AuthProviderContext";
import PubOtpform from "./components/PubOtpform";
import TermsAndConditions from "./components/Pages/TermsAndConditions";
import UpdateEmail from "./components/UpdateEmail";
import ThankYouPage from "./components/ThankYouPage";
import Home from "./components/Pages/Home";
// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />; 
  }

  return (
    <>
      <Navbar />
      <div className="content">{children}</div>
      <ContactSection />
    </>
  );
};

function App() {
  const { isAuthenticated } = useAuth(); 

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/verify-otp" element={<Otpform />} />
            <Route path="/update-email" element={<UpdateEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-otp" element={<ForgotOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/term-conditions" element={<TermsAndConditions/>} />
            <Route path="/verify-pubotp" element={<PubOtpform />} />
            <Route path="/" element={<Home />} />
            <Route path="/thankyou" element={<ThankYouPage />} />

            {/* Private Routes */}
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/Contentguidline"
              element={
                <PrivateRoute>
                  <Contentguidline />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/Invoice"
              element={
                <PrivateRoute>
                  <Invoice />
                </PrivateRoute>
              }
            />
          </Routes>
          
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

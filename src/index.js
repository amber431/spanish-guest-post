import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from "./CartContext";
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './AuthProviderContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
     <CartProvider>
     <AuthProvider>
     <Provider store={store}>
     <App />
     <ToastContainer />
     </Provider>
     </AuthProvider>
     </CartProvider>
  /* </React.StrictMode> */
);
reportWebVitals();

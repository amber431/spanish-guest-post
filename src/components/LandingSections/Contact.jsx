import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css'; // Custom styles

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Email sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(`Failed to send email: ${result.message}`);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex flex-column flex-md-row align-items-start justify-content-between contact-container"
      id="contact"
    >
      <motion.div
        className="text-content w-100 w-md-50 pe-md-5"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4">Contact Us</h1>
        <p className="description">
          Have questions or inquiries about guest posting or link insertion? We're here to assist you! Just fill out the form, and we'll get back to you as soon as possible.
        </p>
        <h3 className="benefits-heading">Why Choose Us?</h3>
        <ul className="benefits-list">
          <li className='point'>Reach a wider audience through guest posting on authoritative platforms</li>
          <li className='point'>Enhance your online visibility and organic traffic with tailored link strategies</li>
          <li className='point'>Gain valuable backlinks from trusted industry-leading websites</li>
          <li className='point'>Increase brand credibility with high-quality content placements</li>
          <li className='point'>Maximize ROI through data-driven SEO tactics and content distribution</li>
        </ul>
        
        <div className="social-media-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <p className="rating">info@spanishguestpost.com</p>
      </motion.div>

      <motion.div
        className="form-content w-100 w-md-50 bg-light p-5 rounded shadow"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="row mb-4">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              rows="5"
              placeholder="Write your message or requirements here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn submit-btn w-100"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Contact;

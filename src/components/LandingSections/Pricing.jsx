import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../App.css';

const Pricing = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/contact'); 
  };

  return (
    <div className="bg-light py-5" id="pricing">
      <div className="container text-center">
        <p className="text-muted fw-semibold">Pricing Table</p>
        <h2 className="display-4 mt-2">Simple Pricing Solutions for Everyone</h2>
        <div className="row mt-5 g-4">
          {/* Card 1 */}
          <div className="col-lg-4 col-md-6 col-sm-12">
            <motion.div
              className="card border-0 shadow-sm rounded-lg h-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="card-header text-center py-4 rounded-top"
                style={{
                  backgroundColor: '#E3652D',
                  color: 'white',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <h3 className="mb-0">DR 30+</h3>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h2 className="fw-bold text-dark">€179</h2>
                <p className="text-muted mb-3">Per Guest Post</p>
                <hr />
                <ul className="list-unstyled text-start mb-4">
                  <li>✔️ 1000+ Traffic (Ahrefs)</li>
                  <li>✔️ 1000+ Organic Keywords</li>
                  <li>✔️ 100+ RD</li>
                  <li>✔️ Average DA 30+ (Moz)</li>
                  <li>✔️ Average Spam Score &lt;5%</li>
                  <li>✔️ 1000+ Words Post</li>
                  <li>✔️ Language – English (US)</li>
                </ul>
                <button
                  onClick={handleBuyNow}
                  className="custom-btn mt-auto px-4 py-2"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 col-md-6 col-sm-12">
            <motion.div
              className="card border-0 shadow-sm rounded-lg h-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="card-header text-center py-4 rounded-top"
                style={{
                  backgroundColor: '#E3652D',
                  color: 'white',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <h3 className="mb-0">DR 40+</h3>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h2 className="fw-bold text-dark">€249</h2>
                <p className="text-muted mb-3">Per Guest Post</p>
                <hr />
                <ul className="list-unstyled text-start mb-4">
                  <li>✔️ 1000+ Traffic (Ahrefs)</li>
                  <li>✔️ 1000+ Organic Keywords</li>
                  <li>✔️ 100+ RD</li>
                  <li>✔️ Average DA 40+ (Moz)</li>
                  <li>✔️ Average Spam Score &lt;5%</li>
                  <li>✔️ 1500+ Words Post</li>
                  <li>✔️ Language – English (US)</li>
                </ul>
                <button
                  onClick={handleBuyNow}
                  className="custom-btn mt-auto px-4 py-2"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 col-md-6 col-sm-12">
            <motion.div
              className="card border-0 shadow-sm rounded-lg h-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="card-header text-center py-4 rounded-top"
                style={{
                  backgroundColor: '#E3652D',
                  color: 'white',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <h3 className="mb-0">DR 50+</h3>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h2 className="fw-bold text-dark">€349</h2>
                <p className="text-muted mb-3">Per Guest Post</p>
                <hr />
                <ul className="list-unstyled text-start mb-4">
                  <li>✔️ 1000+ Traffic (Ahrefs)</li>
                  <li>✔️ 1000+ Organic Keywords</li>
                  <li>✔️ 100+ RD</li>
                  <li>✔️ Average DA 50+ (Moz)</li>
                  <li>✔️ Average Spam Score &lt;5%</li>
                  <li>✔️ 2000+ Words Post</li>
                  <li>✔️ Language – English (US)</li>
                </ul>
                <button
                  onClick={handleBuyNow}
                  className="custom-btn mt-auto px-4 py-2"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

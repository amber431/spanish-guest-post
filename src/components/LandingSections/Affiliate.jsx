import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const Affiliate = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#2A3439' }}>
      <div className="container py-5">
        <div className="row align-items-center gy-4">
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <h1 className="fw-bold mb-4 text-white">Earn More with Our Affiliate Program!</h1>
            <p className="fs-5 mb-4 text-white">
              Join our affiliate program and start earning commissions by sharing our platform with your audience.
              Partner with us and turn your network into a source of income.
            </p>
            <ul className="list-unstyled fs-5 text-white mb-4 text-center text-lg-start">
              <li className="mb-3 text-wrap">✅ High commission rates</li>
              <li className="mb-3 text-wrap">✅ Real-time tracking and analytics</li>
              <li className="mb-3 text-wrap">✅ Access to exclusive promotional tools</li>
              <li className="text-wrap">✅ Dedicated affiliate support</li>
            </ul>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <a
                href="https://affiliate.crective.com"
                className="btn btn-light px-4 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2"
                style={{ maxWidth: '300px', width: '100%' }}
              >
                Join the Affiliate Program
                <IoIosArrowForward className="fs-5" />
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img
              src="/affiliate.jpg"
              alt="Affiliate Program"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Affiliate;

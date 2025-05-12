import React, { useState } from 'react';
const Faqs = () => {
  const [showFaq, setShowFaq] = useState(false);

  const faqs = [
    {
      question: 'What is guest blogging?',
      answer:
        'Guest blogging is the practice of writing and publishing content on someone else’s website to reach a wider audience.',
    },
    {
      question: 'How can I become a guest blogger?',
      answer:
        'To become a guest blogger, contact blog owners, pitch your ideas, and contribute valuable content.',
    },
    {
      question: 'What are the benefits of guest blogging?',
      answer:
        'Guest blogging helps in building authority, gaining backlinks, and driving targeted traffic to your site.',
    },
  ];

  return (
    <div style={{ backgroundColor: "#F9F9F9" }} id='faq'>
      <div className="container py-5">
        {/* Main Section */}
        <div className="text-center">
          <h2
            className="mb-4 display-5"
            style={{ color: '#E3652D', fontWeight: '' }}
          >
            Still in Doubt?
          </h2>
          <div
            className="card p-4 shadow-sm border-0"
            style={{ borderRadius: '15px', backgroundColor: '#F9F9F9' }}
          >
            {/* Consultation Section */}
            <div className="d-flex align-items-center justify-content-between py-2">
              <div>
                <span role="img" aria-label="consultation" className="me-2">
                  😊
                </span>
                <strong>Claim a free consultation</strong> with guest blogging experts!
              </div>
              <a
                href="#contact"
                className="btn"
                style={{
                  backgroundColor: '#E3652D',
                  color: '#FFF',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                }}
              >
                Contact Us &rarr;
              </a>
            </div>
            <hr />
            {/* FAQ Button */}
            <div className="d-flex align-items-center justify-content-between py-2">
              <div>
                <span role="img" aria-label="faq" className="me-2">
                  📚
                </span>
                Do you prefer <strong>finding answers</strong> on your own?
              </div>
              <button
                className="btn"
                onClick={() => setShowFaq(!showFaq)}
                style={{
                  backgroundColor: '#E3652D',
                  color: '#FFF',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                }}
              >
                Jump to FAQ &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {showFaq && (
          <div
            className="mt-5 p-4 rounded shadow-sm"
            style={{ backgroundColor: '#FFF', borderRadius: '25px' }}
          >
            <h3
              className="text-center mb-4"
              style={{ color: '#E3652D', fontWeight: 'bold' }}
            >
              Frequently Asked Questions
            </h3>
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item border-0 mb-3" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        backgroundColor: '#FFF',
                        border: `2px solid transparent`,
                        boxShadow: 'none',
                      }}
                      onClick={(e) => {
                        document
                          .querySelectorAll('.accordion-button')
                          .forEach((btn) => {
                            btn.style.border = '2px solid transparent';
                            btn.style.boxShadow = 'none';
                          });
                        e.currentTarget.style.border = `1px solid #E3652D`;
                        e.currentTarget.style.boxShadow = `0 0 8px #E3652D`;
                      }}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body" style={{ color: '#555' }}>
                      {faq.answer}
                    </div>
                  </div>
                  <hr style={{ margin: '0', borderTop: '1px solid #E3652D' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faqs;

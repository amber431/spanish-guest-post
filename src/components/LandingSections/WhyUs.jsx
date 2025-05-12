import React from 'react';
import {
  FaEye,
  FaTrophy,
  FaTimes,
  FaGlobe,
  FaPencilAlt,
  FaLink,
  FaSearch,
  FaCheck,
} from 'react-icons/fa';

function WhyUs() {
  const Card = ({ icon, title, description }) => (
    <div
      className="d-flex flex-column align-items-start p-4 rounded shadow-sm text-dark"
      style={{
        minHeight: '260px',
        position: 'relative',
        backgroundColor: '#1A1A1A',
        borderRadius: '1rem',
        overflow: 'hidden',
        textAlign: 'left',
        transition: 'transform 0.3s',
      }}
    >
      <div
        className="icon-container d-flex justify-content-center align-items-center mb-3"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
          fontSize: '1.5rem',
          color: '#E3652D',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {icon}
      </div>
      <h3 className="h5 font-weight-bold mb-2" style={{ color: '#ffff' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: '#ffff' }}>{description}</p>
    </div>
  );

  const cardsData = [
    {
      icon: <FaEye />,
      title: 'Get Sites With Organic Traffic',
      description:
        'Blogger outreach to sites with real visitors. No less than 1000 visitors per month – period.',
    },
    {
      icon: <FaTrophy />,
      title: 'Hit The Ranks',
      description:
        'We place on real, high-performing websites that rank with a minimum of 1000 keywords.',
    },
    {
      icon: <FaCheck />,
      title: 'Keep It 100',
      description:
        'We connect you with websites with no less than 100 referring domains – raising your authority in no time.',
    },
    {
      icon: <FaTimes />,
      title: 'Zero Spam Here',
      description:
        'No spammy sites, links, or content – just pure, organic stuff. We guarantee a <20% spam score on Moz.',
    },
    {
      icon: <FaPencilAlt />,
      title: 'Maintain The Wordcount Sweet Spot',
      description:
        'Our skilled team of SEO writers are experts at keeping readers hooked at 1000+ words.',
    },
    {
      icon: <FaLink />,
      title: 'D0-Follow Links Only',
      description:
        'The guest posting service guarantees to keep the link juice flowing, and the engines crawling.',
    },
    {
      icon: <FaGlobe />,
      title: 'No PBNs Allowed',
      description:
        'Private Blogging Networks are penalties waiting to happen. We use real websites only.',
      hoverIconColor: '#F8E71C', 
    },
    {
      icon: <FaSearch />,
      title: '100% Unsponsored Content',
      description:
        'We keep content as natural as possible by skipping the sponsor labels.',
      hoverIconColor: '#9013FE', 
    },
  ];

  return (
    <div id="Why-us" className="text-center py-5" style={{ backgroundColor: '#F7F7F7' }}>
      <h1 className="display-5 mb-1">Why Us</h1>
      <div className="" style={{ width: '50px', height: '2px', backgroundColor: '#E3652D', margin: '0 auto', marginTop: '15px', marginBottom: '50px' }}></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
          {cardsData.map((card, index) => (
            <div className="col" key={index}>
              <Card {...card} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <a href='/signup'>
          <button
            className="btn btn-lg px-5 py-3 mt-4"
            style={{ borderRadius: '1.5rem', fontSize: '1rem', fontWeight: 'bold', backgroundColor: '#E3652D', color: '#ffff' }}
          >
            Sign up for free
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;

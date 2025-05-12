import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const BecomePublisher = () => {
  return (
    <section
      style={{
        backgroundColor: '#1A1A1A',
        color: 'white',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Element */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-200px',
          width: '600px',
          height: '600px',
          backgroundColor: '#E3652D',
          borderRadius: '50%',
          zIndex: 0,
          opacity: 0.15,
        }}
      ></div>

      <div className="container text-center">
        {/* Main Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: '3rem',
                lineHeight: '1.3',
                letterSpacing: '1px',
                zIndex: 1,
                position: 'relative',
              }}
            >
              ¿Quieres Ganar Dinero? <br /> Conviértete en Publicador Hoy
            </h1>
            <p
              className="mb-5"
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.7',
                zIndex: 1,
                position: 'relative',
              }}
            >
              Sé parte de una comunidad en crecimiento y transforma tus ideas, productos 
              o servicios en un negocio rentable. ¡Obtén acceso a herramientas profesionales 
              y una audiencia global para empezar!
            </p>
          </div>
        </div>

        {/* Button and Icon */}
        <div
          className="d-flex justify-content-center"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <a
            href="/signup"
            className="btn btn-primary px-5 py-3 rounded-pill d-flex align-items-center gap-3"
            style={{
              backgroundColor: '#E3652D',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              transition: 'transform 0.3s ease',
              boxShadow: '0px 10px 20px rgba(227, 101, 45, 0.4)',
            }}
          >
            Become Seller
            <IoIosArrowForward />
          </a>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div
        style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: '#E3652D',
          borderRadius: '50%',
          zIndex: 0,
          opacity: 0.2,
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          backgroundColor: '#E3652D',
          borderRadius: '50%',
          zIndex: 0,
          opacity: 0.1,
        }}
      ></div>
    </section>
  );
};

export default BecomePublisher;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/pagination'; 
import 'swiper/css/autoplay'; 
import '../../App.css';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
SwiperCore.use([Pagination, Autoplay]);

const Reviews = () => {
  const reviews = [
    {
      name: 'Sophia W.',
      position: 'Digital Marketer',
      review: 'SpanishGuestPost enhanced my brand visibility remarkably. Their intuitive platform and excellent site options boosted my organic traffic and SEO rankings. Highly recommended. Highly recommended.',
      rating: 4.8,
    },
    {
      name: 'Maximilian R.',
      position: 'Small Business Owner',
      review: 'Exceptional service! The user-friendly platform and helpful support team made finding relevant sites easy. I saw quick results with increased customer inquiries. A game-changer for my business.',
      rating: 4.6,
    },
    {
      name: 'Anna L.',
      position: 'SEO Specialist',
      review: 'SpanishGuestPost offers unmatched value. The quality sites, competitive pricing, and seamless process made my campaign a success. They exceeded expectations, delivering noticeable SEO. Highly recommended.',
      rating: 4.9,
    },
    {
      name: 'Liam H.',
      position: 'Content Strategist',
      review: 'The platform is simple, effective, and fast! I witnessed significant growth in my digital presence. Their team was also very responsive to my needs.Highly recommended. Highly recommended. Highly recommended.',
      rating: 4.7,
    },
    {
      name: 'Olivia M.',
      position: 'E-commerce Manager',
      review: 'SpanishGuestPost has been a game-changer for my e-commerce store. Their quality sites helped me drive traffic, leading to an increase in sales. Highly recommended. Highly recommended. Highly recommended. ',
      rating: 5.0,
    },
    {
      name: 'Daniel K.',
      position: 'Affiliate Marketer',
      review: 'I have been using their service for months, and it continues to deliver excellent results. Great platform for enhancing SEO and getting real visibility.Highly recommended. Highly recommended. Highly recommended.',
      rating: 4.9,
    },
  ];

  return (
    <div className="container-fluid text-dark py-5" id="testimonials" style={{ backgroundColor: '#F9F9F9' }}>
      <div className="container text-center mb-5">
        <h1>Happy Customers</h1>
        <div style={{ width: '50px', height: '2px', backgroundColor: '#E3652D', margin: '20px auto' }} />
      </div>

      <Swiper
        slidesPerView={3}  
        spaceBetween={30}   
        pagination={{ clickable: true }}  
        loop={true}        
        autoplay={{
          delay: 3000,  
          disableOnInteraction: false,  
        }}
        className="swiper-container"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="d-flex flex-column align-items-center mb-5">
              <motion.div
                className="card border-0 shadow-lg text-center"
                style={{
                  borderRadius: '15px',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 95%, 0% 85%)',
                  width: '100%',  
                  padding: '20px',
                  backgroundColor: '#fff',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="card-body">
                  <p style={{ fontSize: '16px', color: '#646464', fontStyle: 'italic' }}>
                    "{review.review}"
                  </p>
                </div>
              </motion.div>

              <div
                className="text-center mt-3"
                style={{ position: 'relative', top: '-20px', textAlign: 'center' }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    lineHeight: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#E3652D',
                    color: '#fff',
                    fontSize: '1.5rem',
                    margin: '0 auto',
                  }}
                >
                  {review.name.charAt(0)}
                </div>

                <h5 className="mt-2" style={{ fontWeight: '' }}>{review.name}</h5>
                <p className="text-muted" style={{ marginTop: '-5px', fontSize: '14px' }}>
                  {review.position}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;

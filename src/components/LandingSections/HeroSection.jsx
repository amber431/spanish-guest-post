// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import '../../App.css';
// import WaveAnimation from './WaveAnimation';
// import { FaRegEnvelope } from 'react-icons/fa';
// import { IoIosArrowForward } from 'react-icons/io';

// const HeroSection = () => {
//   const textRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     const canvasElement = renderer.domElement;

//     const container = document.getElementById('threejs-background');
//     if (container) {
//       container.appendChild(canvasElement);
//     } else {
//       console.error('Background container not found');
//     }

//     const particleCount = 30;
//     const particles = new THREE.BufferGeometry();
//     const positions = new Float32Array(particleCount * 3);

//     for (let i = 0; i < particleCount * 3; i++) {
//       positions[i] = (Math.random() - 0.5) * 50;
//     }

//     particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
//     const particleSystem = new THREE.Points(particles, particleMaterial);

//     scene.add(particleSystem);
//     camera.position.z = 20;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       particleSystem.rotation.y += 0.001;
//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       renderer.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div className="position-relative" style={{ height: '85vh', overflow: 'hidden' }}>
//       {/* Three.js Background */}
//       <div
//         id="threejs-background"
//         className="position-absolute w-100 h-100"
//         style={{
//           pointerEvents: 'none',
//           zIndex: -1,
//         }}
//       ></div>

//       {/* Overlay */}
//       <div
//         className="position-absolute w-100 h-100"
//         style={{
//           background: '#000000',
//           opacity: 0.55,
//           zIndex: -1,
//         }}
//       ></div>

//       {/* Content Section */}
//       <div className="container position-relative h-100 d-flex align-items-center">
//         <div className="row w-100 align-items-center">
//           {/* Left Content */}
//           <div className="col-lg-6 col-md-12 text-white text-center text-lg-start mb-4 mb-lg-0">
//             <h1 className="display-5 fw-bold mb-4">
//               Discover the Future of Content Marketing
//             </h1>
//             <p className="lead mb-4">
//               Elevate your brand with powerful guest posting services that connect you with the right audience.
//             </p>
//             {/* Buttons */}
//             <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
//               <a
//                 href="#contact"
//                 className="btn text-white px-4 py-3 rounded-pill d-flex align-items-center gap-2"
//                 style={{ background: '#E3652D' }}
//               >
//                 <span className="button-text fw-semibold">Get a Quote Today</span>
//                 <IoIosArrowForward className="fs-4" />
//               </a>

//               <a
//                 href="mailto:info@germanguestpost.com"
//                 className="btn btn-outline-light bg-dark text-white px-4 py-3 rounded-pill d-flex align-items-center gap-2 email-button"
//               >
//                 <FaRegEnvelope className="fs-5" />
//                 <span className="button-text fw-semibold">info@spanishguestpost.com</span>
//                 <IoIosArrowForward className="fs-4" />
//               </a>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="col-lg-6 col-md-12 text-center">
//             <img
//               src="/bg.jpg"
//               alt="Hero Visual"
//               className="img-fluid rounded"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Wave Animation */}
//       <div className="position-absolute w-100" style={{ bottom: 0, zIndex: 1 }}>
//         <WaveAnimation />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


























import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../../App.css';
import WaveAnimation from './WaveAnimation';
import { FaRegEnvelope } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

const HeroSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvasElement = renderer.domElement;

    const container = document.getElementById('threejs-background');
    if (container) {
      container.appendChild(canvasElement);
    } else {
      console.error('Background container not found');
    }

    const particleCount = 30;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const particleSystem = new THREE.Points(particles, particleMaterial);

    scene.add(particleSystem);
    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="position-relative" style={{ height: '85vh', overflow: 'hidden' }}>
      {/* Three.js Background */}
      <div
        id="threejs-background"
        className="position-absolute w-100 h-100"
        style={{
          pointerEvents: 'none',
          zIndex: -1,
        }}
      ></div>
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

      {/* Overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: '#000000',
          opacity: 0.55,
          zIndex: -1,
        }}
      ></div>

      {/* Content Section */}
      <div className="container position-relative h-100 d-flex align-items-center">
        <div className="row w-100 align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 col-md-12 text-white text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="display-5 fw-bold mb-4">
              Discover the Future of Content Marketing
            </h1>
            <p className="lead mb-4">
              Elevate your brand with powerful guest posting services that connect you with the right audience.
            </p>
            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
              <a
                href="#contact"
                className="btn text-white px-4 py-3 rounded-pill d-flex align-items-center gap-2"
                style={{ background: '#E3652D' }}
              >
                <span className="button-text fw-semibold">Get a Quote Today</span>
                <IoIosArrowForward className="fs-4" />
              </a>

              <a
                href="mailto:info@germanguestpost.com"
                className="btn btn-outline-light bg-dark text-white px-4 py-3 rounded-pill d-flex align-items-center gap-2 email-button"
              >
                <FaRegEnvelope className="fs-5" />
                <span className="button-text fw-semibold">info@spanishguestpost.com</span>
                <IoIosArrowForward className="fs-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Wave Animation */}
      <div className="position-absolute w-100" style={{ bottom: 0, zIndex: 1 }}>
        <WaveAnimation />
      </div>


    </div>
  );
};

export default HeroSection;

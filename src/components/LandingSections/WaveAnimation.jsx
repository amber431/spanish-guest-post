import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WaveAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth; 
      canvas.height = 200; 
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); 
    const waveHeight = 40; 
    const waveSpeed1 = 1.2;
    const waveSpeed2 = 0.6;
    const waveSpeed3 = 1;
    const waveLength = 0.02;

    // Function to draw the waves
    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 

      // Gradient colors for the waves
      const gradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient1.addColorStop(0, 'rgba(135, 206, 235, 0.8)');
      gradient1.addColorStop(1, 'rgba(135, 206, 235, 0)');

      const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient2.addColorStop(0, 'rgba(221, 160, 221, 0.8)');
      gradient2.addColorStop(1, 'rgba(221, 160, 221, 0)');

      const gradient3 = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient3.addColorStop(0, 'rgba(144, 238, 144, 0.8)');
      gradient3.addColorStop(1, 'rgba(144, 238, 144, 0)');

      // Draw first wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height); 
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * waveLength + waveSpeed1 * performance.now() / 1000) * waveHeight + canvas.height - 50; 
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient1;
      ctx.fill();

      // Draw second wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height); 
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * waveLength + waveSpeed2 * performance.now() / 1200) * (waveHeight * 0.8) + canvas.height - 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height); 
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient2;
      ctx.fill();

      // Draw third wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height); 
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * waveLength + waveSpeed3 * performance.now() / 1400) * (waveHeight * 0.6) + canvas.height - 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height); 
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient3;
      ctx.fill();
    };
    const animate = () => {
      drawWave();
      requestAnimationFrame(animate); 
    };

    animate(); 

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="hero-section">
      <div className="wave-container">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default WaveAnimation;

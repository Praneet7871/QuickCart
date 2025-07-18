'use client'
import React, { useEffect } from 'react';
import './MouseGradientBackground.css'; // CSS is separated for clarity

const MouseGradientBackground = () => {
  useEffect(() => {
    const handleMove = (e) => {
      const el = document.body;
      const { clientX: x, clientY: y } = e;
      const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
      el.style.setProperty('--posX', x - l - w / 2);
      el.style.setProperty('--posY', y - t - h / 2);
    };

    document.body.addEventListener('pointermove', handleMove);
    return () => document.body.removeEventListener('pointermove', handleMove);
  }, []);

  return null; // no DOM element needed
};

export default MouseGradientBackground;

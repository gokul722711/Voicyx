// src/components/HeroSection.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeroSection = () => {
  return (
    <div className="hero-section text-center py-5">
      <h1 className="display-4">Welcome to Voicyx</h1>
      <p className="lead">This is a voice assistant based on NVIDIA LLaMA-3.1-Nemotron-70b-Instruct that can do a lot of amazing things!</p>
    </div>
  );
};

export default HeroSection;

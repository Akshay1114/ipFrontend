import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <DotLottieReact
        src="https://lottie.host/8f7ba80a-831e-4792-b99e-fd57bf92acf4/XsdqnGSSdo.lottie"
        loop
        autoplay
        className="loader"
      />
    </div>
  );
};

export default Loader;
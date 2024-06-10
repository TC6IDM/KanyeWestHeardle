import React from 'react';
import '../Styles/ProgressBar.css';

const ProgressBarDifferentColour = ({currentValue, maxValue, cover}) => {
  return (
    <div className="progressBarWrapper">
      <progress 
        className={'progressBar'}
        value={currentValue} 
        max={maxValue}
      >
        {currentValue}%
      </progress>
      <div className="cover" style={{width: `${cover}%`}}></div>
      <div className="divider"></div>
      <div className="divider"></div>
      <div className="divider"></div>
      <div className="divider"></div>
    </div>
  );
};

export default ProgressBarDifferentColour;
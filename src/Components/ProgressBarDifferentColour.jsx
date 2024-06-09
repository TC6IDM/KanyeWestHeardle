import React from 'react';
import '../Styles/ProgressBar.css';

const ProgressBarDifferentColour = ({currentValue, maxValue}) => {
  return (
    <progress 
    className={'progressBar'}
    value={currentValue} 
    max={maxValue}
    >
      {currentValue}%
    </progress>
  )
};

export default ProgressBarDifferentColour;
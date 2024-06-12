import React from 'react';
import '../Styles/AudioPlayer.css';
import { useState } from 'react';

const MenuButtons = ({time, setTime, skip, musicList, submitAnswer, changeTime, buttonText}) => {
   

    return (
        <div  className="button-container2">
            <button className="menu-button" onClick={changeTime}>{buttonText}</button>
            <button className="menu-button" onClick={submitAnswer}>Submit</button>
        </div>
  );
};

export default MenuButtons;
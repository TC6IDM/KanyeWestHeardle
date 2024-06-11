import React from 'react';
import '../Styles/AudioPlayer.css';
import { useState } from 'react';

const MenuButtons = ({time, setTime, skip, musicList, submitAnswer}) => {
    const [buttonText, setButtonText] = useState('Skip +1S')
    const changeTime = () => {
        let index = musicList.indexOf(time);
        if (index === musicList.length - 1) { // if it's the last item in the list
            console.log('last item')
            skip()
        } else {
            console.log(musicList[index + 1])
            setTime(musicList[index + 1]); // set time to the next item
            if (index === musicList.length - 2) {
                setButtonText(`Skip`);
            } else{
                setButtonText(`Skip +${(musicList[musicList.indexOf(time)+2] - musicList[musicList.indexOf(time)+1])/1000}S`);
            }
            skip()
        }
        
    };

    return (
        <div  className="button-container2">
            <button className="menu-button" onClick={changeTime}>{buttonText}</button>
            <button className="menu-button" onClick={submitAnswer}>Submit</button>
        </div>
  );
};

export default MenuButtons;
import {useState, useEffect }  from "react";
import ProgressBarDifferentColour from './ProgressBarDifferentColour';
import '../Styles/AudioPlayer.css';
import playbutton from '../Assets/play.png'
import React from 'react';
const AudioPlayer = ({musicList, time, sound, playMusic, audioRef, cover, maxlen}) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!audioRef.current) audioRef.current = new Audio(sound);

        const interval = setInterval(() => {
            setCurrentTime(audioRef.current.currentTime);
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, [sound]);

    

    return (
        <div>
            <div className="progress-bar-container">
                <ProgressBarDifferentColour currentValue={currentTime} maxValue={maxlen} cover={cover } />
            </div>
            <div className="button-container2">
                <text className="time-textL">{currentTime.toFixed(2)}s</text>
                    
                <button className="play-button" onClick={playMusic}>
                    <img src = {playbutton} alt = "Play"/>
                </button>
                    
                <text className="time-textR">{maxlen.toFixed(2)}s</text>
            </div>
            
        </div>
                
    );
};

export default AudioPlayer;
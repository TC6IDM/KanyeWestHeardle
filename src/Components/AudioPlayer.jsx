import {useState, useEffect }  from "react";
import ProgressBarDifferentColour from './ProgressBarDifferentColour';
import '../Styles/AudioPlayer.css';
import playbutton from '../Assets/play.png'
import React from 'react';
const AudioPlayer = ({musicList,time, sound}) => {
    const [audio, setAudio] = useState( new Audio(sound) )
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, [audio]);

    HTMLMediaElement.prototype.stop = function(){
        this.pause();
        this.currentTime = 0;
    };

    const playMusic = () => {
        audio.play();
        setTimeout(() => {
            audio.stop();
        }, time);
    }

    return (
        <div>
            <div className="progress-bar-container">
                <ProgressBarDifferentColour currentValue={audio.currentTime} maxValue={16} cover={(16000 - musicList[musicList.indexOf(time)])/160 } />
            </div>
            <div className="button-container2">
                <text className="time-textL">{currentTime.toFixed(2)}s</text>
                    
                <button className="play-button" onClick={playMusic}>
                    <img src = {playbutton} alt = "Play"/>
                </button>
                    
                <text className="time-textR">16.00s</text>
            </div>
            
        </div>
                
    );
};

export default AudioPlayer;
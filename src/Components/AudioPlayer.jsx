import {useState, useEffect }  from "react";
import sound from '../songs/frankoceantest.mp3'
import ProgressBarDifferentColour from './ProgressBarDifferentColour';
import '../Styles/Button.css';
const AudioPlayer = () => {
    const [audio, setAudio] = useState( new Audio(sound) )
    const [buttonText, setButtonText] = useState('Skip +1S')
    const [time, setTime] = useState(1000)
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [audio]);

    HTMLMediaElement.prototype.stop = function(){
        this.pause();
        this.currentTime = 0;
    };
    let musicList = [1000, 2000, 4000, 7000, 11000, 16000]
    const changeTime = () => {
        let index = musicList.indexOf(time);
        if (index === musicList.length - 1) { // if it's the last item in the list
            console.log('last item')
            setButtonText(`Game Over!`);
        } else {
          console.log(musicList[index + 1])
          setTime(musicList[index + 1]); // set time to the next item
          if (index === musicList.length - 2) {
            setButtonText(`Skip`);
          } else{
            setButtonText(`Skip +${(musicList[musicList.indexOf(time)+2] - musicList[musicList.indexOf(time)+1])/1000}S`);
          }
        }
    };

    const playMusic = () => {
        audio.play();
        setTimeout(() => {
            audio.stop();
        }, time);
    }

    return (
        <div className="centered">
            <button onClick={playMusic}>{'Play'}</button>
            <button onClick={changeTime}>{buttonText}</button>
            <ProgressBarDifferentColour currentValue={audio.currentTime} maxValue={16} />
        </div>
    );
};

export default AudioPlayer;
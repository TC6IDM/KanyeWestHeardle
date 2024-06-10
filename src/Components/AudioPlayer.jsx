import {useState, useEffect }  from "react";
import sound from '../Songs/frankoceantest.mp3'
import ProgressBarDifferentColour from './ProgressBarDifferentColour';
import '../Styles/AudioPlayer.css';
import playbutton from '../Assets/play.png'
import YeTable from './YeTable';
import React from 'react';
import SearchBar from './SearchBar';
const AudioPlayer = () => {
    const [audio, setAudio] = useState( new Audio(sound) )
    const [buttonText, setButtonText] = useState('Skip +1S')
    const [time, setTime] = useState(1000)
    const [currentTime, setCurrentTime] = useState(0);
    const songs2 = [
        {
          song: 'Ghost Town',
          album: 'v',
          trackNo: '6 v',
          trackLength: '4:31 v',
          features: 'PARTYNEXTDOOR, 070 Shake, Kid Cudi',
          bgColor: '#FFC300' // Yellow
        },
        {
          song: 'Champion',
          album: 'Graduation',
          trackNo: '2 ^',
          trackLength: '2:47 ^',
          features: 'No features',
          bgColor: '#FF5733' // Orange
        },
        {
          song: 'Good Life',
          album: 'Graduation',
          trackNo: '5',
          trackLength: '3:27',
          features: 'T-Pain',
          bgColor: '#33FF57' // Green
        },
        {
          song: 'Stronger',
          album: 'Graduation',
          trackNo: '3',
          trackLength: '5:12',
          features: 'Daft Punk',
          bgColor: '#339FFF' // Blue
        },
        {
          song: 'Heartless',
          album: '808s & Heartbreak',
          trackNo: '4',
          trackLength: '3:31',
          features: 'No features',
          bgColor: '#FF33FF' // Purple
        },
        {
          song: 'Power',
          album: 'My Beautiful Dark Twisted Fantasy',
          trackNo: '1',
          trackLength: '4:52',
          features: 'Dwele',
          bgColor: '#FF3333' // Red
        }
      ];
    const songs = [
        'Song One',
        'Song Two',
        'Another Song',
        'Some Other Song',
        'A Different Song'
      ];


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

    const submitAnswer = () => {
        audio.play();
        setTimeout(() => {
            audio.stop();
        }, time);
    }

    return (
        <div className="centered">
            <div className="YeTable">
                <table className="YeTab">
                    <thead>
                    <tr>
                        <th>Songs</th>
                        <th>Album</th>
                        <th>Track No.</th>
                        <th>Track Length</th>
                        <th>Features</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songs2.map((song, index) => (
                        <tr key={index} style={{ backgroundColor: song.bgColor }}>
                        <td>{song.song}</td>
                        <td>{song.album}</td>
                        <td>{song.trackNo}</td>
                        <td>{song.trackLength}</td>
                        <td>{song.features}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="progress-bar-container">
                <ProgressBarDifferentColour currentValue={audio.currentTime} maxValue={16} cover={(16000 - musicList[musicList.indexOf(time)])/160 } />
            </div>
                <div className="button-container2">
                    <text className="time-textL">{currentTime.toFixed(2)}s</text>
                    
                    <button className="play-button" onClick={playMusic}>
                        <img src = {playbutton} />
                    </button>
                    
                    <text className="time-textR">16.00s</text>
                </div>
                <div >
                    <SearchBar songs={songs} />
                </div>
                <div  className="button-container2">
                    <button className="menu-button" onClick={changeTime}>{buttonText}</button>
                    <button className="menu-button" onClick={submitAnswer}>Submit</button>
                </div>
                
            </div>
    );
};

export default AudioPlayer;
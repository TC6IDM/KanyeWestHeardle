import {useState}  from "react";
import sound from '../songs/frankoceantest.mp3'

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState( new Audio(sound) )
    const togglemusic = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div>
            <h2>Now Playing: {"frank ocean pyrite"}</h2>
            <div className="audio-instance">
                <button onClick={togglemusic}>{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
        </div>
    );
};

export default AudioPlayer;
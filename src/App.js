import React from 'react';
import AudioPlayer from './Components/AudioPlayer';
import YeTable from './Components/YeTable';
import SearchBar from './Components/SearchBar';
import MenuButtons from './Components/MenuButtons';
import { useState } from 'react';
import myData from './song_dict.json';
import './Styles/Index.css';

function App() {
  const [input, setInput] = useState('');
  const [time, setTime] = useState(1000)
  const musicList = [1000, 2000, 4000, 7000, 11000, 16000]
  var songs = [];
  for (var key in myData) {
    songs.push(myData[key])
  }
  var todaysSong = songs[Math.floor(Math.random() * songs.length)]
  var sound = require('./Songs/'+todaysSong.file)
  console.log("Today's Song: " + todaysSong.title )
  const [guesses, setGuesses] = useState([
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
    },
  ]);
  
  const submitAnswer = () => {
    var i = 0;
    while (guesses[i].song !== '') i++;
    const chosenSong = songs.filter(song => 
      song.title.toLowerCase().includes(input.toLowerCase())
    )[0];
    var minutes = Math.floor(chosenSong.duration / 60);
    var seconds = Math.floor(chosenSong.duration - (minutes * 60));
    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses];
      newGuesses[i].song = chosenSong.title;
      newGuesses[i].album = chosenSong.album;
      newGuesses[i].trackNo = chosenSong.track;
      newGuesses[i].trackLength =  minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      newGuesses[i].features = chosenSong.artist.replace("/Kanye West", "").replace("Kanye West/", "").replace("Kanye West", "");
      newGuesses[i].features = newGuesses[i].features === "" ? "None" : newGuesses[i].features;
      return newGuesses;
    });
    if (i === 5) {
      gameover();
    }
  }

  const skip = () => {
    var i = 0;
    while (guesses[i].song !== '') i++;
    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses];
      newGuesses[i].song = "x";
      newGuesses[i].album = "x";
      newGuesses[i].trackNo = "x";
      newGuesses[i].trackLength =  "x";
      newGuesses[i].features = "x";
      return newGuesses;
    });
    if (i === 5) {
      gameover();
    }
  }

  const gameover = () => {
    console.log('Game Over')
    // alert('Game Over');
  }

  return (
    <div>
      <YeTable guesses={guesses}/>
      <AudioPlayer musicList={musicList} time = {time} sound = {sound}/>
      <SearchBar setInput2 = {setInput} songs= {songs}/>
      <MenuButtons time = {time} setTime = {setTime} skip = {skip} musicList={musicList} submitAnswer = {submitAnswer}/>
    </div >
  );
}

export default App;
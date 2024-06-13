import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AudioPlayer from './Components/AudioPlayer';
import YeTable from './Components/YeTable';
import SearchBar from './Components/SearchBar';
import MenuButtons from './Components/MenuButtons';
import { useState } from 'react';
import myData from './song_dict.json';
import './Styles/Index.css';
import GameOver from './Components/GameOver';
import 'reactjs-popup/dist/index.css';
import './Styles/YeTable.css'; // Assuming you have some CSS to style the table
// import Popup from 'reactjs-popup';

function App() {
  const [input, setInput] = useState('');
  const [time, setTime] = useState(1000)
  const [musicList, setMusicList] = useState([1000, 2000, 4000, 7000, 11000, 16000])
  const [modalShow, setModalShow] = React.useState(false);
  const [songs, setSongs] = useState(myData);
  const [todaysSong, setTodaysSong] = useState(songs[Math.floor(Math.random() * Object.keys(songs).length+1)])
  // var todaysSong = songs[Math.floor(Math.random() * songs.length)]
  // var todaysSong = songs[73]
  var sound = require('./Songs/'+todaysSong.file)
  console.log("Today's Song: " + todaysSong.title )
  const [guesses, setGuesses] = useState([
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
      chosenSong: null
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
      chosenSong: null
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
      chosenSong: null
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
      chosenSong: null
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
      chosenSong: null
    },
    {
      song: '',
      album: '',
      trackNo: '',
      trackLength: '',
      features: '',
      chosenSong: null
    },
  ]);
  
  const submitAnswer = () => {
    var i = 0;
    while (guesses[i].song !== '') {
      i++;
      if (i >= 6) {
        gameover();
        return;
      }
    }
    var chosenSong = Object.values(songs).filter(song => 
      song.title.toLowerCase()===input.toLowerCase()
    )[0];
    if (chosenSong === undefined) {
      chosenSong = Object.values(songs).filter(song => 
        song.title.toLowerCase().includes(input.toLowerCase())
      )[0];
    }
    if (chosenSong === undefined) return;
    if (chosenSong.title.toLowerCase() === todaysSong.title.toLowerCase()) {
      gameover();
      if (i < 5) changeTime()
    }
    else{
      changeTime()
    }
    
    var minutes = Math.floor(chosenSong.duration / 60);
    var seconds = Math.floor(chosenSong.duration - (minutes * 60));
    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses];
      newGuesses[i].song = chosenSong.title;
      newGuesses[i].album = chosenSong.album;
      newGuesses[i].trackNo = chosenSong.track;
      newGuesses[i].trackLength =  minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      newGuesses[i].features = chosenSong.artist;
      newGuesses[i].features = newGuesses[i].features.replace("/Kanye West", "").replace("Kanye West/", "").replace("Kanye West", "") === "" ? "None" : newGuesses[i].features.replace("/Kanye West", "").replace("Kanye West/", "").replace("Kanye West", "");
      newGuesses[i].chosenSong = chosenSong;
      return newGuesses;
    });
    // if (i >= 5) {
    //   gameover();
    // }
  }

  const skip = () => {
    var i = 0;
    while (guesses[i].song !== '') {
      i++;
      if (i >= 5) {
        gameover();
      }
      if (i >= 6) {
        return;
      }
    }
    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses];
      newGuesses[i].song = "x";
      newGuesses[i].album = "x";
      newGuesses[i].trackNo = "x";
      newGuesses[i].trackLength =  "x";
      newGuesses[i].features = "x";
      newGuesses[i].chosenSong = null;
      return newGuesses;
    });
    // if (i >= 5) {
    //   gameover();
    // }
  }

  const gameover = () => {
    console.log('Game Over')
    setModalShow(true)
    //reset the game here
    // alert('Game Over');
  }


  const [buttonText, setButtonText] = useState('Skip +1S')
  const changeTime = () => {
      let index = musicList.indexOf(time);
      if (index === musicList.length - 1) { // if it's the last item in the list
          skip()
          // console.log("last item")
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
    <div>
      <YeTable guesses={guesses} todaysSong={todaysSong}/>
      <AudioPlayer musicList={musicList} time = {time} sound = {sound}/>
      <SearchBar setInput2 = {setInput} songs= {songs}/>
      <MenuButtons time = {time} setTime = {setTime} skip = {skip} musicList={musicList} submitAnswer = {submitAnswer} changeTime = {changeTime} buttonText={buttonText}/>
      <GameOver
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
    
  );
}

export default App;
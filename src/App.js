import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AudioPlayer from './Components/AudioPlayer';
import YeTable from './Components/YeTable';
import SearchBar from './Components/SearchBar';
import MenuButtons from './Components/MenuButtons';
import { useState, useRef } from 'react';
import myData from './song_dict.json';
import './Styles/Index.css';
import GameOver from './Components/GameOver';
import 'reactjs-popup/dist/index.css';
import './Styles/YeTable.css'; // Assuming you have some CSS to style the table
// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/compat/database';
import { getAnalytics } from "firebase/analytics";
import { v4 as uuidv4 } from 'uuid';

// import Popup from 'reactjs-popup';

function App() {
  const [input, setInput] = useState('');
  const [time, setTime] = useState(1000)
  const [maxlen, setMaxlen] = useState(16)
  const [musicList, setMusicList] = useState([1000, 2000, 4000, 7000, 11000, 16000])
  const [modalShow, setModalShow] = React.useState(false);
  const [gameWon, setGameWon] = useState(false)
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
  const [cover, setCover] = useState((16000 - musicList[musicList.indexOf(time)])/160)

  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);-
  // const db = firebase.database();

  // const updateRecord = (userId, guesses) => {
  //   const userRef = db.ref('users/' + userId);
  
  //   userRef.once('value', (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       // If the user already exists in the database, update their record
  //       userRef.set({
  //         ...data,
  //         [guesses]: (data[guesses] || 0) + 1
  //       });
  //     } else {
  //       // If the user doesn't exist in the database, create a new record for them
  //       userRef.set({
  //         [guesses]: 1
  //       });
  //     }
  //   });
  // };

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
    setInput("")
    if (chosenSong.title.toLowerCase() === todaysSong.title.toLowerCase()) {
      setGameWon(true)
      gameover();
      // if (i < 5) changeTime()
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

  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  const gameover = () => {
    console.log('Game Over')
    setModalShow(true)
    setCover(0)
    setMaxlen(todaysSong.duration)
    audioRef.current.play();
    const userId = getUserId();
    // updateRecord(userId, 1);
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
          setCover((16000 - musicList[index + 1])/160)
          if (index === musicList.length - 2) {
              setButtonText(`Skip`);
          } else{
              setButtonText(`Skip +${(musicList[musicList.indexOf(time)+2] - musicList[musicList.indexOf(time)+1])/1000}S`);
          }
          skip()
      }
      
  };

  const audioRef = useRef(null);

  HTMLMediaElement.prototype.stop = function(){
    this.pause();
    this.currentTime = 0;
  };

  const playMusic = () => {
      audioRef.current.play();
      setTimeout(() => {
          audioRef.current.stop();
      }, time);
  }
  
  return (
    <div>
      <YeTable guesses={guesses} todaysSong={todaysSong}/>
      <AudioPlayer musicList={musicList} time = {time} sound = {sound} playMusic={playMusic} audioRef={audioRef} cover = {cover} maxlen={maxlen}/>
      <SearchBar input = {input} setInput = {setInput} songs= {songs}/>
      <MenuButtons time = {time} setTime = {setTime} skip = {skip} musicList={musicList} submitAnswer = {submitAnswer} changeTime = {changeTime} buttonText={buttonText}/>
      <GameOver show={modalShow} onHide={() => {setModalShow(false);window.location.reload(); }}  todaysSong = {todaysSong} guesses = {guesses} gameWon = {gameWon}/>
    </div>
    
  );
}

export default App;
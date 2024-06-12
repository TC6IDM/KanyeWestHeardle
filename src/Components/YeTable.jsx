import React from 'react';
import '../Styles/YeTable.css'; // Assuming you have some CSS to style the table



const YeTable = ({guesses, todaysSong}) => {

  const albumsInOrder = [
    "The College Dropout",
    "Late Registration",
    "#Impossible",
    "Graduation",
    "808s & Heartbreak",
    "#Christmas In Harlem",
    "My Beautiful Dark Twisted Fantasy",
    "Watch the Throne (Deluxe)",
    "#Cold",
    "#Mercy",
    "#New God Flow",
    "Yeezus",
    "#Only One",
    "#FourFiveSeconds",
    "#All Day",
    "The Life of Pablo",
    "#Ye vs. the People (starring TI as the People)",
    "#Lift Yourself",
    "ye",
    "KIDS SEE GHOSTS",
    "#XTCY",
    "#I Love It",
    "JESUS IS KING",
    "#Wash Us In The Blood",
    "Donda (Deluxe)",
    "#City of Gods",
    "#True Love",
    "#Eazy",
    "#Hot Shit (feat. Ye & Lil Durk)",
    "#Stand United",
    "#Where They At",
    "VULTURES 1",
    "#No Face"
  ]




  return (
    <div >
      <table className="YeTable">
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
          {guesses.map((song, index) => {
            // console.log(song.song)
            if (song.song === ""){
              return(
                <tr key={index} className="YeTable">
                  <td/>
                  <td/>
                  <td/>
                  <td/>
                  <td/>
                </tr>
              )
            }
            if (song.song === "x"){
              return(
                <tr key={index} className="YeTable">
                  <td> x </td>
                  <td> x </td>
                  <td> x </td>
                  <td> x </td>
                  <td> x </td>
                </tr>
              )
            }
            var songClass = song.chosenSong.title === todaysSong.title ? 'correct' : ''

            var albumClass = song.chosenSong.album === todaysSong.album ? 'correct' : ''
            var originalAlbumIndex = albumsInOrder.indexOf(song.chosenSong.album) !== -1 ? albumsInOrder.indexOf(song.chosenSong.album) : albumsInOrder.indexOf("#"+song.chosenSong.album)
            var todaysSongAlbumIndex = albumsInOrder.indexOf(todaysSong.album) !== -1 ? albumsInOrder.indexOf(todaysSong.album) : albumsInOrder.indexOf("#"+todaysSong.album)
            var albumCouldBe = []
            var albumIndex = todaysSongAlbumIndex
            var backTrack = 0
            while (albumIndex > 0 && (albumsInOrder[albumIndex-1].startsWith("#") || backTrack < 2)){
              if (!albumsInOrder[albumIndex-1].startsWith("#")){
                backTrack += 1
              }
              albumCouldBe.push(albumsInOrder[albumIndex-1].replace("#", "").toLowerCase())
              albumIndex -= 1
            }
            albumIndex = todaysSongAlbumIndex
            var frontTrack = 0
            while (albumIndex < albumsInOrder.length-1 && (albumsInOrder[albumIndex+1].startsWith("#") || frontTrack < 2)){
              if (!albumsInOrder[albumIndex+1].startsWith("#")){
                frontTrack += 1
              }
              albumCouldBe.push(albumsInOrder[albumIndex+1].replace("#", "").toLowerCase())
              albumIndex += 1
            }
            if (albumCouldBe.includes(song.chosenSong.album.toLowerCase())) albumClass = 'close'
            // var albumPos = 
            var albumPos = todaysSongAlbumIndex - originalAlbumIndex === 0 ? '' : todaysSongAlbumIndex - originalAlbumIndex > 0 ? '▲' : '▼'
            
            var trackNoClass = song.chosenSong.track === todaysSong.track ? 'correct' : Math.abs(song.chosenSong.track - todaysSong.track)<=2 ? 'close' : ''
            var trackNoPos = song.chosenSong.track - todaysSong.track === 0 ? '' : song.chosenSong.track - todaysSong.track > 0 ? '▲' : '▼'

            var trackLengthClass = Math.floor(song.chosenSong.duration) === Math.floor(todaysSong.duration) ? 'correct' : Math.abs(Math.floor(song.chosenSong.duration) - Math.floor(todaysSong.duration))<=30 ? 'close': ''
            var trackLengthPos = Math.floor(song.chosenSong.duration) === Math.floor(todaysSong.duration) ? '' : Math.floor(song.chosenSong.duration) > Math.floor(todaysSong.duration) ? '▼' : '▲'
            
            var chosenSongFeatures = song.chosenSong.artist.replace("/Kanye West", "").replace("Kanye West/", "").replace("Kanye West", "")
            var chosenSongFeaturesSet = new Set(chosenSongFeatures.split("/"))
            var todaysSongFeatures = todaysSong.artist.replace("/Kanye West", "").replace("Kanye West/", "").replace("Kanye West", "")
            var todaysSongFeaturesSet = new Set(todaysSongFeatures.split("/"))
            console.log(chosenSongFeatures, todaysSongFeatures)
            var featuresClass = chosenSongFeatures === todaysSongFeatures ? 'correct' : [...chosenSongFeaturesSet].some(item => todaysSongFeaturesSet.has(item)) ? 'close' : ''
            // var featuresPos = todaysSongFeatures.filter(item => chosenSongFeatures.has(item))
            return(
            <tr key={index} className="YeTable">
              <td className={songClass}>{song.song}</td>
              <td className={albumClass}>{song.album + " " + albumPos}</td>
              <td className={trackNoClass}>{song.trackNo + " " + trackNoPos}</td>
              <td className={trackLengthClass}>{song.trackLength + " " + trackLengthPos}</td>
              <td className={featuresClass}>{song.features}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default YeTable;

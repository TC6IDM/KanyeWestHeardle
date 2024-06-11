import React from 'react';
import '../Styles/YeTable.css'; // Assuming you have some CSS to style the table

const songs = [
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

const YeTable = () => {
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
          {songs.map((song, index) => (
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
  );
};

export default YeTable;

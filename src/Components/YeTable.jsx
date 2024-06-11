import React from 'react';
import '../Styles/YeTable.css'; // Assuming you have some CSS to style the table

const songs = [
  {
    song: 'Ghost Town',
    album: 'v',
    trackNo: '6 v',
    trackLength: '4:31 v',
    features: 'PARTYNEXTDOOR, 070 Shake, Kid Cudi',
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
            <tr key={index} className="YeTable">
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

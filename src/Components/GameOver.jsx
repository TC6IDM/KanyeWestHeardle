import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Styles/GameOver.css';

function GameOver({ onHide, show, todaysSong, guesses, gameWon}) {
  
  var i = 0;
  while (i<6 && guesses[i].song !== '') i++;
  
    return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="black-modal" // Add this line
    >
      <Modal.Header closeButton>
        <Modal.Title  id="contained-modal-title-vcenter" classname = "centered-title">
          {gameWon ? 'You Won!' : 'YOU SUCK!!!'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className="centered-image" src={require(`../Assets/AlbumArt/${todaysSong.album}.jpeg`)}  alt={todaysSong.album} /> 
        <h4>{todaysSong.title} by {todaysSong.artist}</h4>
        <p>
          {gameWon ? `Congratulations! you got it in ${i} ${i!==1 ? 'guesses' : 'guess'}` : 'Better luck next time!'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant = 'danger' onClick={onHide}>Try Again </Button>
      </Modal.Footer>
    </Modal>
    )
}

export default GameOver;
import React, { Component } from 'react'
import './App.css';
import Drumpad from './Components/Drumpad';


const soundData = [{
    id: 'snare',
    letter: 'Q',
    src: 'https://www.myinstants.com/media/sounds/snare.mp3'
  },
  {
    id: 'bass 1',
    letter: 'W',
    src: 'https://www.myinstants.com/media/sounds/bass-drum.mp3'
  },
  {
    id: 'bongo',
    letter: 'E',
    src: 'http://tipiwiki.free.fr/snd/Percussion(4e)2.wav'
  },
  {
    id: 'tom tom',
    letter: 'A',
    src: 'http://www.denhaku.com/r_box/sr16/sr16tom/loelectm.wav'
  },
  {
    id: 'bass 3',
    letter: 'S',
    src: 'http://billor.chsh.chc.edu.tw/sound/bass4.wav'
  },
  {
    id: 'shotgun',
    letter: 'D',
    src: 'http://david.guerrero.free.fr/Effects/ShotgunReload.wav'
  },
  {
    id: 'high hat',
    letter: 'Z',
    src: 'http://www.denhaku.com/r_box/tr707/closed.wav'
  },
  {
    id: 'drum hit',
    letter: 'X',
    src: 'http://www.masterbits.de/sc_docu/sounds1/1TM00013.MP3'
  },
  {
    id: 'laser',
    letter: 'C',
    src: 'http://www.sa-matra.net/sounds/starcontrol/Umgah-Backzip.wav'
  },
]

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: '',
      power: true,
      volume: '0.3'
    }
  }

  handleDisplay = display => this.setState({display});
  
  powerChange = () => this.setState({power: !this.state.power});
  
  clearDisplay = () => this.setState({display: ''});
  
  adjustVolume = (e) => {
    if (this.state.power) {
      this.setState({
        volume: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  render() {

    const powerSelect = this.state.power ? {
      float: 'right'
    }:{
      float: 'left'
    }

    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.volume
    });

    return (
      <div id="drum-machine">
        <div id='drum-pads'>
          {
            soundData.map(data => 
              <Drumpad 
                key={data.id}
                id={data.id}
                letter={data.letter}
                src={data.src}
                handleDisplay={this.handleDisplay}
                power={this.state.power}
              />
              )
          }
        </div>
        <div id='controls'>
          <div id='power'>
            Power:
            <div div id = 'outer-select' onClick = {this.powerChange}>
              <div id='inner-select' style={powerSelect}></div>
            </div>
          </div>

          <p id='display'>{this.state.display}</p>

          <div className="slidecontainer">
            Volume:
            <input type="range" min="0" max="1" step='0.2' className="slider" id="volume"
              value={this.state.volume}
              onChange={this.adjustVolume}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App


import React, { Component } from 'react';
import './App.css';
import TimerLengthControl from './components/TimerLengthControl';
// { color: '#c9043f' }
export class App extends Component{
  constructor(props){
    super(props);
    this.interval = '';

    this.state = {
      type: 'Session',
      seshlength: 25,
      brklength: 5,
      timer: 1500,
      isPlaying: false,
      interval: '',
      alarmColor: { color: 'white' },
      alertShow: { display: 'none' }
    }
  }

  handleSeshIncrDecr = (e) => {    
    const sign = e.currentTarget.value;
    const {seshlength} = this.state;

    this.IncrDecr(sign, 'Session', seshlength, 'seshlength');
  }
  handleBrkIncrDecr = (e) => {
    const sign = e.currentTarget.value;
    const {brklength } = this.state;

    this.IncrDecr(sign, 'Break', brklength, 'brklength');
  } 

  IncrDecr = (sign, received_type, currLength, typelength) => {
    if (this.state.isPlaying) { 
      this.setState({ alertShow: { display: 'block', color: '#ea4d77', fontWeight: '700' } });
      setTimeout(() => this.setState({ alertShow: { display: 'none' } }), 1500);
      return ;
    }
    
    const {type} = this.state;
  
    if(type === received_type){
      if (sign === '+' && currLength != 60) {
        this.setState({
          [typelength]: currLength + 1,
          timer: currLength * 60 + 60
        })
      } else if (sign === '-' && currLength != 1) {
        this.setState({
          [typelength]: currLength - 1,
          timer: currLength * 60 - 60
        })
      } 
    } else {
      if (sign === '+' && currLength != 60) {
        this.setState({
          [typelength]: currLength + 1
        })
      } else if (sign === '-' && currLength != 1) {
        this.setState({
          [typelength]: currLength - 1
        })
      } 
    }
  }

  handleplaypause = () => {
    const {isPlaying} = this.state;

    if(isPlaying){
      clearInterval(this.interval);
      this.setState({isPlaying: false});
    }else{
      this.setState({ isPlaying: true });
      this.countDown();
    }
  }

  countDown = () => {
    this.interval = setInterval(() => {
      const { timer } = this.state;
      this.setState({
        timer: timer - 1
      })

      this.phaseControl();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  phaseControl = () => {
    const {timer, type, brklength, seshlength} = this.state;
    this.warning(timer);
    this.buzzer(timer);
    if(timer < 0){
      if(type === 'Session') {
        clearInterval(this.interval);
        this.countDown();
        this.swapTimer(brklength * 60, 'Break');
       } else {
        clearInterval(this.interval);
        this.countDown();
        this.swapTimer(seshlength * 60, 'Session');
       }
    }
  }

  warning = timer => {
    if(timer < 61){
      this.setState({ alarmColor: { color: '#c9043f' }})
    }else{
      this.setState({alarmColor: { color: 'white' }})
    }
  }

  buzzer = timer => {
    if(timer === 0){
      this.audio.play();
    }
  }

  swapTimer = (timer, type) => {
    this.setState({
      type: type,
      timer: timer,
      alarmColor: {color: 'white'}
    })
  }

  clockify = timer =>{
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ' : ' + seconds;
  }

  reset = () => {
    this.setState({
      type: 'Session',
      seshlength: 25,
      brklength: 5,
      timer: 1500,
      isPlaying: false,
      interval: '',
      alarmColor: { color: 'white' }
    });

    clearInterval(this.interval);
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  render(){
    const {timer, brklength, seshlength, type, isPlaying, alarmColor} = this.state
    return(
      <div>
        <h1>Pomodoro Clock</h1>
        <div style={alertShow}>
          Please first stop the timer to modify length.
        </div>
        <div className='lengthControl'>
          <TimerLengthControl 
            title='Break Length'
            count={brklength}
            handleIncrDecr={this.handleBrkIncrDecr} />
          <TimerLengthControl 
            title='Session Length'
            count={seshlength}
            handleIncrDecr={this.handleSeshIncrDecr} />
        </div>
        <div className='timer'>
          <h1 
            style={alarmColor}>
            <span>{type}</span>
            {this.clockify(timer)}</h1>
        </div>
        <div className='buttons'>
          <button value='-'
            onClick={this.handleplaypause}>
            <i className={`fa fa-${isPlaying ? 'pause': 'play'}`}></i>
          </button>
          <button value='-'
            onClick={this.reset}>
            <i className='fa fa-refresh'></i>
          </button>
        </div>
        <div className='author'>
          <p>Designed and Coded By</p>
          <span><a href='https://github.com/prakrutivaghasiya' target='_blank' title='View Github Repo!'>Prakruti Vaghasiya</a></span>
        </div>
        <audio id='beep' preload='auto' src='https://www.soundjay.com/button/beep-09.mp3'
          ref={(ref) => {this.audio = ref}} />
      </div>
    );
  }
}

export default App;

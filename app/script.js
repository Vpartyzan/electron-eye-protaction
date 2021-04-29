import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    }
  }

  formatTime() {
    let time = this.state.time;
    let min = parseInt(time / 60, 10);
    let sec = parseInt(time % 60, 10);

    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;

    return min + ':' + sec;
  }

  step() {
    const state = this.state;

    this.setState({
      time: state.time - 1,
    });
    
    if (state.status === 'work' && state.time < 1) {
      this.playBell();
      this.setState({
        status: 'rest',
        time: 20,
      })
    }

    if (state.status === 'rest' && state.time < 1) {
      this.playBell();
      this.setState({
        status: 'work',
        time: 1200,
      })
    }
  }

  startTimer() {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(() => this.step(), 1000),
    });
  }

  stopTimer() {
    this.setState({
      status: 'off',
      time: 0,
      timer: clearInterval(this.state.timer),
    });    
  }

  closeApp() {
    window.close()
  }

  playBell() {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(this.state.status == 'off') ? (
          <div>          
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>        
        ) : '' }
        {(this.state.status === 'work') ? <img src="./images/work.png" /> : ''}
        {(this.state.status === 'rest') ? <img src="./images/rest.png" /> : ''}
        {(this.state.status !== 'off') ? <div className="timer">{this.formatTime()}</div> : ''}
        {(this.state.status === 'off') ? <button className="btn" onClick={() => this.startTimer()}>Start</button> : ''}
        {(this.state.status !== 'off') ? <button className="btn" onClick={() => this.stopTimer()}>Stop</button> : ''}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));

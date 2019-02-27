class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      isStart: false
    }

    this._changeBreakLength   = this._changeBreakLength.bind(this)
    this._changeSessionLength = this._changeSessionLength.bind(this)
    this._startStop           = this._startStop.bind(this)
    this.decreaseTimer        = this.decreaseTimer.bind(this)
  }
  
  _changeBreakLength(i) {
    if (this.state.isStart) return
    let breakLength = this.state.breakLength + i;
    if (breakLength < 1 || breakLength > 10) return

    this.setState({
      ...this.state,
      breakLength
    })
  }
  _changeSessionLength(i) {
    if (this.state.isStart) return
    let sessionLength = this.state.sessionLength + i;
    if (sessionLength < 1 || sessionLength > 30) return

    this.setState({
      ...this.state,
      sessionLength,
      timer: sessionLength * 60,
    })
  }
  _startStop() {
    // Start
    if (!this.state.isStart) {
      this.loop = accurateInterval(() => {
        this.decreaseTimer()
      }, 1000)
    } 
    // Pause
    else {
      this.loop.cancel()
    }
    
    this.setState({
      ...this.state,
      isStart: !this.state.isStart
    })
  }
  decreaseTimer() {
    this.setState({
      ...this.state,
      timer: this.state.timer - 1
    })
  }
  render() {
    return (
      <div className="body">
        <div className="title">Pomodoro Clock</div>
        <div className="main">
          <Clock 
            timer={this.state.timer}
          />
          <Adjustment
            breakLength={this.state.breakLength} 
            sessionLength={this.state.sessionLength} 
            changeBreakLength={this._changeBreakLength}
            changeSessionLength={this._changeSessionLength}
          />
          <StartStop 
            isStart={this.state.isStart}
            startStop={this._startStop}
          />
        </div>
      </div>
    )
  }
}
class Clock extends React.Component {
  convertTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  render() {
    return (
      <div className="clock">
        <div className="circle-1">
          <div className="circle-2">
            <div className="circle-3">
              {this.convertTime(this.props.timer)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const Adjustment = (props) => {
  return (
    <div className="adjust-box">
      <div className="break-box">
        <div id="break-label">
          Break Length
        </div>
        <div className="break-controller">
          <span id="break-decrement" onClick={() => props.changeBreakLength(-1)}>
            <i class="fas fa-arrow-left"></i>
          </span>
          <span style={{fontSize: "30px"}}>
            {props.breakLength}
          </span>
          <span id="break-increment" onClick={() => props.changeBreakLength(1)}>
            <i class="fas fa-arrow-right"></i>
          </span>
        </div>
      </div>
      <div className="session-box">
        <div id="session-label">
          Session Length
        </div>
        <div className="break-controller">
          <span id="session-decrement" onClick={() => props.changeSessionLength(-1)}>
            <i class="fas fa-arrow-left"></i>
          </span>
          <span style={{fontSize: "30px"}}>
            {props.sessionLength}
          </span>
          <span id="session-increment" onClick={() => props.changeSessionLength(1)}>
            <i class="fas fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  )
}
class StartStop extends React.Component {
  render() {
    return (
      <div className="bottom">
        <div className="box-item" onClick={this.props.startStop}>
          {this.props.isStart ?
            <i class="fas fa-pause"></i> :
            <i class="fas fa-play"></i>}
        </div>
        <div className="box-item">
          <i class="fas fa-undo-alt"></i>
        </div>
      </div>
    )
  }
}

(function () {
  window.accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function () {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    };
  };
}).call(this);

ReactDOM.render(<App />, document.getElementById('root'));
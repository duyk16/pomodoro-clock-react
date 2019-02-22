class App extends React.Component {
  render() {
    return (
      <div>
        <div className="title">Pomodoro Clock</div>
        <div className="main">
          <Clock />
          <Adjustment />
        </div>
      </div>
    )
  }
}
class Clock extends React.Component {
  render() {
    return (
      <div className="clock">
        <div className="circle-1">
          <div className="circle-2">
            <div className="circle-3">
              25:00
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class Adjustment extends React.Component {
  render() {
    return (
      <div className="adjust-box">
        <div id="break-label"></div>
        <div id="session-label"></div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
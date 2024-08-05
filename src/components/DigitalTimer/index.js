import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {timerInMins: 25, secsCompleted: 0, isTimerRunning: false}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  reduceSecsCompleted = () => {
    const {timerInMins, secsCompleted} = this.state
    const isTimerOver = secsCompleted === timerInMins * 60

    if (isTimerOver) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({secsCompleted: prevState.secsCompleted + 1}))
    }
  }

  onStartOrPause = () => {
    const {timerInMins, secsCompleted, isTimerRunning} = this.state
    const isTimerOver = secsCompleted === timerInMins * 60

    if (isTimerOver) {
      this.setState({secsCompleted: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.reduceSecsCompleted, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState({timerInMins: 25, secsCompleted: 0, isTimerRunning: false})
  }

  onDecrement = () => {
    this.setState(prevState => ({timerInMins: prevState.timerInMins - 1}))
  }

  onIncrement = () => {
    this.setState(prevState => ({timerInMins: prevState.timerInMins + 1}))
  }

  getFormattedTime = () => {
    const {timerInMins, secsCompleted} = this.state
    const remSecs = timerInMins * 60 - secsCompleted
    const mins = Math.floor(remSecs / 60)
    const secs = Math.floor(remSecs % 60)
    const fomattedMins = mins > 9 ? mins : `0${mins}`
    const formattedSecs = secs > 9 ? secs : `0${secs}`
    return `${fomattedMins}:${formattedSecs}`
  }

  getDetails = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      return {
        url: 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
        alt: 'pause icon',
        text: 'Pause',
        onclick: this.onStartOrPause,
        onDecrement: '',
        onIncrement: '',
      }
    }
    return {
      url: 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
      alt: 'play icon',
      text: 'Start',
      onclick: this.onStartOrPause,
      onDecrement: this.onDecrement,
      onIncrement: this.onIncrement,
    }
  }

  render() {
    const {timerInMins, isTimerRunning} = this.state
    const {
      url,
      alt,
      text,
      onclick,
      onDecrement,
      onIncrement,
    } = this.getDetails()

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>

        <div className="cards-container">
          <div className="img-card">
            <div className="timer-card">
              <p className="timer">{this.getFormattedTime()}</p>
              <p className="status">{isTimerRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="text-card">
            <div className="status-card">
              <button type="button" className="status-btn" onClick={onclick}>
                <img src={url} alt={alt} className="status-img" />
              </button>
              <p className="start">{text}</p>
              <button
                type="button"
                className="status-btn"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="status-img"
                />
              </button>
              <p className="start">Reset</p>
            </div>
            <p className="para">Set Timer Limit</p>
            <div className="btn-card">
              <button type="button" className="operator" onClick={onDecrement}>
                -
              </button>
              <p className="timer-btn">{timerInMins}</p>
              <button type="button" className="operator" onClick={onIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

import React from 'react'
import $ from 'jquery'

class Madotsuki extends React.Component {
  constructor () {
    super()

    this.directionToKeyMap = {
      'down': 'ArrowDown',
      'left': 'ArrowLeft',
      'up': 'ArrowUp',
      'right': 'ArrowRight'
    }

    this.keyToDirectionMap = {
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowUp': 'up',
      'ArrowRight': 'right'
    }

    this.state = {
      // values: 'down', 'left', 'up', 'right'
      direction: 'down',
      walking: false,
      // values: 'left', 'right', 'mid'
      step: 'mid'
    }
  }

  /**
   * Creates a timed step interval function for the walking animation and returns it.
   */
  startWalking () {
    const stepTime = 300 // ms
    let steps = 0
    let stepInterval = window.setInterval(() => {
      console.log('steppin')
      switch (++steps % 4) {
        case 0: // left
          this.setState({step: 'left'})
          break
        case 2: // right
          this.setState({step: 'right'})
          break
        default: // mid
          this.setState({step: 'mid'})
          break
      }
    }, stepTime)

    return stepInterval
  }

  /**
   * Clears the given interval interval function for the given event.
   */
  stopWalking (stepInterval, event) {
    window.clearInterval(stepInterval)
    this.setState({walking: false})

    $(window).off(event)
  }

  turn (direction) {
    this.setState({
      direction: direction,
      walking: true,
      step: 'left'
    })
  }

  handleKeyDown (event) {
    const direction = this.keyToDirectionMap[event.key]

    if (!this.state.walking && direction != null) {
      // turn and start walking
      this.turn(direction)
      let stepInterval = this.startWalking()
      // stop walking on key up
      $(window).on('keyup', (event) => {
        if (this.keyToDirectionMap[event.key] === this.state.direction) {
          this.stopWalking(stepInterval, 'keyup')
        }
      })
    }
  }

  componentDidMount () {
    const screen = $(window)
    // const madotsuki = $('#madotsuki')

    // set listener for walking via keyboard
    screen.keydown((event) => this.handleKeyDown(event))

    // set listeners for walking via touchpads
    for (let direction of ['down', 'left', 'up', 'right']) {
      console.log('creating listener for ' + direction + ' mousedown')
      $('.touchpad-' + direction).on('mousedown touchstart', (event) => {
        if (!this.state.walking) {
          // turn and start walking
          this.turn(direction)
          let stepInterval = this.startWalking()
          // stop walking on mouse up
          screen.on('mouseup touchend', (event) => {
            this.stopWalking(stepInterval, 'mouseup touchend')
          })
        }
      })
    }
  }

  render () {
    const classes = [
      // the direction madotsuki is facing
      'facing-' + this.state.direction,
      // the state of madotsuki's step
      this.state.walking ? this.state.step + '-step' : 'still'
    ]

    return <div id='madotsuki' className={classes.join(' ')} />
  }
}

export default Madotsuki

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
    const PIXELS_PER_STEP = 30
    const STEP_TIME = 300 // ms
    let steps = -1
    let stepInterval = window.setInterval(() => {
      console.log('steppin')
      const background = $('div.background')
      const currentX = parseInt(background.css('backgroundPositionX'), 10)
      const currentY = parseInt(background.css('backgroundPositionY'), 10)
      let newX, newY
      switch (this.state.direction) {
        case 'left':
          newX = (currentX + PIXELS_PER_STEP) + 'px'
          newY = currentY + 'px'
          break
        case 'up':
          newX = currentX + 'px'
          newY = (currentY + PIXELS_PER_STEP) + 'px'
          break
        case 'right':
          newX = (currentX - PIXELS_PER_STEP) + 'px'
          newY = currentY + 'px'
          break
        case 'down':
          newX = currentX + 'px'
          newY = (currentY - PIXELS_PER_STEP) + 'px'
          break
        default:
          break
      }
      background.animate({
        'backgroundPositionX': newX,
        'backgroundPositionY': newY
      }, STEP_TIME)

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
    }, STEP_TIME)

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
      step: 'mid'
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
    // set listener for walking via keyboard
    $(window).keydown((event) => this.handleKeyDown(event))

    // set listeners for walking via touchpads
    for (let direction of ['down', 'left', 'up', 'right']) {
      $('.touchpad-' + direction).on('mousedown touchstart', (event) => {
        if (!this.state.walking) {
          // turn and start walking
          this.turn(direction)
          let stepInterval = this.startWalking()
          // stop walking on mouse up
          $(window).on('mouseup touchend', (event) => {
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

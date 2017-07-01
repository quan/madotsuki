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

  turn (direction) {
  }

  walk () {
    console.log('walking')

    const stepTime = 300 // ms
    let stepCount = 0
    let stepInterval

    if (this.state.walking) {
      stepInterval = window.setInterval(() => {
        switch (++stepCount % 4) {
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

      const screen = $(window)

      screen.keyup((event) => {
        if (this.keyToDirectionMap[event.key] === this.state.direction) {
          window.clearInterval(stepInterval)
          this.setState({walking: false})
        }
      })
    }
  }

  componentDidMount () {
    const screen = $(window)
    // const madotsuki = $('#madotsuki')

    // set listener for turning via keyboard
    screen.keydown((event) => {
      const direction = this.keyToDirectionMap[event.key]

      if (!this.state.walking && direction != null) {
        // turn
        this.setState({
          direction: direction,
          walking: true,
          step: 'left'
        })

        this.walk()
      }
    })
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

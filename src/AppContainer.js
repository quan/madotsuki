import React from 'react'
import Madotsuki from './Madotsuki.js'

class AppContainer extends React.Component {
  // constructor () {
  //   super()

  //   this.state = {
  //     x_offset: 0,
  //     y_offset: 0
  //   }
  // }

  render () {
    // const style = {
    //   'backgroundPositionX': this.state.x_offset + 'px',
    //   'backgroundPositionY': this.state.y_offset + 'px'
    // }

    return (
      <div className='container background' /* style={style} */>
        <div className='touchpad touchpad-up' />
        <div className='touchpad touchpad-left' />
        <Madotsuki />
        <div className='touchpad touchpad-right' />
        <div className='touchpad touchpad-down' />
      </div>
    )
  }
}

export default AppContainer

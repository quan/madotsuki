import React from 'react'
import Madotsuki from './Madotsuki.js'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <div className='touchpad touchpad-up' />
        <div className='touchpad touchpad-left' />
        <Madotsuki />
        <div className='touchpad touchpad-right' />
        <div className='touchpad touchpad-down' />
      </div>
    )
  }
}

export default App

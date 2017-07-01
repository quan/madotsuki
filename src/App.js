import React from 'react'
import Madotsuki from './Madotsuki.js'

class App extends React.Component {
  handleKeyDown () {
    console.log('wat')
  }

  render () {
    return (
      <div className='App' onKeyDown={this.handleKeyDown}>
        <Madotsuki />
      </div>
    )
  }
}

export default App

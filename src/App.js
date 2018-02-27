import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Cube from './Cube.js'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      prices: []
    }
    this.fetchPrices()
    window.setInterval(this.fetchPrices, 5000)
  }

  fetchPrices = async () => {
    const res = await fetch('http://localhost:5000/prices')
    const json = await res.json()
    this.setState({
      prices: json
    })
  }

  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          this.state.prices.map(
            coin => <Cube key={coin.symbol} symbol={coin.symbol} price={coin.price} change={coin.change} />
          )
        }
      </div>
    )
  }
}

export default App

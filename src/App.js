import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Cube from './Cube.js'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      btcPairs: [],
      btcUsdt: {},
      filter: []
    }
    this.fetchBtcPairs()
    window.setInterval(this.fetchBtcPairs, 1000)
    this.fetchBtcUsdt()
    window.setInterval(this.fetchBtcUsdt, 1000)
  }

  fetchBtcPairs = async () => {
    const res = await fetch('http://localhost:5000/btcpairs')
    const json = await res.json()
    this.setState({
      btcPairs: json
    })
  }

  fetchBtcUsdt = async () => {
    const res = await fetch('http://localhost:5000/btcusdt')
    const json = await res.json()
    this.setState({
      btcUsdt: json
    })
  }

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value.toUpperCase().split(' ')
    })
  }

  render() {
    return (
      <div className="App" style={{ textAlign: 'center' }}>
        <div>
          <Cube
            change={this.state.btcUsdt.change}
            usdt={this.state.btcUsdt.price}
          />
        </div>
        <input 
          type="text"
          size="40"
          value={this.state.filter.value}
          onChange={this.handleFilterChange}
          placeholder=" enter symbols (e.g. ETH NANO NEO)"
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {
            this.state.btcPairs
            .filter(coin => this.state.filter.some(symbol => symbol === coin.symbol.slice(0, -3)))
            .sort((a, b) => a.symbol.localeCompare(b.symbol))
            .map(coin => 
              <Cube
                key={coin.symbol}
                symbol={coin.symbol.slice(0, -3)}
                price={coin.price}
                change={coin.change}
                usdt={coin.usdt}
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default App
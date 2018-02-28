import React, { Component } from 'react'
import './App.css'
import Cube from './Cube.js'
import queryString from 'query-string'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      btcPairs: [],
      btcUsdt: {},
      filter: []
    }
    this.fetchBtcPairs()
    this.fetchBtcUsdt()
    this.setUpdateInterval()
  }

  setUpdateInterval = async () => {
    let updateInterval = await this.fetchUpdateInterval()
    if (updateInterval < 1000) updateInterval = 1000
    window.setInterval(this.fetchAllCyclicData, updateInterval)
  }

  fetchAllCyclicData = () => {
    this.fetchBtcPairs()
    this.fetchBtcUsdt()
  }

  fetchUpdateInterval = async () => {
    const res = await fetch('http://localhost:5000/updateinterval')
    const json = await res.json()
    return json.milliseconds
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
            .filter(coin => 
              this.state.filter
                .concat(window.location.search && queryString.parse(window.location.search).symbol.toUpperCase().split('-'))
              .some(symbol => symbol === coin.symbol.slice(0, -3))
            )
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

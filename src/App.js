import React, { Component } from 'react'
import './App.css'
import Cube from './Cube.js'
import queryString from 'query-string'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      pairType: 'BTC',  // TODO: USDT currently not working
      filter: []
    }
    this.fetchPairs()
    this.setUpdateInterval()
  }

  setUpdateInterval = async () => {
    let updateInterval = await this.fetchUpdateInterval()
    if (updateInterval < 1000) updateInterval = 1000
    window.setInterval(this.fetchAllCyclicData, updateInterval)
  }

  fetchAllCyclicData = () => {
    this.fetchPairs()
  }

  fetchUpdateInterval = async () => {
    const res = await fetch('http://localhost:5000/updateinterval')
    const json = await res.json()
    return json.milliseconds
  }

  fetchPairs = async () => {
    const res = await fetch('http://localhost:5000/tradingpairs')
    const json = await res.json()
    this.setState({
      pairs: json
    })
  }

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value.toUpperCase().split(' ')
    })
  }

  handlePairTypeChange = e => {
    this.setState({
      pairType: e.target.value
    })
  }

  render() {
    return (
      <div className="App" style={{ textAlign: 'center' }}>
        <form style={{ 
          color: '#888',
          margin: '10px',
          fontWeight: 'bold',
          fontSize: '83%'
        }}>
          <label>
            <input type="radio" value="BTC" checked={this.state.pairType === 'BTC'} onChange={this.handlePairTypeChange} />
            BTC
          </label>
          <label>
            <input type="radio" value="ETH" checked={this.state.pairType === 'ETH'} onChange={this.handlePairTypeChange} />
            ETH
          </label>
          <label>
            <input type="radio" value="BNB" checked={this.state.pairType === 'BNB'} onChange={this.handlePairTypeChange} />
            BNB
          </label>
        </form>

        <Cube
          symbol={this.state.pairType}
          change={this.state.pairs && this.state.pairs.usdt.find(coin => coin.symbol.startsWith(this.state.pairType)).change}
          usdt={this.state.pairs && Number(this.state.pairs.usdt.find(coin => coin.symbol.startsWith(this.state.pairType)).price).toFixed(2)}
          usdtHourlyChange={this.state.pairs && this.state.pairs.usdt.find(coin => coin.symbol.startsWith(this.state.pairType)).usdtHourlyChange}
        />

        <input 
          type="text"
          size="40"
          value={this.state.filter.value}
          onChange={this.handleFilterChange}
          placeholder=" enter symbols (e.g. 'NANO NEO VEN')"
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {
            this.state.pairs &&
            this.state.pairs[this.state.pairType.toLowerCase()]
            .filter(coin => 
              this.state.filter
              .concat(window.location.search && queryString.parse(window.location.search).symbol.toUpperCase().split('-'))
              .some(symbol => symbol === coin.symbol.slice(0, -this.state.pairType.length))
            )
            .sort((a, b) => a.symbol.localeCompare(b.symbol))
            .map(coin =>
              <Cube
                key={coin.symbol}
                symbol={coin.symbol.slice(0, -this.state.pairType.length)}
                price={coin.price}
                change={coin.change}
                usdt={coin.usdt}
                priceHourlyChange={coin.priceHourlyChange}
                usdtHourlyChange={coin.usdtHourlyChange}
              />
            )
          }
        </div>
        
        <div style={{
          color: '#777',
          margin: '11px',
          fontWeight: 'bold',
          fontSize: '66%'
        }}>
          % = hourly change
        </div>
      </div>
    )
  }
}

export default App

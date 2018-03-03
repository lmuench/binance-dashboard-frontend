import React, { Component } from 'react';

class Cube extends Component {
  constructor(props) {
    super()
    this.state = {
      priceColor: '#EEE'
    }
  }

  componentDidMount() {
    this.changeColor(this.props.change)
  }

  componentWillReceiveProps(nextProps) {
    this.changeColor(nextProps.change)
  }

  changeColor = change => {
    if (change === 1) {
      this.setState({ priceColor: '#7fcc25' })
    } else if (change === -1) {
      this.setState({ priceColor: '#ff0683' })
    } else {
      this.setState({ priceColor: '#BBB' })
    }
  }

  render() {
    const priceChange = this.props.priceHourlyChange
    const usdtChange = this.props.usdtHourlyChange
    return (
      <div style={{ margin: '10px' }}>
        <div style={{ color: '#EEE' }}>
          {this.props.symbol}
        </div>
        <div style={{ color: '#777' }}>
          {priceChange > 0 && '+'}{priceChange}{priceChange && ' %'}
        </div>
        <div style={{ color: this.state.priceColor }}>
          {this.props.price}
        </div>
        <div style={{ color: '#EEE' }}>
          ${this.props.usdt}
        </div>
        <div style={{ color: '#777' }}>
          {usdtChange > 0 && '+'}{usdtChange}{usdtChange && ' %'}
        </div>
      </div>
    );
  }
}

export default Cube;

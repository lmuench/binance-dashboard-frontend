import React, { Component } from 'react';

class Cube extends Component {
  constructor(props) {
    super()
    this.state = {
      margin: '10px',
      color: '#EEE'
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
      this.setState({ color: '#7fcc25' })
    } else if (change === -1) {
      this.setState({ color: '#ff0683' })
    } else {
      this.setState({ color: '#BBB' })
    }
  }

  render() {
    return (
      <div style={this.state}>
        <div style={{ color: '#EEE' }}>
          {this.props.symbol}
        </div>
        <div style={{ color: '#777' }}>
          {this.props.priceHourlyChange > 0 && '+'}
          {this.props.priceHourlyChange}
          {this.props.priceHourlyChange && ' %'}
        </div>
        <div>{this.props.price}</div>
        <div style={{ color: '#EEE' }}>
          ${this.props.usdt}
        </div>
        <div style={{ color: '#777' }}>
          {this.props.usdtHourlyChange > 0 && '+'}
          {this.props.usdtHourlyChange}
          {this.props.usdtHourlyChange && ' %'}
        </div>
      </div>
    );
  }
}

export default Cube;

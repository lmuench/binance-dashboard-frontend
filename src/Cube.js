import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Cube extends Component {
  constructor(props) {
    super()
    this.state = {
      margin: '10px',
      fontWeight: 'bold',
      fontSize: '83%',
      color: '#484848'
    }
  }

  componentDidMount() {
    this.changeColor(this.props.change)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.change !== this.props.change) {
      this.changeColor(nextProps.change)
    }
  }

  changeColor = change => {
    if (change === 1) {
      this.setState({ color: '#5fac05' })
    } else if (change === -1) {
      this.setState({ color: '#ff0683' })
    }
  }

  render() {
    return (
      <div style={this.state}>
        <div style={{ color: '#484848' }}>{this.props.symbol}</div>
        <div>&#x20BF;{this.props.price && this.props.price.substring(0, 10)}</div>
        <div>${this.props.usdt && this.props.usdt.substring(0, 10)}</div>
      </div>
    );
  }
}

export default Cube;

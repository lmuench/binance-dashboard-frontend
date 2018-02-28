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
      this.setState({ color: '#EEE' })
    }
  }

  render() {
    return (
      <div style={this.state}>
        <div style={{ color: '#EEE' }}>{this.props.symbol}</div>
        <div>&#x20BF;{this.props.price && this.props.price.substring(0, 10)}</div>
        <div>${this.props.usdt && this.props.usdt.substring(0, 10)}</div>
      </div>
    );
  }
}

export default Cube;

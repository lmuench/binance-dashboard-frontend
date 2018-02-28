import React, { Component } from 'react';
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
      this.setState({ color: '#BBB' })
    }
  }

  render() {
    return (
      <div style={this.state}>
        <div style={{ color: '#EEE' }}>{this.props.symbol}</div>
        <div>{this.props.price}</div>
        <div style={{ color: '#EEE' }}>${this.props.usdt}</div>
      </div>
    );
  }
}

export default Cube;

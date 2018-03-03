import React, { Component } from 'react'

class RadioButtons extends Component {
  render() {
    return (
      <form style={{ color: '#888' }}>
        {this.props.values.map(value => {
          return (
            <label key={value}>
              <input
                type="radio"
                value={value}
                checked={this.props.checkedIfEquals === value}
                onChange={this.props.onChange}
              />
              {value}
            </label>
          )
        })}
      </form>
    )
  }
}

export default RadioButtons
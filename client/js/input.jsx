import React from 'react';

export default class Input extends React.Component {
  render() {
    return (
      <div className='header'>
        <input className='header__input' type='text' name='test' placeholder='Type your search criteria...' onChange={this.props.onChange}></input>
      </div>
    )
  }
}

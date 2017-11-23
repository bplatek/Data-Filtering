import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (
      <div className='loader'>
        <span className='loader_text'>Please wait...</span>
      </div>
    )
  }
}

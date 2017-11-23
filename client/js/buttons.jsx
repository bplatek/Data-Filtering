import React from 'react';

export default class Buttons extends React.Component {
  createAscButton(sort) {
    if (sort === 'asc') {
      return <button key='asc' onClick={() => this.props.changeOrder('asc')} disabled>A to Z</button>;
    }
    return <button key='asc' onClick={() => this.props.changeOrder('asc')}>A to Z</button>;
  }
  createDescButton(sort) {
    if (sort === 'desc') {
      return <button key='desc' onClick={() => this.props.changeOrder('desc')} disabled>Z to A</button>;
    }
    return <button key='desc' onClick={() => this.props.changeOrder('desc')}>Z to A</button>;
  }
  render() {
    const offset = this.props.pagination.offset;
    const limit = this.props.pagination.limit;
    const count = this.props.pagination.count;
    const sort = this.props.pagination.sort;
    const numOfPages = Math.ceil(count/limit);
    const currentPage = offset === 0 ? 1 : offset/limit + 1;
    let buttons = [];

    for (let i = 1; i <= numOfPages; i++) {
      buttons.push(i);
    }

    var nums = buttons.map((element) => {
      if (currentPage === element) {
        return <button key={element} onClick={() => this.props.changePage(element - 1)} disabled>{element}</button>;
      }
      return <button key={element} onClick={() => this.props.changePage(element - 1)} >{element}</button>;
    });

    nums.push(this.createAscButton(sort), this.createDescButton(sort));

    return (
      <div className='pagination'>
        {nums}
      </div>
    )
  }
}

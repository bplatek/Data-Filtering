import React from 'react';

export default class Results extends React.Component {
  render() {
    if (this.props.data.length) {
      const rows = this.props.data.map((element) => {
        return <tr key={element.key}>
                <td>{element.name}</td>
                <td>{element.surname}</td>
                <td>{element.age}</td>
               </tr>;
      });
      return (
        <div className='results'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div className='results'>
        <span className='results__bad-news'>No matches found.</span>
      </div>
    )
  }
}

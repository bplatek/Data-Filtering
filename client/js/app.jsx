import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Input from './input.jsx';
import Results from './results.jsx';
import Buttons from './buttons.jsx';
import Loader from './loader.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: null,
      timeout: null,
      data: [],
      text: '',
      pagination: {
        offset: 0,
        limit: 10,
        sort: 'asc',
        count: 0
      }
    };
  }
  sendRequest(text = '', offset = 0, sort = 'asc', limit = 10) {
    this.setState({
      loader: <Loader />
    });
    axios.get('http://localhost:3001/', {
      params: {
        text,
        offset,
        sort,
        limit
      }
    }).then (response => {
        this.setState({
          loader: null,
          data: response.data.records,
          pagination: response.data.pagination
        });
      });
  }
  componentDidMount() {
    this.sendRequest();
  }
  getData(event) {
    clearTimeout(this.state.timeout);
    this.setState({
      text: event.target.value
    });
    this.state.timeout = setTimeout(() => this.sendRequest(this.state.text, 0, this.state.pagination.sort), 400);
  }
  changePage(pageIndex) {
    this.sendRequest(this.state.text, pageIndex * this.state.pagination.limit, this.state.pagination.sort);
  }
  changeOrder(sort) {
    this.sendRequest(this.state.text, this.state.pagination.offset, sort);
  }
  render() {
    return (
      <div className='app-container'>
        <Input onChange={this.getData.bind(this)}/>
        <Results data={this.state.data} />
        {this.state.loader}
        <Buttons changePage={this.changePage.bind(this)} changeOrder={this.changeOrder.bind(this)} pagination={this.state.pagination}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

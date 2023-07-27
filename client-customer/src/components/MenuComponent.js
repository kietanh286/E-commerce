import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import 'boxicons'
import './app.css'
import { Card, Input, List } from 'antd'
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <header className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <List width='100%'>
              <Card><li className="menu"><Link to='/'>Home</Link></li>
                {cates}</Card>
            </List>

          </ul>
        </div>
        <div className="float-right">
          <Card><form className="search">

            <th><Input placeholder="Enter keyword" value={this.state.txtKeyword} defaultValue={'0'} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} ></Input></th>
            <th> <box-icon name='search-alt-2' onClick={(e) => this.btnSearchClick(e)}></box-icon></th>
          </form></Card>
        </div>
        <div className="float-clear" />
      </header>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }


  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
}
export default withRouter(Menu);
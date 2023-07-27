import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import './css/main.css'
import { Button, Card, Space } from 'antd';
class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
    return (
      <Card><div>

        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />

        <Card><div className="float-left">
          <Card>  <h2 className="text-center">CATEGORY LIST</h2></Card>
          <table className="datatable" border="1">
            <th>  <Card>ID</Card></th>
            <th>   <Card>Name</Card></th>
            {cates}

          </table>
        </div></Card>
      </div ></Card >
    );
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;
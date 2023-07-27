import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import './css/main.css'
import { Button, Card, Input, Select } from 'antd';
class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td width='10px'>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div>
        <div className="float-left">
          <Card><h2 className="text-center">PRODUCT LIST</h2>
            <table className="datatable" border="1">
              <Card><tbody>
                <tr className="datatable">
                  <th><Card>ID</Card></th>
                  <th><Card>Name</Card></th>
                  <th><Card>Price</Card></th>
                  <th><Card>Category Date</Card></th>
                  <th><Card>Category</Card></th>
                  <th><Card>Image</Card></th>
                </tr>
                {prods}
                <tr>
                  <td colSpan="10">{pagination}</td>
                </tr>
              </tbody></Card>
            </table></Card>
        </div>
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }
  updateProducts = (products, noPages) => { // arrow-function
    this.setState({ products: products, noPages: noPages });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;
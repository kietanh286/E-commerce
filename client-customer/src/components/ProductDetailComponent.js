import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import './app.css'
import { Button, Card, Input } from 'antd'
class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="align-center">
          <Card title='PRODUCT DETAILS'></Card>

          <figure align='left' className="caption-right">
            <img src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            <figcaption>
              <form>
                <Card hoverable><table>

                  <tbody>
                    <Card>
                      <th>
                        <tr>
                          <td align="Left">ID:</td>
                          <td>{prod._id}</td>
                        </tr>
                        <tr>
                          <td align="Left">Name:</td>
                          <td>{prod.name}</td>
                        </tr>
                        <tr>
                          <td align="Left">Price:</td>
                          <td>{prod.price} VND</td>
                        </tr>
                        <tr>
                          <td align="Left">Category:</td>
                          <td>{prod.category.name}</td>
                        </tr>
                        <tr>
                          <td align="Left">Quantity:</td>
                          <td><Input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }}></Input></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><Button onClick={(e) => this.btnAdd2CartClick(e)}> ADD TO CART</Button></td>
                        </tr>
                      </th>
                    </Card>
                  </tbody>
                </table></Card>
              </form>
            </figcaption>
          </figure>
        </div >
      );
    }
    return (<div />);
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('SUCCESSFUL!');
    } else {
      alert('Please input quantity');
    }
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}
export default withRouter(ProductDetail);
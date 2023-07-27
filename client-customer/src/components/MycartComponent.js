import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import { Button, Card, Input } from 'antd'
class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} class="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td><span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span></td>

        </tr>
      );
    });
    return (
      <div className="align-center">
        <Card title='ITEM LIST'></Card>
        <table class="datatable" border="1">
          <Card hoverable><tbody>
            <th class="datatable">
              <th><Card title='No.'></Card></th>
              <th><Card title='ID'></Card></th>
              <th><Card title='Name'></Card></th>
              <th><Card title='Image'></Card></th>
              <th><Card title='Price'></Card></th>
              <th><Card title='Quantity'></Card></th>
              <th><Card title='Amount'></Card></th>
              <th><Card title='Total'></Card></th>
              <th><Card title='Action'></Card></th>
              {mycart}
              <tr>
                <th colSpan="6"></th>
                <th>Total</th>
                <th>{CartUtil.getTotal(this.context.mycart)}</th>
                <th><Button danger onClick={(e) => this.lnkCheckoutClick(e)}>Checkout</Button></th>

              </tr>
            </th>


          </tbody></Card>
        </table>
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('SUCCESSFULL!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SOMETHING WRONG!');
      }
    });
  }
}

export default withRouter(Mycart);
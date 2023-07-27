import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import 'boxicons'
import './app.css'
import { Card } from 'antd';

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <Card><div className="border-bottom">
        <a className="float-left" left='20px'>
          {this.context.token === '' ?
            <a><Link to='/login'>Login</Link> | <Link to='/active'> Active </Link></a>
            :
            <a>Hello <b><Link to='/myprofile'>{this.context.customer.name}</Link></b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link></a>
          }
        </a>
        <a><Link to='/signup'>| Sign-up |</Link></a>
        <a><Link to='/myorders'> My orders </Link></a>
        <div class='iconCart'>
          <a class="mycart"><Link to='/mycart'><box-icon type='solid' name='cart'></box-icon></Link>
            <div class='totalQuantity'>{this.context.mycart.length}</div>
          </a>
        </div>
        <div className="float-clear" />

      </div></Card>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;
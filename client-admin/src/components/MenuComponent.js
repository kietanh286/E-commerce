import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import './css/main.css'
import './MenuComponent.css'
import { Button, AutoComplete, Space } from 'antd';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap');
</style>
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="menu">
        <div className="float-left">
          <li className="menu">
            <Button size='large' type="dashed">  <Link to='/admin/home'>Home</Link></Button>
            <Button size='large' type="dashed">  <Link to='/admin/category'>Category</Link></Button>
            <Button size='large' type="dashed">  <Link to='/admin/product'>Product</Link></Button>
            <Button size='large' type="dashed">  <Link to='/admin/order'>Order</Link></Button>
            <Button size='large' type="dashed">  <Link to='/admin/customer'>Customer</Link></Button>
          </li>

        </div >

        <Space>  <div className="float-right">
          Hello <b>{this.context.username}</b> | <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
        </div></Space>


        <div className="float-clear" />

      </div >
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;
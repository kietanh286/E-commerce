import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './app.css'
import './script.js'


import { Card } from 'antd';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    <div id="top-image"></div>
    const newprods = this.state.newprods.map((item) => {
      return (
        <div align='Left' key={item._id} className="inline"><Link to={'/product/' + item._id}>
          <Card hoverable>
            <th align='Left'><figure>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
              <figcaption className="text-center">{item.name}<br />Price: {item.price} VND</figcaption>

            </figure></th></Card></Link>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline"><Link to={'/product/' + item._id}>
          <Card hoverable>
            <th><figure>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
              <figcaption className="text-center">{item.name}<br />Price: {item.price} VND</figcaption>
            </figure></th></Card></Link>
        </div>
      );
    });
    return (
      <div>
        <div className="align-center">
          <Card title='NEW PRODUCTS'>{<Card>{newprods}</Card>}</Card>
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <Card title='HOT PRODUCTS'>{<Card>{hotprods}</Card>}</Card>


          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;